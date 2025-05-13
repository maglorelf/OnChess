'use client';

import { useState, useEffect } from 'react';
import BlogList from '@/components/BlogList';
import { useLanguage } from '@/lib/languageContext';

export default function BlogClientPage({ initialBlogs, initialLanguage }) {
  const { t, language, changeLanguage } = useLanguage();
  const [blogs, setBlogs] = useState(initialBlogs);

  // Update language preferences if URL param is provided
  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      changeLanguage(initialLanguage);
    }
  }, [initialLanguage, language, changeLanguage]);

  // Resort blogs when language changes
  useEffect(() => {
    const sortedBlogs = [...initialBlogs].sort((a, b) => {
      // Prioritize current language
      if (a.language === language && b.language !== language) return -1;
      if (a.language !== language && b.language === language) return 1;
      // Default sort by date
      return 0;
    });
    setBlogs(sortedBlogs);
  }, [language, initialBlogs]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="saas-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              {t('blog.label')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('blog.title')}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('blog.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="saas-section bg-white dark:bg-gray-900">
        <div className="saas-container">
          <BlogList blogs={blogs} />
        </div>
      </section>
    </div>
  );
}
