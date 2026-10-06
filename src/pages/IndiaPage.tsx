import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function IndiaPage() {
  return (
    <PageNavigation>
      <div id="page-india" className="page">
  <div className="hero" style={{} as CSSProperties}>
    <div className="hero-left">
      <div className="lang-toggle">      <button className="lang-btn active">English</button>      <button className="lang-btn">हिंदी</button></div>
      <div className="hero-eyebrow">India — visl.ai/in</div>
      <h1 className="hero-h">India's stories      <br />deserve a      <br />      <em>screen.</em></h1>
      <p className="india-hero-h">भारत की कहानियाँ, अब पर्दे पर।</p>
      <p className="hero-sub" style={{ marginBottom: '20px', fontSize: '15px' } as CSSProperties}>From the freedom struggle to Panchtantra to slice-of-life Ghibli — Visl makes Indian stories the way they deserve to be told.</p>
      <div className="hero-ctas">      <button className="btn-primary btn-large" data-route="studio">Start for free</button>      <button type="button" className="btn-text" data-route="studio">
  देखिए उदाहरण
</button></div>
      <p className="hero-note">Content available in       <span>Hindi · Tamil · Telugu · English</span></p>
    </div>
    <div className="hero-visual">
      <div className="film-stack">
        <div className="film-card film-card-back">
          <div className="film-thumb grad-ghibli">🚃</div>
          <div className="film-meta">          <span className="film-title">Last Train from Churchgate</span>          <span className="film-dur">6:12</span></div>
        </div>
        <div className="film-card film-card-mid">
          <div className="film-thumb grad-kids">🧒</div>
          <div className="film-meta">          <span className="film-title">Panchtantra — The Fox</span>          <span className="film-dur">5:30</span></div>
        </div>
        <div className="film-card film-card-main">
          <div className="film-thumb grad-history" style={{ fontSize: '36px' } as CSSProperties}>🚂</div>
          <div className="film-meta">          <span className="film-title">The Kakori Conspiracy</span>          <span className="film-dur">6:48</span></div>
          <div className="film-bar">
            <div className="film-bar-fill" style={{ width: '55%', background: 'var(--accent)' } as CSSProperties}></div>
          </div>
          <div className="play-btn" style={{ background: 'rgba(255,153,51,.9)' } as CSSProperties}></div>
        </div>
      </div>
    </div>
  </div>
  <section className="std" style={{ paddingTop: '48px' } as CSSProperties}>
    <div className="section-overline">Made for India</div>
    <div className="dub-callout">
      <div>
        <h3>Your story in every language.</h3>
        <p>Visl can generate and dub your video in Hindi, Tamil, and Telugu — automatically. The same story, the same characters, the same emotional beats, in the language your audience grew up hearing.</p>
        <div className="lang-chips">        <span className="lang-chip">Hindi</span>        <span className="lang-chip">Tamil</span>        <span className="lang-chip">Telugu</span>        <span className="lang-chip">English</span>        <span className="lang-chip">More coming</span></div>
      </div>
      <button className="btn-primary btn-large" style={{ whiteSpace: 'nowrap', flexShrink: '0' } as CSSProperties}>Try Hindi dubbing</button>
    </div>
  </section>
</div>
    </PageNavigation>
  );
}
