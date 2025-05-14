'use client';

import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/languageContext'; // Import useLanguage

export default function BlogPreview({ title, date, excerpt, slug, coverImage, language }) {
  const [imageError, setImageError] = useState(false);
  const { translations, t } = useLanguage(); // Get translations and t function

  // Format the date consistently between server and client
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Ensure the slug is properly encoded for URLs
  const encodedSlug = encodeURIComponent(slug);

  return (
    <div className="saas-card hover:shadow-xl group">
      <div className="relative h-48 w-full overflow-hidden">
        {coverImage && !imageError ? (
          <Image
            src={coverImage}
            alt={`Cover image for ${title}`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderImage
            text={title}
            bgColor={slug.includes('chess-strategies') ? '#3182ce' : '#6b46c1'}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        {' '}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(date)}
          </div>

          {language && (
            <div className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded uppercase">
              {language}
            </div>
          )}
        </div>{' '}
        <Link
          href={`/blog/${encodedSlug}${language ? `?lang=${language}` : ''}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{excerpt}</p>{' '}
        <Link
          href={`/blog/${encodedSlug}${language ? `?lang=${language}` : ''}`}
          className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
        >
          {t('blogPreview.readArticle', {})}{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
