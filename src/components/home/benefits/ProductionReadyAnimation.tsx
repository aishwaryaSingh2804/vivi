export function ProductionReadyAnimation() {
  return (
    <div className="mini-scene production-scene">
      <div className="production-glow" />

      <div className="draft-label">YOUR IDEA</div>

      <div className="draft-frames">
        <div className="draft-frame draft-one">
          <span>01</span>
          <div className="draft-art art-one" />
        </div>

        <div className="draft-frame draft-two">
          <span>02</span>
          <div className="draft-art art-two" />
        </div>

        <div className="draft-frame draft-three">
          <span>03</span>
          <div className="draft-art art-three" />
        </div>
      </div>

      <div className="production-transform">✦</div>

      <div className="final-video">
        <div className="final-video-sky" />
        <div className="final-video-sun" />
        <div className="final-video-mountain mountain-one" />
        <div className="final-video-mountain mountain-two" />
        <div className="final-video-play">▶</div>
      </div>

      <div className="ready-stamp">
        <span>✓</span>
        READY TO SHARE
      </div>

      <div className="production-spark spark-one">✦</div>
      <div className="production-spark spark-two">✧</div>
    </div>
  );
}