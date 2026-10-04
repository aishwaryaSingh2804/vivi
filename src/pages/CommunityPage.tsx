import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function CommunityPage() {
  return (
    <PageNavigation>
      <div id="page-community" className="page">
  <div className="comm-hero">
    <div>
      <div className="hero-eyebrow">Community</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(44px,5vw,68px)', fontWeight: '700', lineHeight: '1.05', color: 'var(--text)', marginBottom: '16px' } as CSSProperties}>Stories made here.      <br />Shared everywhere.</h1>
      <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: '1.7', maxWidth: '440px', marginBottom: '32px' } as CSSProperties}>14,000+ creators are already using Vivi to tell the stories they have been putting off. Here is where they share them.</p>
      <div className="comm-stats">
        <div className="comm-stat">
          <div className="comm-stat-num">14k+</div>
          <div className="comm-stat-label">Creators</div>
        </div>
        <div className="comm-stat">
          <div className="comm-stat-num">120k+</div>
          <div className="comm-stat-label">Videos made</div>
        </div>
        <div className="comm-stat">
          <div className="comm-stat-num">40+</div>
          <div className="comm-stat-label">Countries</div>
        </div>
      </div>
    </div>
    <div className="social-card" style={{ alignSelf: 'center' } as CSSProperties}>
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: '#5865F2', color: '#fff', fontSize: '16px' } as CSSProperties}>◈</div>
          <div>
            <div className="social-name">Discord</div>
            <div className="social-handle">Vivi Community Server</div>
          </div>
        </div>
        <button className="social-follow" style={{ background: '#5865F2', color: '#fff', borderColor: '#5865F2' } as CSSProperties}>Join</button>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: '8px' } as CSSProperties}>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '12px', fontSize: '12px', lineHeight: '1.5' } as CSSProperties}>
          <div style={{ fontWeight: '600', color: '#5865F2', marginBottom: '6px' } as CSSProperties}># story-pitches</div>
          <div style={{ color: 'var(--muted)' } as CSSProperties}>Drop a story idea → community votes → we make it. Best one this week: "The engineer who tried to stop Bhopal."</div>
        </div>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '12px', fontSize: '12px', lineHeight: '1.5' } as CSSProperties}>
          <div style={{ fontWeight: '600', color: '#5865F2', marginBottom: '6px' } as CSSProperties}># made-with-vivi</div>
          <div style={{ color: 'var(--muted)' } as CSSProperties}>Share your videos, get feedback, get featured on the community page.</div>
        </div>
      </div>
      <div className="social-card-footer">      <span className="social-count">      <strong>600+</strong> members · Channels: pitches, feedback, drops</span>      <a href="#" className="social-cta-link">Join server →</a></div>
    </div>
  </div>
  <div className="ugc-section">
    <hr style={{ border: 'none', borderTop: '1px solid #E8E6E0', marginBottom: '64px' } as CSSProperties} />
    <div className="section-overline">Made with Vivi</div>
    <h2 className="section-h">What creators are making.</h2>
    <p className="section-sub">Real videos from real creators. Tag     <strong style={{ color: 'var(--accent)' } as CSSProperties}>#MadeWithVivi</strong> to be featured here.</p>
    <div className="ugc-grid">
      <div className="ugc-card">
        <div className="ugc-thumb grad-history">
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar">R</div>
            <div className="ugc-creator-name">@reetika_tells</div>
          </div>
          <div className="ugc-title">The Night Before Partition — My Grandmother's Story</div>
          <div className="ugc-meta">          <span className="ugc-tag">History</span>          <span className="ugc-tag">6 min</span>          <span className="ugc-tag">42k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb grad-micro">
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#5B21B6,#7C3AED)' } as CSSProperties}>A</div>
            <div className="ugc-creator-name">@arjun.creates</div>
          </div>
          <div className="ugc-title">The Last Voicemail — a 2-min psychological thriller</div>
          <div className="ugc-meta">          <span className="ugc-tag">Microdrama</span>          <span className="ugc-tag">2 min</span>          <span className="ugc-tag">81k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb grad-kids">
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#2E7D32,#43A047)' } as CSSProperties}>P</div>
            <div className="ugc-creator-name">@priya_momlife</div>
          </div>
          <div className="ugc-title">Why is the Sky Blue? — made this for my 5-year-old</div>
          <div className="ugc-meta">          <span className="ugc-tag">Kids</span>          <span className="ugc-tag">4 min</span>          <span className="ugc-tag">18k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb grad-ghibli">
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)' } as CSSProperties}>K</div>
            <div className="ugc-creator-name">@kartik_frames</div>
          </div>
          <div className="ugc-title">The Chaiwalla — animated slice of life, Banaras 1989</div>
          <div className="ugc-meta">          <span className="ugc-tag">Animation</span>          <span className="ugc-tag">7 min</span>          <span className="ugc-tag">29k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb" style={{ background: 'linear-gradient(135deg,#0d1a2e,#1a3d5c)' } as CSSProperties}>
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#B71C1C,#C62828)' } as CSSProperties}>S</div>
            <div className="ugc-creator-name">@sahil_history</div>
          </div>
          <div className="ugc-title">Operation Blue Star — what the textbooks left out</div>
          <div className="ugc-meta">          <span className="ugc-tag">History</span>          <span className="ugc-tag">8 min</span>          <span className="ugc-tag">67k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb" style={{ background: 'linear-gradient(135deg,#1a0d1a,#3d1a3d)' } as CSSProperties}>
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#5B21B6,#6D28D9)' } as CSSProperties}>N</div>
            <div className="ugc-creator-name">@neha.narratives</div>
          </div>
          <div className="ugc-title">She knew the answer before I asked — sci-fi microdrama</div>
          <div className="ugc-meta">          <span className="ugc-tag">Microdrama</span>          <span className="ugc-tag">3 min</span>          <span className="ugc-tag">35k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb" style={{ background: 'linear-gradient(135deg,#0a2a1a,#1a3d2a)' } as CSSProperties}>
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#2E7D32,#388E3C)' } as CSSProperties}>D</div>
            <div className="ugc-creator-name">@divya_edutok</div>
          </div>
          <div className="ugc-title">Photosynthesis but make it a bedtime story</div>
          <div className="ugc-meta">          <span className="ugc-tag">Kids</span>          <span className="ugc-tag">5 min</span>          <span className="ugc-tag">11k views</span></div>
        </div>
      </div>
      <div className="ugc-card">
        <div className="ugc-thumb" style={{ background: 'linear-gradient(135deg,#1a1a0d,#3a3a1a)' } as CSSProperties}>
          <div className="ugc-made-badge">Made with Vivi</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="ugc-body">
          <div className="ugc-creator">
            <div className="ugc-avatar" style={{ background: 'linear-gradient(135deg,#E65100,#F57C00)' } as CSSProperties}>V</div>
            <div className="ugc-creator-name">@vikas_writer</div>
          </div>
          <div className="ugc-title">The Postman Who Never Came Home — true story, 1971</div>
          <div className="ugc-meta">          <span className="ugc-tag">History</span>          <span className="ugc-tag">6 min</span>          <span className="ugc-tag">53k views</span></div>
        </div>
      </div>
    </div>
  </div>
  <hr style={{ border: 'none', borderTop: '1px solid #E8E6E0', margin: '0 40px' } as CSSProperties} />
  <div style={{ padding: '64px 40px 32px', maxWidth: '1200px', margin: '0 auto' } as CSSProperties}>
    <div className="section-overline">Where to find us</div>
    <h2 className="section-h">Follow the story    <br />wherever you watch.</h2>
  </div>
  <div className="socials-grid">
    <div className="social-card" style={{ gridColumn: 'span 2' } as CSSProperties}>
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: '#FF0000' } as CSSProperties}>▶</div>
          <div>
            <div className="social-name">YouTube</div>
            <div className="social-handle">@viviai · Full episodes + Shorts</div>
          </div>
        </div>
        <button className="social-follow" style={{ background: '#FF0000', color: '#fff', borderColor: '#FF0000' } as CSSProperties}>Subscribe</button>
      </div>
      <div className="social-previews social-previews-3" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '0' } as CSSProperties}>
        <div className="social-preview-item social-preview-item-wide grad-history" style={{ aspectRatio: '16/9' } as CSSProperties}>
          <div className="social-preview-views">6:48</div>
          <div className="social-preview-overlay">The Kakori Conspiracy</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="social-preview-item social-preview-item-wide grad-kids" style={{ aspectRatio: '16/9' } as CSSProperties}>
          <div className="social-preview-views">4:20</div>
          <div className="social-preview-overlay">Grandpa's Telescope</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="social-preview-item social-preview-item-wide grad-micro" style={{ aspectRatio: '16/9' } as CSSProperties}>
          <div className="social-preview-views">2:31</div>
          <div className="social-preview-overlay">The Session</div>
          <div className="ugc-play">
            <div className="ugc-play-btn"></div>
          </div>
        </div>
      </div>
      <div className="social-card-footer">      <span className="social-count">      <strong>3,200</strong> subscribers · 3 videos/week</span>      <a href="#" className="social-cta-link">Open channel →</a></div>
    </div>
    <div className="social-card">
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: '#010101', color: '#fff' } as CSSProperties}>♪</div>
          <div>
            <div className="social-name">TikTok</div>
            <div className="social-handle">@viviai · Microdramas</div>
          </div>
        </div>
        <button className="social-follow">Follow</button>
      </div>
      <div className="social-previews" style={{ gridTemplateColumns: '1fr 1fr 1fr', display: 'grid', gap: '8px', marginBottom: '0' } as CSSProperties}>
        <div className="social-preview-item" style={{ aspectRatio: '9/16', background: 'linear-gradient(180deg,#1a0a2e,#2d1052)' } as CSSProperties}>
          <div className="social-preview-views">28k</div>
          <div className="social-preview-overlay">The Session</div>
          <div className="ugc-play" style={{ background: 'none' } as CSSProperties}>
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="social-preview-item" style={{ aspectRatio: '9/16', background: 'linear-gradient(180deg,#0d1a2e,#1a3d5c)' } as CSSProperties}>
          <div className="social-preview-views">14k</div>
          <div className="social-preview-overlay">The Pickup</div>
          <div className="ugc-play" style={{ background: 'none' } as CSSProperties}>
            <div className="ugc-play-btn"></div>
          </div>
        </div>
        <div className="social-preview-item" style={{ aspectRatio: '9/16', background: 'linear-gradient(180deg,#1a1a0d,#3d3d1a)' } as CSSProperties}>
          <div className="social-preview-views">9k</div>
          <div className="social-preview-overlay">Borrowed Time</div>
          <div className="ugc-play" style={{ background: 'none' } as CSSProperties}>
            <div className="ugc-play-btn"></div>
          </div>
        </div>
      </div>
      <div className="social-card-footer">      <span className="social-count">      <strong>8,400</strong> followers · 4–5×/week</span>      <a href="#" className="social-cta-link">Open TikTok →</a></div>
    </div>
    <div className="social-card">
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', color: '#fff', fontSize: '14px' } as CSSProperties}>◈</div>
          <div>
            <div className="social-name">Instagram</div>
            <div className="social-handle">@viviai · Reels + BTS</div>
          </div>
        </div>
        <button className="social-follow">Follow</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', margin: '0 18px 0' } as CSSProperties}>
        <div className="social-preview-item social-preview-item-sq grad-micro">
          <div className="social-preview-views">12k</div>
        </div>
        <div className="social-preview-item social-preview-item-sq grad-history">
          <div className="social-preview-views">8.2k</div>
        </div>
        <div className="social-preview-item social-preview-item-sq grad-kids">
          <div className="social-preview-views">6.5k</div>
        </div>
        <div className="social-preview-item social-preview-item-sq grad-ghibli">
          <div className="social-preview-views">4.1k</div>
        </div>
        <div className="social-preview-item social-preview-item-sq" style={{ background: 'linear-gradient(135deg,#1a0d1a,#2a1a2a)' } as CSSProperties}>
          <div className="social-preview-views">3.8k</div>
        </div>
        <div className="social-preview-item social-preview-item-sq" style={{ background: 'linear-gradient(135deg,#0d1a0d,#1a3d1a)' } as CSSProperties}>
          <div className="social-preview-views">2.9k</div>
        </div>
      </div>
      <div className="social-card-footer">      <span className="social-count">      <strong>4,100</strong> followers · 5×/week</span>      <a href="#" className="social-cta-link">Open Instagram →</a></div>
    </div>
    <div className="social-card">
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: '#000', color: '#fff', fontSize: '15px', fontWeight: '700' } as CSSProperties}>𝕏</div>
          <div>
            <div className="social-name">X (Twitter)</div>
            <div className="social-handle">@viviai · Threads + Founder</div>
          </div>
        </div>
        <button className="social-follow">Follow</button>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: '10px' } as CSSProperties}>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '12px', fontSize: '12px', color: 'var(--text)', lineHeight: '1.5', borderLeft: '3px solid var(--accent)' } as CSSProperties}>🧵 August 1925. A group of young revolutionaries decided to rob a British train. Here is what happened at Kakori — thread ↓</div>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '12px', fontSize: '12px', color: 'var(--text)', lineHeight: '1.5', borderLeft: '3px solid var(--accent)' } as CSSProperties}>Building in public: Month 2 numbers. 120 sign-ups. 14% free → paid. One video hit 28k on TikTok.</div>
      </div>
      <div className="social-card-footer">      <span className="social-count">      <strong>1,800</strong> followers · 4×/week</span>      <a href="#" className="social-cta-link">Open X →</a></div>
    </div>
    <div className="social-card">
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: '#0A66C2', color: '#fff', fontSize: '13px', fontWeight: '700' } as CSSProperties}>in</div>
          <div>
            <div className="social-name">LinkedIn</div>
            <div className="social-handle">Vivi AI · Building in public</div>
          </div>
        </div>
        <button className="social-follow">Follow</button>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: '10px' } as CSSProperties}>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '14px', fontSize: '12px', color: 'var(--text)', lineHeight: '1.5' } as CSSProperties}>
          <div style={{ fontWeight: '600', marginBottom: '6px' } as CSSProperties}>We generated 120,000 videos last month 🎬</div>

        What surprised us: 40% of creators used it for kids content. 30% for history. The rest split between microdramas and Ghibli-style animation...
      
        </div>
      </div>
      <div className="social-card-footer">      <span className="social-count">      <strong>2,400</strong> followers · 3×/week</span>      <a href="#" className="social-cta-link">Open LinkedIn →</a></div>
    </div>
    <div className="social-card">
      <div className="social-card-header">
        <div className="social-card-id">
          <div className="social-icon" style={{ background: '#FF4500', color: '#fff', fontSize: '16px' } as CSSProperties}>●</div>
          <div>
            <div className="social-name">Reddit</div>
            <div className="social-handle">r/aivideo · r/todayilearned</div>
          </div>
        </div>
        <button className="social-follow">Join</button>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: '8px' } as CSSProperties}>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '12px', fontSize: '12px', color: 'var(--text)', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start', gap: '10px' } as CSSProperties}>
          <span style={{ color: '#FF4500', fontWeight: '700', fontSize: '13px' } as CSSProperties}>↑</span>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '10px', marginBottom: '3px' } as CSSProperties}>r/todayilearned · 847 upvotes</div>
