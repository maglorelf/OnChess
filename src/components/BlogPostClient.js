'use client';

import { useLanguage } from '@/lib/languageContext';
import Link from 'next/link';
import Image from 'next/image';
import BlogRenderer from '@/components/BlogRenderer';
import { ServerPlaceholder } from '@/components/PlaceholderImage';
import { formatDateYYYYMMDD } from '@/contentUtils';

export default function BlogPostClient({ blogData, serializedMDX, bgColor }) {
  const { translations, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 dark:text-blue-400 mb-8 inline-block hover:underline"
      >
        ← {t('blog.backToBlog')}
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
            <span>{formatDateYYYYMMDD(blogData.date)}</span>
            {blogData.author && (
              <span>{t('blog.authorBy').replace('{author}', blogData.author)}</span>
            )}
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

        <BlogRenderer
          fileType={blogData.fileType}
          source={serializedMDX}
          content={blogData.content}
        />
      </div>
    </div>
  );
}
