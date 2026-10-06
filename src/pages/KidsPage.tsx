import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function KidsPage() {
  return (
    <PageNavigation>
      <div id="page-kids" className="page">
  <div className="hero" style={{} as CSSProperties}>
    <div className="hero-left">
      <div className="hero-eyebrow">Kids stories</div>
      <h1 className="hero-h">The bedtime story      <br />they'll ask for      <br />      <em>again.</em></h1>
      <p className="hero-sub" style={{ marginBottom: '20px', fontSize: '15px' } as CSSProperties}>Beautiful animated stories crafted for children — educational, safe, and good enough that you'll actually enjoy watching them too.</p>
      <div className="hero-ctas">      <button className="btn-primary btn-large" data-route="studio">Make your first story</button>      <button className="btn-text">See examples for ages 3–12</button></div>
      <p className="hero-note">Also available on       <span>YouTube Kids</span> — separate channel, kid-safe metadata</p>
    </div>
    <div className="hero-visual">
      <div className="film-stack">
        <div className="film-card film-card-back">
          <div className="film-thumb grad-kids">🦋</div>
          <div className="film-meta">          <span className="film-title">The Butterfly</span>          <span className="film-dur">4:05</span></div>
        </div>
        <div className="film-card film-card-mid">
          <div className="film-thumb" style={{ background: 'linear-gradient(135deg,#0a2a2a,#1a3d3d)' } as CSSProperties}>🦷</div>
          <div className="film-meta">          <span className="film-title">Sugar Bugs</span>          <span className="film-dur">3:40</span></div>
        </div>
        <div className="film-card film-card-main">
          <div className="film-thumb grad-kids" style={{ fontSize: '36px' } as CSSProperties}>🔭</div>
          <div className="film-meta">          <span className="film-title">Grandpa's Telescope</span>          <span className="film-dur">4:20</span></div>
          <div className="film-bar">
            <div className="film-bar-fill" style={{ width: '60%', background: 'var(--accent)' } as CSSProperties}></div>
          </div>
          <div className="play-btn" style={{ background: 'rgba(76,175,80,.9)' } as CSSProperties}></div>
        </div>
      </div>
    </div>
  </div>
  <section className="std" style={{ paddingTop: '48px' } as CSSProperties}>
    <div className="section-overline">Stories by theme</div>
    <h2 className="section-h">Science. Emotions.    <br />Adventure. Habits.</h2>
    <p className="section-sub">Every story is crafted to be age-appropriate, values-driven, and genuinely interesting — not just "educational content."</p>
    <div className="cat-panel active" style={{ display: 'grid' } as CSSProperties}>
      <div className="story-card">
        <div className="story-thumb grad-kids">        <span>🔭</span>        <span className="story-thumb-label">Ages 4–8 · Science</span></div>
        <div className="story-body">
          <div className="story-title">Grandpa's Broken Telescope</div>
          <div className="story-desc">A boy discovers the solar system through his late grandfather's handwritten astronomy notes. One planet per night.</div>
          <div className="story-tags">          <span className="tag">Pixar 3D</span>          <span className="tag">4 min</span>          <span className="tag">Space</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#1a0a1a,#2a1a2a)' } as CSSProperties}>        <span>😟</span>        <span className="story-thumb-label">Ages 5–10 · Wellbeing</span></div>
        <div className="story-body">
          <div className="story-title">The Kid Who Compared Too Much</div>
          <div className="story-desc">A boy convinced he's not as good as his best friend at anything spends a week secretly tracking his own small wins.</div>
          <div className="story-tags">          <span className="tag">Watercolour</span>          <span className="tag">4 min</span>          <span className="tag">Emotions</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#0a1a2a,#1a3d5c)' } as CSSProperties}>        <span>🦕</span>        <span className="story-thumb-label">Ages 5–10 · Time Travel</span></div>
        <div className="story-body">
          <div className="story-title">Lost in the Time of Giants</div>
          <div className="story-desc">Two kids accidentally trigger their grandfather's old clock and land in the age of dinosaurs, where they must befriend a baby to find their way home.</div>
          <div className="story-tags">          <span className="tag">Pixar 3D</span>          <span className="tag">5 min</span>          <span className="tag">Adventure</span></div>
        </div>
      </div>
    </div>
  </section>
  <section className="std" style={{ paddingTop: '0' } as CSSProperties}>
    <div className="section-overline">Why parents trust Visl</div>
    <div className="trust-row">
      <div className="trust-item">
        <div className="trust-icon">🛡️</div>
        <div>
          <div className="trust-h">Safe content, always</div>
          <p className="trust-p">Every kids video is reviewed against child-safe content guidelines before it's shareable. No ads, no dark themes, no inappropriate suggestions.</p>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">📚</div>
        <div>
          <div className="trust-h">Values built in</div>
          <p className="trust-p">Stories are crafted to model empathy, curiosity, and resilience — not as lessons, but as the natural outcome of good storytelling.</p>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">👪</div>
        <div>
          <div className="trust-h">Made to watch together</div>
          <p className="trust-p">Good enough that you'll actually enjoy it. Parents who watch alongside kids report higher engagement than screen time alone.</p>
        </div>
      </div>
    </div>
    <div className="yt-kids-banner">
      <div style={{ fontSize: '48px' } as CSSProperties}>▶</div>
      <div className="yt-kids-text">
        <h3>Also on YouTube Kids</h3>
        <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px' } as CSSProperties}>All Visl kids content is published separately on a dedicated YouTube Kids channel — with kid-safe metadata, no external links, and filtered for younger audiences.</p>
      </div>
      <button className="btn-primary" style={{ whiteSpace: 'nowrap', marginLeft: 'auto' } as CSSProperties}>Visit the channel</button>
    </div>
  </section>
</div>
    </PageNavigation>
  );
}
