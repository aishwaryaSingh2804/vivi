import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import '../styles/Vivi25Banner.css';

export function Vivi25Banner() {
  return (
    <section className="vivi25-banner" aria-label="Vivi 25">

      <div className="vivi25-banner-inner">

        {/* LEFT — CAMPAIGN */}
        <div className="vivi25-label">
          VIVI 25
        </div>

        {/* CENTER — MESSAGE */}
        <div className="vivi25-message">
          <span className="vivi25-message-dot" />
          <span>Become a founding creator</span>
        </div>

        {/* RIGHT — CTA */}
        <Link
          to={ROUTES.CONTACT}
          className="vivi25-apply"
        >
          <span>Apply now</span>
          <span
            className="vivi25-apply-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </Link>

      </div>

    </section>
  );
}