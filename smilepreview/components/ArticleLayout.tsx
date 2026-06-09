"use client";

import type { PostMeta } from "@/lib/posts";
import AdSlot from "./AdSlot";
import AffiliateCTA from "./AffiliateCTA";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

interface ArticleLayoutProps {
  meta: PostMeta;
  children: React.ReactNode;
  relatedPosts?: PostMeta[];
}

export default function ArticleLayout({ meta, children, relatedPosts = [] }: ArticleLayoutProps) {
  const { t, lang } = useLang();
  const ar = t.article;

  return (
    <div className="bg-white min-h-screen">
      {/* Article header */}
      <div className="bg-gradient-to-br from-blue-50 to-white border-b border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-medium mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> {ar.backToBlog}
          </Link>

          {lang !== "en" && (
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 ms-3">
              {ar.englishNote}
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full mb-4 block">
            <Tag className="w-3 h-3" /> {meta.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {meta.title}
          </h1>
          <p className="text-gray-600 text-lg mb-5">{meta.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {meta.readTime} {ar.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="py-4 flex justify-center bg-white border-b border-gray-100">
        <AdSlot size="leaderboard" position="below-title" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            <div className="prose-content">{children}</div>
            <AffiliateCTA />
            <div className="mt-8 flex justify-center">
              <AdSlot size="leaderboard" position="article-bottom" />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-5">{ar.relatedArticles}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block border border-gray-200 rounded-xl p-4 hover:border-brand-blue hover:shadow-sm transition-all group"
                    >
                      <span className="text-xs font-semibold text-brand-blue mb-1 block">{post.category}</span>
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-brand-blue transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <span className="text-xs text-gray-400 mt-1 block">{post.readTime} {ar.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <AdSlot size="skyscraper" position="sidebar" />
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{ar.trySim}</h3>
                <p className="text-xs text-gray-600 mb-3">{ar.trySimDesc}</p>
                <Link href="/simulator" className="block text-center bg-brand-blue text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-blue-700 transition-colors">
                  {ar.trySimBtn}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
