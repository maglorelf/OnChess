'use client';

import { useState, useEffect } from 'react';
import BlogPreview from './BlogPreview';
import { useLanguage } from '@/lib/languageContext';

export default function BlogList({ blogs }) {
  const { language, t } = useLanguage();
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Filter blogs by language when language changes
  useEffect(() => {
    // For blogs, we don't filter aggressively - we show all blogs but prioritize current language
    // This is because blog content is typically not fully translated
    const sortedByLanguage = [...blogs].sort((a, b) => {
      // Put current language blogs first
      if (a.language === language && b.language !== language) return -1;
      if (a.language !== language && b.language === language) return 1;
      // Otherwise keep original sort (by date)
      return 0;
    });

    setFilteredBlogs(sortedByLanguage);
  }, [blogs, language]);

  // If no blogs to display
  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('blog.noEntries')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBlogs.map(blog => (
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
  );
}
