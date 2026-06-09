import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SmilePreview",
  description: "SmilePreview privacy policy. Learn how we collect, use, and protect your data.",
  alternates: { canonical: "https://alignersteeth.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: January 2025</p>

        <div className="prose-content space-y-8">
          <section>
            <h2>Information We Collect</h2>
            <p>SmilePreview collects the following types of information:</p>
            <ul>
              <li><strong>Photos you upload:</strong> When you use our smile simulator, you upload a photo of your teeth. This image is sent to our AI analysis service and is not permanently stored on our servers after processing.</li>
              <li><strong>Usage data:</strong> We collect standard web analytics (page views, time on site, referral sources) through analytics services.</li>
              <li><strong>Cookies:</strong> We use cookies for website functionality, analytics, and advertising (Google AdSense).</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide the AI smile analysis service</li>
              <li>To improve our website and user experience</li>
              <li>To serve relevant advertisements through Google AdSense</li>
              <li>To analyze website traffic and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2>Photo Data</h2>
            <p>
              Photos uploaded to the SmilePreview simulator are processed in real-time by our AI service (Anthropic Claude). We do not permanently store your photos on our servers. Photos are transmitted securely over HTTPS and processed solely to generate your smile analysis.
            </p>
            <p>
              <strong>We strongly advise:</strong> Do not upload photos that contain sensitive personal information beyond your teeth (e.g., ensure no identification documents are visible in the background).
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Anthropic Claude API:</strong> AI analysis of uploaded photos. Subject to Anthropic&apos;s privacy policy.</li>
              <li><strong>Google AdSense:</strong> Advertising platform. Google may use cookies to serve personalized ads. You can opt out at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
              <li><strong>Vercel Analytics:</strong> Website performance and traffic analytics.</li>
            </ul>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              SmilePreview uses cookies for website functionality and advertising. You can control cookie settings through your browser. Note that disabling cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2>Children&apos;s Privacy</h2>
            <p>
              SmilePreview is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has submitted information to us, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request information about data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of advertising cookies</li>
              <li>Contact us with privacy concerns</li>
            </ul>
          </section>

          <section>
            <h2>Contact</h2>
            <p>For privacy-related questions, contact us at: <a href="mailto:privacy@alignersteeth.com">privacy@alignersteeth.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
