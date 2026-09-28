import { useEffect, useRef, useState } from 'react';
import './HowViviWorks.css';

interface WorkflowStep {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Start with an idea',
    eyebrow: 'SETUP',
    description:
      'Tell Vivi what you want to create. Start with a simple idea, concept, or story direction.',
    image: '/workflow/setup.jpeg',
  },
  {
    number: '02',
    title: 'Shape the script',
    eyebrow: 'SCRIPT',
    description:
      'Vivi turns your idea into a structured script with scenes, dialogue, characters, and story beats.',
    image: '/workflow/script.jpeg',
  },
  {
    number: '03',
    title: 'Build your story',
    eyebrow: 'STORY',
    description:
      'Develop the narrative and bring your characters, scenes, and visual direction together.',
    image: '/workflow/story.jpeg',
  },
  {
    number: '04',
    title: 'Create your assets',
    eyebrow: 'ASSETS',
    description:
      'Generate and organize the visual assets your story needs — characters, environments, and more.',
    image: '/workflow/assets.jpeg',
  },
  {
    number: '05',
    title: 'Edit your video',
    eyebrow: 'EDITOR',
    description:
      'Fine-tune your scenes, timing, visuals, and story until everything feels exactly right.',
    image: '/workflow/editor.jpeg',
  },
  {
    number: '06',
    title: 'Publish your story',
    eyebrow: 'PUBLISH',
    description:
      'Your finished story is ready. Export it and share your creation with the world.',
    image: '/workflow/publish.jpeg',
  },
];

