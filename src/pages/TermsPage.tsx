import { PageNavigation } from '../components/common/PageNavigation';

export function TermsPage() {
  return (
    <PageNavigation>
      <div id="page-terms" className="page">
        <div className="legal-wrap">
          <h1>Terms &amp; Conditions</h1>

          <div className="legal-date">Last updated: September 2025</div>

          <div className="legal-mock-notice">
            📋 This is a draft document for internal review. Not yet legally
            binding. Final version to be reviewed by counsel before launch.
          </div>

          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Vivi AI (&quot;the Service&quot;), you agree
              to be bound by these Terms and Conditions. If you do not agree,
              please do not use the Service. These terms apply to all visitors,
              users, and creators.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Account Registration</h2>
            <p>
              You must be at least 13 years old to use Vivi. You are responsible
              for maintaining the confidentiality of your account credentials
              and for all activities that occur under your account. You agree
              to notify us immediately of any unauthorised use.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Permitted Use</h2>
            <p>
              You may use the Service to generate video content for personal,
              creative, and commercial purposes. You may not:
            </p>
            <ul>
              <li>
                Use the Service to generate content that is illegal, harmful,
                defamatory, or violates third-party rights
              </li>
              <li>
                Attempt to reverse-engineer, scrape, or exploit the platform
              </li>
              <li>
                Use the Service to create content that impersonates real
                individuals without consent
              </li>
              <li>
                Resell access to the Service without prior written agreement
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Intellectual Property</h2>
            <p>
              You retain ownership of the videos you generate using Vivi. You
              grant Vivi a limited, non-exclusive licence to store and process
              your content solely for the purpose of providing the Service.
              Vivi&apos;s platform, models, and interface remain the
              intellectual property of Visl AI Pvt. Ltd.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Payment &amp; Credits</h2>
            <p>
              Access to paid features requires the purchase of a subscription
              plan. Credits are non-transferable and expire as outlined in your
              plan. All prices are in USD or INR as displayed at checkout. We
              reserve the right to change pricing with 30 days&apos; notice.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Visl AI Pvt. Ltd. shall
              not be liable for any indirect, incidental, or consequential
              damages arising from your use of the Service. Our total liability
              shall not exceed the amount paid by you in the three months
              preceding the claim.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall
              be subject to the exclusive jurisdiction of the courts in
              [City], India.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <strong>legal@vivi.ai</strong>.
            </p>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}