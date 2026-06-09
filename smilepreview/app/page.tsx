import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SmilePreview — Free AI Smile Simulator for Clear Aligners",
  description:
    "Upload your photo and see how clear aligners could transform your smile in seconds. Free AI-powered simulation with personalized treatment estimates.",
  alternates: { canonical: "https://alignersteeth.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How does the SmilePreview simulator work?", acceptedAnswer: { "@type": "Answer", text: "You upload a clear, front-facing photo of your teeth. Our AI analyzes alignment, crowding, and spacing, then generates a detailed written assessment and a visual simulation of potential results after clear aligner treatment." } },
    { "@type": "Question", name: "Is the smile simulation medically accurate?", acceptedAnswer: { "@type": "Answer", text: "SmilePreview is an educational tool for visualization purposes only. Always consult a dental professional before starting treatment." } },
    { "@type": "Question", name: "How much do clear aligners cost?", acceptedAnswer: { "@type": "Answer", text: "Clear aligner costs range from $1,200 to $8,000 depending on the brand and case complexity." } },
    { "@type": "Question", name: "How long does clear aligner treatment take?", acceptedAnswer: { "@type": "Answer", text: "Mild cases take 3–6 months, moderate cases 6–12 months, and complex cases 12–24 months." } },
    { "@type": "Question", name: "Which clear aligner brand is the best?", acceptedAnswer: { "@type": "Answer", text: "The best brand depends on your specific needs. Invisalign is most established, Byte is fastest for mild cases, Candid offers a good balance of cost and oversight." } },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeContent />
    </>
  );
}
