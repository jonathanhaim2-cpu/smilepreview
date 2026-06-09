"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, AlertCircle, Clock, ArrowRight, Star, Sparkles } from "lucide-react";
import type { SmileAnalysis } from "@/lib/claude";
import AffiliateCard from "./AffiliateCard";
import AdSlot from "./AdSlot";
import { useLang } from "@/components/LanguageProvider";

interface SimulatorResultsProps {
  analysis: SmileAnalysis;
  originalImageUrl: string;
  simulatedImageUrl: string | null;
}

const complexityColors = {
  mild:     { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  moderate: { bg: "bg-yellow-50",  text: "text-yellow-700",  border: "border-yellow-200" },
  severe:   { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200" },
};

const brands = [
  { brand: "Invisalign", logoInitial: "I", priceRange: "$3,000–$8,000", treatmentTime: "6–18 months", highlight: "Best for complex cases",    rating: 4.8, affiliateUrl: "https://www.invisalign.com/find-a-doctor?utm_source=alignersteeth", color: "#2563EB" },
  { brand: "Byte",       logoInitial: "B", priceRange: "$1,895–$2,295", treatmentTime: "3–5 months",  highlight: "Fastest mild-case results", rating: 4.5, affiliateUrl: "https://www.byte.com/?utm_source=alignersteeth",                    color: "#10B981" },
  { brand: "AlignerCo",  logoInitial: "A", priceRange: "$945–$1,145",   treatmentTime: "4–6 months",  highlight: "Most affordable option",    rating: 4.3, affiliateUrl: "https://alignerco.com/?utm_source=alignersteeth",                  color: "#8B5CF6" },
];

export default function SimulatorResults({
  analysis,
  originalImageUrl,
  simulatedImageUrl,
}: SimulatorResultsProps) {
  const { t } = useLang();
  const r = t.results;
  const cx = complexityColors[analysis.complexity];

  return (
    <div className="space-y-8">

      {/* ── Before / After ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <div className="bg-gray-100 text-center text-xs font-bold text-gray-500 tracking-widest py-2 uppercase">
            {r.before}
          </div>
          <Image
            src={originalImageUrl}
            alt="Your teeth before treatment"
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-brand-mint">
          <div className="bg-brand-mint text-center text-xs font-bold text-white tracking-widest py-2 uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> {r.after}
          </div>

          {simulatedImageUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={simulatedImageUrl}
                alt="AI-simulated result after clear aligner treatment"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="bg-white/90 text-xs font-semibold text-gray-700 px-3 py-1 rounded-full shadow-sm">
                  {r.aiLabel}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col items-center justify-center p-8 min-h-[220px] text-center gap-3">
              <Sparkles className="w-10 h-10 text-brand-mint" />
              <p className="font-semibold text-gray-800">Visual simulation coming soon</p>
              <p className="text-sm text-gray-500 max-w-xs">
                Connect a Replicate API key to enable AI-generated before/after images.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Analysis Card ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-gray-900">{r.title}</h2>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${cx.bg} ${cx.text} ${cx.border}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {r.complexity[analysis.complexity]} {r.complexitySuffix}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{r.issuesTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.issuesFound.map((issue) => (
              <span key={issue} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-lg">
                <AlertCircle className="w-3 h-3" /> {issue}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
              <Clock className="w-3.5 h-3.5" /> {r.treatmentTime}
            </div>
            <p className="font-bold text-gray-900 text-lg">{analysis.treatmentDuration}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
              <Star className="w-3.5 h-3.5" /> {r.confidence}
            </div>
            <p className="font-bold text-gray-900 text-lg">
              {r.confidenceLevel[analysis.complexity]}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">{r.assessmentTitle}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{analysis.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">{r.simulatedTitle}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{analysis.simulatedResult}</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800 mb-1">{r.recommendationTitle}</p>
              <p className="text-sm text-emerald-700">{analysis.recommendation}</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>{r.disclaimer}</strong> {r.disclaimerText}{" "}
            {analysis.confidenceNote} {r.disclaimerSuffix}
          </p>
        </div>
      </div>

      <AdSlot size="rectangle" position="results-mid" className="my-4" />

      {/* ── Affiliate Brands ── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{r.brandsTitle}</h2>
        <p className="text-gray-600 text-sm mb-5">
          {analysis.complexity === "mild"
            ? r.brandsMild
            : analysis.complexity === "moderate"
            ? r.brandsModerate
            : r.brandsSevere}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {brands.map((b) => <AffiliateCard key={b.brand} {...b} />)}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">{r.compareTitle}</h3>
          <p className="text-sm text-gray-600">{r.compareText}</p>
        </div>
        <Link href="/compare" className="btn-primary whitespace-nowrap flex-shrink-0">
          {r.compareBtn} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <AdSlot size="rectangle" position="results-bottom" />
    </div>
  );
}
