import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function HistoryPage() {
  return (
    <PageNavigation>
      <div id="page-history" className="page">
  <div className="hero" style={{} as CSSProperties}>
    <div className="hero-left">
      <div className="hero-eyebrow">History videos</div>
      <h1 className="hero-h">Every era has      <br />a story worth      <br />      <em>watching.</em></h1>
      <p className="hero-sub" style={{ marginBottom: '20px', fontSize: '15px' } as CSSProperties}>Not documentaries. Not explainers. Cinematic, character-driven stories that put you in the room where it happened.</p>
      <div className="hero-ctas">      <button className="btn-primary btn-large" data-route="studio">Make a history video</button>      <button className="btn-text">See all history examples</button></div>
    </div>
    <div className="hero-visual">
      <div className="film-stack">
        <div className="film-card film-card-back">
          <div className="film-thumb" style={{ background: 'linear-gradient(135deg,#0d0d1a,#1a1a3d)' } as CSSProperties}>❄️</div>
          <div className="film-meta">          <span className="film-title">Christmas Truce</span>          <span className="film-dur">5:48</span></div>
        </div>
        <div className="film-card film-card-mid">
          <div className="film-thumb" style={{ background: 'linear-gradient(135deg,#0d1a0d,#1a3d1a)' } as CSSProperties}>⚛️</div>
          <div className="film-meta">          <span className="film-title">Chernobyl Divers</span>          <span className="film-dur">6:55</span></div>
        </div>
        <div className="film-card film-card-main">
          <div className="film-thumb grad-history" style={{ fontSize: '36px' } as CSSProperties}>🚂</div>
          <div className="film-meta">          <span className="film-title">The Kakori Conspiracy</span>          <span className="film-dur">6:48</span></div>
          <div className="film-bar">
            <div className="film-bar-fill" style={{ width: '45%', background: 'var(--accent)' } as CSSProperties}></div>
          </div>
          <div className="play-btn" style={{ background: 'rgba(192,57,43,.9)' } as CSSProperties}></div>
        </div>
      </div>
    </div>
  </div>
  <section className="std" style={{ paddingTop: '48px' } as CSSProperties}>
    <div className="section-overline">Browse by region</div>
    <h2 className="section-h">Every era has    <br />a story now.</h2>
    <div className="cat-panel active" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' } as CSSProperties}>
      <div className="story-card">
        <div className="story-thumb grad-history">        <span>🚂</span>        <span className="story-thumb-label">6–7 min · Cinematic</span></div>
        <div className="story-body">
          <div className="story-title">The Kakori Conspiracy</div>
          <div className="story-desc">August 1925. A band of revolutionaries loot a British treasury train. Bismil's last letter from prison, read over visuals of his hanging.</div>
          <div className="story-tags">          <span className="tag">India · 1925</span>          <span className="tag">Realistic</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#1a0805,#3d1a08)' } as CSSProperties}>        <span>👸</span>        <span className="story-thumb-label">7–8 min · Cinematic</span></div>
        <div className="story-body">
          <div className="story-title">The Queen Who Rode to War</div>
          <div className="story-desc">Rani Laxmibai — from grieving queen to military commander. The siege of Jhansi, the escape on horseback with her son strapped to her back.</div>
          <div className="story-tags">          <span className="tag">India · 1857</span>          <span className="tag">Realistic</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#0d1a0d,#1a3d1a)' } as CSSProperties}>        <span>⚛️</span>        <span className="story-thumb-label">6–7 min · Cinematic</span></div>
        <div className="story-body">
          <div className="story-title">The Three Divers of Chernobyl</div>
          <div className="story-desc">Three plant workers wade into radioactive floodwater. Dosimeters max out immediately. They open the valves. Europe is saved.</div>
          <div className="story-tags">          <span className="tag">Global · 1986</span>          <span className="tag">Survival</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#0a1a05,#1a3d0a)' } as CSSProperties}>        <span>☢️</span>        <span className="story-thumb-label">6–7 min · Cinematic</span></div>
        <div className="story-body">
          <div className="story-title">Smiling Buddha</div>
          <div className="story-desc">1974. Indira Gandhi greenlights a secret nuclear test at Pokhran. Scientists assemble a bomb in the Rajasthan desert while American satellites circle overhead.</div>
          <div className="story-tags">          <span className="tag">India · 1974</span>          <span className="tag">Realistic</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#0d0d1a,#1a1a3d)' } as CSSProperties}>        <span>❄️</span>        <span className="story-thumb-label">5–6 min · Pure Narration</span></div>
        <div className="story-body">
          <div className="story-title">Silent Night, No Man's Land</div>
          <div className="story-desc">December 24, 1914. German soldiers start singing. British soldiers hear it. Both sides climb out of the trenches and share cigarettes in the mud.</div>
          <div className="story-tags">          <span className="tag">Global · WWI</span>          <span className="tag">Emotional</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="story-thumb" style={{ background: 'linear-gradient(135deg,#1a1a0d,#3d3d1a)' } as CSSProperties}>        <span>⚡</span>        <span className="story-thumb-label">7–8 min · Dialogue Heavy</span></div>
        <div className="story-body">
          <div className="story-title">Tesla and the War of Currents</div>
          <div className="story-desc">Tesla arrives in New York with four cents. Edison refuses to pay. The 1893 World's Fair showdown that changed how the world gets electricity.</div>
          <div className="story-tags">          <span className="tag">Global · 1890s</span>          <span className="tag">Invention</span></div>
        </div>
      </div>
    </div>
  </section>
</div>
    </PageNavigation>
  );
}
