
import "./PricingSection.css";
import { pricingPlans } from "../../data/pricing";

export function PricingSection() {
  return (
    <section className="pricing-section">
      <div className="pricing-inner">

        {/* HEADER */}
        <div className="pricing-header">
          <div className="section-overline">
            Pricing
          </div>

          <h2 className="pricing-heading">
            Start free. Scale when ready.
          </h2>

          <p className="pricing-subheading">
            No credit card to start. All plans include HD export,
            multi-language subtitles, and direct social publishing.
          </p>
        </div>

        {/* PLANS */}
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`price-card ${
                plan.featured ? "featured" : ""
              }`}
            >
              {plan.badge && (
                <div className="price-badge">
                  {plan.badge}
                </div>
              )}

              <div className="price-card-top">

                <div className="price-tier">
                  {plan.name}
                </div>

                <div className="price-value">
                  <span className="price-amount">
                    {plan.price}
                  </span>

                  {plan.period && (
                    <span className="price-period">
                      {plan.period}
                    </span>
                  )}
                </div>

                <p className="price-desc">
                  {plan.description}
                </p>

              </div>

              {/* FEATURES */}
              <ul className="price-features">
                {plan.features.map((item) => (
                  <li
                    key={item.name}
                    className={
                      item.available ? "available" : "dim"
                    }
                  >
                    <span className="feature-icon" aria-hidden="true">
                      {item.available ? "✓" : "×"}
                    </span>

                    <span className="feature-name">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* BUTTON */}
              <button
                className={`btn-plan ${
                  plan.featured
                    ? "btn-plan-fill"
                    : "btn-plan-outline"
                }`}
              >
                {plan.buttonLabel}
              </button>

            </article>
          ))}
        </div>


      </div>
    </section>
  );
}
