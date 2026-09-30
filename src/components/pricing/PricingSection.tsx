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

              <ul className="price-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                ))}

                {plan.disabledFeatures?.map((feature) => (
                  <li
                    key={feature}
                    className="dim"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

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

        {/* FOOTNOTE */}
        <p className="pricing-note">
          All prices in INR. Billed monthly. Annual plans available
          at 20% off. USD pricing also available.
        </p>

      </div>
    </section>
  );
}