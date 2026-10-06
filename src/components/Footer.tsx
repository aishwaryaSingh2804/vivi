import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import '../styles/footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Also handles clicks when the user is already on the destination page.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  // If already on the homepage, handle repeat clicks on the same hash too.
  const scrollToHomeSection = (sectionId: string) => {
    if (window.location.pathname !== ROUTES.HOME) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };

  return (
    <footer className="vivi-footer">
      <div className="vivi-footer-inner">
        {/* Brand */}
        <div className="vivi-footer-brand">
          <Link
            to={ROUTES.HOME}
            className="vivi-footer-logo"
            onClick={scrollToTop}
          >
            Vi<span>sl</span>
          </Link>

          <p>
            You tell the story. Visl AI is the tool.
            No camera. No crew. No excuse.
          </p>
        </div>

        {/* Product */}
        <div className="vivi-footer-column">
          <h3>Product</h3>

          <Link
            to={`${ROUTES.HOME}#vivi-workflow`}
            onClick={() => scrollToHomeSection('vivi-workflow')}
          >
            How it works
          </Link>

          <Link
            to={`${ROUTES.HOME}#vivi-pricing`}
            onClick={() => scrollToHomeSection('vivi-pricing')}
          >
            Pricing
          </Link>

          <Link to={ROUTES.FAQ} onClick={scrollToTop}>
            FAQs
          </Link>
        </div>

        {/* Company */}
        <div className="vivi-footer-column">
          <h3>Company</h3>

          <Link to={ROUTES.PRIVACY} onClick={scrollToTop}>
            Privacy Policy
          </Link>

          <Link to={ROUTES.TERMS} onClick={scrollToTop}>
            Terms of service
          </Link>

          <Link to={ROUTES.CONTACT} onClick={scrollToTop}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="vivi-footer-bottom">
        <span>
          © {currentYear} Visl AI. Made in India.
        </span>

        <div className="vivi-footer-socials">
          <a href="#" aria-label="YouTube">YouTube</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="TikTok">TikTok</a>
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
