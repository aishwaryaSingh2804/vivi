import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

const LOOP_DURATION = 9000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * t;

const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

const smootherstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

const distance = (a: Point, b: Point) =>
  Math.sqrt(
    Math.pow(a.x - b.x, 2) +
      Math.pow(a.y - b.y, 2)
  );

export function HeroCreativeBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;

    if (!root || !video) return;

    const ingredients = Array.from(
      root.querySelectorAll<HTMLElement>(
        '.vivi-ingredient'
      )
    );

    const sparkles = Array.from(
      root.querySelectorAll<HTMLElement>(
        '.vivi-magic-spark'
      )
    );

    const core = root.querySelector<HTMLElement>(
      '.vivi-generation-core'
    );

    const videoLayer =
      root.querySelector<HTMLElement>(
        '.vivi-creative-video'
      );

    const videoOverlay =
      root.querySelector<HTMLElement>(
        '.vivi-video-dark-overlay'
      );

    if (!videoLayer || !videoOverlay) {
      return;
    }

    /*
     * ---------------------------------------------------------
     * IMPORTANT:
     *
     * There are NO CSS animation stages anymore.
     *
     * Everything is driven by one continuous phase:
     *
     * 0 → 1 → 0
     *
     * using smooth sinusoidal motion.
     *
     * This is what makes the animation feel like one
     * continuous piece rather than several animations.
     * ---------------------------------------------------------
     */

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';

    /*
     * Start the video as soon as enough data is available.
     *
     * It plays continuously underneath the animation.
     * The animation loop controls when it becomes visible.
     */
    const startVideo = () => {
      void video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      startVideo();
    } else {
      video.addEventListener(
        'loadeddata',
        startVideo,
        { once: true }
      );
    }

    let frame = 0;
    let startTime = performance.now();

    /*
     * ---------------------------------------------------------
     * Establish each object's original position.
     * ---------------------------------------------------------
     */

    const ingredientData = ingredients.map(
      (element, index) => {
        const style = window.getComputedStyle(element);

        const width = element.offsetWidth;
        const height = element.offsetHeight;

        /*
         * Different starting locations around the hero.
         *
         * These are intentionally asymmetric so the movement
         * feels organic rather than like four identical cards.
         */
        const positions = [
          {
            x: -0.36,
            y: -0.23,
            angle: -0.28,
            radius: 0.8,
          },
          {
            x: 0.35,
            y: -0.17,
            angle: 0.18,
            radius: 0.95,
          },
          {
            x: 0.36,
            y: 0.22,
            angle: 0.25,
            radius: 1.05,
          },
          {
            x: -0.35,
            y: 0.22,
            angle: -0.22,
            radius: 0.9,
          },
        ];

        const position =
          positions[index % positions.length];

        return {
          element,
          width,
          height,
          startX: position.x,
          startY: position.y,
          startAngle: position.angle,
          radiusMultiplier: position.radius,

          /*
           * Each object gets a slightly different orbital
           * phase so they don't move as a synchronized pack.
           */
          orbitOffset:
            index * 0.42,

          rotation:
            Number.parseFloat(
              style.transform
                .replace(/[^\d.-]/g, ' ')
                .split(' ')
                .filter(Boolean)[0] || '0'
            ) || 0,
        };
      }
    );

    /*
     * Sparkles orbit differently from the larger cards.
     */
    const sparkleData = sparkles.map(
      (element, index) => {
        const positions = [
          [-0.28, -0.26],
          [0.28, -0.25],
          [0.34, 0.02],
          [-0.31, 0.08],
          [-0.21, 0.28],
          [0.22, 0.27],
        ];

        const [x, y] =
          positions[index % positions.length];

        return {
          element,
          x,
          y,
          phase: index * 0.75,
        };
      }
    );

    /*
     * ---------------------------------------------------------
     * Main animation loop
     * ---------------------------------------------------------
     */

    const animate = (now: number) => {
      const elapsed =
        (now - startTime) % LOOP_DURATION;

      /*
       * 0 → 1
       */
      const rawProgress =
        elapsed / LOOP_DURATION;

      /*
       * This gives us:
       *
       * 0 at beginning
       * 1 at exact center
       * 0 again at end
       *
       * Crucially, the velocity is zero at both ends.
       */
      const gather =
        0.5 -
        0.5 *
          Math.cos(
            rawProgress * Math.PI * 2
          );

      /*
       * Extremely smooth acceleration/deceleration.
       */
      const motion =
        smootherstep(gather);

      /*
       * -------------------------------------------------------
       * VIDEO
       *
       * It doesn't suddenly "appear".
       *
       * It slowly grows from 0 → 1 while the cards are
       * simultaneously disappearing into the center.
       * -------------------------------------------------------
       */

      /*
       * The video starts slightly zoomed and gently settles.
       * This makes it feel like the floating elements are
       * becoming the video itself.
       */

      /*
       * -------------------------------------------------------
       * VIDEO MORPH
       *
       * The cards converge first.
       * As they become one point, the actual video grows
       * directly out of that same point.
       *
       * The video then remains visible long enough to clearly
       * read as the generated cinematic result.
       * -------------------------------------------------------
       */

      /*
       * Start revealing while the cards are already moving
       * toward the centre, rather than waiting until after
       * they have completely disappeared.
       */
      const revealStart = 0.18;
      const revealEnd = 0.42;

      /*
       * Keep the finished video visible for a substantial
       * portion of the loop before dissolving back.
       */
      const fadeStart = 0.72;
      const fadeEnd = 0.90;

      /*
       * Smooth reveal: 0 → 1
       */
      const revealProgress =
        smootherstep(
          clamp(
            (rawProgress - revealStart) /
              (revealEnd - revealStart),
            0,
            1
          )
        );

      /*
       * Smooth fade: 0 → 1
       */
      const fadeProgress =
        smootherstep(
          clamp(
            (rawProgress - fadeStart) /
              (fadeEnd - fadeStart),
            0,
            1
          )
        );

      /*
       * Final video opacity.
       *
       * It grows in from the centre, stays visible,
       * then smoothly fades away before the next cycle.
       */
      const videoOpacity =
        revealProgress *
        (1 - fadeProgress);

      videoLayer.style.opacity =
        String(videoOpacity);

      /*
       * The video starts slightly zoomed and blurred,
       * then settles into the final cinematic frame.
       */
      const videoScale =
        lerp(
          1.08,
          1,
          videoOpacity
        );

      videoLayer.style.transform =
        `scale(${videoScale})`;

      videoLayer.style.filter =
        `blur(${lerp(
          12,
          0,
          videoOpacity
        )}px) saturate(${lerp(
          0.75,
          1,
          videoOpacity
        )})`;

      /*
       * The video physically grows out of the exact same
       * centre point where all of the cards meet.
       */
      const revealRadius =
        lerp(
          2,
          150,
          revealProgress
        );

      videoLayer.style.clipPath =
        `circle(${revealRadius}% at 50% 50%)`;

      /*
       * The cinematic dark treatment follows the video
       * instead of appearing independently.
       */
      videoOverlay.style.opacity =
        String(videoOpacity * 0.72);

      /*
       * -------------------------------------------------------
       * GENERATION CORE
       *
       * The center glow grows naturally as everything
       * converges.
       * -------------------------------------------------------
       */

      if (core) {
        const corePresence =
          Math.pow(
            Math.sin(
              rawProgress * Math.PI
            ),
            14
          );

        core.style.opacity =
          String(
            corePresence * 0.85
          );

        core.style.transform =
          `translate(-50%, -50%) scale(${
            0.35 +
            corePresence * 1.05
          })`;
      }

      /*
       * -------------------------------------------------------
       * FLOATING INGREDIENTS
       *
       * Instead of:
       *
       * left → middle → center
       *
       * we calculate an actual spiral.
       *
       * Radius decreases continuously.
       * Angle increases continuously.
       * -------------------------------------------------------
       */

      ingredientData.forEach(
        (item, index) => {
          /*
           * Gentle independent floating motion.
           */
          const floatTime =
            now * 0.00045 +
            item.orbitOffset;

          const floatX =
            Math.sin(floatTime) *
            9;

          const floatY =
            Math.cos(
              floatTime * 0.83
            ) *
            8;

          /*
           * Starting position.
           */
          const startX =
            item.startX *
            window.innerWidth;

          const startY =
            item.startY *
            window.innerHeight;

          /*
           * Distance toward center.
           */
          const radius =
            distance(
              {
                x: startX,
                y: startY,
              },
              {
                x: 0,
                y: 0,
              }
            );

          /*
           * Reduce the radius smoothly.
           */
          const currentRadius =
            radius *
            (1 - motion * 0.985);

          /*
           * Direction from center to starting position.
           */
          const baseAngle =
            Math.atan2(
              startY,
              startX
            );

          /*
           * The actual whirlpool.
           *
           * Every object rotates several degrees as it
           * moves inward.
           */
          const spiralAngle =
            baseAngle +
            motion *
              (
                Math.PI *
                (2.2 +
                  index * 0.18)
              );

          let x =
            Math.cos(spiralAngle) *
            currentRadius;

          let y =
            Math.sin(spiralAngle) *
            currentRadius;

          /*
           * Add a very subtle elliptical orbit so the movement
           * isn't mechanically circular.
           */
          const orbitAmount =
            Math.sin(
              motion * Math.PI
            );

          x +=
            Math.cos(
              now * 0.00028 +
                item.orbitOffset
            ) *
            24 *
            orbitAmount;

          y +=
            Math.sin(
              now * 0.00031 +
                item.orbitOffset
            ) *
            18 *
            orbitAmount;

          x += floatX *
            (1 - motion);

          y += floatY *
            (1 - motion);

          /*
           * Rotate the cards with the flow.
           */
          const rotation =
            item.rotation +
            Math.sin(
              motion * Math.PI
            ) *
              28 +
            motion *
              140;

          /*
           * Cards become softer and less visible as they
           * enter the generated video.
           */
          const visibility =
            1 -
            Math.pow(
              motion,
              3.2
            );

          /*
           * Slight scale reduction during convergence.
           */
          const scale =
            lerp(
              1,
              0.04,
              Math.pow(
                motion,
                1.8
              )
            );

          item.element.style.opacity =
            String(
              clamp(
                visibility * 0.78,
                0,
                0.78
              )
            );

          item.element.style.transform =
            `translate3d(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px),
              0
            )
            rotate(${rotation}deg)
            scale(${scale})`;

          /*
           * Blur only becomes noticeable right before the
           * elements merge into the center.
           */
          item.element.style.filter =
            `blur(${
              Math.pow(
                motion,
                4
              ) * 6
            }px)`;

          /*
           * Slightly different z-indexes make the spiral
           * feel spatial.
           */
          item.element.style.zIndex =
            String(
              5 +
              Math.round(
                Math.sin(
                  motion *
                    Math.PI *
                    2 +
                    index
                ) *
                  2
              )
            );
        }
      );

      /*
       * -------------------------------------------------------
       * SPARKLES
       * -------------------------------------------------------
       */

      sparkleData.forEach(
        (item) => {
          const floatPhase =
            now * 0.0007 +
            item.phase;

          const driftX =
            Math.sin(
              floatPhase
            ) *
            12;

          const driftY =
            Math.cos(
              floatPhase * 0.82
            ) *
            12;

          const startX =
            item.x *
            window.innerWidth;

          const startY =
            item.y *
            window.innerHeight;

          const radius =
            Math.sqrt(
              startX * startX +
                startY * startY
            );

          const angle =
            Math.atan2(
              startY,
              startX
            ) +
            motion *
              Math.PI *
              2.7;

          const currentRadius =
            radius *
            (1 - motion * 0.97);

          const x =
            Math.cos(angle) *
              currentRadius +
            driftX *
              (1 - motion);

          const y =
            Math.sin(angle) *
              currentRadius +
            driftY *
              (1 - motion);

          /*
           * Sparkles become brighter immediately before the
           * center and then disappear into the generated shot.
           */
          const sparkleVisibility =
            0.25 +
            Math.sin(
              motion * Math.PI
            ) *
              0.7;

          const sparkleScale =
            0.75 +
            Math.sin(
              motion * Math.PI
            ) *
              0.55;

          item.element.style.opacity =
            String(
              sparkleVisibility *
                (1 -
                  motion *
                    0.72)
            );

          item.element.style.transform =
            `translate3d(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px),
              0
            )
            scale(${sparkleScale})
            rotate(${
              motion * 180
            }deg)`;
        }
      );

      frame =
        requestAnimationFrame(
          animate
        );
    };

    /*
     * Handle resize without restarting the animation.
     */
    const handleResize = () => {
      /*
       * No state needs to be reset.
       *
       * The next animation frame automatically uses
       * the new viewport dimensions.
       */
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    frame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        'resize',
        handleResize
      );

      video.pause();

      video.removeEventListener(
        'loadeddata',
        startVideo
      );
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="vivi-creative-background"
      aria-hidden="true"
    >
      {/* Ambient atmosphere */}

      <div className="vivi-magic-haze vivi-magic-haze-one" />

      <div className="vivi-magic-haze vivi-magic-haze-two" />

      {/* =====================================================
          PROMPT
      ===================================================== */}

      <div className="vivi-ingredient vivi-ingredient-prompt">
        <div className="vivi-image-ingredient">
          <img
            src="/background/background-script.png"
            alt=""
          />

          <div className="vivi-ingredient-caption">
            <span>VIVI PROMPT</span>

            <strong>
              kids · heartfelt · value-driven
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          CHARACTER
      ===================================================== */}

      <div className="vivi-ingredient vivi-ingredient-character">
        <div className="vivi-image-ingredient">
          <img
            src="/background/background-character.png"
            alt=""
          />
        </div>
      </div>

      {/* =====================================================
          EDIT
      ===================================================== */}

      <div className="vivi-ingredient vivi-ingredient-edit">
        <div className="vivi-image-ingredient">
          <img
            src="/background/background-edit.png"
            alt=""
          />
        </div>
      </div>

      {/* =====================================================
          AUDIO
      ===================================================== */}

      <div className="vivi-ingredient vivi-ingredient-audio">
        <div className="vivi-audio-visual">
          <div className="vivi-audio-top">
            <span>AUDIO</span>
            <span>00:24</span>
          </div>

          <div className="vivi-audio-wave">
            {Array.from({ length: 18 }).map(
              (_, index) => (
                <span
                  key={index}
                  style={{
                    height: `${
                      14 +
                      ((index * 13) %
                        24)
                    }px`,
                  }}
                />
              )
            )}
          </div>

          <div className="vivi-audio-bottom">
            Atmosphere · Dialogue
          </div>
        </div>
      </div>

      {/* =====================================================
          SPARKLES
      ===================================================== */}

      <div className="vivi-magic-spark vivi-spark-one">
        ✦
      </div>

      <div className="vivi-magic-spark vivi-spark-two">
        ✦
      </div>

      <div className="vivi-magic-spark vivi-spark-three">
        ✧
      </div>

      <div className="vivi-magic-spark vivi-spark-four">
        ✦
      </div>

      <div className="vivi-magic-spark vivi-spark-five">
        ·
      </div>

      <div className="vivi-magic-spark vivi-spark-six">
        ✧
      </div>

      {/* =====================================================
          CENTER GENERATION
      ===================================================== */}

      <div className="vivi-generation-core">
        <div className="vivi-generation-core-inner">
          ✦
        </div>
      </div>

      {/* =====================================================
          VIDEO
      ===================================================== */}

      <div className="vivi-creative-video">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          src="/background/background-video.mp4"
        />

        <div className="vivi-video-dark-overlay" />

        <div className="vivi-video-glow" />
      </div>
    </div>
  );
}