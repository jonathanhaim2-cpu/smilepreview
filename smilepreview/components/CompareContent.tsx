"use client";

import Link from "next/link";
import { Check, X, Star, ExternalLink, ShoppingCart } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import { useLang } from "@/components/LanguageProvider";

const brands = [
  {
    name: "Invisalign", initial: "I", color: "#2563EB",
    price: "$3,000–$8,000", avgPrice: 5200, time: "6–18 months",
    doctorType: "In-person orthodontist", caseRange: "Mild to Severe",
    warranty: "Refinements included", financing: "CareCredit, provider plans",
    rating: 4.8, reviewCount: "100k+", bestFor: "All cases, especially complex",
    affiliateUrl: "https://www.invisalign.com/find-a-doctor?utm_source=alignersteeth",
    pros: ["Widest case range — treats complex cases", "Proprietary SmartTrack® material", "3D ClinCheck simulation before treatment", "Attachments for precise tooth control", "80,000+ trained providers worldwide"],
    cons: ["Most expensive option", "Requires regular office visits", "Not available without a licensed provider"],
    features: { hfvTech: false, attachments: true, inPersonVisits: true, ongoingMonitoring: true, nightOnlyOption: false, whitening: false, retainersIncluded: false, fsaEligible: true },
  },
  {
    name: "Byte", initial: "B", color: "#10B981",
    price: "$1,895–$2,295", avgPrice: 1895, time: "3–5 months",
    doctorType: "Remote dentist (initial review)", caseRange: "Mild only",
    warranty: "For-Life Guarantee", financing: "Affirm, $69+/mo",
    rating: 4.5, reviewCount: "25k+", bestFor: "Mild crowding & fastest results",
    affiliateUrl: "https://www.byte.com/?utm_source=alignersteeth",
    pros: ["HyperByte® vibration accelerator (free)", "Fastest treatment time available", "For-Life Guarantee", "All-inclusive flat pricing", "At-home convenience"],
    cons: ["Mild cases only", "Minimal ongoing clinical oversight", "No attachments available"],
    features: { hfvTech: true, attachments: false, inPersonVisits: false, ongoingMonitoring: false, nightOnlyOption: true, whitening: true, retainersIncluded: true, fsaEligible: true },
  },
  {
    name: "AlignerCo", initial: "A", color: "#8B5CF6",
    price: "$945–$1,145", avgPrice: 1045, time: "4–6 months",
    doctorType: "Remote dentist review", caseRange: "Mild only",
    warranty: "Smile Guarantee", financing: "From $39/mo",
    rating: 4.3, reviewCount: "8k+", bestFor: "Tightest budget, mild cases",
    affiliateUrl: "https://alignerco.com/?utm_source=alignersteeth",
    pros: ["Lowest price on the market ($945)", "Free whitening included", "Night-only plan available", "Simple at-home impression kit", "HSA/FSA eligible"],
    cons: ["Mild cases only", "No in-person visits", "Less established brand", "Longer shipping times reported"],
    features: { hfvTech: false, attachments: false, inPersonVisits: false, ongoingMonitoring: false, nightOnlyOption: true, whitening: true, retainersIncluded: true, fsaEligible: true },
  },
  {
    name: "NewSmile", initial: "N", color: "#F59E0B",
    price: "$1,149–$1,649", avgPrice: 1399, time: "4–6 months",
    doctorType: "Remote licensed dentist", caseRange: "Mild to Moderate",
    warranty: "Smile Guarantee", financing: "From $49/mo (0% APR)",
    rating: 4.4, reviewCount: "12k+", bestFor: "Best value mid-range option",
    affiliateUrl: "https://www.newsmile.com/?utm_source=alignersteeth",
    pros: ["Competitive pricing with good quality", "Free whitening & retainer included", "0% APR financing available", "Remote dentist monitoring", "Night aligner option"],
    cons: ["Mild to moderate cases only", "No in-person visits", "Newer brand — less long-term data"],
    features: { hfvTech: false, attachments: false, inPersonVisits: false, ongoingMonitoring: true, nightOnlyOption: true, whitening: true, retainersIncluded: true, fsaEligible: true },
  },
];

