import { getAllBlogSlugs, getBlogData } from '@/lib/mdUtils';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';

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
function ServerPlaceholder({ text, bgColor = "#3a506b" }) {
  return (
    <div 
      className="flex items-center justify-center w-full h-full"
      style={{
        backgroundColor: bgColor,
        color: "white",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10">
        {Array(64).fill().map((_, i) => (
          <div 
            key={i}
            className={`${(Math.floor(i / 8) + i % 8) % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}
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
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-blue-600 dark:text-blue-400 mb-8 inline-block hover:underline">
        ← Back to blogs
      </Link>
      
      <div className="prose dark:prose-invert max-w-none">
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
            <ServerPlaceholder 
              text={blogData.title}
              bgColor={bgColor}
            />
          )}
        </div>
        
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{blogData.title}</h1>
          <div className="text-gray-600 dark:text-gray-400 flex flex-wrap gap-4">
            <span>{new Date(blogData.date).toLocaleDateString()}</span>
            {blogData.author && <span>By {blogData.author}</span>}
          </div>
        </div>
        
        <ReactMarkdown>
          {blogData.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}