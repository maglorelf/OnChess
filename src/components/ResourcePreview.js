'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { isLoggedIn, getUserData } from '@/lib/userUtils';
import { getUserAccessLevel, ACCESS_LEVELS } from '@/lib/resourceUtils';

export default function ResourcePreview({
  title,
  slug,
  excerpt,
  coverImage,
  tags,
  accessLevel,
  contentType,
  category,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Check if user can access this resource
  const loggedIn = isLoggedIn();
  const userData = getUserData();
  const userAccessLevel = getUserAccessLevel(userData);
  const canAccess = userAccessLevel >= accessLevel;

  // Access level badge styling
  const getAccessLevelInfo = level => {
    switch (level) {
      case ACCESS_LEVELS.REGISTERED:
        return {
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          label: 'Basic',
        };
      case ACCESS_LEVELS.STUDENT:
        return {
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          label: 'Student',
        };
      case ACCESS_LEVELS.PREMIUM:
        return {
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
          label: 'Premium',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
          label: 'Unknown',
        };
    }
  };

  const accessInfo = getAccessLevelInfo(accessLevel);

  // Content type icons
  const getContentTypeIcon = type => {
    switch (type) {
      case 'video':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case 'puzzle':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
          </svg>
        );
      case 'pgn':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'pdf':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      default: // text
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all ${
        isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        <Image
          src={coverImage || '/images/blog/chess-default.jpg'}
          alt={title}
          width={600}
          height={340}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity opacity-70"></div>

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {tags?.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags?.length > 2 && (
            <span className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
              +{tags.length - 2}
            </span>
          )}
        </div>

        {/* Access Level Badge */}
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${accessInfo.color}`}>
            {accessInfo.label}
          </span>
        </div>

        {/* Category and Type */}
        <div className="absolute bottom-2 left-2 flex items-center">
          <span className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full capitalize mr-1">
            {category}
          </span>
          <span className="flex items-center text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
            {getContentTypeIcon(contentType)}
            {contentType}
          </span>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white group-hover:text-primary transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{excerpt}</p>
        )}

        {canAccess ? (
          <Link
            href={`/resources/${slug}`}
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View Resource
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-amber-500 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            {!loggedIn ? (
              <Link
                href="/login"
                className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
              >
                Log in for access
              </Link>
            ) : (
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Restricted access
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
