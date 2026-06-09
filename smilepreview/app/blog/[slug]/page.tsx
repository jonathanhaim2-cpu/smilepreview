import { notFound } from "next/navigation";
import { getAllSlugs, getPostContent, getAllPosts } from "@/lib/posts";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import ArticleLayout from "@/components/ArticleLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AdSlot from "@/components/AdSlot";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { meta } = getPostContent(params.slug);
    return buildMetadata({
      title: meta.title,
      description: meta.description,
      canonical: `https://smilepreview.com/blog/${meta.slug}`,
    });
  } catch {
    return {};
  }
}

const mdComponents: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">{children}</h3>,
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-5">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-700">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-700">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => <a href={href} className="text-brand-blue hover:text-blue-700 underline">{children}</a>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-blue bg-blue-50 px-5 py-3 my-6 rounded-r-xl italic text-gray-700">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-blue-50">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-gray-100">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b-2 border-brand-blue text-sm">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-700 border-b border-gray-100">{children}</td>
  ),
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostContent(params.slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== params.slug && p.category === post.meta.category)
    .slice(0, 4);

  const articleSchema = buildArticleSchema({
    title: post.meta.title,
    description: post.meta.description,
    slug: post.meta.slug,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
  });

  const paragraphs = post.content.split("\n\n");
  const firstPart = paragraphs.slice(0, 3).join("\n\n");
  const rest = paragraphs.slice(3).join("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleLayout meta={post.meta} relatedPosts={related}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {firstPart}
        </ReactMarkdown>

        <div className="my-6 flex justify-center">
          <AdSlot size="rectangle" position="in-article-p3" />
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {rest}
        </ReactMarkdown>
      </ArticleLayout>
    </>
  );
}
