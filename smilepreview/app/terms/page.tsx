import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SmilePreview",
  description: "SmilePreview terms of service and conditions of use.",
  alternates: { canonical: "https://alignersteeth.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: January 2025</p>

        <div className="prose-content space-y-8">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using SmilePreview (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2>Description of Service</h2>
            <p>
              SmilePreview provides an AI-powered smile simulation tool, educational content about clear aligner treatment, and brand comparison information. The Service is for <strong>educational and informational purposes only</strong> and does not constitute medical or dental advice.
            </p>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <ul>
              <li>You must be at least 18 years old to use the simulator</li>
              <li>You may only upload photos of yourself or individuals for whom you have explicit consent</li>
              <li>You agree not to upload inappropriate, offensive, or illegal content</li>
              <li>You agree not to misrepresent AI simulation results as professional medical assessments</li>
              <li>You agree not to use the Service for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>
              All content on SmilePreview — including text, graphics, logos, and software — is the property of SmilePreview or its licensors and is protected by copyright law. You may not reproduce, distribute, or create derivative works without express written permission.
            </p>
          </section>

          <section>
            <h2>Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; without warranty of any kind. SmilePreview makes no warranties, express or implied, regarding the accuracy, reliability, or fitness for any particular purpose of the Service or its content.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              SmilePreview shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service, even if SmilePreview has been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2>Affiliate Relationships</h2>
            <p>
              SmilePreview participates in affiliate marketing programs. We may earn commissions when you click links to partner brands and make purchases. This does not affect the price you pay. All affiliate relationships are disclosed.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              SmilePreview reserves the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of the United States. Any disputes shall be resolved in accordance with applicable federal and state law.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>For questions about these terms: <a href="mailto:legal@alignersteeth.com">legal@alignersteeth.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
