import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import '../styles/footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="vivi-footer">
      <div className="vivi-footer-inner">

        {/* Brand */}
        <div className="vivi-footer-brand">
          <Link to={ROUTES.HOME} className="vivi-footer-logo">
            vi<span>vi</span>
          </Link>

          <p>
            You tell the story. Vivi AI is the tool.
            No camera. No crew. No excuse.
          </p>
        </div>

        {/* Make */}
        <div className="vivi-footer-column">
          <h3>Make</h3>

          <Link to={ROUTES.MICRODRAMA}>
            Microdramas
          </Link>

          <Link to={ROUTES.HISTORY}>
            History videos
          </Link>

          <Link to={ROUTES.KIDS}>
            Kids stories
          </Link>

          <Link to={ROUTES.MICRODRAMA}>
            Adult animation
          </Link>

          <Link to={ROUTES.COMMUNITY}>
            All examples
          </Link>
        </div>

        {/* Product */}
        <div className="vivi-footer-column">
          <h3>Product</h3>

          <Link to={ROUTES.HOW_TO_USE}>
            How it works
          </Link>

          <Link to={ROUTES.PRICING}>
            Pricing
          </Link>

          <Link to={ROUTES.PRICING}>
            For teams
          </Link>

          <Link to={ROUTES.PRICING}>
            API
          </Link>

          <Link to={ROUTES.FAQ}>
            Changelog
          </Link>
        </div>

        {/* Company */}
        <div className="vivi-footer-column">
          <h3>Company</h3>

          <Link to={ROUTES.FAQ}>
            About
          </Link>

          <Link to={ROUTES.BLOG}>
            Blog
          </Link>

          <Link to={ROUTES.FAQ}>
            Careers
          </Link>

          <Link to={ROUTES.CONTACT}>
            Contact
          </Link>

          <Link to={ROUTES.PRIVACY}>
            Privacy
          </Link>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="vivi-footer-bottom">
        <span>
          © {currentYear} Vivi AI. Made in India.
        </span>

        <div className="vivi-footer-socials">
          <a href="#" aria-label="YouTube">
            YouTube
          </a>

          <a href="#" aria-label="Instagram">
            Instagram
          </a>

          <a href="#" aria-label="TikTok">
            TikTok
          </a>

          <a href="#" aria-label="X">
            X
          </a>

          <a href="#" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}