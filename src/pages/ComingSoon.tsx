import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../lib/routes";
import "../styles/ComingSoon.css";

export default function ComingSoon() {
  const location = useLocation();

  const text = "Coming Soon";
  const [displayText, setDisplayText] = useState("");

  const handleLogoClick = () => {
    if (location.pathname === ROUTES.HOME) {
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
    }
  };

  /* -----------------------------------------
     Continuous typewriter loop
     ----------------------------------------- */
  useEffect(() => {
    let index = 0;
    let deleting = false;
    let timeoutId: number;

    const type = () => {
      if (!deleting) {
        index += 1;

        setDisplayText(text.slice(0, index));

        // Finished typing → pause before deleting
        if (index === text.length) {
          deleting = true;
          timeoutId = window.setTimeout(type, 1800);
          return;
        }

        timeoutId = window.setTimeout(type, 110);
      } else {
        index -= 1;

        setDisplayText(text.slice(0, index));

        // Finished deleting → pause before typing again
        if (index === 0) {
          deleting = false;
          timeoutId = window.setTimeout(type, 500);
          return;
        }

        timeoutId = window.setTimeout(type, 65);
      }
    };

    type();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="coming-soon-page">
      {/* =========================================
          BACKGROUND
          ========================================= */}
      <div className="coming-soon-background">
        {/* Home hero-style animated grid */}
        <div className="coming-soon-grid" />

        {/* Soft ambient blue movement */}
        <div className="coming-soon-glow coming-soon-glow-one" />
        <div className="coming-soon-glow coming-soon-glow-two" />
        <div className="coming-soon-glow coming-soon-glow-three" />

        {/* Cinematic vignette */}
        <div className="coming-soon-vignette" />
      </div>

      {/* =========================================
          MAIN CONTENT
          ========================================= */}
      <div className="coming-soon-content">
        {/* Visl logo */}
        <Link
          to={ROUTES.HOME}
          className="coming-soon-brand"
          onClick={handleLogoClick}
          aria-label="Go to Visl home"
        >
          Vi<span>sl</span>
        </Link>

        {/* Eyebrow */}
        <div className="coming-soon-eyebrow">
          <span className="eyebrow-line" />
          SOMETHING IS TAKING SHAPE
          <span className="eyebrow-line" />
        </div>

        {/* Typewriter heading */}
        <h1 className="coming-soon-title">
          {displayText}
          <span className="typewriter-cursor" aria-hidden="true" />
        </h1>

        {/* Description */}
        <p className="coming-soon-description">
          <span className="description-accent">Your story.</span>{" "}
          Our next chapter.
          <br />
          Visl is getting ready to turn your ideas into something
          extraordinary.
        </p>

        {/* CTA */}
        <Link
          to={ROUTES.HOME}
          className="coming-soon-back"
          onClick={handleLogoClick}
        >
          <span className="button-sparkle">✦</span>
          <span>Back to Home</span>
          <span className="button-arrow">↗</span>
        </Link>

        {/* Status */}
        <div className="coming-soon-status">
          <span className="status-dot" />
          <span>VISL IS BUILDING</span>
          <span className="status-pulse" />
        </div>
      </div>
    </main>
  );
}