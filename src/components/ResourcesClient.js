'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isLoggedIn, getUserData } from '@/lib/userUtils';
import {
  getUserAccessLevel,
  filterResourcesByAccessLevel,
  filterResourcesByLanguage,
  LANGUAGES,
} from '@/lib/resourceUtils';
import ResourceList from '@/components/ResourceList';
import { useLanguage } from '@/lib/languageContext';

export default function ResourcesClient({ initialResources }) {
  const { language, t } = useLanguage();
  const [resources, setResources] = useState(initialResources);
  const [userAccessLevel, setUserAccessLevel] = useState(0);
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  // Get user data on mount
  useEffect(() => {
    const loggedIn = isLoggedIn();
    setIsLoggedInState(loggedIn);

    const userData = getUserData();
    const accessLevel = getUserAccessLevel(userData);
    setUserAccessLevel(accessLevel);

    // Filter resources based on user access level and language
    if (loggedIn) {
      // Show resources up to user's access level
      let accessibleResources = filterResourcesByAccessLevel(initialResources, accessLevel);
      // Filter by current language
      accessibleResources = filterResourcesByLanguage(accessibleResources, language);
      setResources(accessibleResources);
    } else {
      // Not logged in - show only preview of level 1 resources
      let previewResources = initialResources.filter(resource => resource.accessLevel === 1);
      // Filter by current language
      previewResources = filterResourcesByLanguage(previewResources, language);
      // Mark as previews
      previewResources = previewResources.map(resource => ({
        ...resource,
        isPreview: true,
      }));
      setResources(previewResources);
    }
  }, [initialResources, language]); // Re-run when language changes

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {' '}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('resources.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>
        {!isLoggedInState && resources.length > 0 && (
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                  Sign in to access all resources
                </h3>{' '}
                <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                  You&apos;re seeing limited previews. Log in to access full content.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-block px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
        <ResourceList resources={resources} />
      </div>
    </div>
  );
}
