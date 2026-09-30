import { useEffect, useRef, useState } from 'react';

export function HeroCreativeBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  let animationFrame: number;
  let targetProgress = 0;
  let currentProgress = 0;

  const handleScroll = () => {
    if (!sectionRef.current) return;

    const scrollContainer =
      sectionRef.current.closest('.vivi-hero-scroll');

    if (!scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();

    const scrollDistance =
      rect.height - window.innerHeight;

    targetProgress =
      scrollDistance > 0
        ? Math.min(
            1,
            Math.max(
              0,
              -rect.top / scrollDistance
            )
          )
        : 0;
  };

  const animate = () => {
    /*
     * Smoothly ease the animation toward the actual
     * scroll position instead of jumping directly to it.
     */
    currentProgress +=
      (targetProgress - currentProgress) * 0.075;

    /*
     * Stop tiny floating-point movement once we are
     * extremely close to the target.
     */
    if (Math.abs(targetProgress - currentProgress) < 0.0005) {
      currentProgress = targetProgress;
    }

    setScrollProgress(currentProgress);

    animationFrame = requestAnimationFrame(animate);
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  handleScroll();

  animationFrame = requestAnimationFrame(animate);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(animationFrame);
  };
}, []);

  /*
   * Keep the background subtle at first.
   *
   * 0 - 35%:
   * floating creative elements
   *
   * 35 - 75%:
   * elements move toward the centre
   *
   * 75 - 100%:
   * video window forms
   */
  const convergence = Math.min(
    1,
    Math.max(
      0,
      (scrollProgress - 0.2) / 0.65
    )
  );

  const videoReveal = Math.min(
    1,
    Math.max(
      0,
      (scrollProgress - 0.62) / 0.32
    )
  );

  return (
    <div
      ref={sectionRef}
      className="vivi-creative-background"
      style={
        {
          '--vivi-convergence': convergence,
          '--vivi-video-reveal': videoReveal,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* -----------------------------------------
          AMBIENT ORBIT
      ----------------------------------------- */}

      <div className="vivi-creative-orbit vivi-orbit-one" />
      <div className="vivi-creative-orbit vivi-orbit-two" />

      {/* -----------------------------------------
          SCRIPT CARD
      ----------------------------------------- */}

      <div className="vivi-floating-card vivi-script-card">
        <div className="vivi-card-topline">
          <span>SCENE 01</span>
          <span>✦</span>
        </div>

        <div className="vivi-script-line">
          EXT. MUMBAI — NIGHT
        </div>

        <div className="vivi-script-line muted">
          A woman walks through the rain...
        </div>

        <div className="vivi-script-cursor">
          ▌
        </div>
      </div>

      {/* -----------------------------------------
          CHARACTER CARD
      ----------------------------------------- */}

      <div className="vivi-floating-card vivi-character-card">
        <div className="vivi-character-avatar">
          M
        </div>

        <div className="vivi-character-info">
          <span>CHARACTER</span>
          <strong>MAYA</strong>
          <small>PROTAGONIST</small>
        </div>

        <div className="vivi-character-check">
          ✓
        </div>
      </div>

      {/* -----------------------------------------
          SCENE FRAME
      ----------------------------------------- */}

      <div className="vivi-floating-card vivi-scene-card">
        <div className="vivi-scene-preview">
          <span>03</span>

          <div className="vivi-scene-sun" />
          <div className="vivi-scene-horizon" />
          <div className="vivi-scene-person" />
        </div>

        <div className="vivi-scene-meta">
          <span>SCENE</span>
          <strong>CINEMATIC</strong>
        </div>
      </div>

      {/* -----------------------------------------
          AUDIO
      ----------------------------------------- */}

      <div className="vivi-floating-card vivi-audio-card">
        <div className="vivi-audio-header">
          <span>AUDIO</span>
          <span>00:24</span>
        </div>

        <div className="vivi-waveform">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              style={{
                height: `${12 + ((index * 17) % 25)}px`,
              }}
            />
          ))}
        </div>

        <div className="vivi-audio-label">
          Atmosphere · Dialogue
        </div>
      </div>

      {/* -----------------------------------------
          PROMPT FRAGMENT
      ----------------------------------------- */}

      <div className="vivi-prompt-fragment">
        <span>prompt</span>
        <strong>
          cinematic · emotional · suspenseful
        </strong>
      </div>

      {/* -----------------------------------------
          GENERATION NODE
      ----------------------------------------- */}

      <div className="vivi-generation-node">
        <div className="vivi-generation-ring">
          <span>✦</span>
        </div>

        <div>
          <span>VIVI</span>
          <strong>GENERATING</strong>
        </div>
      </div>

      {/* -----------------------------------------
          CONNECTING LINES
      ----------------------------------------- */}

      <div className="vivi-connection vivi-connection-one" />
      <div className="vivi-connection vivi-connection-two" />
      <div className="vivi-connection vivi-connection-three" />

      {/* -----------------------------------------
          PARTICLES
      ----------------------------------------- */}

      <div className="vivi-particle vivi-particle-one">✦</div>
      <div className="vivi-particle vivi-particle-two">·</div>
      <div className="vivi-particle vivi-particle-three">+</div>
      <div className="vivi-particle vivi-particle-four">✦</div>
      <div className="vivi-particle vivi-particle-five">·</div>

      {/* -----------------------------------------
          VIDEO FORMS AT THE END
      ----------------------------------------- */}

      
    </div>
  );
}