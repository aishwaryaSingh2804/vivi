import { Link } from 'react-router-dom';
import { PageNavigation } from '../components/common/PageNavigation';
import { ROUTES } from '../lib/routes';

export function PrivacyPage() {
  return (
    <PageNavigation>
      <div id="page-privacy" className="page">
        <div className="privacy-wrap">
          <h1>Privacy Policy</h1>

          <p className="privacy-updated">
            Last updated: 16 September 2025 ·{' '}
            <Link
              to={ROUTES.CONTACT}
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              Questions? Contact us
            </Link>
          </p>

          <div className="privacy-highlight">
            <p>
              The short version: we collect what we need to run the service, we
              do not sell your data, we do not train on your content, and you
              can delete everything at any time.
            </p>
          </div>

          <div className="privacy-section">
            <h2>1. Information We Collect</h2>
            <h3>Information you give us</h3>
            <ul>
              <li>
                <strong>Account information</strong> — name, email, and
                password when you sign up.
              </li>
              <li>
                <strong>Payment information</strong> — billing details
                processed by Razorpay or Stripe. Vivi does not store card
                numbers.
              </li>
              <li>
                <strong>Content you create</strong> — story prompts, scripts,
                voice samples, and generated videos stored in your account.
              </li>
              <li>
                <strong>Communications</strong> — messages you send to our
                support team.
              </li>
            </ul>

            <h3>Collected automatically</h3>
            <ul>
              <li>
                <strong>Usage data</strong> — which features you use and how
                often, to improve the product.
              </li>
              <li>
                <strong>Device and browser data</strong> — browser type, OS,
                and IP address for security and analytics.
              </li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To operate your account and generate videos you request.</li>
              <li>To process payments and send billing receipts.</li>
              <li>To send product updates (you can unsubscribe anytime).</li>
              <li>To diagnose technical issues and improve service quality.</li>
              <li>To detect and prevent fraud or misuse.</li>
            </ul>

            <div className="privacy-highlight">
              <p>
                <strong>
                  We do not use your prompts, scripts, or generated videos to
                  train Vivi&apos;s AI models.
                </strong>
              </p>
            </div>
          </div>

          <div className="privacy-section">
            <h2>3. Data Storage &amp; Security</h2>
            <p>
              Data is stored on servers in India and/or the EU, encrypted at
              rest (AES-256) and in transit (TLS 1.2+). Generated videos are
              retained as long as you have an active account. If you close your
              account, all data is permanently deleted within 90 days. Voice
              samples are stored encrypted and never accessible to other users.
            </p>
          </div>

          <div className="privacy-section">
            <h2>4. Sharing Your Information</h2>
            <p>We do not sell your data. We share only with:</p>
            <ul>
              <li>
                <strong>Service providers</strong> — payment processors, cloud
                hosting, analytics. These only process data as instructed by
                us.
              </li>
              <li>
                <strong>Legal requirements</strong> — if required by law or
                court order.
              </li>
              <li>
                <strong>Business transfers</strong> — if Vivi is acquired, your
                data may transfer to the new entity under this policy.
              </li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>5. Cookies</h2>
            <p>
              We use essential cookies (keeping you logged in), analytics
              cookies (aggregate usage, privacy-friendly, no cross-site
              tracking), and no marketing or retargeting cookies.
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>
              You may request: access to your data, correction of inaccurate
              information, deletion of your account and all data, data
              portability, or objection to certain uses. Email{' '}
              <strong>privacy@vivi.ai</strong> and we will respond within 30
              days.
            </p>
          </div>

          <div className="privacy-section">
            <h2>7. Children&apos;s Privacy</h2>
            <p>
              Vivi is for users aged 13+. We do not knowingly collect data from
              children under 13. If you believe a child has created an account,
              contact privacy@vivi.ai and we will delete it promptly.
            </p>
          </div>

          <div className="privacy-section">
            <h2>8. Changes to This Policy</h2>
            <p>
              We will notify you by email of material changes and update this
              page with a new effective date. Continued use after notification
              constitutes acceptance.
            </p>
          </div>

          <div className="privacy-section">
            <h2>9. Contact Us</h2>
            <p>
              Email: <strong>privacy@vivi.ai</strong> · Response within 30 days
              · Vivi AI is a product of Visl AI Pvt. Ltd., registered in India.
            </p>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}