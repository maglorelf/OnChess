import { getAllBlogSlugs, getBlogData } from '@/lib/mdUtils';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

// Import translations
import enTranslations from '@/lib/translations/en';
import esTranslations from '@/lib/translations/es';
// Import the component client
import BlogRenderer from '@/components/BlogRenderer';
import BlogPostClient from '@/components/BlogPostClient';

export async function generateStaticParams() {
  // Return array of { slug } objects for static routing
  return getAllBlogSlugs().map(({ params }) => params);
}

export async function generateMetadata({ params, searchParams }) {
  // Await params and searchParams as suggested by the Next.js error messages
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { slug } = awaitedParams; // Destructure slug from awaitedParams
  const languageParam = awaitedSearchParams?.lang;

  // Try to get blog data with language preference, fall back if not found
  try {
    const blogData = getBlogData(slug, languageParam) || getBlogData(slug);

    if (!blogData) {
      return {
        title: 'Blog Post Not Found | OnChess',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: `${blogData.title} | OnChess Blog`,
      description: blogData.excerpt || 'Chess article on OnChess',
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found | OnChess',
      description: 'The requested blog post could not be found.',
    };
  }
}

// Server Component fallback for image placeholder
function ServerPlaceholder({ text, bgColor = '#3a506b' }) {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{
        backgroundColor: bgColor,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10">
        {Array(64)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className={`${
                (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
      </div>
      <div className="z-10 text-center p-4">
        <div className="text-lg font-bold">{text}</div>
      </div>
    </div>
  );
}

export default async function BlogPost({ params }) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  // Get all available blog data (we'll filter by language on the client)
  let blogData = getBlogData(slug);
  // If not found, return 404
  if (!blogData) {
    // We'll use English translations for server component
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{enTranslations.blog.postNotFound}</h1>
          <p className="mb-8">{enTranslations.blog.postNotFoundDesc}</p>
          <Link href="/blog" className="text-primary hover:underline">
            ← {enTranslations.blog.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  // Determine background color based on slug
  const bgColor = slug.includes('chess-strategies') ? '#3a506b' : '#1b4332';

  // Serialize the content only if it's MDX
  let serializedMDX = null;
  if (blogData.fileType === 'mdx') {
    serializedMDX = await serialize(blogData.content, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
        remarkPlugins: [
          remarkGfm, // Admite tablas, tachados, etc.
          remarkMath, // Admite fórmulas matemáticas
        ],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          rehypeHighlight, // Resaltado de sintaxis para bloques de código
        ],
        format: 'mdx',
      },
      parseFrontmatter: true,
      scope: blogData,
    });
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostClient blogData={blogData} serializedMDX={serializedMDX} bgColor={bgColor} />
    </Suspense>
  );
}
