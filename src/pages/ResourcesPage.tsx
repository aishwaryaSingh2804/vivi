import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function ResourcesPage() {
  return (
    <PageNavigation>
      <div id="page-resources" className="page">
  <section className="std">
    <div className="section-overline">Resources</div>
    <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(36px,5vw,56px)', fontWeight: '700', color: 'var(--text)', marginBottom: '12px', lineHeight: '1.1' } as CSSProperties}>Everything you need    <br />to create great videos.</h1>
    <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', marginBottom: '0' } as CSSProperties}>Guides, updates, answers, and a direct line to our team.</p>
    <div className="resources-grid">    <a href="#page-credits" className="resource-card">
      <div className="resource-card-icon">💲</div>
      <div className="resource-card-h">Credit Calculator</div>
      <p className="resource-card-p">See exactly how many credits a video costs by tier, resolution, and length.</p>
      <span className="resource-card-link">Open calculator →</span>
    </a>    <a href="#page-how-to-use" className="resource-card">
      <div className="resource-card-icon">📖</div>
      <div className="resource-card-h">How to Use Visl</div>
      <p className="resource-card-p">Step-by-step guide to creating your first video.</p>
      <span className="resource-card-link">Read the guide →</span>
    </a>    <a href="#page-blog" className="resource-card">
      <div className="resource-card-icon">📢</div>
      <div className="resource-card-h">Blog &amp; Updates</div>
      <p className="resource-card-p">New features, creator spotlights, and behind the scenes.</p>
      <span className="resource-card-link">Read the blog →</span>
    </a>    <a href="#page-faq" className="resource-card">
      <div className="resource-card-icon">💬</div>
      <div className="resource-card-h">FAQ</div>
      <p className="resource-card-p">Common questions about generation, styles, pricing, and rights.</p>
      <span className="resource-card-link">Browse FAQ →</span>
    </a>    <a href="#page-contact" className="resource-card">
      <div className="resource-card-icon">✉</div>
      <div className="resource-card-h">Contact Us</div>
      <p className="resource-card-p">Bug report, enterprise inquiry — we respond within 48 hours.</p>
      <span className="resource-card-link">Get in touch →</span>
    </a></div>
  </section>
</div>
    </PageNavigation>
  );
}
