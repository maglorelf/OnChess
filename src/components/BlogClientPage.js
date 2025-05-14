'use client';

import { useState, useEffect } from 'react';
import BlogList from '@/components/BlogList';
import BlogHeader from '@/components/Blog/BlogHeader';
import { useLanguage } from '@/lib/languageContext';

export default function BlogClientPage({ initialBlogs, initialLanguage }) {
  const { language, changeLanguage } = useLanguage();
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
      <BlogHeader />

      {/* Blog Content */}
      <section className="saas-section bg-white dark:bg-gray-900">
        <div className="saas-container">
          <BlogList blogs={blogs} />
        </div>
      </section>
    </div>
  );
}
