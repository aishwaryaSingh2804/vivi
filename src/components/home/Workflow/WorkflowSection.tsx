
// src/components/home/Workflow/WorkflowSection.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import "./WorkflowSection.css";
import { WORKFLOW_STAGES } from "./workflowData";

const PUBLISH_STAGE_INDEX = WORKFLOW_STAGES.length - 1;
const WALKTHROUGH_VIEWPORTS = WORKFLOW_STAGES.length + 1;

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const demoFrameRef = useRef<HTMLIFrameElement | null>(null);

  const demoReadyRef = useRef(false);
  const firstStageStartedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const lastClipRef = useRef<string | null>(null);
  const touchStartYRef = useRef(0);

  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStage = WORKFLOW_STAGES[activeStage];
  const nextStage = WORKFLOW_STAGES[activeStage + 1];

  const setPlaybackState = useCallback((playing: boolean) => {
    isPlayingRef.current = playing;
    setIsPlaying(playing);
  }, []);

  const sendToDemo = useCallback((message: object) => {
    demoFrameRef.current?.contentWindow?.postMessage(
      message,
      window.location.origin
    );
  }, []);

  const pauseDemo = useCallback(() => {
    if (!demoReadyRef.current) return;

    sendToDemo({ type: "VIVI_WORKFLOW_PAUSE" });
    setPlaybackState(false);
  }, [sendToDemo, setPlaybackState]);

  const playStage = useCallback(
    (stageIndex: number) => {
      if (!demoReadyRef.current) return;

      const stage = WORKFLOW_STAGES[stageIndex];
      if (!stage) return;

      setPlaybackState(true);
      lastClipRef.current = stage.demoClip;

      sendToDemo({
        type: "VIVI_WORKFLOW_PLAY",
        clip: stage.demoClip,
      });
    },
    [sendToDemo, setPlaybackState]
  );

  // Preload the iframe as the user approaches the workflow section.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
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

    return () => observer.disconnect();
  }, []);

  // Track scroll position and determine the current stage.
  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateWorkflow = () => {
      const section = sectionRef.current;

      if (!section) {
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);

      const isSectionVisible =
        rect.bottom > 0 && rect.top < viewportHeight;

      // If the user leaves the workflow section, pause the demo.
      if (!isSectionVisible && firstStageStartedRef.current) {
        firstStageStartedRef.current = false;
        lastClipRef.current = null;
        pauseDemo();
      }

      const rawTravel = -rect.top;
      const stageTravel = Math.max(0, rawTravel);
      const totalStageTravel = viewportHeight * WALKTHROUGH_VIEWPORTS;
      const clampedTravel = Math.min(stageTravel, totalStageTravel);

      const nextStageIndex = Math.min(
        PUBLISH_STAGE_INDEX,
        Math.floor(clampedTravel / viewportHeight)
      );

      const publishStartsAt = viewportHeight * PUBLISH_STAGE_INDEX;

      const nextProgress = Math.min(
        clampedTravel / Math.max(publishStartsAt, 1),
        1
      );

      setProgress(nextProgress);
      setActiveStage(nextStageIndex);

      // The first clip starts only when the workflow reaches
      // its actual starting position.
      if (
        rect.top <= 0 &&
        isSectionVisible &&
        !firstStageStartedRef.current
      ) {
        firstStageStartedRef.current = true;

        if (demoReadyRef.current) {
          playStage(nextStageIndex);
        }
      }

      ticking = false;
    };

    const handleScrollOrResize = () => {
      if (ticking) return;

      ticking = true;
      frameId = window.requestAnimationFrame(updateWorkflow);
    };

    updateWorkflow();

    window.addEventListener("scroll", handleScrollOrResize, {
      passive: true,
    });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pauseDemo, playStage]);

  // Start the appropriate clip whenever the active stage changes.
  // This also restarts a stage when the user scrolls back to it.
  useEffect(() => {
    if (!firstStageStartedRef.current || !demoReadyRef.current) return;

    const clip = currentStage.demoClip;

    if (lastClipRef.current === clip) return;

    playStage(activeStage);
  }, [activeStage, currentStage.demoClip, playStage]);

  // Listen for playback completion from the iframe.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== demoFrameRef.current?.contentWindow) return;

      if (event.data?.type === "VIVI_WORKFLOW_DONE") {
        setPlaybackState(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setPlaybackState]);

  // Prevent scrolling down while a stage demo is playing.
  // Scrolling upwards is always allowed.
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isPlayingRef.current && event.deltaY > 0) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isPlayingRef.current) return;

      const currentY = event.touches[0]?.clientY ?? 0;
      const movingDownPage = touchStartYRef.current > currentY;

      if (movingDownPage) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="workflow-section"
      id="vivi-workflow"
      style={{ scrollMarginTop: "88px" }}
    >
      <div className="workflow-sticky">
        <div className="workflow-background-glow" />

        <div className="workflow-container">
          <header className="workflow-header">
            <div className="workflow-kicker">
              <span className="workflow-kicker-dot" />
              <span className="workflow-kicker-brand">VIVI STUDIO</span>
              <span className="workflow-kicker-title">
                How your story comes to life
              </span>
            </div>

            <div className="workflow-counter" aria-live="polite">
              <strong>{currentStage.number}</strong>
              <span>/</span>
              <span>06</span>
            </div>
          </header>

          <div className="workflow-experience">
            <nav
              className="workflow-journey"
              aria-label="Video creation stages"
            >
              <div className="workflow-vertical-track">
                <div className="workflow-vertical-line" />

                <div
                  className="workflow-vertical-progress"
                  style={{ height: `${progress * 100}%` }}
                />

                <div className="workflow-nodes">
                  {WORKFLOW_STAGES.map((stage, index) => {
                    const isActive = index === activeStage;
                    const isCompleted = index < activeStage;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "workflow-node",
                          isActive ? "is-active" : "",
                          isCompleted ? "is-completed" : "",
                        ].join(" ")}
                        aria-current={isActive ? "step" : undefined}
                      >
                        <span className="workflow-node-circle">
                          {isCompleted ? "✓" : stage.number}
                        </span>

                        <span className="workflow-node-label">
                          {stage.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </nav>

            <div className="workflow-stage-info" aria-live="polite">
              <article className="workflow-stage-card" key={currentStage.id}>
                <div className="workflow-stage-number">
                  {currentStage.number}
                </div>

                <div className="workflow-eyebrow">
                  {currentStage.eyebrow}
                </div>

                <h2>{currentStage.headline}</h2>

                <p>{currentStage.description}</p>

                <div className="workflow-divider" />

                <div className="workflow-next">
                  <span>
                    {nextStage
                      ? `Next: ${nextStage.title}`
                      : "Journey complete"}
                  </span>

                  <span className="workflow-next-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </article>
            </div>

            <div className="workflow-demo">
              <div className="workflow-demo-heading">
                <span>LIVE PRODUCT WALKTHROUGH</span>
                <span>{currentStage.number} / 06</span>
              </div>

              <div className="workflow-demo-frame">
                {hasEntered && (
                  <iframe
                    ref={demoFrameRef}
                    title="Vivi live product walkthrough"
                    src="/workflow-demo.html?clip=prompt&embed=1"
                    loading="eager"
                    allow="autoplay; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => {
                      demoReadyRef.current = true;

                      if (firstStageStartedRef.current) {
                        playStage(activeStage);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className={`workflow-scroll-hint ${
              activeStage > 0 ? "is-fading" : ""
            }`}
          >
            <span className="workflow-scroll-mouse">
              <span />
            </span>

            <span>
              {isPlaying ? "Watch the demo to continue" : "Scroll to explore"}
            </span>
          </div>
        </div>
      </div>

      <div className="workflow-finale">
        <div className="workflow-finale-line" />

        <div className="workflow-finale-kicker">
          <span /> JOURNEY COMPLETE
        </div>

        <h2>
          Your idea made
          <br />
          <span>it to the screen.</span>
        </h2>

        <p>One idea. Six stages. One finished story.</p>

        <a href="/studio" className="workflow-cta">
          <span>Start creating</span>
          <span className="workflow-cta-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
