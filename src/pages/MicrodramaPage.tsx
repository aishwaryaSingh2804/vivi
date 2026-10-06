import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function MicrodramaPage() {
  return (
    <PageNavigation>
      <div id="page-microdrama" className="page">
  <div className="hero" style={{} as CSSProperties}>
    <div className="hero-left">
      <div className="hero-eyebrow">Microdramas</div>
      <h1 className="hero-h">Two minutes.      <br />One twist.      <br />      <em>Impossible to stop.</em></h1>
      <p className="hero-sub" style={{ marginBottom: '20px', fontSize: '15px' } as CSSProperties}>Complete short films — psychological thrillers, sci-fi dilemmas, cat-and-mouse heists — built for TikTok, Reels, and human attention spans.</p>
      <div className="hero-ctas">      <button className="btn-primary btn-large" data-route="studio">Make a microdrama</button>      <button className="btn-text">Browse all microdramas</button></div>
      <p className="hero-note">Microdramas are       <span>TikTok and Reels native</span> — vertical format, twist endings, completion-optimised pacing</p>
    </div>
    <div className="hero-visual">
      <div className="film-stack">
        <div className="film-card film-card-back">
          <div className="film-thumb" style={{ background: 'linear-gradient(135deg,#1a1a0d,#3d3d1a)' } as CSSProperties}>⏳</div>
          <div className="film-meta">          <span className="film-title">Borrowed Time</span>          <span className="film-dur">2:47</span></div>
        </div>
        <div className="film-card film-card-mid">
          <div className="film-thumb" style={{ background: 'linear-gradient(135deg,#0d1a2e,#1a3d5c)' } as CSSProperties}>🚗</div>
          <div className="film-meta">          <span className="film-title">The Pickup</span>          <span className="film-dur">2:19</span></div>
        </div>
        <div className="film-card film-card-main">
          <div className="film-thumb grad-micro" style={{ fontSize: '36px' } as CSSProperties}>🎭</div>
          <div className="film-meta">          <span className="film-title">The Session</span>          <span className="film-dur">2:31</span></div>
          <div className="film-bar">
            <div className="film-bar-fill" style={{ width: '88%', background: 'var(--accent)' } as CSSProperties}></div>
          </div>
          <div className="play-btn" style={{ background: 'rgba(167,139,250,.9)' } as CSSProperties}></div>
        </div>
      </div>
    </div>
  </div>
  <section className="std" style={{ paddingTop: '48px' } as CSSProperties}>
    <div className="section-overline">Browse by genre</div>
    <h2 className="section-h">Psychological.    <br />Thriller. Sci-Fi. Heist.</h2>
    <div className="cat-panel active" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' } as CSSProperties}>
      <div className="story-card">
        <div className="story-thumb grad-micro">        <span>🎭</span>        <span className="story-thumb-label">2–3 min · Pure Dialogue</span></div>
        <div className="story-body">
          <div className="story-title">The Session</div>
          <div className="story-desc">A therapist's patient starts describing events from her own private life — things no one could know. She tries to stay professional. He smiles and keeps going.</div>
          <div className="story-tags">          <span className="tag">Psychological</span>          <span className="tag">Twist</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#0d1a2e,#1a3d5c)' } as CSSProperties}>        <span>🚗</span>        <span className="story-thumb-label">2–3 min · Mostly Dialogue</span></div>
        <div className="story-body">
          <div className="story-title">The Pickup</div>
          <div className="story-desc">Wrong turns. Child-locked door. A broken mirror under the seat. The driver is crying. "They have my daughter. They told me to bring someone. I'm sorry."</div>
          <div className="story-tags">          <span className="tag">Thriller</span>          <span className="tag">India</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#1a0a1a,#3d1a3d)' } as CSSProperties}>        <span>⏰</span>        <span className="story-thumb-label">2–3 min · Narration</span></div>
        <div className="story-body">
          <div className="story-title">The Loop</div>
          <div className="story-desc">Steve wakes up. It's Tuesday. Goes to work. Same meeting. Same lunch. Same call from his mother. He goes to sleep. He wakes up. It's Tuesday. Again.</div>
          <div className="story-tags">          <span className="tag">Sci-Fi</span>          <span className="tag">Mystery</span></div>
        </div>
      </div>
    </div>
    <div className="twist-callout">
      <div>
        <div className="twist-text">"The ending is never what you think it is."</div>
        <p className="twist-sub">Every Visl microdrama is engineered for a twist that earns it — not just a cheap reversal. The kind that makes people comment "I did NOT see that coming."</p>
      </div>
      <button className="btn-primary btn-large" style={{ flexShrink: '0', whiteSpace: 'nowrap' } as CSSProperties}>Write my twist</button>
    </div>
  </section>
</div>
    </PageNavigation>
  );
}
