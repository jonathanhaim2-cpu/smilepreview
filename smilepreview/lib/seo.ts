import type { Metadata } from "next";

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://smilepreview.com/blog/${slug}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "SmilePreview",
      url: "https://smilepreview.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SmilePreview",
      logo: {
        "@type": "ImageObject",
        url: "https://smilepreview.com/logo.png",
      },
    },
  };
}
