export function StorytellingAnimation() {
  return (
    <div className="mini-scene storytelling-scene">
      <div className="story-glow" />

      <div className="idea-bubble">
        <span>✧</span>
        <small>A STORY</small>
      </div>

      <div className="story-connector">✦</div>

      <div className="story-film">
        <div className="film-holes top-holes">
          <i /><i /><i /><i /><i />
        </div>

        <div className="story-frame">
          <div className="story-sky" />
          <div className="story-sun" />
          <div className="story-hill hill-one" />
          <div className="story-hill hill-two" />

          <div className="story-character character-one">
            <div className="character-head" />
            <div className="character-body" />
          </div>

          <div className="story-character character-two">
            <div className="character-head" />
            <div className="character-body" />
          </div>
        </div>

        <div className="film-holes bottom-holes">
          <i /><i /><i /><i /><i />
        </div>
      </div>

      <div className="story-camera">
        <div className="camera-lens" />
        <div className="camera-top" />
      </div>

      <div className="story-spark spark-one">✦</div>
      <div className="story-spark spark-two">✧</div>
      <div className="story-spark spark-three">✦</div>
    </div>
  );
}