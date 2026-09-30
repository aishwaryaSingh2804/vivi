import { HeroPrompt } from './HeroPrompt';
import { HeroCreativeBackground } from './HeroCreativeBackground';

export function HeroSection() {
  return (
    <section className="vivi-hero">

      {/* Living fantasy background */}
      <HeroCreativeBackground />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="vivi-hero-content">

        <div className="vivi-hero-eyebrow">
          <span className="vivi-hero-eyebrow-line" />
          Long-form AI video
        </div>

        <h1 className="vivi-hero-title">
          Tell the story you've
          <br />
          been putting off.
        </h1>

        <p className="vivi-hero-subtitle">
          Vivi turns your idea into a cinematic video — complete
          characters, narration, a real story arc. No camera. No crew.
        </p>

        <HeroPrompt />

      </div>

    </section>
  );
}