const amazonProducts = [
  {
    name: "Crest 3D Whitestrips Professional Effects",
    description: "Most popular whitening strips. 20 treatments, noticeably whiter in 3 days.",
    price: "~$40",
    category: "Teeth Whitening",
    url: "https://www.amazon.com/s?k=crest+3d+whitestrips+professional+effects&tag=alignersteeth-20",
    badge: "Best Seller",
    badgeColor: "bg-orange-500",
  },
  {
    name: "Oral-B iO Series 4 Electric Toothbrush",
    description: "AI-powered brushing with 5 modes. Perfect for aligner wearers.",
    price: "~$80",
    category: "Electric Toothbrush",
    url: "https://www.amazon.com/s?k=oral-b+io+series+electric+toothbrush&tag=alignersteeth-20",
    badge: "Editor's Pick",
    badgeColor: "bg-blue-500",
  },
  {
    name: "Waterpik Aquarius Water Flosser",
    description: "Essential for cleaning around aligners and braces. 10 pressure settings.",
    price: "~$60",
    category: "Water Flosser",
    url: "https://www.amazon.com/s?k=waterpik+aquarius+water+flosser&tag=alignersteeth-20",
    badge: "Must Have",
    badgeColor: "bg-teal-500",
  },
  {
    name: "Retainer Brite Cleaning Tablets",
    description: "Keep aligners crystal clear and odor-free. Works on all aligner brands.",
    price: "~$12",
    category: "Aligner Cleaner",
    url: "https://www.amazon.com/s?k=retainer+brite+cleaning+tablets+aligners&tag=alignersteeth-20",
    badge: "Great Value",
    badgeColor: "bg-green-500",
  },
  {
    name: "Colgate Optic White Pro Series Toothpaste",
    description: "5% hydrogen peroxide toothpaste. Dentist-recommended whitening.",
    price: "~$15",
    category: "Whitening Toothpaste",
    url: "https://www.amazon.com/s?k=colgate+optic+white+pro+series+toothpaste&tag=alignersteeth-20",
    badge: "Top Rated",
    badgeColor: "bg-purple-500",
  },
  {
    name: "Philips Sonicare ProtectiveClean 4100",
    description: "Gentle yet effective sonic toothbrush. Pressure sensor protects gums.",
    price: "~$50",
    category: "Electric Toothbrush",
    url: "https://www.amazon.com/s?k=philips+sonicare+protectiveclean+4100&tag=alignersteeth-20",
    badge: "Top Pick",
    badgeColor: "bg-indigo-500",
  },
];

type FeatureKey = "hfvTech" | "attachments" | "inPersonVisits" | "ongoingMonitoring" | "nightOnlyOption" | "whitening" | "retainersIncluded" | "fsaEligible";

export default function CompareContent() {
  const { t } = useLang();
  const c = t.compare;

  const tableRows = [
    { label: c.priceRange,      values: brands.map((b) => b.price) },
    { label: c.treatmentTime,   values: brands.map((b) => b.time) },
    { label: c.doctorOversight, values: brands.map((b) => b.doctorType) },
    { label: c.caseRange,       values: brands.map((b) => b.caseRange) },
    { label: c.warranty,        values: brands.map((b) => b.warranty) },
    { label: c.financing,       values: brands.map((b) => b.financing) },
  ];

  const featureKeys: FeatureKey[] = ["hfvTech", "attachments", "inPersonVisits", "ongoingMonitoring", "nightOnlyOption", "whitening", "retainersIncluded", "fsaEligible"];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{c.headerTitle}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{c.headerSub}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: brand.color }}>
                  {brand.initial}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{brand.name}</h2>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(brand.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                    ))}
                    <span className="text-xs text-gray-500 ms-1">{brand.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-xl font-extrabold text-gray-900 mb-0.5">{brand.price}</p>
              <p className="text-xs text-gray-500 mb-3">{brand.time}</p>
              <p className="text-xs font-medium text-brand-mint mb-4">{c.bestFor} {brand.bestFor}</p>
              <a href={brand.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: brand.color }}>
                {c.getStarted} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-start px-5 py-4 font-semibold text-gray-700 min-w-[180px]">Feature</th>
                  {brands.map((b) => (
                    <th key={b.name} className="px-4 py-4 text-center font-bold text-gray-900 min-w-[140px]">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: b.color }}>{b.initial}</div>
                        {b.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3.5 font-medium text-gray-700">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="px-4 py-3.5 text-center text-gray-700 text-xs">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center my-6">
          <AdSlot size="rectangle" position="compare-mid" />
        </div>

        {/* Feature matrix */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">{c.featureTitle}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-start px-5 py-3 font-medium text-gray-700 min-w-[220px]">Feature</th>
                  {brands.map((b) => (
                    <th key={b.name} className="px-4 py-3 text-center font-bold min-w-[120px]" style={{ color: b.color }}>{b.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureKeys.map((key, i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3 text-gray-700">{c.featureLabels[key]}</td>
                    {brands.map((b) => (
                      <td key={b.name} className="px-4 py-3 text-center">
                        {b.features[key]
                          ? <Check className="w-5 h-5 text-brand-mint mx-auto" />
                          : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed brand cards */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{c.detailedTitle}</h2>
        <div className="space-y-6 mb-10">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: brand.color }}>{brand.initial}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-gray-500">{brand.price} · {brand.time}</p>
                  </div>
                </div>
                <a href={brand.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 text-white text-sm font-semibold py-2.5 px-5 rounded-xl"
                  style={{ backgroundColor: brand.color }}>
                  {c.getStarted} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">{c.pros}</h4>
                  <ul className="space-y-1.5">
                    {brand.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-brand-mint flex-shrink-0 mt-0.5" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">{c.cons}</h4>
                  <ul className="space-y-1.5">
                    {brand.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amazon Products Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Essential Products for Aligner Wearers</h2>
          </div>
          <p className="text-gray-600 mb-6 text-sm">Everything you need to maximize your aligner results — available on Amazon.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amazonProducts.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{product.category}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-orange-600 transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{product.price}</span>
                  <span className="text-xs font-semibold text-orange-500 flex items-center gap-1">
                    View on Amazon <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* As an Amazon Associate we earn from qualifying purchases.</p>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{c.ctaTitle}</h2>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">{c.ctaSub}</p>
          <Link href="/simulator" className="btn-primary text-base py-3.5 px-8">{c.ctaBtn}</Link>
          <p className="text-xs text-gray-400 mt-4">{c.disclosure}</p>
        </div>
      </div>
    </div>
  );
}
