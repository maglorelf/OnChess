"use client";

import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
import { useEffect, useState } from 'react';

export default function BlogPreview({ title, date, excerpt, slug, coverImage }) {
  const [imageError, setImageError] = useState(false);

  // Format the date consistently between server and client
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {coverImage && !imageError ? (
          <Image 
            src={coverImage} 
            alt={`Cover image for ${title}`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderImage 
            text={title}
            bgColor={slug.includes('chess-strategies') ? '#3a506b' : '#1b4332'} 
          />
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(date)}</p>
        <Link href={`/blog/${slug}`} className="hover:underline">
          <h3 className="text-xl font-bold mt-1 mb-2">{title}</h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{excerpt}</p>
        
        <Link 
          href={`/blog/${slug}`}
          className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}