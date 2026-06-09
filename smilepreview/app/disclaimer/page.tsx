import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — SmilePreview",
  description: "Important disclaimer about SmilePreview's AI smile simulation tool and content. For educational purposes only — not medical advice.",
  alternates: { canonical: "https://smilepreview.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: January 2025</p>

        <div className="prose-content space-y-8">
          <section>
            <h2>Not Medical Advice</h2>
            <p>
              The information provided by SmilePreview, including our AI smile simulator, blog articles, brand comparisons, and all other content, is for <strong>educational and informational purposes only</strong>. It does not constitute medical advice, diagnosis, or treatment recommendations.
            </p>
            <p>
              SmilePreview is not a licensed medical provider, dental professional, or orthodontist. Nothing on this website should be construed as a professional dental opinion or substitute for consultation with a licensed dental professional.
            </p>
          </section>

          <section>
            <h2>AI Smile Simulator Limitations</h2>
            <p>
              Our AI smile simulator uses artificial intelligence to analyze uploaded photographs and provide a general assessment of visible dental alignment features. This assessment:
            </p>
            <ul>
              <li>Is based solely on what is visible in the photograph — not clinical examination</li>
              <li>Cannot assess bite, bone structure, gum health, or root position</li>
              <li>May be inaccurate due to photo quality, angle, lighting, or other factors</li>
              <li>Is not intended to predict actual treatment outcomes</li>
              <li>Should not be used to make any treatment decisions</li>
            </ul>
            <p>
              The visual simulation produced by SmilePreview is an illustrative approximation only. Actual treatment results will vary significantly based on individual anatomy, treatment brand, provider skill, and patient compliance.
            </p>
          </section>

          <section>
            <h2>Affiliate Disclosure</h2>
            <p>
              SmilePreview participates in affiliate marketing programs with clear aligner brands and other companies. When you click affiliate links on our website and make a purchase, we may receive a commission at no additional cost to you.
            </p>
            <p>
              Affiliate relationships do not influence our editorial opinions, rankings, or recommendations. We disclose all affiliate relationships in accordance with FTC guidelines.
            </p>
          </section>

          <section>
            <h2>No Warranty</h2>
            <p>
              SmilePreview provides all content and tools &ldquo;as is&rdquo; without warranty of any kind, express or implied. We make no representations regarding the accuracy, reliability, or completeness of any information on this website.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              SmilePreview shall not be liable for any damages arising from your use of or reliance on information found on this website, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2>Always Consult a Professional</h2>
            <p>
              Before beginning any orthodontic treatment, please consult a licensed orthodontist or dentist who can perform a complete clinical examination and provide professional guidance tailored to your individual needs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
