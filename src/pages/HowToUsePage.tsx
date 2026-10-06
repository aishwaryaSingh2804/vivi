import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function HowToUsePage() {
  return (
    <PageNavigation>
      <div id="page-how-to-use" className="page">
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '72px 40px' } as CSSProperties}>
    <a href="#page-resources" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px', display: 'inline-block' } as CSSProperties}>← Resources</a>
    <div className="section-overline">Guide</div>
    <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(36px,5vw,52px)', fontWeight: '700', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.1' } as CSSProperties}>How to use Visl.</h1>
    <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '48px' } as CSSProperties}>From idea to published video in under 10 minutes.</p>
    <div className="how-step">
      <div className="how-step-num">1</div>
      <div>
        <div className="how-step-h">Write your story idea</div>
        <p className="how-step-p">Type a description in the creation box or the Studio. Anything from one sentence to a full paragraph. Visl reads your intent and builds from it. You can also paste a link to a news article or Wikipedia page.</p>
        <div className="how-tip">💡         <span>        <strong>Tip:</strong> Be specific. The more texture you give, the more cinematic the result.</span></div>
      </div>
    </div>
    <div className="how-step">
      <div className="how-step-num">2</div>
      <div>
        <div className="how-step-h">Choose your visual style</div>
        <p className="how-step-p">Visl suggests a style based on your story type. Available styles: Pixar 3D, Indian Ghibli, Cinematic Realistic, 2D Animation, Watercolour.</p>
      </div>
    </div>
    <div className="how-step">
      <div className="how-step-num">3</div>
      <div>
        <div className="how-step-h">Review the script (optional)</div>
        <p className="how-step-p">Before generating visuals, Visl shows you the script. Edit dialogue, change scene order, or accept as-is. Creator and Pro users can upload their own voice for narration here.</p>
      </div>
    </div>
    <div className="how-step">
      <div className="how-step-num">4</div>
      <div>
        <div className="how-step-h">Wait for generation (4-8 min)</div>
        <p className="how-step-p">Visl generates your video: visuals, consistent characters, voice, music. You will get a notification when ready. Pro users get instant generation.</p>
        <div className="how-tip">💡         <span>You do not need to stay on the page. We will notify you.</span></div>
      </div>
    </div>
    <div className="how-step">
      <div className="how-step-num">5</div>
      <div>
        <div className="how-step-h">Download or publish directly</div>
        <p className="how-step-p">Download as MP4 or publish directly to YouTube, TikTok, or Instagram. Subtitles auto-generated in 12 languages on Creator and Pro. You own the video, use it commercially, no attribution required.</p>
      </div>
    </div>
    <div style={{ background: '#FFF9F0', border: '1px solid rgba(200,131,26,.2)', borderRadius: '14px', padding: '32px', marginTop: '48px' } as CSSProperties}>
      <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '24px', color: 'var(--text)', marginBottom: '8px' } as CSSProperties}>Ready to try it?</h3>
      <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' } as CSSProperties}>First 3 videos free. No credit card.</p>
      <button className="btn-primary btn-large" data-route="studio">Open the Studio →</button>
    </div>
  </div>
</div>
    </PageNavigation>
  );
}
