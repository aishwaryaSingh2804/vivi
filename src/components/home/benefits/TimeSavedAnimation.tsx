export function TimeSavedAnimation() {
  return (
    <div className="mini-scene time-scene">
      <div className="time-scene-glow" />

      <div className="time-floating-label old-label">
        Traditional editing
      </div>

      <div className="time-floating-label new-label">
        With Visl
      </div>

      <div className="time-workflow old-workflow">
        <div className="workflow-line line-one" />
        <div className="workflow-line line-two" />
        <div className="workflow-line line-three" />

        <div className="workflow-task task-one" />
        <div className="workflow-task task-two" />
        <div className="workflow-task task-three" />
        <div className="workflow-task task-four" />
      </div>

      <div className="time-arrow">→</div>

      <div className="time-workflow new-workflow">
        <div className="vivi-mini-logo">V</div>
        <div className="new-workflow-bar" />
        <div className="new-workflow-check">✓</div>
      </div>

      <div className="time-saving-badge">
        <strong>80%</strong>
        <span>LESS TIME</span>
      </div>

      <div className="time-spark spark-one">✦</div>
      <div className="time-spark spark-two">✧</div>
      <div className="time-spark spark-three">✦</div>
    </div>
  );
}