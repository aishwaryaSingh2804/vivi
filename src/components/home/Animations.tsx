import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import "./Animations.css";

/* =========================================================
   VIDEO DATA

   Put your videos in:

   public/videos/

   Then list their filenames here.
========================================================= */

interface VideoProduction {
  id: string;
  category: string;
  title: string;
  description: string;
  video: string;
  prompt: string;
  meta: string;
}

const VIDEO_PRODUCTIONS: VideoProduction[] = [
  {
    id: "microdrama",
    category: "MICRODRAMA",
    title: "The Session",
    description:
      "A therapist's session takes an unexpected turn when her patient starts describing details from her private life.",
    video: "/videos/microdrama.mp4",
    prompt:
      "Create a cinematic psychological microdrama about a therapist whose patient begins describing events from her private life that no one else could know. Build slowly escalating tension through realistic dialogue, subtle visual details, and a twist ending.",
    meta: "Microdrama · Psychological",
  },

  {
    id: "history",
    category: "HISTORY · INDIA",
    title: "The Kakori Conspiracy",
    description:
      "A cinematic historical story following revolutionaries planning the Kakori train action in 1925.",
    video: "/videos/history.mp4",
    prompt:
      "Create a cinematic historical short film about the Kakori train action of 1925. Follow the revolutionaries as they plan the operation, prepare for the train robbery, and face the consequences. Use historically inspired environments, dramatic lighting, realistic costumes, emotional character moments, and an epic cinematic atmosphere.",
    meta: "History · India",
  },

  {
    id: "kids",
    category: "KIDS",
    title: "Grandpa's Telescope",
    description:
      "A young boy discovers his late grandfather's telescope and follows a trail of handwritten clues.",
    video: "/videos/kids.mp4",
    prompt:
      "Create a warm animated children's story about a young boy who discovers his late grandfather's old telescope. Guided by handwritten notes, he learns about the planets and races to complete his grandfather's final astronomy challenge. Make it magical, colorful, emotional, and suitable for children.",
    meta: "Kids · Adventure",
  },

  {
    id: "india",
    category: "INDIA",
    title: "Stories from India",
    description:
      "A cinematic story rooted in Indian streets, people, memories, and everyday life.",
    video: "/videos/india.mp4",
    prompt:
      "Create a cinematic story set in India about a young woman returning to her hometown after many years away. Show the streets, people, architecture, food, colors, and atmosphere of the city as she reconnects with an important childhood memory. Make it visually rich, emotional, intimate, and cinematic.",
    meta: "India · Cinematic",
  },

  {
    id: "shortfilm",
    category: "SHORT FILM",
    title: "The Last Message",
    description:
      "A mysterious message sends a stranger on a journey to uncover a forgotten connection.",
    video: "/videos/shortfilm.mp4",
    prompt:
      "Create a cinematic short film about a person who receives a mysterious message from someone who should no longer be able to contact them. Follow their journey as they investigate the message and uncover a hidden connection to their past. Build suspense gradually and end with an emotional reveal.",
    meta: "Short Film · Mystery",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

function Animations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const wheelLocked = useRef(false);
  const transitionTimer = useRef<number | null>(null);
  const autoplayTimer = useRef<number | null>(null);

  const activeVideo =
    VIDEO_PRODUCTIONS[activeIndex];

  const previousIndex =
    (activeIndex -
      1 +
      VIDEO_PRODUCTIONS.length) %
    VIDEO_PRODUCTIONS.length;

  const nextIndex =
    (activeIndex + 1) %
    VIDEO_PRODUCTIONS.length;


  /* =========================================================
     CHANGE VIDEO
  ========================================================= */

  const changeVideo = useCallback(
    (direction: "next" | "previous") => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      setActiveIndex((current) => {
        if (direction === "next") {
          return (
            (current + 1) %
            VIDEO_PRODUCTIONS.length
          );
        }

        return (
          (current -
            1 +
            VIDEO_PRODUCTIONS.length) %
          VIDEO_PRODUCTIONS.length
        );
      });

      setProgressKey((value) => value + 1);

      if (transitionTimer.current) {
        window.clearTimeout(
          transitionTimer.current
        );
      }

      transitionTimer.current =
        window.setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
    },
    [isTransitioning]
  );


  /* =========================================================
     DIRECT NAVIGATION
  ========================================================= */

  const goToVideo = useCallback(
    (index: number) => {
      if (
        index === activeIndex ||
        isTransitioning
      ) {
        return;
      }

      setIsTransitioning(true);
      setActiveIndex(index);
      setProgressKey((value) => value + 1);

      if (transitionTimer.current) {
        window.clearTimeout(
          transitionTimer.current
        );
      }

      transitionTimer.current =
        window.setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
    },
    [activeIndex, isTransitioning]
  );


  /* =========================================================
     AUTOPLAY
     
     Every 6 seconds:
     
     01 → 02 → 03 → 04 → 05 → 01
     
     Pauses when user hovers over showcase.
  ========================================================= */

  useEffect(() => {
    if (isPaused) return;

    autoplayTimer.current =
      window.setTimeout(() => {
        changeVideo("next");
      }, 6000);

    return () => {
      if (autoplayTimer.current) {
        window.clearTimeout(
          autoplayTimer.current
        );
      }
    };
  }, [
    activeIndex,
    isPaused,
    changeVideo,
  ]);


  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(
          transitionTimer.current
        );
      }

      if (autoplayTimer.current) {
        window.clearTimeout(
          autoplayTimer.current
        );
      }
    };
  }, []);


  /* =========================================================
     PLAY ACTIVE VIDEO
     
     Whenever activeIndex changes, explicitly restart
     the active video from the beginning.
  ========================================================= */

  useEffect(() => {
    const video = document.querySelector(
      ".vivi-video-card-current video"
    ) as HTMLVideoElement | null;

    if (!video) return;

    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser may block autoplay.
        // The video is muted, so this normally succeeds.
      }
    };

    playVideo();
  }, [activeIndex]);


  /* =========================================================
     PRELOAD NEIGHBOURING VIDEOS
  ========================================================= */

  useEffect(() => {
    const preloadVideos = [
      VIDEO_PRODUCTIONS[previousIndex].video,
      VIDEO_PRODUCTIONS[nextIndex].video,
    ];

    preloadVideos.forEach((src) => {
      const video = document.createElement(
        "video"
      );

      video.preload = "auto";
      video.src = src;
    });
  }, [
    previousIndex,
    nextIndex,
  ]);


  /* =========================================================
     MOUSE WHEEL
  ========================================================= */

  const handleWheel = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    if (wheelLocked.current) return;

    if (Math.abs(event.deltaY) < 20) {
      return;
    }

    wheelLocked.current = true;

    if (event.deltaY > 0) {
      changeVideo("next");
    } else {
      changeVideo("previous");
    }

    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 800);
  };


  /* =========================================================
     KEYBOARD
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement;

      /*
       * Don't hijack keyboard navigation while
       * someone is typing in an input.
       */
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        changeVideo("next");
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        changeVideo("previous");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [changeVideo]);


  /* =========================================================
     TOUCH / SWIPE
  ========================================================= */

  const touchStartY =
    useRef<number | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    touchStartY.current =
      event.touches[0].clientY;
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (
      touchStartY.current === null
    ) {
      return;
    }

    const endY =
      event.changedTouches[0].clientY;

    const distance =
      touchStartY.current - endY;

    touchStartY.current = null;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {
      changeVideo("next");
    } else {
      changeVideo("previous");
    }
  };


  /* =========================================================
     START CREATING
     
     The CURRENT video's prompt is passed into Studio.
  ========================================================= */

  const startCreating = () => {
    const encodedPrompt =
      encodeURIComponent(
        activeVideo.prompt
      );

    window.location.hash =
      `#page-studio?prompt=${encodedPrompt}`;
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="vivi-openart-showcase"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="vivi-showcase-header">
        <div>
          <div className="vivi-showcase-overline">
            MADE WITH VIVI
          </div>

          <h2>
            One platform.
            <br />
            <span>
              Every kind of story.
            </span>
          </h2>

          <p>
            Explore what creators can make
            with Vivi. Scroll through the
            productions and start with any
            story that inspires you.
          </p>
        </div>
      </div>


      {/* =====================================================
          MAIN EXPERIENCE
      ===================================================== */}

      <div className="vivi-showcase">

        {/* ===================================================
            VIDEO SIDE
        =================================================== */}

        <div className="vivi-showcase-stage">

          {/* -----------------------------------------------
              PREVIOUS ARROW
          ------------------------------------------------ */}

          <button
            type="button"
            className="vivi-stage-arrow vivi-stage-arrow-up"
            onClick={() =>
              changeVideo("previous")
            }
            aria-label="Previous video"
          >
            <span>↑</span>
          </button>


          {/* -----------------------------------------------
              VIDEO STACK
          ------------------------------------------------ */}

          <div
            className={`vivi-video-stack ${
              isTransitioning
                ? "is-transitioning"
                : ""
            }`}
          >

            {/* -------------------------------------------
                PREVIOUS VIDEO
            -------------------------------------------- */}

            <div className="vivi-video-card vivi-video-card-previous">
              <video
                src={
                  VIDEO_PRODUCTIONS[
                    previousIndex
                  ].video
                }
                muted
                playsInline
                preload="auto"
              />

              <div className="vivi-video-card-glass" />
            </div>


            {/* -------------------------------------------
                CURRENT VIDEO
            -------------------------------------------- */}

            <div className="vivi-video-card vivi-video-card-current">

              <video
                key={activeVideo.id}
                src={activeVideo.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />

              <div className="vivi-video-overlay" />


              {/* TOP */}

              <div className="vivi-video-top">

                <span className="vivi-video-badge">
                  EXAMPLE
                </span>

                <span className="vivi-video-number">
                  {String(
                    activeIndex + 1
                  ).padStart(2, "0")}
                </span>

              </div>


              {/* BOTTOM */}

              <div className="vivi-video-bottom">

                <div>
                  <span>
                    {activeVideo.category}
                  </span>

                  <strong>
                    {activeVideo.title}
                  </strong>
                </div>

              </div>

            </div>


            {/* -------------------------------------------
                NEXT VIDEO
            -------------------------------------------- */}

            <div className="vivi-video-card vivi-video-card-next">

              <video
                src={
                  VIDEO_PRODUCTIONS[
                    nextIndex
                  ].video
                }
                muted
                playsInline
                preload="auto"
              />

              <div className="vivi-video-card-glass" />

            </div>

          </div>


          {/* -----------------------------------------------
              NEXT ARROW
          ------------------------------------------------ */}

          <button
            type="button"
            className="vivi-stage-arrow vivi-stage-arrow-down"
            onClick={() =>
              changeVideo("next")
            }
            aria-label="Next video"
          >
            <span>↓</span>
          </button>


          {/* -----------------------------------------------
              AUTOPLAY STATUS
          ------------------------------------------------ */}

          <div className="vivi-autoplay-indicator">

            <span
              className={
                isPaused
                  ? "vivi-autoplay-dot paused"
                  : "vivi-autoplay-dot"
              }
            />

            <span>
              {isPaused
                ? "Paused"
                : "Auto playing"}
            </span>

          </div>


          {/* -----------------------------------------------
              DOTS
          ------------------------------------------------ */}

          <div className="vivi-showcase-dots">

            {VIDEO_PRODUCTIONS.map(
              (video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={
                    index === activeIndex
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    goToVideo(index)
                  }
                  aria-label={`Show ${video.title}`}
                  aria-current={
                    index === activeIndex
                      ? "true"
                      : undefined
                  }
                />
              )
            )}

          </div>


          {/* -----------------------------------------------
              PROGRESS
          ------------------------------------------------ */}

          <div className="vivi-showcase-progress">

            <div
              key={progressKey}
              className={
                isPaused
                  ? "vivi-showcase-progress-fill paused"
                  : "vivi-showcase-progress-fill"
              }
            />

          </div>

        </div>


        {/* ===================================================
            INFORMATION PANEL
        =================================================== */}

        <aside className="vivi-showcase-panel">

          <div className="vivi-panel-top">

            <span className="vivi-panel-eyebrow">
              {activeVideo.category}
            </span>

            <h3>
              {activeVideo.title}
            </h3>

            <p>
              {activeVideo.description}
            </p>

          </div>


          {/* -----------------------------------------------
              PROMPT
          ------------------------------------------------ */}

          <div className="vivi-prompt-card">

            <div className="vivi-prompt-header">

              <span className="vivi-prompt-icon">
                ✦
              </span>

              <span>
                CREATE THIS WITH VIVI
              </span>

            </div>

            <p>
              {activeVideo.prompt}
            </p>

          </div>


          {/* -----------------------------------------------
              META
          ------------------------------------------------ */}

          <div className="vivi-production-meta">

            <span>
              {activeVideo.meta}
            </span>

            <span className="vivi-meta-dot">
              •
            </span>

            <span>
              AI generated
            </span>

          </div>


          {/* -----------------------------------------------
              CTA
          ------------------------------------------------ */}

          <button
            type="button"
            className="vivi-create-button"
            onClick={startCreating}
          >

            <span>
              Start creating
            </span>

            <span className="vivi-create-arrow">
              →
            </span>

          </button>


          <span className="vivi-create-hint">
            The prompt will open in Vivi Studio.
          </span>


          {/* -----------------------------------------------
              PANEL FOOTER
          ------------------------------------------------ */}

          <div className="vivi-panel-footer">

            <span>
              {String(
                activeIndex + 1
              ).padStart(2, "0")}
            </span>

            <div />

            <span>
              {String(
                VIDEO_PRODUCTIONS.length
              ).padStart(2, "0")}
            </span>

          </div>

        </aside>

      </div>


      {/* =====================================================
          BOTTOM CATEGORY STRIP
      ===================================================== */}

      <div className="vivi-showcase-categories">

        {VIDEO_PRODUCTIONS.map(
          (video, index) => (
            <button
              key={video.id}
              type="button"
              className={
                index === activeIndex
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToVideo(index)
              }
            >

              <span>
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

              <strong>
                {video.category}
              </strong>

              <em>
                {video.title}
              </em>

            </button>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   MOUNT HELPER

   This allows the component to be called from the
   existing legacy HTML page.

   page-home.html needs:

   <div id="vivi-openart-mount"></div>
========================================================= */

let viviAnimationsRoot:
  ReturnType<typeof createRoot> | null = null;


export function mountViviAnimations() {
  const mount =
    document.getElementById(
      "vivi-openart-mount"
    );

  if (!mount) {
    console.warn(
      "[Vivi] #vivi-openart-mount was not found."
    );

    return;
  }


  /* Prevent duplicate React roots */

  if (viviAnimationsRoot) {
    return;
  }


  viviAnimationsRoot =
    createRoot(mount);


  viviAnimationsRoot.render(
    <Animations />
  );
}


export default Animations;