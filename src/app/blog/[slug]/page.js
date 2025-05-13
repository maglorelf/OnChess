import { getAllBlogSlugs, getBlogData } from '@/lib/mdUtils';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import Link from 'next/link';
// Importamos el nuevo componente cliente
import BlogRenderer from '@/components/BlogRenderer';

export async function generateStaticParams() {
  // Return array of { slug } objects for static routing
  return getAllBlogSlugs().map(({ params }) => params);
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const languageParam = searchParams?.lang;

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

export default async function BlogPost({ params, searchParams }) {
  const { slug } = await params;
  const languageParam = searchParams?.lang;

  // Try to get blog in preferred language first
  let blogData = getBlogData(slug, languageParam);

  // If not found with language preference, try without language filter
  if (!blogData && languageParam) {
    blogData = getBlogData(slug);
  }

  // If still not found, return 404
  if (!blogData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="text-primary hover:underline">
            ← Back to blogs
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {' '}
      <Link
        href={`/blog${languageParam ? `?lang=${languageParam}` : ''}`}
        className="text-blue-600 dark:text-blue-400 mb-8 inline-block hover:underline"
      >
        ← {languageParam === 'es' ? 'Volver al blog' : 'Back to blogs'}
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{blogData.title}</h1>{' '}
          <div className="text-gray-600 dark:text-gray-400 flex flex-wrap gap-4">
            <span>{new Date(blogData.date).toLocaleDateString()}</span>
            {blogData.author && <span>By {blogData.author}</span>}
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
              {blogData.fileType === 'mdx' ? 'MDX' : 'Markdown'}
            </span>
            {blogData.language && (
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded uppercase">
                {blogData.language}
              </span>
            )}
          </div>
        </div>

        {/* Usamos el nuevo componente BlogRenderer */}
        <BlogRenderer
          fileType={blogData.fileType}
          source={serializedMDX}
          content={blogData.content}
        />
      </div>
    </div>
  );
}
