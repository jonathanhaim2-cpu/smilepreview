"use client";

import { useState } from "react";
import type { SmileAnalysis } from "@/lib/claude";
import SmileUploader from "@/components/SmileUploader";
import SimulatorResults from "@/components/SimulatorResults";
import AdSlot from "@/components/AdSlot";
import { ShieldCheck, Zap, Star } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function SimulatorPage() {
  const [result, setResult] = useState<{
    analysis: SmileAnalysis;
    imageUrl: string;
    simulatedImageUrl: string | null;
  } | null>(null);

  const { t } = useLang();
  const s = t.simulator;

  const handleResult = (analysis: SmileAnalysis, imageUrl: string, simulatedImageUrl: string | null) => {
    setResult({ analysis, imageUrl, simulatedImageUrl });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-brand-blue text-sm font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Zap className="w-4 h-4" /> {s.badge}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{s.heading}</h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">{s.subheading}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, label: s.private },
              { icon: <Zap className="w-4 h-4" />,         label: s.speed },
              { icon: <Star className="w-4 h-4" />,        label: s.rating },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                {item.icon} {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{s.uploadTitle}</h2>
                <p className="text-gray-600 text-sm mb-6">{s.uploadSub}</p>
                <SmileUploader onResult={handleResult} />
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                <strong>Educational Disclaimer:</strong> {s.disclaimer}
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-6">
              <AdSlot size="inline" position="sidebar" />
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-3">{s.sidebarTitle}</h3>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  {s.sidebarItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-mint flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setResult(null)}
              className="mb-6 text-sm text-brand-blue hover:underline flex items-center gap-1"
            >
              {s.analyzeAnother}
            </button>
            <SimulatorResults
              analysis={result.analysis}
              originalImageUrl={result.imageUrl}
              simulatedImageUrl={result.simulatedImageUrl}
            />
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SmilePreview AI Smile Simulator",
            url: "https://alignersteeth.com/simulator",
            applicationCategory: "HealthApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: "Free AI-powered smile simulator. Upload a photo of your teeth and see how clear aligners could improve your smile.",
          }),
        }}
      />
    </div>
  );
}
