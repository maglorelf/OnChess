import { getAllBlogSlugs, getBlogData } from '@/lib/mdUtils';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const paths = getAllBlogSlugs();
  return paths;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blogData = getBlogData(slug);

  return {
    title: `${blogData.title} | OnChess Blog`,
    description: blogData.excerpt,
  };
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
  const { slug } = await params;
  const blogData = getBlogData(slug);

  // Determine background color based on slug
  const bgColor = slug.includes('chess-strategies') ? '#3a506b' : '#1b4332';

  // Custom components for markdown rendering
  const components = {
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
    p: ({ node, ...props }) => <p className="my-4" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 my-4 overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 rounded-md px-1" {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 dark:text-blue-400 mb-8 inline-block hover:underline"
      >
        ← Back to blogs
      </Link>

      <div className="max-w-none">
        <div className="mb-8 w-full aspect-video relative rounded-lg overflow-hidden">
          {blogData.coverImage ? (
            <Image
              src={blogData.coverImage}
              alt={blogData.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              priority
            />
          ) : (
            <ServerPlaceholder text={blogData.title} bgColor={bgColor} />
          )}
        </div>

        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{blogData.title}</h1>
          <div className="text-gray-600 dark:text-gray-400 flex flex-wrap gap-4">
            <span>{new Date(blogData.date).toLocaleDateString()}</span>
            {blogData.author && <span>By {blogData.author}</span>}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ]}
            components={components}
          >
            {blogData.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
