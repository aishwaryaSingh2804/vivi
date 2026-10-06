// src/components/home/Workflow/WorkflowSection.tsx

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./WorkflowSection.css";
import { WORKFLOW_STAGES } from "./workflowData";

const LAST_STAGE_INDEX =
  WORKFLOW_STAGES.length - 1;

const WALKTHROUGH_VIEWPORTS =
  WORKFLOW_STAGES.length;

// Sub-pixel / rounding slack when comparing scroll positions
// against stage boundaries.
const SCROLL_TOLERANCE_PX = 2;

type PlaybackSession = {
  id: number;
  stageIndex: number;
  clip: string;
};

type WorkflowState = {
  activeStage: number;
  demoProgress: number;
  isPlaying: boolean;
  isTransitioning: boolean;
  targetStage: number | null;
  currentPlayingClip: string | null;
};

const INITIAL_STATE: WorkflowState = {
  activeStage: 0,
  demoProgress: 0,
  isPlaying: false,
  isTransitioning: false,
  targetStage: null,
  currentPlayingClip: null,
};

export function WorkflowSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const demoFrameRef =
    useRef<HTMLIFrameElement | null>(null);

  // ---------------------------------------------------------
  // IMPERATIVE REFS
  // ---------------------------------------------------------

  const stateRef =
    useRef<WorkflowState>(INITIAL_STATE);

  const demoReadyRef =
    useRef(false);

  const workflowStartedRef =
    useRef(false);

  const playbackCounterRef =
    useRef(0);

  const playbackSessionRef =
    useRef<PlaybackSession | null>(null);

  const targetStageRef =
    useRef<number | null>(null);

  // Records the ONE stage allowed to start after an automatic
  // completion → scroll transition.
  const pendingStageRef =
    useRef<number | null>(null);

  const targetScrollYRef =
    useRef<number | null>(null);

  const transitionDirectionRef =
    useRef<"forward" | "backward" | null>(
      null
    );

  const transitionKindRef =
    useRef<"stage" | "finale" | null>(
      null
    );

  const touchStartYRef =
    useRef(0);

  // Automatic-scroll watchdog. Smooth scrolling does not
  // reliably emit a final scroll event in every browser, so
  // the transition is also checked from requestAnimationFrame.
  const autoScrollRafRef =
    useRef<number | null>(null);

  const autoScrollTimeoutRef =
    useRef<number | null>(null);

  // ---------------------------------------------------------
  // STATE
  // ---------------------------------------------------------

  const [workflowState, setWorkflowState] =
    useState<WorkflowState>(
      INITIAL_STATE
    );

  const [hasEntered, setHasEntered] =
    useState(false);

  /*
   * React state is the source of truth.
   *
   * The ref is only a synchronous mirror so scroll/message
   * handlers always have the latest state.
   */
  stateRef.current = workflowState;

  const {
    activeStage,
    demoProgress,
    isPlaying,
  } = workflowState;

  const currentStage =
    WORKFLOW_STAGES[activeStage];

  const nextStage =
    WORKFLOW_STAGES[activeStage + 1];

  // ---------------------------------------------------------
  // STATE HELPER
  // ---------------------------------------------------------

  const updateState = useCallback(
    (
      updater:
        | Partial<WorkflowState>
        | ((
            previous: WorkflowState
          ) => WorkflowState)
    ) => {
      /*
       * Compute the next state synchronously from the ref so
       * every handler (scroll, message, rAF) sees the newest
       * state immediately, not after React's next render.
       */
      const previous = stateRef.current;

      const next =
        typeof updater === "function"
          ? updater(previous)
          : {
              ...previous,
              ...updater,
            };

      stateRef.current = next;

      setWorkflowState(next);
    },
    []
  );

  // ---------------------------------------------------------
  // SEND MESSAGE TO DEMO
  // ---------------------------------------------------------

  const sendToDemo = useCallback(
    (message: object) => {
      demoFrameRef.current?.contentWindow?.postMessage(
        message,
        window.location.origin
      );
    },
    []
  );

  // ---------------------------------------------------------
  // INVALIDATE CURRENT PLAYBACK
  // ---------------------------------------------------------

  const invalidatePlayback =
    useCallback(() => {
      /*
       * Incrementing this counter invalidates every message
       * belonging to the previous playback session.
       */
      playbackCounterRef.current += 1;

      playbackSessionRef.current = null;

      updateState({
        isPlaying: false,
        currentPlayingClip: null,
      });
    }, [updateState]);

  // ---------------------------------------------------------
  // PAUSE DEMO
  // ---------------------------------------------------------

  const pauseDemo = useCallback(() => {
    invalidatePlayback();

    sendToDemo({
      type: "VISL_WORKFLOW_PAUSE",
    });
  }, [
    invalidatePlayback,
    sendToDemo,
  ]);

  // ---------------------------------------------------------
  // START A STAGE
  // ---------------------------------------------------------

  const startStage = useCallback(
    (stageIndex: number) => {
      const stage =
        WORKFLOW_STAGES[stageIndex];

      if (!stage) {
        return;
      }

      /*
       * Do not restart the exact same stage while its current
       * playback session is already running.
       *
       * This prevents a late scroll/render callback from
       * replaying a stage that has already started.
       */
      const existingSession =
        playbackSessionRef.current;

      /*
       * While an automatic transition is in progress, no other
       * callback is allowed to start a stage.
       */
      if (
        stateRef.current.isTransitioning &&
        targetStageRef.current !== null
      ) {
        return;
      }

      if (
        existingSession &&
        existingSession.stageIndex === stageIndex &&
        existingSession.clip === stage.demoClip
      ) {
        return;
      }

      /*
       * The iframe must be ready before a playback session
       * can actually begin.
       *
       * We still update the active stage immediately.
       * The iframe onLoad handler will start it once ready.
       */
      if (!demoReadyRef.current) {
        updateState({
          activeStage: stageIndex,
          demoProgress: 0,
          isPlaying: false,
          isTransitioning: false,
          targetStage: null,
          currentPlayingClip: null,
        });

        playbackSessionRef.current = null;

        return;
      }

      /*
       * Every actual playback receives a completely unique ID.
       */
      const playbackId =
        ++playbackCounterRef.current;

      const session: PlaybackSession = {
        id: playbackId,
        stageIndex,
        clip: stage.demoClip,
      };

      playbackSessionRef.current =
        session;

      /*
       * Stage 6 has no following node.
       * Its line therefore remains at 100%.
       *
       * Every other stage starts exactly at its own node.
       */
      const startingProgress =
        stageIndex >=
        LAST_STAGE_INDEX
          ? 1
          : stageIndex /
            LAST_STAGE_INDEX;

      updateState({
        activeStage: stageIndex,
        demoProgress: startingProgress,
        isPlaying: true,
        isTransitioning: false,
        targetStage: null,
        currentPlayingClip:
          stage.demoClip,
      });

      sendToDemo({
        type: "VISL_WORKFLOW_PLAY",
        clip: stage.demoClip,
        playbackId,
        stageIndex,
      });
    },
    [
      sendToDemo,
      updateState,
    ]
  );

  // ---------------------------------------------------------
  // STOP AUTOMATIC SCROLL WATCHDOG
  // ---------------------------------------------------------

  const stopAutoScrollWatchdog = useCallback(() => {
    if (autoScrollRafRef.current !== null) {
      window.cancelAnimationFrame(
        autoScrollRafRef.current
      );
      autoScrollRafRef.current = null;
    }

    if (autoScrollTimeoutRef.current !== null) {
      window.clearTimeout(
        autoScrollTimeoutRef.current
      );
      autoScrollTimeoutRef.current = null;
    }
  }, []);

  // ---------------------------------------------------------
  // COMPLETE AUTOMATIC STAGE TRANSITION
  // ---------------------------------------------------------

  const finishStageTransition =
    useCallback(() => {
      const target =
        targetStageRef.current;

      const targetY =
        targetScrollYRef.current;

      stopAutoScrollWatchdog();

      if (target === null) {
        return;
      }

      /*
       * FIX (stage replay bug):
       * The transition is considered "reached" a couple of
       * pixels BEFORE the smooth scroll actually lands. The
       * remaining pixels used to be seen by the manual scroll
       * handler as "the user scrolled back to the previous
       * stage", which restarted that stage. Snap exactly onto
       * the target (cancelling the smooth scroll) first.
       */
      if (
        targetY !== null &&
        Math.abs(window.scrollY - targetY) >
          0.5
      ) {
        window.scrollTo({
          top: targetY,
          behavior:
            "instant" as ScrollBehavior,
        });
      }

      targetStageRef.current = null;
      targetScrollYRef.current = null;
      transitionDirectionRef.current =
        null;
      transitionKindRef.current = null;

      /*
       * IMPORTANT:
       * The next stage becomes active ONLY HERE.
       */
      updateState({
        isTransitioning: false,
        targetStage: null,
      });

      // Consume the automatic destination exactly once.
      if (
        pendingStageRef.current === target
      ) {
        pendingStageRef.current = null;
      }

      startStage(target);
    }, [
      startStage,
      stopAutoScrollWatchdog,
      updateState,
    ]);

  // ---------------------------------------------------------
  // COMPLETE FINALE TRANSITION
  // ---------------------------------------------------------

  const finishFinaleTransition =
    useCallback(() => {
      stopAutoScrollWatchdog();

      targetStageRef.current = null;
      targetScrollYRef.current = null;
      transitionDirectionRef.current =
        null;
      transitionKindRef.current = null;

      updateState({
        isTransitioning: false,
        targetStage: null,
        isPlaying: false,
        currentPlayingClip: null,
      });
    }, [
      stopAutoScrollWatchdog,
      updateState,
    ]);

  // ---------------------------------------------------------
  // BEGIN SCROLL TO STAGE
  // ---------------------------------------------------------

  const scrollToStage = useCallback(
    (
      stageIndex: number,
      isAutomaticTransition = false
    ) => {
      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const clampedIndex =
        Math.max(
          0,
          Math.min(
            stageIndex,
            LAST_STAGE_INDEX
          )
        );

      /*
       * Automatic progression is one-shot. Only the exact stage
       * recorded by the completion handler may consume it.
       */
      if (
        isAutomaticTransition &&
        pendingStageRef.current !==
          clampedIndex
      ) {
        return;
      }

      // Cancel any previous transition watcher before starting
      // a new one. This prevents two transitions racing each other.
      stopAutoScrollWatchdog();

      /*
       * Manual jump:
       * stop the current demo first.
       *
       * Automatic completion:
       * the completed playback has already sent DONE and its
       * session has already been invalidated. Do not send a
       * second PAUSE between stages.
       */
      if (!isAutomaticTransition) {
        pauseDemo();
      }

      const sectionTop =
        section.getBoundingClientRect()
          .top +
        window.scrollY;

      const targetTop =
        sectionTop +
        clampedIndex *
          window.innerHeight;

      const direction =
        targetTop >= window.scrollY
          ? "forward"
          : "backward";

      targetStageRef.current =
        clampedIndex;

      pendingStageRef.current =
        isAutomaticTransition
          ? clampedIndex
          : null;

      targetScrollYRef.current =
        targetTop;

      transitionDirectionRef.current =
        direction;

      transitionKindRef.current =
        "stage";

      updateState({
        isTransitioning: true,
        targetStage: clampedIndex,
        isPlaying: false,
        currentPlayingClip: null,
      });

      const reachedTarget = () => {
  const target = targetScrollYRef.current;
  const direction = transitionDirectionRef.current;

  if (target === null || direction === null) {
    return false;
  }

  const tolerance = 2;

  if (direction === "forward") {
    return window.scrollY >= target - tolerance;
  }

  return window.scrollY <= target + tolerance;
};

      const watchScroll = () => {
        if (!stateRef.current.isTransitioning) {
          autoScrollRafRef.current = null;
          return;
        }

        if (reachedTarget()) {
          autoScrollRafRef.current = null;
          finishStageTransition();
          return;
        }

        autoScrollRafRef.current =
          window.requestAnimationFrame(
            watchScroll
          );
      };

      // If already at the destination, transition immediately.
      if (reachedTarget()) {
        finishStageTransition();
        return;
      }

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      autoScrollRafRef.current =
        window.requestAnimationFrame(
          watchScroll
        );

      // Safety fallback for browsers where smooth scrolling is
      // interrupted and no final position is reported.
      autoScrollTimeoutRef.current =
        window.setTimeout(() => {
          autoScrollTimeoutRef.current =
            null;

          if (
            stateRef.current.isTransitioning &&
            targetStageRef.current ===
              clampedIndex
          ) {
            window.scrollTo({
              top: targetTop,
              behavior: "auto",
            });

            // Give the browser one frame to commit the final
            // position before starting the next demo.
            window.requestAnimationFrame(() => {
              if (
                stateRef.current.isTransitioning &&
                targetStageRef.current ===
                  clampedIndex
              ) {
                stopAutoScrollWatchdog();
                finishStageTransition();
              }
            });
          }
        }, 1400);
    },
    [
      finishStageTransition,
      pauseDemo,
      stopAutoScrollWatchdog,
      updateState,
    ]
  );

  // ---------------------------------------------------------
  // BEGIN FINALE SCROLL
  // ---------------------------------------------------------

  const scrollToFinale = useCallback(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    pauseDemo();

    const sectionTop =
      section.getBoundingClientRect()
        .top +
      window.scrollY;

    /*
     * The section is exactly one viewport per stage, so the
     * last stage sits at the very end of the sticky range.
     * Scrolling to the section's bottom edge brings the next
     * fold to the top of the viewport. Clamp to the maximum
     * scrollable position so we never wait for a position
     * the page cannot reach.
     */
    const maxScrollY =
      Math.max(
        0,
        document.documentElement
          .scrollHeight -
          window.innerHeight
      );

    const finaleTop =
      Math.min(
        sectionTop +
          section.offsetHeight,
        maxScrollY
      );

    targetStageRef.current = null;
    pendingStageRef.current = null;

    targetScrollYRef.current =
      finaleTop;

    transitionDirectionRef.current =
      "forward";

    transitionKindRef.current =
      "finale";

    updateState({
      isTransitioning: true,
      targetStage: null,
      isPlaying: false,
      currentPlayingClip: null,
    });

    if (
      window.scrollY >=
      finaleTop - SCROLL_TOLERANCE_PX
    ) {
      finishFinaleTransition();
      return;
    }

    window.scrollTo({
      top: finaleTop,
      behavior: "smooth",
    });

    // Safety fallback so the scroll lock can never get stuck.
    stopAutoScrollWatchdog();

    autoScrollTimeoutRef.current =
      window.setTimeout(() => {
        autoScrollTimeoutRef.current =
          null;

        if (
          stateRef.current
            .isTransitioning &&
          transitionKindRef.current ===
            "finale"
        ) {
          finishFinaleTransition();
        }
      }, 2500);
  }, [
    finishFinaleTransition,
    pauseDemo,
    stopAutoScrollWatchdog,
    updateState,
  ]);

  // ---------------------------------------------------------
  // PRELOAD IFRAME
  // ---------------------------------------------------------

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: "700px 0px",
          threshold: 0,
        }
      );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ---------------------------------------------------------
  // SCROLL HANDLER
  // ---------------------------------------------------------

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateWorkflow = () => {
      ticking = false;

      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const current =
        stateRef.current;

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        Math.max(
          window.innerHeight,
          1
        );

      const isSectionVisible =
        rect.bottom > 0 &&
        rect.top < viewportHeight;

      /*
       * Completely outside the workflow.
       */
      if (
        !isSectionVisible &&
        workflowStartedRef.current
      ) {
        workflowStartedRef.current =
          false;

        targetStageRef.current = null;
        pendingStageRef.current = null;
        targetScrollYRef.current = null;
        transitionDirectionRef.current =
          null;
        transitionKindRef.current = null;

        pauseDemo();

        updateState({
          isTransitioning: false,
          targetStage: null,
          isPlaying: false,
          currentPlayingClip: null,
        });

        return;
      }

      /*
       * -----------------------------------------------------
       * AUTOMATIC TRANSITION
       * -----------------------------------------------------
       *
       * While this is true, scroll position is NOT allowed
       * to change activeStage.
       *
       * We only watch until the browser reaches the exact
       * target side of the target scroll position.
       */
      if (
        current.isTransitioning &&
        targetScrollYRef.current !== null
      ) {
        const targetY =
          targetScrollYRef.current;

        const direction =
          transitionDirectionRef.current;

        const reached =
          direction === "forward"
            ? window.scrollY >=
              targetY -
                SCROLL_TOLERANCE_PX
            : window.scrollY <=
              targetY +
                SCROLL_TOLERANCE_PX;

        if (reached) {
          if (
            transitionKindRef.current ===
            "stage"
          ) {
            finishStageTransition();
          } else if (
            transitionKindRef.current ===
            "finale"
          ) {
            finishFinaleTransition();
          }
        }

        return;
      }

      /*
       * -----------------------------------------------------
       * INITIAL WORKFLOW ENTRY
       * -----------------------------------------------------
       */

      if (
        rect.top <= 0 &&
        isSectionVisible &&
        !workflowStartedRef.current
      ) {
        workflowStartedRef.current =
          true;

        const sectionTop =
          rect.top +
          window.scrollY;

        const relativePosition =
          Math.max(
            0,
            (window.scrollY -
              sectionTop +
              SCROLL_TOLERANCE_PX) /
              viewportHeight
          );

        const initialStage =
          Math.max(
            0,
            Math.min(
              LAST_STAGE_INDEX,
              Math.floor(
                relativePosition
              )
            )
          );

        startStage(initialStage);

        return;
      }

      /*
       * -----------------------------------------------------
       * MANUAL SCROLLING
       * -----------------------------------------------------
       *
       * This is ONLY used when the user manually moves
       * between already-existing stage positions.
       *
       * It never runs during an automatic forward transition.
       */
      if (
        workflowStartedRef.current &&
        !current.isTransitioning
      ) {
        const sectionTop =
          rect.top +
          window.scrollY;

        /*
         * Tolerance: being 1-2px short of a stage boundary
         * (smooth-scroll tail, sub-pixel rounding) must NOT
         * count as being in the previous stage.
         */
        const relativePosition =
          Math.max(
            0,
            Math.min(
              LAST_STAGE_INDEX,
              (window.scrollY -
                sectionTop +
                SCROLL_TOLERANCE_PX) /
                viewportHeight
            )
          );

        const manuallyReachedStage =
          Math.floor(
            relativePosition
          );

        /*
         * Only react when the user has actually crossed
         * a stage boundary.
         */
        if (
          manuallyReachedStage !==
            current.activeStage &&
          manuallyReachedStage >= 0 &&
          manuallyReachedStage <=
            LAST_STAGE_INDEX
        ) {
          startStage(
            manuallyReachedStage
          );
        }
      }
    };

    const handleScrollOrResize =
      () => {
        if (ticking) {
          return;
        }

        ticking = true;

        frameId =
          window.requestAnimationFrame(
            updateWorkflow
          );
      };

    updateWorkflow();

    window.addEventListener(
      "scroll",
      handleScrollOrResize,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleScrollOrResize
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScrollOrResize
      );

      window.removeEventListener(
        "resize",
        handleScrollOrResize
      );

      if (frameId) {
        window.cancelAnimationFrame(
          frameId
        );
      }
    };
  }, [
    finishFinaleTransition,
    finishStageTransition,
    pauseDemo,
    startStage,
    updateState,
  ]);

  // ---------------------------------------------------------
  // IFRAME MESSAGES
  // ---------------------------------------------------------

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent
    ) => {
      /*
       * Only accept messages from our own iframe.
       */
      if (
        event.origin !==
        window.location.origin
      ) {
        return;
      }

      if (
        event.source !==
        demoFrameRef.current
          ?.contentWindow
      ) {
        return;
      }

      const data = event.data;

      if (!data) {
        return;
      }

      const current =
        stateRef.current;

      const session =
        playbackSessionRef.current;

      // -----------------------------------------------------
      // DEMO PROGRESS
      // -----------------------------------------------------

      if (
        data.type ===
        "VISL_WORKFLOW_PROGRESS"
      ) {
        /*
         * A progress message MUST belong to the current
         * playback session.
         */
        if (!session) {
          return;
        }

        if (
          data.playbackId !==
          session.id
        ) {
          return;
        }

        if (
          data.clip !==
          session.clip
        ) {
          return;
        }

        if (
          Number(data.stageIndex) !==
          session.stageIndex
        ) {
          return;
        }

        if (!current.isPlaying) {
          return;
        }

        const rawProgress =
          Number(data.progress);

        if (
          !Number.isFinite(
            rawProgress
          )
        ) {
          return;
        }

        /*
         * HARD CLAMP:
         *
         * 0 <= stageProgress <= 1
         */
        // Do not allow the live progress event to reach the next
        // node. Only VISL_WORKFLOW_DONE is allowed to place the
        // line exactly on that node.
        const stageProgress =
          Math.max(
            0,
            Math.min(
              0.999,
              rawProgress
            )
          );

        const stageIndex =
          session.stageIndex;

        /*
         * Stage 6 has no next node.
         * It therefore remains at 100%.
         */
        if (
          stageIndex >=
          LAST_STAGE_INDEX
        ) {
          updateState({
            demoProgress: 1,
          });

          return;
        }

        /*
         * Map ONLY between the current node and
         * the next node.
         *
         * Example:
         *
         * Stage 3:
         * start = 3 / 5 = 60%
         * end   = 4 / 5 = 80%
         *
         * progress 0   → 60%
         * progress .5  → 70%
         * progress 1   → 80%
         */
        const currentNodeProgress =
          stageIndex /
          LAST_STAGE_INDEX;

        const nextNodeProgress =
          (stageIndex + 1) /
          LAST_STAGE_INDEX;

        const timelineProgress =
          currentNodeProgress +
          stageProgress *
            (
              nextNodeProgress -
              currentNodeProgress
            );

        /*
         * SECOND HARD CLAMP:
         *
         * The line physically cannot go beyond
         * the next node.
         */
        const safeTimelineProgress =
          Math.max(
            currentNodeProgress,
            Math.min(
              nextNodeProgress,
              timelineProgress
            )
          );

        updateState({
          demoProgress:
            safeTimelineProgress,
        });

        return;
      }

      // -----------------------------------------------------
      // DEMO COMPLETION
      // -----------------------------------------------------

      if (
        data.type !==
        "VISL_WORKFLOW_DONE"
      ) {
        return;
      }

      /*
       * Completion MUST belong to the current playback.
       */
      if (!session) {
        return;
      }

      if (
        data.playbackId !==
        session.id
      ) {
        return;
      }

      if (
        data.clip !==
        session.clip
      ) {
        return;
      }

      if (
        Number(data.stageIndex) !==
        session.stageIndex
      ) {
        return;
      }

      if (!current.isPlaying) {
        return;
      }

      /*
       * Invalidate the completed playback immediately.
       *
       * This prevents a duplicate DONE event from
       * triggering another transition.
       */
      playbackSessionRef.current =
        null;

      /*
       * Stage N is now EXACTLY complete.
       */
      const finishedStage =
        session.stageIndex;

      const nextIndex =
        finishedStage + 1;

      if (
        finishedStage >=
        LAST_STAGE_INDEX
      ) {
        /*
         * Stage 6:
         * line is already exactly at 100%.
         */
        updateState({
          demoProgress: 1,
          isPlaying: false,
          currentPlayingClip: null,
        });

        /*
         * Wait for the next browser frame so the
         * 100% timeline value is rendered before
         * beginning the finale scroll.
         */
        window.requestAnimationFrame(
          () => {
            scrollToFinale();
          }
        );

        return;
      }

      /*
       * EXACTLY the next node.
       *
       * There is no overshoot.
       */
      const nextNodeProgress =
        nextIndex /
        LAST_STAGE_INDEX;

      updateState({
        demoProgress:
          nextNodeProgress,
        isPlaying: false,
        currentPlayingClip: null,
      });

      /*
       * The next browser frame is deterministic:
       *
       * render exact node position
       *        ↓
       * begin automatic scroll
       */
      // Record the exact next stage before the automatic
      // scroll begins. No other callback may consume it.
      pendingStageRef.current =
        nextIndex;

      window.requestAnimationFrame(
        () => {
          scrollToStage(
            nextIndex,
            true
          );
        }
      );
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );
    };
  }, [
    scrollToFinale,
    scrollToStage,
    updateState,
  ]);

  // ---------------------------------------------------------
  // IFRAME LOAD
  // ---------------------------------------------------------

  const handleDemoLoad =
    useCallback(() => {
      demoReadyRef.current = true;

      const current =
        stateRef.current;

      /*
       * If the workflow already reached a stage before
       * the iframe finished loading, start that stage now.
       */
      if (
        workflowStartedRef.current &&
        !current.isTransitioning
      ) {
        startStage(
          current.activeStage
        );
      }
    }, [startStage]);

  // ---------------------------------------------------------
  // WHEEL / TOUCH CONTROL
  // ---------------------------------------------------------

  useEffect(() => {
    const handleWheel = (
      event: WheelEvent
    ) => {
      const current =
        stateRef.current;

      /*
       * While a demo is playing OR an automatic transition
       * is occurring, downward scrolling is locked.
       *
       * Upward scrolling remains available for revisiting
       * previous stages.
       */
      if (
        event.deltaY > 0 &&
        (
          current.isPlaying ||
          current.isTransitioning
        )
      ) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (
      event: TouchEvent
    ) => {
      touchStartYRef.current =
        event.touches[0]?.clientY ??
        0;
    };

    const handleTouchMove = (
      event: TouchEvent
    ) => {
      const current =
        stateRef.current;

      if (
        !current.isPlaying &&
        !current.isTransitioning
      ) {
        return;
      }

      const currentY =
        event.touches[0]?.clientY ??
        0;

      /*
       * Finger moving upward means page moving downward.
       */
      const movingDownPage =
        touchStartYRef.current >
        currentY;

      if (movingDownPage) {
        event.preventDefault();
      }
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: false,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );
    };
  }, []);

  // ---------------------------------------------------------
  // GLOBAL CLEANUP
  // ---------------------------------------------------------

  useEffect(() => {
    return () => {
      stopAutoScrollWatchdog();
      playbackSessionRef.current = null;
    };
  }, [stopAutoScrollWatchdog]);

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <section
      ref={sectionRef}
      className="workflow-section"
      id="vivi-workflow"
      style={{
        scrollMarginTop: "88px",
      }}
    >
      <div className="workflow-sticky">
        <div className="workflow-background-glow" />

        <div className="workflow-container">

          {/* -----------------------------------------------
              HEADER
          ----------------------------------------------- */}

          <header className="workflow-header">
            <div className="workflow-kicker">
              <span className="workflow-kicker-dot" />

              <span className="workflow-kicker-brand">
                VISL STUDIO
              </span>

              <span className="workflow-kicker-title">
                How your story comes to life
              </span>
            </div>

            <div
              className="workflow-counter"
              aria-live="polite"
            >
              <strong>
                {currentStage.number}
              </strong>

              <span>/</span>

              <span>06</span>
            </div>
          </header>

          {/* -----------------------------------------------
              MAIN EXPERIENCE
          ----------------------------------------------- */}

          <div className="workflow-experience">

            {/* ---------------------------------------------
                TIMELINE
            --------------------------------------------- */}

            <nav
              className="workflow-journey"
              aria-label="Video creation stages"
            >
              <div className="workflow-vertical-track">

                <div className="workflow-vertical-line" />

                {/*
                 * IMPORTANT:
                 *
                 * This height is controlled ONLY by the
                 * actual iframe demo progress.
                 */}
                <div
                  className="workflow-vertical-progress"
                  style={{
                    transform: `scaleY(${demoProgress})`,
                  }}
                />

                <div className="workflow-nodes">
                  {WORKFLOW_STAGES.map(
                    (
                      stage,
                      index
                    ) => {
                      const isActive =
                        index ===
                        activeStage;

                      const isCompleted =
                        index <
                        activeStage;

                      return (
                        <button
                          key={stage.id}
                          type="button"
                          className={[
                            "workflow-node",
                            isActive
                              ? "is-active"
                              : "",
                            isCompleted
                              ? "is-completed"
                              : "",
                          ].join(" ")}
                          aria-current={
                            isActive
                              ? "step"
                              : undefined
                          }
                          aria-label={`Go to stage ${stage.number}: ${stage.title}`}
                          onClick={() =>
                            scrollToStage(
                              index
                            )
                          }
                        >
                          <span className="workflow-node-circle">
                            {isCompleted
                              ? "✓"
                              : stage.number}
                          </span>

                          <span className="workflow-node-label">
                            {stage.title}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </nav>

            {/* ---------------------------------------------
                STAGE CARD
            --------------------------------------------- */}

            <div
              className="workflow-stage-info"
              aria-live="polite"
            >
              <article
                className="workflow-stage-card"
                key={currentStage.id}
              >
                <div className="workflow-stage-number">
                  {currentStage.number}
                </div>

                <div className="workflow-eyebrow">
                  {currentStage.eyebrow}
                </div>

                <h2>
                  {currentStage.headline}
                </h2>

                <p>
                  {currentStage.description}
                </p>

                <div className="workflow-divider" />

                <div className="workflow-next">
                  <span>
                    {nextStage
                      ? `Next: ${nextStage.title}`
                      : "Journey complete"}
                  </span>

                  <span
                    className="workflow-next-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </article>
            </div>

            {/* ---------------------------------------------
                DEMO
            --------------------------------------------- */}

            <div className="workflow-demo">
              <div className="workflow-demo-heading">
                <span>
                  LIVE PRODUCT WALKTHROUGH
                </span>

                <span>
                  {currentStage.number} / 06
                </span>
              </div>

              <div className="workflow-demo-frame">
                {hasEntered && (
                  <iframe
                    ref={demoFrameRef}
                    title="Visl live product walkthrough"
                    src="/workflow-demo.html?clip=prompt&embed=1"
                    loading="eager"
                    allow="autoplay; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={
                      handleDemoLoad
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              SCROLL HINT
          ----------------------------------------------- */}

          <div
            className={`workflow-scroll-hint ${
              activeStage > 0
                ? "is-fading"
                : ""
            }`}
          >
            <span className="workflow-scroll-mouse">
              <span />
            </span>

            <span>
              {isPlaying
                ? "Watch the demo to continue"
                : "Scroll to explore"}
            </span>
          </div>
        </div>
      </div>


    </section>
  );
}