import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://alignersteeth.com";
  const slugs = getAllSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
