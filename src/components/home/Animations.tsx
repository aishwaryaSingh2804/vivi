import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import "./Animations.css";

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
    id: "kids-1",
    category: "KIDS STORIES",
    title: "The Magical Sunflower",
    description:
      "Two children plant a handful of seeds in their backyard and discover something wonderfully unexpected growing from the soil.",
    video: "/videos/kids.mp4",
    prompt:
      "Create a warm animated children's story about a young girl and boy who discover colorful seed packets and decide to plant them together in their backyard. Follow them as they dig the soil, plant and water the seeds, and watch a giant magical sunflower bloom. Make it playful, colorful, wholesome, imaginative, and suitable for children.",
    meta: "Kids · Magical Adventure",
  },

  {
    id: "kids-2",
    category: "KIDS STORIES",
    title: "A Day on the Farm",
    description:
      "A curious little cat and a friendly lamb explore a sunny farm, meeting new animal friends along the way.",
    video: "/videos/kids2.mp4",
    prompt:
      "Create a cheerful animated children's story following a curious orange cat and a friendly little lamb as they explore a beautiful countryside farm. Have them meet ducks, horses, cows, geese, rabbits, frogs, and other farm animals as they wander through fields, ponds, barns, and a nearby forest. Make it bright, playful, colorful, and full of gentle adventure.",
    meta: "Kids · Farm Adventure",
  },

  {
    id: "history-1",
    category: "HISTORY",
    title: "Krishna & The Sage",
    description:
      "A mythological tale unfolding in a luminous kingdom, where a young Krishna shares a moment of wisdom with an elderly sage.",
    video: "/videos/history.mp4",
    prompt:
      "Create a cinematic Indian mythological story featuring young Krishna and an elderly sage carrying a traditional stringed instrument. Show them meeting in a magnificent celestial kingdom filled with palaces, gardens, temples, and glowing skies. Include Krishna walking through the kingdom, meeting the sage, entering a grand hall, and sharing a peaceful and emotional final moment together. Use rich Indian-inspired architecture, traditional clothing, warm golden lighting, and a magical mythological atmosphere.",
    meta: "Mythology · India",
  },

  {
    id: "history-2",
    category: "HISTORY",
    title: "The Weaver's Secret",
    description:
      "In a medieval village, a young woman encounters figures from the royal court and uncovers a mysterious story tied to a precious necklace.",
    video: "/videos/history2.mp4",
    prompt:
      "Create a cinematic historical drama set in a medieval European-inspired village. Follow a young woman working in a humble stone house as she encounters a mysterious cloaked man, speaks with a young boy, and is eventually brought into a royal palace. Show her meeting the queen and later returning to her village, where she discovers or reveals a beautiful necklace. Use cobblestone streets, stone cottages, candlelit interiors, royal costumes, dramatic palace interiors, and an atmospheric historical visual style.",
    meta: "History · Historical Drama",
  },

  {
    id: "india-1",
    category: "INDIA",
    title: "A Village Summer",
    description:
      "A warm illustrated story of family, food, school, and everyday life in an Indian village.",
    video: "/videos/india.mp4",
    prompt:
      "Create a warm illustrated Indian family story set in a traditional village. Follow a family sharing a meal together, children going to school, a mother preparing food at home, children spending time with friends under a tree, and the family coming together again at sunset on the rooftop. Show mud-plastered homes, courtyards, village streets, bicycles and scooters, traditional kitchens, local markets, and everyday Indian family life. Use a hand-painted animated storybook style with warm earthy colors and nostalgic lighting.",
    meta: "India · Family Story",
  },

  {
    id: "india-2",
    category: "INDIA",
    title: "Hanuman's Journey",
    description:
      "A cinematic mythological adventure following Hanuman through a mysterious underground world filled with ancient warriors and hidden chambers.",
    video: "/videos/india2.mp4",
    prompt:
      "Create a cinematic Indian mythological adventure centered on Hanuman. Begin with Hanuman emerging from the ocean at sunrise, then follow him into a vast underground cave system where he encounters warriors and mysterious figures. Show dramatic cavern landscapes, ancient stone corridors, underground rivers, monumental doors, temples, and powerful confrontations. Build toward an intense final sequence inside an ancient underground chamber. Use epic Indian mythological visuals, dramatic lighting, detailed costumes, powerful compositions, and a grand cinematic atmosphere.",
    meta: "India · Mythology",
  },

  {
    id: "microdrama-1",
    category: "MICRODRAMA",
    title: "The Last Walk",
    description:
      "A woman spends a restless night working alone before stepping outside and taking a quiet walk into the fading evening.",
    video: "/videos/microdrama.mp4",
    prompt:
      "Create a cinematic psychological microdrama about a woman alone at home late at night. Begin with her sitting on the edge of her bed in a dark bedroom, then show her working alone on a laptop at night. Transition between nighttime and daylight as she sits by a window, gathers her thoughts, and eventually walks alone down a quiet stone path at sunset. Keep the dialogue minimal and let the mood, expressions, lighting, and changing environment carry the story. Make it intimate, atmospheric, contemplative, and emotionally ambiguous.",
    meta: "Microdrama · Psychological",
  },

  {
    id: "microdrama-2",
    category: "MICRODRAMA",
    title: "The Conversation",
    description:
      "A tense conversation unfolds between three people in an intimate room, with a seemingly ordinary exchange growing increasingly uneasy.",
    video: "/videos/microdrama2.mp4",
    prompt:
      "Create a cinematic psychological microdrama set inside a warmly lit, intimate home. Center the story around a tense conversation between three adults: a woman in a dark coat, an older man seated in an armchair, and another woman who watches and later speaks from the room. Use close-ups of their expressions, pauses, body language, and shifting reactions to gradually build tension. Include moments where one woman sits alone thinking before returning to the conversation. End with an emotionally ambiguous final exchange. Use realistic performances, warm low-key lighting, restrained camera movement, and a tense dramatic atmosphere.",
    meta: "Microdrama · Drama",
  },
];

