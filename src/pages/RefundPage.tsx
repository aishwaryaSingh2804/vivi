import { PageNavigation } from '../components/common/PageNavigation';

export function RefundPage() {
  return (
    <PageNavigation>
      <div id="page-refund" className="page">
  <div className="legal-wrap">
    <h1>Refund &amp; Cancellation Policy</h1>
    <div className="legal-date">Last updated: September 2025</div>
    <div className="legal-mock-notice">📋 Draft document for internal review. Not yet finalised.</div>
    <div className="legal-section">
      <h2>1. Cancellation</h2>
      <p>You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until the period ends.</p>
      <p>Cancellations do not result in a prorated refund for the remaining days in the billing cycle, except where required by applicable law.</p>
    </div>
    <div className="legal-section">
      <h2>2. Refund Eligibility</h2>
      <p>We offer a full refund within       <strong>7 days</strong> of your first payment on a new plan, provided you have generated fewer than 3 videos. To request a refund within this window, contact us at       <strong>billing@visl.ai</strong>.</p>
      <p>After 7 days, or if you have used credits significantly, refunds are evaluated on a case-by-case basis at our discretion.</p>
    </div>
    <div className="legal-section">
      <h2>3. Non-Refundable Items</h2>
      <ul>
        <li>Credits purchased as top-ups (outside a subscription)</li>
        <li>Subscriptions cancelled after the 7-day window</li>
        <li>Accounts terminated for violation of our Terms &amp; Conditions</li>
        <li>Annual plans after the 7-day window (unless required by law)</li>
      </ul>
    </div>
    <div className="legal-section">
      <h2>4. How to Request a Refund</h2>
      <p>Email       <strong>billing@visl.ai</strong> with your account email, the plan purchased, and the reason for the request. We aim to respond within 2 business days and process approved refunds within 5–7 business days to the original payment method.</p>
    </div>
    <div className="legal-section">
      <h2>5. Chargebacks</h2>
      <p>If you initiate a chargeback without contacting us first, your account may be suspended pending investigation. We encourage you to reach out directly — we resolve most issues quickly.</p>
    </div>
  </div>
</div>
    </PageNavigation>
  );
}
