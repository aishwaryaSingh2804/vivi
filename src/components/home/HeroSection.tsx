import { HeroPrompt } from './HeroPrompt';
import { HeroCreativeBackground } from './HeroCreativeBackground';

export function HeroSection() {
  return (
    <div className="vivi-hero-scroll">
      <div className="vivi-hero-sticky">
        <section className="vivi-hero">
          {/* Full-screen HTML animation background */}
          <HeroCreativeBackground />

          {/* Hero content stays above the animation */}
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
              vivi turns your idea into a cinematic video — complete
              characters, narration, a real story arc. No camera. No crew.
            </p>

            <HeroPrompt />
          </div>
        </section>
      </div>
    </div>
  );
}
