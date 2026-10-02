export function HeroCreativeBackground() {
  return (
    <div className="vivi-creative-background" aria-hidden="true">
      <iframe
        className="vivi-creative-background-frame"
        src="/vivi-hero-animation.html"
        title="Vivi animated background"
        loading="eager"
        allow="autoplay"
        tabIndex={-1}
      />
      <div className="vivi-creative-background-overlay" />
    </div>
  );
}
