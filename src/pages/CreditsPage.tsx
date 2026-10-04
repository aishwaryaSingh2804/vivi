import { useMemo, useState } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';
import { calculateSimple } from '../lib/calculator';

type Model = 'Basic' | 'Pro' | 'Max';
type Quality = 'Standard' | 'HD';

export function CreditsPage() {
  const [model, setModel] = useState<Model>('Pro');
  const [quality, setQuality] = useState<Quality>('Standard');
  const [minutes, setMinutes] = useState(1);
  const [includeMusic, setIncludeMusic] = useState(true);

  const estimate = useMemo(
    () => calculateSimple(model, quality, minutes, includeMusic),
    [model, quality, minutes, includeMusic],
  );

  return (
    <PageNavigation>
      <div id="page-credits" className="page">
        <section className="std">
          <a href="#page-resources" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Resources
          </a>
          <div className="section-overline">Credit Calculator</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(36px,5vw,52px)', fontWeight: 700, color: 'var(--text)', marginBottom: 10, lineHeight: 1.1 }}>
            How much will<br />my video cost?
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 520, marginBottom: 0 }}>
            Select your preferences and see the estimated cost. 1 credit = $0.01.
          </p>

          <div className="scr-box">
            <div className="scr-grid">
              <div className="scr-field">
                <label htmlFor="scr-model">Model</label>
                <select id="scr-model" className="scr-sel" value={model} onChange={(event) => setModel(event.target.value as Model)}>
                  <option value="Basic">Basic</option>
                  <option value="Pro">Pro</option>
                  <option value="Max">Max</option>
                </select>
              </div>
              <div className="scr-field">
                <label htmlFor="scr-quality">Quality</label>
                <select id="scr-quality" className="scr-sel" value={quality} onChange={(event) => setQuality(event.target.value as Quality)}>
                  <option value="Standard">Standard (720p)</option>
                  <option value="HD">HD (1080p)</option>
                </select>
              </div>
              <div className="scr-field">
                <label htmlFor="scr-mins">Duration</label>
                <select id="scr-mins" className="scr-sel" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((value) => (
                    <option key={value} value={value}>{value} {value === 1 ? 'minute' : 'minutes'}</option>
                  ))}
                </select>
              </div>
              <div className="scr-field">
                <label htmlFor="scr-music">Background music</label>
                <select id="scr-music" className="scr-sel" value={includeMusic ? 'yes' : 'no'} onChange={(event) => setIncludeMusic(event.target.value === 'yes')}>
                  <option value="yes">With music</option>
                  <option value="no">Without music</option>
                </select>
              </div>
            </div>

            <div className="scr-result" aria-live="polite">
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Estimated cost</div>
                <div className="scr-cost-big">${estimate.usd.toFixed(2)}</div>
                <div className="scr-cost-inr">≈ ₹{estimate.inr.toLocaleString('en-IN')}</div>
                <div className="scr-cost-lbl">{minutes === 1 ? '1-minute' : `${minutes}-minute`} {model} video, {quality}, {includeMusic ? 'with music' : 'no music'}</div>
              </div>
              <div className="scr-credits">
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Credits used</div>
                <div className="scr-cr-num">{estimate.credits.toLocaleString('en-IN')} credits</div>
                <div className="scr-cr-lbl">from your monthly plan</div>
              </div>
            </div>
            <div className="scr-note">
              ℹ Prices are estimates based on current model rates. 25% platform markup included.
              Rates may change. <a href="#page-pricing" style={{ color: 'var(--accent)' }} data-route="pricing">See plans →</a>
            </div>
          </div>

          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <div style={{ background: '#FFF', border: '1px solid #E0DED8', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2E7D32', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>Basic</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Good enough</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>Solid quality for drafts and regular social content. Lower credit cost per video.</p>
            </div>
            <div style={{ background: '#FFF', border: '2px solid var(--accent)', borderRadius: 12, padding: 24, boxShadow: '0 4px 16px rgba(200,131,26,.10)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>Pro ✦ Popular</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Best balance</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>Better motion, more consistent characters. The default choice for most creators.</p>
            </div>
            <div style={{ background: '#FFF', border: '1px solid #E0DED8', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1565C0', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>Max</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Cinematic</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>Premium output for hero content. Best visuals, highest credit cost per video.</p>
            </div>
          </div>
        </section>
      </div>
    </PageNavigation>
  );
}
