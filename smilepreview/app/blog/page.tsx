import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = {
  title: "Clear Aligner Blog — Expert Guides & Reviews",
  description:
    "Expert articles on clear aligners, Invisalign vs Byte comparisons, cost guides, before & after results, and orthodontic tips.",
  alternates: { canonical: "https://alignersteeth.com/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogContent posts={posts} />;
}
