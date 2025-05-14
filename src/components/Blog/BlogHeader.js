'use client';

import { useLanguage } from '@/lib/languageContext';

export default function BlogHeader({ isHomePage = false }) {
  const { t } = useLanguage();

  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="saas-container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            {isHomePage ? t('home.blogSection.label') : t('blog.label')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isHomePage ? t('home.blogSection.title') : t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isHomePage ? t('home.blogSection.subtitle') : t('blog.description')}
          </p>
        </div>
      </div>
    </section>
  );
}
