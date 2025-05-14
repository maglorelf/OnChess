'use client';

import Link from 'next/link';
import BlogHeader from '@/components/Blog/BlogHeader';
import BlogList from '@/components/BlogList';
import { useLanguage } from '@/lib/languageContext';

export default function BlogPreviewSection({ blogs = [] }) {
  const { t, language } = useLanguage();

  return (
    <section id="latest-articles" className="saas-section bg-white dark:bg-gray-900">
      <div className="saas-container">
        <BlogHeader isHomePage={true} />

        {/* Use common BlogList component to render blogs */}
        <div className="mb-12">
          <BlogList blogs={blogs} />
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