export function HowViviWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  /*
   * Has the user actually entered the section?
   */
  const hasEnteredSection = useRef(false);

  /*
   * Prevents wheel momentum from advancing
   * through multiple stages.
   */
  const isTransitioning = useRef(false);

  /*
   * Accumulates small trackpad/mouse movements.
   */
  const wheelAccumulator = useRef(0);

  /*
   * Touch support.
   */
  const touchStartY = useRef<number | null>(null);

  /*
   * Keep activeStep accessible inside the wheel
   * event without recreating the event listener.
   */
  const activeStepRef = useRef(0);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    /*
     * --------------------------------------------------
     * DETECT WHEN USER ENTERS THE SECTION
     * --------------------------------------------------
     */

    const observer = new IntersectionObserver(
      ([entry]) => {
        /*
         * User has genuinely entered the workflow.
         *
         * 50% is intentional:
         * we don't want the scroll interception
         * starting while the section is barely visible.
         */
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          hasEnteredSection.current = true;
        }

        /*
         * Once the section is mostly outside the viewport,
         * allow normal page scrolling again.
         */
        if (!entry.isIntersecting) {
          hasEnteredSection.current = false;
          wheelAccumulator.current = 0;
        }
      },
      {
        threshold: [0, 0.5, 1],
      }
    );

    observer.observe(section);

    /*
     * --------------------------------------------------
     * CHANGE STAGE
     * --------------------------------------------------
     */

    const moveStage = (direction: 1 | -1) => {
      if (isTransitioning.current) return;

      const current = activeStepRef.current;
      const next = current + direction;

      /*
       * At the beginning:
       * scrolling upward should return to the page.
       */
      if (next < 0) {
        wheelAccumulator.current = 0;
        return;
      }

      /*
       * At the end:
       * scrolling downward should return to the page.
       */
      if (next >= WORKFLOW_STEPS.length) {
        wheelAccumulator.current = 0;
        return;
      }

      isTransitioning.current = true;
      setIsAnimating(true);

      wheelAccumulator.current = 0;

      activeStepRef.current = next;
      setActiveStep(next);

      /*
       * Match this with the CSS animation duration.
       */
      window.setTimeout(() => {
        isTransitioning.current = false;
        setIsAnimating(false);
      }, 700);
    };

    /*
     * --------------------------------------------------
     * WHEEL
     * --------------------------------------------------
     */

    const handleWheel = (event: WheelEvent) => {
      /*
       * Don't interfere with scrolling before
       * the user reaches the workflow.
       */
      if (!hasEnteredSection.current) {
        return;
      }

      const rect = section.getBoundingClientRect();

      const sectionVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

      if (!sectionVisible) {
        return;
      }

      /*
       * While animation is happening,
       * completely consume the wheel event.
       */
      if (isTransitioning.current) {
        event.preventDefault();
        return;
      }

      /*
       * Accumulate wheel movement.
       *
       * This is especially important for trackpads.
       */
      wheelAccumulator.current += event.deltaY;

      const threshold = 70;

      /*
       * ------------------------------------------------
       * SCROLL DOWN
       * ------------------------------------------------
       */

      if (wheelAccumulator.current >= threshold) {
        const current = activeStepRef.current;

        /*
         * If we're not at the last stage,
         * consume the scroll and advance.
         */
        if (current < WORKFLOW_STEPS.length - 1) {
          event.preventDefault();
          moveStage(1);
          return;
        }

        /*
         * At Stage 06:
         *
         * Do NOT prevent the event.
         *
         * This allows the user to naturally
         * continue down the page.
         */
        wheelAccumulator.current = 0;
        return;
      }

      /*
       * ------------------------------------------------
       * SCROLL UP
       * ------------------------------------------------
       */

      if (wheelAccumulator.current <= -threshold) {
        const current = activeStepRef.current;

        /*
         * If we're past Stage 01,
         * move backwards through the journey.
         */
        if (current > 0) {
          event.preventDefault();
          moveStage(-1);
          return;
        }

        /*
         * At Stage 01:
         *
         * Allow the user to naturally scroll
         * back to the previous section.
         */
        wheelAccumulator.current = 0;
        return;
      }

      /*
       * Small movements are ignored.
       */
      if (
        activeStepRef.current > 0 &&
        activeStepRef.current < WORKFLOW_STEPS.length - 1
      ) {
        event.preventDefault();
      }
    };

    /*
     * --------------------------------------------------
     * TOUCH
     * --------------------------------------------------
     */

    const handleTouchStart = (event: TouchEvent) => {
      if (!hasEnteredSection.current) return;

      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (
        !hasEnteredSection.current ||
        touchStartY.current === null
      ) {
        return;
      }

      const touchEndY = event.changedTouches[0].clientY;

      const difference =
        touchStartY.current - touchEndY;

      const swipeThreshold = 50;

      if (Math.abs(difference) < swipeThreshold) {
        touchStartY.current = null;
        return;
      }

      /*
       * Swipe UP → next stage
       */
      if (difference > 0) {
        moveStage(1);
      }

      /*
       * Swipe DOWN → previous stage
       */
      if (difference < 0) {
        moveStage(-1);
      }

      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    window.addEventListener(
      'touchstart',
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      'touchend',
      handleTouchEnd,
      { passive: true }
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        'wheel',
        handleWheel
      );

      window.removeEventListener(
        'touchstart',
        handleTouchStart
      );

      window.removeEventListener(
        'touchend',
        handleTouchEnd
      );
    };
  }, []);

  const currentStep = WORKFLOW_STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      className="how-vivi-works"
      id="how-vivi-works"
    >
      <div className="how-vivi-inner">

        {/* HEADER */}

        <div className="how-vivi-header">
          <div className="how-vivi-eyebrow">
            HOW VIVI WORKS
          </div>

          <h2>
            One idea.
            <br />
            <span>Six stages.</span>
          </h2>

          <p>
            From your first idea to a finished story, Vivi
            helps you move through the entire creative process.
          </p>
        </div>

        {/* STEP NAVIGATION */}

        <div className="workflow-nav">
          {WORKFLOW_STEPS.map((step, index) => (
            <button
              key={step.number}
              type="button"
              className={`workflow-step ${
                activeStep === index ? 'active' : ''
              }`}
              onClick={() => {
                if (isTransitioning.current) return;

                activeStepRef.current = index;
                setActiveStep(index);
              }}
            >
              <span className="workflow-step-number">
                {step.number}
              </span>

              <span className="workflow-step-title">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}

        <div
          className={`workflow-content ${
            isAnimating ? 'is-animating' : ''
          }`}
        >

          {/* LEFT */}

          <div
            className="workflow-info"
            key={currentStep.number}
          >
            <div className="workflow-info-number">
              {currentStep.number}
            </div>

            <div className="workflow-info-eyebrow">
              {currentStep.eyebrow}
            </div>

            <h3>
              {currentStep.title}
            </h3>

            <p>
              {currentStep.description}
            </p>

            <div className="workflow-progress">
              <span>
                {String(activeStep + 1).padStart(2, '0')}
              </span>

              <div className="workflow-progress-line">
                <div
                  style={{
                    width: `${
                      ((activeStep + 1) /
                        WORKFLOW_STEPS.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <span>
                {String(
                  WORKFLOW_STEPS.length
                ).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* RIGHT */}

          <div className="workflow-image-wrapper">
            <div className="workflow-image-frame">
              <img
                key={currentStep.image}
                src={currentStep.image}
                alt={`${currentStep.title} - Vivi workflow`}
              />
            </div>

            <div className="workflow-image-label">
              <span>VIVI</span>
              <span>
                {currentStep.eyebrow}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}