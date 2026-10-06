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
              <span className="vivi-title-l1">Tell the story</span>{' '}
              <span>you've</span>
              <br className="vivi-title-br" />{' '}
              <span>been</span>{' '}
              <span className="vivi-hero-title-accent">putting off.</span>
            </h1>

            <p className="vivi-hero-subtitle">
              Visl turns your idea into a{' '}
              <span className="vivi-sub-em">cinematic video</span> — complete{' '}
              <span className="vivi-sub-em">characters</span>,{' '}
              <span className="vivi-sub-em">narration</span>, a real story
              arc. <span className="vivi-sub-punch">No camera. No crew.</span>
            </p>

            <HeroPrompt />
          </div>
        </section>
      </div>
    </div>
  );
}
