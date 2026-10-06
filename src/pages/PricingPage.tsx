import { useState, type CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';
import { AccordionItem } from '../components/common/AccordionItem';

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openPricingFaq, setOpenPricingFaq] = useState<number | null>(null);

  return (
    <PageNavigation>
      <div id="page-pricing" className="page">
  <section className="std">
    <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' } as CSSProperties}>
      <div className="section-overline" style={{ justifyContent: 'center' } as CSSProperties}>Pricing</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(38px,5vw,58px)', fontWeight: '700', color: 'var(--text)', marginBottom: '10px', lineHeight: '1.1' } as CSSProperties}>Simple pricing.      <br />Start for free.</h1>
      <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '28px' } as CSSProperties}>No credit card to get started. Cancel anytime.</p>
      <div className="pricing-toggle-wrap">
        <span className={`toggle-label${isAnnual ? '' : ' active'}`} id="label-monthly">Monthly</span>
        <button
          type="button"
          className={`toggle-track${isAnnual ? ' on' : ''}`}
          id="billing-toggle"
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle annual billing"
          onClick={() => setIsAnnual((current) => !current)}
        >
          <span className="toggle-thumb" />
        </button>
        <span className={`toggle-label${isAnnual ? ' active' : ''}`} id="label-annual">Annual</span>
        <span className="annual-badge">Save 20%</span>
      </div>
    </div>
    <div className="pricing-grid" style={{ marginTop: '32px' } as CSSProperties}>
      <div className="price-card">
        <div className="price-tier">Free</div>
        <div>        <span className="price-amount">₹0</span></div>
        <p className="price-desc">Full quality, limited volume. No expiry.</p>
        <ul className="price-features">
          <li>3 videos per month</li>
          <li>Up to 3 minutes per video</li>
          <li>HD download</li>
          <li>All visual styles</li>
          <li>EN subtitles</li>
          <li className="dim">Priority generation</li>
          <li className="dim">Custom voice upload</li>
          <li className="dim">Multi-language dubbing</li>
          <li className="dim">API access</li>
        </ul>
        <button className="btn-plan btn-plan-outline">Start for free</button>
      </div>
      <div className="price-card featured">
        <div className="price-badge">Most popular</div>
        <div className="price-tier">Creator</div>
        <div>        <span className="price-amount" id="creator-price">{isAnnual ? '₹799' : '₹999'}</span>        <span className="price-period">/month</span></div>
        <p className="price-desc">For creators publishing consistently.</p>
        <ul className="price-features">
          <li>25 videos per month</li>
          <li>Up to 8 minutes per video</li>
          <li>HD + 4K download</li>
          <li>Priority generation</li>
          <li>Custom voice upload</li>
          <li>Subtitles in 12 languages</li>
          <li>Direct social publishing</li>
          <li className="dim">Multi-language dubbing</li>
          <li className="dim">API access</li>
        </ul>
        <button className="btn-plan btn-plan-fill">Get Creator</button>
      </div>
      <div className="price-card">
        <div className="price-tier">Pro</div>
        <div>        <span className="price-amount" id="pro-price">{isAnnual ? '₹2,399' : '₹2,999'}</span>        <span className="price-period">/month</span></div>
        <p className="price-desc">For studios shipping multiple series at once.</p>
        <ul className="price-features">
          <li>Unlimited videos</li>
          <li>Up to 15 minutes per video</li>
          <li>4K download</li>
          <li>Instant generation</li>
          <li>Custom voice upload</li>
          <li>Subtitles in 12 languages</li>
          <li>Multi-language dubbing (Hindi, Tamil, Telugu)</li>
          <li>Direct social publishing</li>
          <li>API access</li>
          <li>Dedicated support</li>
        </ul>
        <button className="btn-plan btn-plan-outline">Get Pro</button>
      </div>
    </div>
    <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: 'var(--muted)' } as CSSProperties}>All prices in INR. Annual plans billed upfront. USD pricing available on request.</p>
    <table className="compare-table">
      <thead>
        <tr>
          <th style={{ width: '40%' } as CSSProperties}>Features</th>
          <th>Free</th>
          <th style={{ color: 'var(--accent)' } as CSSProperties}>Creator</th>
          <th>Pro</th>
        </tr>
      </thead>
      <tbody>
        <tr className="compare-section-row">
          <td colSpan={4}>Generation</td>
        </tr>
        <tr>
          <td>Videos per month</td>
          <td>3</td>
          <td>25</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <td>Max video length</td>
          <td>3 min</td>
          <td>8 min</td>
          <td>15 min</td>
        </tr>
        <tr>
          <td>Generation speed</td>
          <td>Standard</td>
          <td>Priority</td>
          <td>Instant</td>
        </tr>
        <tr className="compare-section-row">
          <td colSpan={4}>Output</td>
        </tr>
        <tr>
          <td>Video resolution</td>
          <td>HD</td>
          <td>HD + 4K</td>
          <td>4K</td>
        </tr>
        <tr>
          <td>All visual styles</td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
        </tr>
        <tr>
          <td>Subtitles</td>
          <td>English only</td>
          <td>12 languages</td>
          <td>12 languages</td>
        </tr>
        <tr>
          <td>Multi-language dubbing</td>
          <td>          <span className="check-no">-</span></td>
          <td>          <span className="check-no">-</span></td>
          <td>Hindi, Tamil, Telugu</td>
        </tr>
        <tr className="compare-section-row">
          <td colSpan={4}>Creation tools</td>
        </tr>
        <tr>
          <td>Custom voice upload</td>
          <td>          <span className="check-no">-</span></td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
        </tr>
        <tr>
          <td>Direct social publishing</td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
        </tr>
        <tr>
          <td>API access</td>
          <td>          <span className="check-no">-</span></td>
          <td>          <span className="check-no">-</span></td>
          <td>          <span className="check-yes">✓</span></td>
        </tr>
        <tr>
          <td>Support</td>
          <td>Community</td>
          <td>Email (48 hr)</td>
          <td>Dedicated</td>
        </tr>
        <tr>
          <td>Commercial use</td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
          <td>          <span className="check-yes">✓</span></td>
        </tr>
      </tbody>
    </table>
    <div className="enterprise-strip">
      <div>
        <h3>Need something bigger?</h3>
        <p>Custom volumes, team seats, white-label, SLA, and dedicated onboarding.</p>
      </div>
      <button className="btn-white">Talk to us →</button>
    </div>
    <div style={{ maxWidth: '640px', margin: '48px auto 0' } as CSSProperties}>
      <div className="section-overline">Common questions</div>
      <AccordionItem question="Can I cancel anytime?" isOpen={openPricingFaq === 0} onToggle={() => setOpenPricingFaq((current) => current === 0 ? null : 0)} className="pricing-faq-item" style={{ marginBottom: '8px', border: '1px solid #E8E6E0', borderRadius: '10px', overflow: 'hidden', background: '#fff' } as CSSProperties}>
        Yes. No lock-in, no cancellation fee. Cancel from account settings; you keep access until the end of the billing period. Videos remain downloadable for 90 days after cancellation.
      </AccordionItem>
      <AccordionItem question="What happens to my videos if I downgrade?" isOpen={openPricingFaq === 1} onToggle={() => setOpenPricingFaq((current) => current === 1 ? null : 1)} className="pricing-faq-item" style={{ marginBottom: '8px', border: '1px solid #E8E6E0', borderRadius: '10px', overflow: 'hidden', background: '#fff' } as CSSProperties}>
        Your existing videos stay accessible and downloadable. You simply cannot generate new videos above the free tier limits until you upgrade again.
      </AccordionItem>
      <AccordionItem question="Can I use Visl videos commercially?" isOpen={openPricingFaq === 2} onToggle={() => setOpenPricingFaq((current) => current === 2 ? null : 2)} className="pricing-faq-item" style={{ marginBottom: '8px', border: '1px solid #E8E6E0', borderRadius: '10px', overflow: 'hidden', background: '#fff' } as CSSProperties}>
        Yes, on all plans. You own the videos you generate. Use them commercially, monetize on YouTube, no attribution required.
      </AccordionItem>
      <AccordionItem question="Do you offer team or enterprise plans?" isOpen={openPricingFaq === 3} onToggle={() => setOpenPricingFaq((current) => current === 3 ? null : 3)} className="pricing-faq-item" style={{ marginBottom: '8px', border: '1px solid #E8E6E0', borderRadius: '10px', overflow: 'hidden', background: '#fff' } as CSSProperties}>
        Yes. Enterprise includes custom volumes, team seats, white-label output, SLA, and dedicated onboarding. <a href="#page-contact" style={{ color: 'var(--accent)' }}>Contact us</a> to discuss.
      </AccordionItem>
    </div>
  </section>
</div>
    </PageNavigation>
  );
}
