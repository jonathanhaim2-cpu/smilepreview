"use client";

import Link from "next/link";
import { Clock, Tag, ArrowRight } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import { useLang } from "@/components/LanguageProvider";
import type { PostMeta } from "@/lib/posts";

interface BlogContentProps {
  posts: PostMeta[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const { t } = useLang();
  const b = t.blog;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{b.headerTitle}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{b.headerSub}</p>
        </div>
      </section>

      <div className="py-4 flex justify-center border-b border-gray-100 bg-white">
        <AdSlot size="leaderboard" position="blog-top" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {b.categories.map((cat, i) => (
            <span
              key={cat}
              className={`text-sm font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${
                i === 0
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <>
              {i === 3 && (
                <div key="ad" className="md:col-span-2 lg:col-span-3 flex justify-center py-2">
                  <AdSlot size="leaderboard" position="in-feed" />
                </div>
              )}
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-blue transition-all group flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{post.description}</p>
                <div className="flex items-center gap-1 text-brand-blue text-sm font-medium mt-auto">
                  {b.readArticle} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
