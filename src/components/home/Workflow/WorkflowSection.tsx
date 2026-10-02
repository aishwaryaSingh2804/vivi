// src/components/home/Workflow/WorkflowSection.tsx

import { useEffect, useRef, useState } from "react";
import "./WorkflowSection.css";
import { WORKFLOW_STAGES } from "./workflowData";

const PUBLISH_STAGE_INDEX = WORKFLOW_STAGES.length - 1;
const WALKTHROUGH_VIEWPORTS = WORKFLOW_STAGES.length + 1; // Publish gets 2 viewports.

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateWorkflow = () => {
      const section = sectionRef.current;
      if (!section) {
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const rawTravel = -rect.top;
      const stageTravel = Math.max(0, rawTravel);
      const totalStageTravel = viewportHeight * WALKTHROUGH_VIEWPORTS;
      const clampedTravel = Math.min(stageTravel, totalStageTravel);

      // Idea, Setup, Script, Assets and Vibe Edit each occupy one viewport.
      // Publish occupies the final two viewports so its longer combined demo remains visible.
      const nextStage = Math.min(
        PUBLISH_STAGE_INDEX,
        Math.floor(clampedTravel / viewportHeight),
      );
      const publishStartsAt = viewportHeight * PUBLISH_STAGE_INDEX;
      const nextProgress = Math.min(clampedTravel / Math.max(publishStartsAt, 1), 1);

      setProgress(nextProgress);
      setActiveStage(nextStage);
      setHasEntered(rawTravel >= 0 && rect.bottom > viewportHeight);
      ticking = false;
    };

    const handleScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      frameId = window.requestAnimationFrame(updateWorkflow);
    };

    updateWorkflow();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const currentStage = WORKFLOW_STAGES[activeStage];
  const nextStage = WORKFLOW_STAGES[activeStage + 1];

  return (
    <section
      ref={sectionRef}
      className="workflow-section"
      id="vivi-workflow"
      style={{ scrollMarginTop: "88px" }}
    >
      <div className="workflow-sticky">
        <div className="workflow-background-glow" />

        <div className="workflow-container">
          <header className="workflow-header">
            <div className="workflow-kicker">
              <span className="workflow-kicker-dot" />
              <span className="workflow-kicker-brand">VIVI STUDIO</span>
              <span className="workflow-kicker-title">How your story comes to life</span>
            </div>

            <div className="workflow-counter" aria-live="polite">
              <strong>{currentStage.number}</strong>
              <span>/</span>
              <span>06</span>
            </div>
          </header>

          <div className="workflow-experience">
            <nav className="workflow-journey" aria-label="Video creation stages">
              <div className="workflow-vertical-track">
                <div className="workflow-vertical-line" />
                <div
                  className="workflow-vertical-progress"
                  style={{ height: `${progress * 100}%` }}
                />

                <div className="workflow-nodes">
                  {WORKFLOW_STAGES.map((stage, index) => {
                    const isActive = index === activeStage;
                    const isCompleted = index < activeStage;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "workflow-node",
                          isActive ? "is-active" : "",
                          isCompleted ? "is-completed" : "",
                        ].join(" ")}
                        aria-current={isActive ? "step" : undefined}
                      >
                        <span className="workflow-node-circle">
                          {isCompleted ? "✓" : stage.number}
                        </span>
                        <span className="workflow-node-label">{stage.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </nav>

            <div className="workflow-stage-info" aria-live="polite">
              <article className="workflow-stage-card" key={currentStage.id}>
                <div className="workflow-stage-number">{currentStage.number}</div>
                <div className="workflow-eyebrow">{currentStage.eyebrow}</div>
                <h2>{currentStage.headline}</h2>
                <p>{currentStage.description}</p>
                <div className="workflow-divider" />
                <div className="workflow-next">
                  <span>{nextStage ? `Next: ${nextStage.title}` : "Journey complete"}</span>
                  <span className="workflow-next-arrow" aria-hidden="true">→</span>
                </div>
              </article>
            </div>

            <div className="workflow-demo">
              <div className="workflow-demo-heading">
                <span>LIVE PRODUCT WALKTHROUGH</span>
                <span>{currentStage.number} / 06</span>
              </div>
              <div className="workflow-demo-frame">
                {hasEntered ? (
                  <iframe
                    key={`${currentStage.id}-${currentStage.demoClip}`}
                    title={`${currentStage.title} stage Vivi product demo`}
                    src={`/workflow-demo.html?clip=${encodeURIComponent(currentStage.demoClip)}&embed=1&autoplay=1`}
                    loading="eager"
                    allow="autoplay; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="workflow-demo-intro">
                    <span className="workflow-demo-intro-kicker">THE CREATIVE JOURNEY</span>
                    <strong>Your story starts with an idea.</strong>
                    <span className="workflow-demo-intro-copy">Scroll to see Vivi bring it to life.</span>
                    <span className="workflow-demo-intro-arrow" aria-hidden="true">↓</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`workflow-scroll-hint ${activeStage > 0 ? "is-fading" : ""}`}>
            <span className="workflow-scroll-mouse"><span /></span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      <div className="workflow-finale">
        <div className="workflow-finale-line" />
        <div className="workflow-finale-kicker"><span /> JOURNEY COMPLETE</div>
        <h2>Your idea made<br /><span>it to the screen.</span></h2>
        <p>One idea. Six stages. One finished story.</p>
        <a href="/studio" className="workflow-cta">
          <span>Start creating</span>
          <span className="workflow-cta-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