const VIDEO_CATEGORIES = [
  "KIDS STORIES",
  "HISTORY",
  "INDIA",
  "MICRODRAMA",
];

const CATEGORY_META: Record<
  string,
  { color: string; soft: string; label: string }
> = {
  "KIDS STORIES": {
    color: "#61b98b",
    soft: "rgba(97,185,139,.14)",
    label: "Kids",
  },
  HISTORY: {
    color: "#c38b52",
    soft: "rgba(195,139,82,.14)",
    label: "History",
  },
  INDIA: {
    color: "#d96f78",
    soft: "rgba(217,111,120,.14)",
    label: "India",
  },
  MICRODRAMA: {
    color: "#9d5de8",
    soft: "rgba(157,93,232,.14)",
    label: "Microdrama",
  },
};

const CATEGORY_FIRST_INDEX: Record<string, number> = {
  "KIDS STORIES": 0,
  HISTORY: 2,
  INDIA: 4,
  MICRODRAMA: 6,
};

function Animations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const wheelLocked = useRef(false);
  const transitionTimer = useRef<number | null>(null);
  const autoplayTimer = useRef<number | null>(null);

  const activeVideo = VIDEO_PRODUCTIONS[activeIndex];

  const previousIndex =
    (activeIndex - 1 + VIDEO_PRODUCTIONS.length) %
    VIDEO_PRODUCTIONS.length;

  const nextIndex =
    (activeIndex + 1) % VIDEO_PRODUCTIONS.length;

  const activeCategory = activeVideo.category;

  const activeCategoryVideos = VIDEO_PRODUCTIONS.filter(
    (video) => video.category === activeCategory
  );

  const activeCategoryIndex = activeCategoryVideos.findIndex(
    (video) => video.id === activeVideo.id
  );

  const changeVideo = useCallback(
    (direction: "next" | "previous") => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      setActiveIndex((current) => {
        if (direction === "next") {
          return (current + 1) % VIDEO_PRODUCTIONS.length;
        }

        return (
          (current - 1 + VIDEO_PRODUCTIONS.length) %
          VIDEO_PRODUCTIONS.length
        );
      });

      setProgressKey((value) => value + 1);

      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    },
    [isTransitioning]
  );

  const goToVideo = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioning) return;

      setIsTransitioning(true);
      setActiveIndex(index);
      setProgressKey((value) => value + 1);

      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    },
    [activeIndex, isTransitioning]
  );

 const goToCategory = useCallback(
  (category: string) => {
    const index = CATEGORY_FIRST_INDEX[category];

    if (index === undefined) return;

    // Selecting a category should immediately resume
    // the showcase's normal animation/autoplay flow.
    setIsPaused(false);

    goToVideo(index);
  },
  [goToVideo]
);

  const openVideoModal = useCallback(() => {
    setIsPaused(true);
    setIsVideoModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    setIsPaused(false);
  }, []);

  const changeModalVideo = useCallback(
    (direction: "next" | "previous") => {
      setActiveIndex((current) => {
        if (direction === "next") {
          return (current + 1) % VIDEO_PRODUCTIONS.length;
        }

        return (
          (current - 1 + VIDEO_PRODUCTIONS.length) %
          VIDEO_PRODUCTIONS.length
        );
      });

      setProgressKey((value) => value + 1);
    },
    []
  );

  /* AUTOPLAY */
  useEffect(() => {
    if (isPaused || isVideoModalOpen) return;

    autoplayTimer.current = window.setTimeout(() => {
      changeVideo("next");
    }, 6000);

    return () => {
      if (autoplayTimer.current) {
        window.clearTimeout(autoplayTimer.current);
      }
    };
  }, [
    activeIndex,
    isPaused,
    isVideoModalOpen,
    changeVideo,
  ]);

  /* CLEANUP */
  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }

      if (autoplayTimer.current) {
        window.clearTimeout(autoplayTimer.current);
      }
    };
  }, []);

  /* PLAY ACTIVE VIDEO */
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
      }
    };

    playVideo();
  }, [activeIndex]);

  /* PRELOAD NEIGHBOURING VIDEOS */
  useEffect(() => {
    const preloadVideos = [
      VIDEO_PRODUCTIONS[previousIndex].video,
      VIDEO_PRODUCTIONS[nextIndex].video,
    ];

    preloadVideos.forEach((src) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = src;
    });
  }, [previousIndex, nextIndex]);

  /* MOUSE WHEEL */
  const handleWheel = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    if (wheelLocked.current || isVideoModalOpen) return;

    if (Math.abs(event.deltaY) < 20) return;

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

  /* KEYBOARD */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isVideoModalOpen) return;

      const target = event.target as HTMLElement;

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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeVideo, isVideoModalOpen]);

  /* MODAL ESCAPE + PAGE SCROLL LOCK */
  useEffect(() => {
    if (!isVideoModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideoModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVideoModalOpen, closeVideoModal]);

  /* TOUCH / SWIPE */
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    if (isVideoModalOpen) return;

    touchStartY.current =
      event.touches[0].clientY;
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (
      touchStartY.current === null ||
      isVideoModalOpen
    ) {
      return;
    }

    const endY =
      event.changedTouches[0].clientY;

    const distance =
      touchStartY.current - endY;

    touchStartY.current = null;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      changeVideo("next");
    } else {
      changeVideo("previous");
    }
  };

  /* START CREATING */
  const startCreating = () => {
    const encodedPrompt =
      encodeURIComponent(activeVideo.prompt);

    window.location.hash =
      `#page-studio?prompt=${encodedPrompt}`;
  };

  return (
    <>
      <section
        className="vivi-openart-showcase"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="vivi-showcase-header">
  <div>
    <div className="vivi-showcase-overline">
      MADE WITH VIVI
    </div>

    <h2>
      One platform.
      <br />
      <span>Every kind of story.</span>
    </h2>

    <p>
      From kids stories to history, India, and
      microdramas — create every kind of story
      with Vivi.
    </p>

    <div className="vivi-story-types">
      {VIDEO_CATEGORIES.map((category, index) => {
        const categoryMeta = CATEGORY_META[category];
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            className={`vivi-story-type ${
              isActive ? "active" : ""
            }`}
            style={
              {
                "--category-color": categoryMeta.color,
              } as React.CSSProperties
            }
            onClick={() => goToCategory(category)}
          >
            <span className="vivi-story-type-dot" />

            <span>
              {categoryMeta.label}
              {category === "KIDS STORIES" ? " Stories" : ""}
            </span>

            {index < VIDEO_CATEGORIES.length - 1 && (
              <span className="vivi-story-type-separator">
                ·
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
</div>

        {/* MAIN EXPERIENCE */}
        <div className="vivi-showcase">
          {/* VIDEO SIDE */}
          <div className="vivi-showcase-stage">
            <button
              type="button"
              className="vivi-stage-arrow vivi-stage-arrow-up"
              onClick={() => changeVideo("previous")}
              aria-label="Previous video"
            >
              <span>↑</span>
            </button>

            <div
              className={`vivi-video-stack ${
                isTransitioning
                  ? "is-transitioning"
                  : ""
              }`}
            >
              {/* PREVIOUS */}
              <div className="vivi-video-card vivi-video-card-previous">
                <video
                  src={
                    VIDEO_PRODUCTIONS[previousIndex].video
                  }
                  muted
                  playsInline
                  preload="auto"
                />
                <div className="vivi-video-card-glass" />
              </div>

              {/* CURRENT */}
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

                <div className="vivi-video-top">
                  <button
                    type="button"
                    className="vivi-video-category-badge"
                    style={
                      {
                        "--category-color":
                          CATEGORY_META[activeCategory].color,
                        "--category-soft":
                          CATEGORY_META[activeCategory].soft,
                      } as React.CSSProperties
                    }
                    onClick={() =>
                      goToCategory(activeCategory)
                    }
                    aria-label={`Current category: ${activeCategory}`}
                  >
                    <span className="vivi-category-badge-dot" />
                    {activeCategory}
                  </button>

                  <button
                    type="button"
                    className="vivi-video-watch"
                    onClick={openVideoModal}
                    aria-label={`Watch ${activeVideo.title} full video`}
                  >
                    <span className="vivi-video-number">
                      {String(activeCategoryIndex + 1).padStart(
                        2,
                        "0"
                      )}
                      <span className="vivi-video-number-divider">
                        /
                      </span>
                      {String(activeCategoryVideos.length).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="vivi-video-watch-icon">
                      ↗
                    </span>
                  </button>
                </div>

                <div className="vivi-video-bottom">
                  <div>
                    <span>{activeVideo.category}</span>

                    <strong>{activeVideo.title}</strong>
                  </div>
                </div>
              </div>

              {/* NEXT */}
              <div className="vivi-video-card vivi-video-card-next">
                <video
                  src={
                    VIDEO_PRODUCTIONS[nextIndex].video
                  }
                  muted
                  playsInline
                  preload="auto"
                />
                <div className="vivi-video-card-glass" />
              </div>
            </div>

            <button
              type="button"
              className="vivi-stage-arrow vivi-stage-arrow-down"
              onClick={() => changeVideo("next")}
              aria-label="Next video"
            >
              <span>↓</span>
            </button>

            <div className="vivi-autoplay-indicator">
              <span
                className={
                  isPaused
                    ? "vivi-autoplay-dot paused"
                    : "vivi-autoplay-dot"
                }
              />

              <span>
                {isPaused ? "Paused" : "Auto playing"}
              </span>
            </div>

            <div className="vivi-category-rail">
              {VIDEO_CATEGORIES.map((category, index) => {
                const isActive =
                  activeCategory === category;
                const categoryMeta =
                  CATEGORY_META[category];

                return (
                  <button
                    key={category}
                    type="button"
                    className={
                      isActive
                        ? "vivi-category-dot active"
                        : "vivi-category-dot"
                    }
                    style={
                      {
                        "--category-color":
                          categoryMeta.color,
                        "--category-soft":
                          categoryMeta.soft,
                      } as React.CSSProperties
                    }
                    onClick={() =>
                      goToCategory(category)
                    }
                    aria-label={`Show ${category}`}
                    aria-current={
                      isActive ? "true" : undefined
                    }
                  >
                    <span className="vivi-category-dot-core" />
                    <span className="vivi-category-dot-label">
                      {categoryMeta.label}
                    </span>
                    <span className="vivi-category-dot-number">
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

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

          {/* INFORMATION PANEL */}
          <aside className="vivi-showcase-panel">
            <div className="vivi-panel-top">
              <span className="vivi-panel-eyebrow">
                {activeVideo.category}
              </span>

              <h3>{activeVideo.title}</h3>

              <p>{activeVideo.description}</p>
            </div>

            <div className="vivi-prompt-card">
              <div className="vivi-prompt-header">
                <span className="vivi-prompt-icon">
                  ✦
                </span>

                <span>CREATE THIS WITH VIVI</span>
              </div>

              <p>{activeVideo.prompt}</p>
            </div>

            <div className="vivi-production-meta">
              <span>{activeVideo.meta}</span>

              <span className="vivi-meta-dot">•</span>

              <span>AI generated</span>
            </div>

            <button
              type="button"
              className="vivi-create-button"
              onClick={startCreating}
            >
              <span>Start creating</span>

              <span className="vivi-create-arrow">
                →
              </span>
            </button>

            <span className="vivi-create-hint">
              The prompt will open in vivi Studio.
            </span>

            <div className="vivi-panel-footer">
              <span>
                {String(activeIndex + 1).padStart(2, "0")}
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
      </section>

      {/* FULL VIDEO VIEWER */}
      {isVideoModalOpen && (
        <div
          className="vivi-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Watch ${activeVideo.title}`}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeVideoModal();
            }
          }}
        >
          <div className="vivi-video-modal-inner">
            <div className="vivi-video-modal-top">
              <div>
                <span
                  className="vivi-video-modal-category"
                  style={
                    {
                      "--category-color":
                        CATEGORY_META[
                          activeVideo.category
                        ].color,
                    } as React.CSSProperties
                  }
                >
                  <span className="vivi-modal-category-dot" />
                  {activeVideo.category}
                </span>

                <h3>{activeVideo.title}</h3>
              </div>

              <div className="vivi-video-modal-top-actions">
                <span className="vivi-video-modal-count">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span>/</span>
                  {String(
                    VIDEO_PRODUCTIONS.length
                  ).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  className="vivi-video-modal-close"
                  onClick={closeVideoModal}
                  aria-label="Close video"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="vivi-video-modal-player-wrap">
              <button
                type="button"
                className="vivi-modal-nav vivi-modal-nav-left"
                onClick={() =>
                  changeModalVideo("previous")
                }
                aria-label="Previous video"
              >
                ←
              </button>

              <div className="vivi-video-modal-player">
                <video
                  key={activeVideo.id}
                  src={activeVideo.video}
                  autoPlay
                  controls
                  playsInline
                />
              </div>

              <button
                type="button"
                className="vivi-modal-nav vivi-modal-nav-right"
                onClick={() =>
                  changeModalVideo("next")
                }
                aria-label="Next video"
              >
                →
              </button>
            </div>

            <div className="vivi-video-modal-footer">
              <span>Made with vivi</span>
              <span>{activeVideo.meta}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   MOUNT HELPER
   Safely mounts the showcase into the legacy HTML page.
   ========================================================= */

let viviAnimationsRoot:
  ReturnType<typeof createRoot> | null = null;

let viviAnimationsMount: HTMLElement | null = null;

export function mountViviAnimations() {
  const mount = document.getElementById(
    "vivi-openart-mount"
  );

  if (!mount) {
    console.warn(
      "[Vivi] #vivi-openart-mount was not found."
    );
    return;
  }

  /*
   * If the exact same DOM container is already mounted,
   * there is nothing to do.
   */
  if (
    viviAnimationsRoot &&
    viviAnimationsMount === mount
  ) {
    return;
  }

  /*
   * If React was previously mounted into a different
   * container, unmount that old root first.
   *
   * This is important when the legacy page recreates
   * #vivi-openart-mount during navigation or rerenders.
   */
  if (
    viviAnimationsRoot &&
    viviAnimationsMount !== mount
  ) {
    try {
      viviAnimationsRoot.unmount();
    } catch (error) {
      console.warn(
        "[Vivi] Could not unmount previous animation root.",
        error
      );
    }

    viviAnimationsRoot = null;
    viviAnimationsMount = null;
  }

  /*
   * Create the React root for the current container.
   */
  viviAnimationsRoot = createRoot(mount);
  viviAnimationsMount = mount;

  viviAnimationsRoot.render(
    <Animations />
  );
}