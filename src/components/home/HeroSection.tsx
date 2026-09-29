import { useNavigate } from 'react-router-dom';
import { HeroPrompt } from './HeroPrompt';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="vivi-hero">
      <div className="vivi-hero-grid" aria-hidden="true" />

      <div className="vivi-hero-glow vivi-hero-glow-one" aria-hidden="true" />
      <div className="vivi-hero-glow vivi-hero-glow-two" aria-hidden="true" />

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
          Vivi turns your idea into a cinematic video — complete characters,
          narration, a real story arc. No camera. No crew.
        </p>

        <HeroPrompt />

        

      </div>
    </section>
  );
}