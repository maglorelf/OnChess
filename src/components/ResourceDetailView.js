'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isLoggedIn, getUserData } from '@/lib/userUtils';
import { canAccessResource, ACCESS_LEVELS } from '@/lib/resourceUtils';
import ResourceMarkdownContent from '@/components/ResourceMarkdownContent';
import { useLanguage } from '@/lib/languageContext';
import { formatDateYYYYMMDD } from '@/contentUtils';

export default function ResourceDetailView({ resource }) {
  const router = useRouter();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function checkAccess() {
      setLoading(true);

      try {
        // Check login status
        const loggedIn = isLoggedIn();
        const user = getUserData();
        setUserData(user);

        if (!loggedIn) {
          router.push('/login?redirect=/resources/' + resource.slug);
          return;
        }

        // Check access
        const canAccess = canAccessResource(user, resource);
        setHasAccess(canAccess);
      } catch (error) {
        console.error('Error loading resource:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [resource, router]);

  // Get translated category label
  let categoryLabel = '';
  if (resource.category === 'theory') categoryLabel = t('resources.categoryTheory');
  else if (resource.category === 'practice') categoryLabel = t('resources.categoryPractice');
  else categoryLabel = resource.category;

  // Get translated content type label
  let contentTypeLabel = '';
  if (resource.contentType === 'text') contentTypeLabel = t('resources.contentTypeText');
  else if (resource.contentType === 'video') contentTypeLabel = t('resources.contentTypeVideo');
  else if (resource.contentType === 'puzzle') contentTypeLabel = t('resources.contentTypePuzzle');
  else if (resource.contentType === 'pgn') contentTypeLabel = t('resources.contentTypePgn');
  else if (resource.contentType === 'pdf') contentTypeLabel = t('resources.contentTypePdf');
  else contentTypeLabel = resource.contentType;

  // Helper for translated tag
  const getTagLabel = tag => {
    let label = t(`resources.tag_${tag}`);
    if (label.startsWith('resources.tag_')) label = tag;
    return label;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-12"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No access
  if (!hasAccess) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/resources" className="text-primary hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {t('resources.backToResources')}
            </Link>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 text-center">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-amber-800 dark:text-amber-300">
              {resource.title}
            </h2>
            <p className="text-amber-700 dark:text-amber-400 mb-6">
              {resource.accessLevel === ACCESS_LEVELS.STUDENT
                ? t('resources.accessLevelStudent')
                : resource.accessLevel === ACCESS_LEVELS.PREMIUM
                ? t('resources.accessLevelPremium')
                : t('resources.accessLevelMessage')}
            </p>
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                {resource.accessLevel === ACCESS_LEVELS.STUDENT
                  ? t('resources.studentAccessMessage')
                  : resource.accessLevel === ACCESS_LEVELS.PREMIUM
                  ? t('resources.premiumAccessMessage')
                  : t('resources.contactSupportMessage')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render content based on content type
  const renderContent = () => {
    switch (resource.contentType) {
      case 'video':
        return (
          <div className="mb-8">
            {resource.videoUrl && (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={resource.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg w-full h-full"
                ></iframe>
              </div>
            )}
            <ResourceMarkdownContent content={resource.contentHtml} />
          </div>
        );

      case 'pgn':
        return (
          <div className="mb-8">
            {resource.pgnUrl && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">PGN File</h3>
                <a
                  href={resource.pgnUrl}
                  download
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t('resources.pgnFileDownload')}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('resources.pgnFileDesc')}
                </p>
              </div>
            )}
            <ResourceMarkdownContent content={resource.contentHtml} />
          </div>
        );

      case 'pdf':
        return (
          <div className="mb-8">
            {resource.pdfUrl && (
              <div className="mb-6">
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">PDF Document</h3>
                  <a
                    href={resource.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    {t('resources.pdfDocumentView')}
                  </a>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                  <iframe
                    src={`${resource.pdfUrl}#toolbar=0&amp;navpanes=0&amp;scrollbar=0`}
                    className="w-full h-[600px] rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}
            <ResourceMarkdownContent content={resource.contentHtml} />
          </div>
        );

      case 'puzzle':
        return (
          <div className="mb-8">
            {resource.puzzleId && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('resources.interactivePuzzle')}</h3>
                <div className="aspect-w-1 aspect-h-1 max-w-2xl mx-auto">
                  {/* Here you could embed a chess puzzle */}
                  <div className="w-full h-full flex items-center justify-center border rounded">
                    <p className="text-center">Chess puzzle would be embedded here</p>
                  </div>
                </div>
              </div>
            )}
            <ResourceMarkdownContent content={resource.contentHtml} />
          </div>
        );

      default: // text
        return <ResourceMarkdownContent content={resource.contentHtml} />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/resources" className="text-primary hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t('resources.backToResources')}
          </Link>
        </div>

        <article>
          <header className="mb-8">
            {resource.coverImage && (
              <div className="relative h-64 sm:h-96 mb-6 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="w-full"
                  priority
                />
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{resource.title}</h1>

            {resource.date && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {formatDateYYYYMMDD(resource.date)}
              </p>
            )}

            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/resources?tags=${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {getTagLabel(tag)}
                  </Link>
                ))}
              </div>
            )}

            {/* Show category and content type */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                {categoryLabel}
              </span>
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                {contentTypeLabel}
              </span>
            </div>

            {resource.excerpt && (
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                {resource.excerpt}
              </p>
            )}
          </header>

          <div className="prose dark:prose-invert max-w-none">{renderContent()}</div>

          {/* Resource navigation - could be prev/next resources */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <div></div>
              <Link href="/resources" className="text-primary hover:underline">
                {t('resources.backToResources')}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