TIL that 3 engineers at Chernobyl voluntarily waded into radioactive water to prevent a second explosion that would have made half of Europe uninhabitable
          </div>
        </div>
        <div style={{ background: '#F7F6F3', borderRadius: '10px', padding: '12px', fontSize: '12px', color: 'var(--text)', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start', gap: '10px' } as CSSProperties}>
          <span style={{ color: '#FF4500', fontWeight: '700', fontSize: '13px' } as CSSProperties}>↑</span>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '10px', marginBottom: '3px' } as CSSProperties}>r/aivideo · 412 upvotes</div>
Made a cinematic microdrama from a 2-sentence prompt — twist ending surprised even me [AI video]
          </div>
        </div>
      </div>
      <div className="social-card-footer">      <span className="social-count">Active in       <strong>6</strong> subreddits</span>      <a href="#" className="social-cta-link">View posts →</a></div>
    </div>
  </div>
  <div className="comm-share-cta">
    <div className="callout-chip">Share yours</div>
    <h2>Your story belongs here.</h2>
    <p>Made something with Vivi? Tag us and we will feature the best ones on this page, our socials, and our weekly newsletter.</p>
    <div className="tag-row">    <span className="tag-pill">#MadeWithVivi</span>    <span className="tag-pill">@viviai on Instagram</span>    <span className="tag-pill">@viviai on TikTok</span>    <span className="tag-pill">@viviai on X</span></div>
    <button className="btn-primary btn-large">Make your first video free</button>
  </div>
</div>
    </PageNavigation>
  );
}
