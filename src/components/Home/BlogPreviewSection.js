'use client';

import Link from 'next/link';
import BlogPreview from '@/components/BlogPreview';
import { useLanguage } from '@/lib/languageContext';

export default function BlogPreviewSection({ blogs = [] }) {
  const { t, language } = useLanguage();

  return (
    <section id="latest-articles" className="saas-section bg-white dark:bg-gray-900">
      <div className="saas-container">
        <div className="flex flex-col items-center mb-12">
          <span className="px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            {t('home.blogSection.label')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {t('home.blogSection.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl">
            {t('home.blogSection.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogs.map(blog => (
            <BlogPreview
              key={blog.slug}
              title={blog.title}
              date={blog.date}
              excerpt={blog.excerpt}
              slug={blog.slug}
              coverImage={blog.coverImage}
              language={blog.language}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href={`/blog${language ? `?lang=${language}` : ''}`} className="btn-secondary">
            {t('home.blogSection.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
