import React from "react";

const Newsletter: React.FC = () => {
  return (
    <section className="std" style={{ paddingTop: 0 }}>
      <div className="newsletter-strip">
        <div className="callout-chip">Stay in the loop</div>

        <h2
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "36px",
            color: "var(--text)",
            marginBottom: "8px",
          }}
        >
          New stories, every week.
        </h2>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "15px",
          }}
        >
          We publish new Visl-made videos every week — history, microdramas,
          kids stories. Get them in your inbox.
        </p>

        <div className="email-row">
          <input
            className="email-input"
            type="email"
            placeholder="your@email.com"
          />

          <button
            type="button"
            className="btn-primary newsletter-submit"
            data-route="pricing"
          >
            Subscribe
          </button>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "var(--muted)",
            marginTop: "12px",
          }}
        >
          No spam. Unsubscribe anytime. We send one email a week.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;