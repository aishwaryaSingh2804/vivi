// src/components/home/Workflow/WorkflowSection.tsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./WorkflowSection.css";
import { WORKFLOW_STAGES } from "./workflowData";

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateWorkflow = () => {
      const section = sectionRef.current;

      if (!section) {
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();

      /*
       * The first 600vh of the section is the actual
       * six-stage workflow.
       *
       * The final 100vh is reserved for the
       * "Journey Complete" CTA.
       */
      const workflowHeight =
        window.innerHeight * WORKFLOW_STAGES.length;

      const travelled = Math.min(
        Math.max(-rect.top, 0),
        workflowHeight
      );

      const rawProgress =
        workflowHeight > 0
          ? travelled / workflowHeight
          : 0;

      const nextProgress = Math.min(
        Math.max(rawProgress, 0),
        1
      );

      /*
       * Six stages across the workflow.
       *
       * Stage 1:
       * 0% - 16.6%
       *
       * Stage 2:
       * 16.6% - 33.3%
       *
       * ...
       *
       * Stage 6:
       * 83.3% - 100%
       */
      const nextStage = Math.min(
        WORKFLOW_STAGES.length - 1,
        Math.floor(
          nextProgress * WORKFLOW_STAGES.length
        )
      );

      setProgress(nextProgress);
      setActiveStage(nextStage);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateWorkflow);
        ticking = true;
      }
    };

    updateWorkflow();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  const currentStage =
    WORKFLOW_STAGES[activeStage];

  return (
    <section
      ref={sectionRef}
      className="workflow-section"
      id="vivi-workflow"
      style={{ scrollMarginTop: "88px" }}
    >

      {/* =====================================================
          STICKY WORKFLOW EXPERIENCE
          ===================================================== */}

      <div className="workflow-sticky">

        <div className="workflow-background-glow" />

        <div className="workflow-container">

          {/* =================================================
              HEADER
              ================================================= */}

          <header className="workflow-header">

            <div className="workflow-kicker">

              <span className="workflow-kicker-dot" />

              <span className="workflow-kicker-brand">
                VIVI STUDIO
              </span>

              <span className="workflow-kicker-title">
                How your story comes to life
              </span>

            </div>

            <div className="workflow-counter">

              <strong>
                {currentStage.number}
              </strong>

              <span>/</span>

              <span>06</span>

            </div>

          </header>


          {/* =================================================
              WAVY JOURNEY TIMELINE
              ================================================= */}

          <div className="workflow-journey">

            <div className="workflow-track">

              {/* Base wavy line */}

              <svg
                className="workflow-wave"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >

                <path
                  className="workflow-wave-base"
                  pathLength="1"
                  d="
                    M 10 30
                    C 70 5, 125 5, 185 30
                    C 245 55, 300 55, 360 30
                    C 420 5, 475 5, 535 30
                    C 595 55, 650 55, 710 30
                    C 770 5, 825 5, 885 30
                    C 925 47, 955 47, 990 30
                  "
                />

                {/* Animated progress */}

                <path
                  className="workflow-wave-progress"
                  pathLength="1"
                  d="
                    M 10 30
                    C 70 5, 125 5, 185 30
                    C 245 55, 300 55, 360 30
                    C 420 5, 475 5, 535 30
                    C 595 55, 650 55, 710 30
                    C 770 5, 825 5, 885 30
                    C 925 47, 955 47, 990 30
                  "
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset:
                      1 - progress,
                  }}
                />

              </svg>


              {/* =================================================
                  STAGE NODES
                  ================================================= */}

              <div className="workflow-nodes">

                {WORKFLOW_STAGES.map(
                  (stage, index) => {

                    const isActive =
                      index === activeStage;

                    const isCompleted =
                      index < activeStage;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "workflow-node",
                          isActive
                            ? "is-active"
                            : "",
                          isCompleted
                            ? "is-completed"
                            : "",
                        ].join(" ")}
                      >

                        <div className="workflow-node-circle">

                          {isCompleted ? (
                            <span className="workflow-check">
                              ✓
                            </span>
                          ) : (
                            stage.number
                          )}

                        </div>

                        <span className="workflow-node-label">
                          {stage.title}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              MAIN EXPERIENCE
              ================================================= */}

          <div className="workflow-main">

            {/* =================================================
                SCREENSHOT
                ================================================= */}

            <div className="workflow-visual">

              <div className="workflow-visual-orbit orbit-one" />

              <div className="workflow-visual-orbit orbit-two" />

              <div className="workflow-window">

                <div className="workflow-window-bar">

                  <div className="workflow-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="workflow-window-title">
                    Vivi Studio
                  </span>

                </div>

                <div className="workflow-image-stage">

                  {WORKFLOW_STAGES.map(
                    (stage, index) => {

                      const offset =
                        index - activeStage;

                      return (
                        <img
                          key={stage.id}
                          src={stage.image}
                          alt={`${stage.title} stage in Vivi Studio`}
                          className={[
                            "workflow-image",

                            index === activeStage
                              ? "is-current"
                              : "",

                            index < activeStage
                              ? "is-before"
                              : "",

                            index > activeStage
                              ? "is-after"
                              : "",
                          ].join(" ")}
                          style={{
                            "--stage-offset":
                              offset,
                          } as React.CSSProperties}
                        />
                      );
                    }
                  )}


                  {/* Floating Vivi cursor */}

                  <div className="workflow-cursor">

                    <div className="workflow-cursor-pointer">
                      ↗
                    </div>

                    <div className="workflow-cursor-label">
                      vivi
                    </div>

                  </div>

                </div>

              </div>

              <div className="workflow-image-caption">

                <span />

                <span>
                  Every story starts with an idea.
                </span>

              </div>

            </div>


            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <div className="workflow-content">

              <div
                className="workflow-stage-card"
                key={currentStage.id}
              >

                <div className="workflow-stage-number">
                  {currentStage.number}
                </div>

                <div className="workflow-eyebrow">
                  {currentStage.eyebrow}
                </div>

                <h2>
                  {currentStage.headline}
                </h2>

                <p>
                  {currentStage.description}
                </p>

                <div className="workflow-divider" />

                <div className="workflow-next">

                  <span>
                    {activeStage <
                    WORKFLOW_STAGES.length - 1
                      ? `Next: ${
                          WORKFLOW_STAGES[
                            activeStage + 1
                          ].title
                        }`
                      : "Journey complete"}
                  </span>

                  <span className="workflow-next-arrow">
                    →
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              SCROLL INDICATOR
              ================================================= */}

          <div
            className={[
              "workflow-scroll-hint",
              activeStage >= 1
                ? "is-fading"
                : "",
            ].join(" ")}
          >

            <span className="workflow-scroll-mouse">
              <span />
            </span>

            <span>
              Scroll to explore
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          JOURNEY COMPLETE
          ===================================================== */}

      <div className="workflow-finale">

        <div className="workflow-finale-line" />

        <div className="workflow-finale-kicker">

          <span />

          JOURNEY COMPLETE

        </div>

        <h2>
          Your idea made
          <br />
          <span>it to the screen.</span>
        </h2>

        <p>
          One idea. Six stages. One finished story.
        </p>

        <a
          href="/studio"
          className="workflow-cta"
        >

          <span>
            Start creating
          </span>

          <span className="workflow-cta-arrow">
            →
          </span>

        </a>

      </div>

    </section>
  );
}