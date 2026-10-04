import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function BlogPage() {
  return (
    <PageNavigation>
      <div id="page-blog" className="page">
  <section className="std">
    <a href="#page-resources" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px', display: 'inline-block' } as CSSProperties}>← Resources</a>
    <div className="section-overline">Blog</div>
    <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(36px,5vw,52px)', fontWeight: '700', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.1' } as CSSProperties}>Updates &amp; stories.</h1>
    <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '40px' } as CSSProperties}>New features, creator spotlights, and behind the scenes.</p>
    <div className="blog-grid">
      <div className="blog-card">
        <div className="blog-thumb" style={{ background: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)' } as CSSProperties}>🎙</div>
        <div className="blog-body">
          <div className="blog-tag">New Feature</div>
          <div className="blog-title">Introducing multi-language dubbing — Hindi, Tamil, and Telugu now live</div>
          <div className="blog-date">September 12, 2025</div>
        </div>
      </div>
      <div className="blog-card">
        <div className="blog-thumb" style={{ background: 'linear-gradient(135deg,#E3F2FD,#BBDEFB)' } as CSSProperties}>🎨</div>
        <div className="blog-body">
          <div className="blog-tag">New Style</div>
          <div className="blog-title">Watercolour visual style — soft, painterly, now on all plans</div>
          <div className="blog-date">September 5, 2025</div>
        </div>
      </div>
      <div className="blog-card">
        <div className="blog-thumb grad-history">🚂</div>
        <div className="blog-body">
          <div className="blog-tag">Behind the Scenes</div>
          <div className="blog-title">How we made The Kakori Conspiracy — prompt to final video</div>
          <div className="blog-date">August 28, 2025</div>
        </div>
      </div>
      <div className="blog-card">
        <div className="blog-thumb" style={{ background: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)' } as CSSProperties}>🏆</div>
        <div className="blog-body">
          <div className="blog-tag">Milestone</div>
          <div className="blog-title">Vivi first 1,000 creators — what they are making and where they publish</div>
          <div className="blog-date">August 20, 2025</div>
        </div>
      </div>
      <div className="blog-card">
        <div className="blog-thumb grad-kids">📚</div>
        <div className="blog-body">
          <div className="blog-tag">Creator Spotlight</div>
          <div className="blog-title">How @priya_momlife built a 10k kids channel using only Vivi videos</div>
          <div className="blog-date">August 14, 2025</div>
        </div>
      </div>
      <div className="blog-card">
        <div className="blog-thumb" style={{ background: 'linear-gradient(135deg,#F3E5F5,#E1BEE7)' } as CSSProperties}>🤖</div>
        <div className="blog-body">
          <div className="blog-tag">Product</div>
          <div className="blog-title">Why consistent characters are the hardest problem in AI video — and how we solved it</div>
          <div className="blog-date">August 7, 2025</div>
        </div>
      </div>
    </div>
  </section>
</div>
    </PageNavigation>
  );
}
