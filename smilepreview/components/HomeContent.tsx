"use client";

import Link from "next/link";
import { ArrowRight, Upload, Cpu, Smile, Star, ChevronDown } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import AffiliateCard from "@/components/AffiliateCard";
import { useLang } from "@/components/LanguageProvider";

const brands = [
  { brand: "Invisalign", logoInitial: "I", priceRange: "$3,000–$8,000", treatmentTime: "6–18 months", highlight: "Most cases, longest track record", rating: 4.8, affiliateUrl: "#invisalign", color: "#2563EB" },
  { brand: "Byte",       logoInitial: "B", priceRange: "$1,895–$2,295", treatmentTime: "3–5 months",  highlight: "HyperByte® accelerator included free", rating: 4.5, affiliateUrl: "#byte",       color: "#10B981" },
  { brand: "Candid",     logoInitial: "C", priceRange: "$2,400–$3,200", treatmentTime: "6–12 months", highlight: "Orthodontist-led remote care",         rating: 4.6, affiliateUrl: "#candid",    color: "#8B5CF6" },
  { brand: "SmileDirect",logoInitial: "S", priceRange: "$1,950",        treatmentTime: "4–6 months",  highlight: "Lowest price, flexible financing",    rating: 3.9, affiliateUrl: "#smiledirect",color: "#F59E0B" },
];

const blogPosts = [
  { slug: "best-clear-aligners",        title: "Best Clear Aligners 2025: Ranked & Reviewed",       excerpt: "We tested the top 5 clear aligner brands so you don't have to. Full cost, timeline, and results breakdown.", category: "Reviews",          readTime: "12 min" },
  { slug: "clear-aligners-cost",        title: "How Much Do Clear Aligners Cost in 2025?",           excerpt: "Complete pricing guide covering Invisalign, Byte, Candid, and budget options — plus how to get insurance to pay.", category: "Cost & Insurance", readTime: "8 min" },
  { slug: "how-long-does-invisalign-take", title: "How Long Does Invisalign Take? Timeline by Case", excerpt: "Mild crowding? Severe overbite? We break down treatment duration by severity so you know what to expect.",       category: "Clear Aligners",   readTime: "7 min" },
];

const testimonials = [
  { name: "Jessica M.", age: 28, quote: "The simulator was spot-on. My actual Invisalign results look almost exactly like what SmilePreview showed me. Saved me months of uncertainty!", rating: 5, location: "Austin, TX" },
  { name: "Daniel K.",  age: 34, quote: "I was on the fence for two years. The AI analysis told me I had moderate crowding and gave me a 9-month estimate — my ortho confirmed the same thing.", rating: 5, location: "Chicago, IL" },
  { name: "Priya S.",   age: 26, quote: "Used this to compare Invisalign vs Byte. The compare tool and AI breakdown helped me save over $3,000 by choosing the right plan for my case.", rating: 5, location: "San Francisco, CA" },
];

const stepIcons = [
  <Upload key="u" className="w-8 h-8 text-brand-blue" />,
  <Cpu    key="c" className="w-8 h-8 text-brand-mint" />,
  <Smile  key="s" className="w-8 h-8 text-brand-blue" />,
];

export default function HomeContent() {
  const { t } = useLang();
  const h = t.home;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="leaderboard" position="above-fold" className="mb-8 hidden md:flex" />
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-brand-blue text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Star className="w-4 h-4 fill-brand-blue" /> {h.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight text-balance mb-6">
              {h.h1a}{" "}<span className="text-brand-blue">{h.h1b}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 text-balance">{h.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulator" className="btn-primary text-lg py-4 px-8">
                {h.cta1} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/compare" className="btn-outline text-lg py-4 px-8">
                {h.cta2}
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-4">{h.legalNote}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{h.howTitle}</h2>
            <p className="section-subheading">{h.howSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                  {stepIcons[i]}
                </div>
                <div className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-2">
                  {h.stepLabel} {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/simulator" className="btn-primary">
              {h.howCta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {h.trustStats.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-extrabold text-brand-blue mb-1">{item.stat}</div>
                <div className="text-sm text-gray-500 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{h.testimonialsTitle}</h2>
            <p className="section-subheading">{h.testimonialsSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review) => (
              <div key={review.name} className="card flex flex-col gap-4">
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900 text-sm">{review.name}, {review.age}</p>
                  <p className="text-xs text-gray-400">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{h.brandsTitle}</h2>
            <p className="section-subheading">{h.brandsSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <AffiliateCard key={brand.brand} {...brand} />
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">{h.brandsDisclosure}</p>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-heading">{h.blogTitle}</h2>
              <p className="section-subheading">{h.blogSub}</p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex btn-outline text-sm py-2 px-4">
              {h.blogViewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card hover:border-brand-blue hover:shadow-md transition-all group">
                <span className="inline-block bg-blue-100 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-brand-blue text-sm font-medium">
                  {h.blogReadMore} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="btn-outline">{h.blogViewAll}</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{h.faqTitle}</h2>
          </div>
          <div className="space-y-4">
            {h.faqItems.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-2xl group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ms-4" />
                </summary>
                <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-blue">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{h.ctaTitle}</h2>
          <p className="text-blue-100 text-lg mb-8">{h.ctaSub}</p>
          <Link href="/simulator" className="inline-flex items-center gap-2 bg-white text-brand-blue font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-colors text-lg">
            {h.ctaBtn} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <div className="py-6 bg-white flex justify-center">
        <AdSlot size="leaderboard" position="footer" />
      </div>
    </>
  );
}
