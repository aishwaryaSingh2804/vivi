import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import '../styles/Vivi25Banner.css';

export function Vivi25Banner() {
  return (
    <section className="vivi25-banner" aria-label="Vivi 25">
      <div className="vivi25-banner-inner">

        <div className="vivi25-banner-content">
          <span className="vivi25-label">VIVI 25</span>

          <span className="vivi25-message">
            Become a founding creator
          </span>
        </div>

        <Link
          to={ROUTES.CONTACT}
          className="vivi25-apply"
        >
          Apply now
          <span aria-hidden="true">→</span>
        </Link>

      </div>
    </section>
  );
}