import { Suspense } from 'react';
import { getAllResources } from '@/lib/resourceUtils';
import ResourcesClient from '@/components/ResourcesClient';
import englishTranslations from '@/lib/translations/en';

// Loading fallback component
function ResourcesLoading() {
  // We have to use English translations since we don't know the language at this point
  // The client component will handle proper translation once loaded
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{englishTranslations.resources.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {englishTranslations.resources.loading}
          </p>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for the page - using only static metadata for simplicity
// to avoid Next.js issues with searchParams
export async function generateMetadata() {
  // Since we can't safely use searchParams in generateMetadata, we'll use
  // default English translations for the metadata
  // The actual UI will still be translated based on the user's language preference
  const translations = englishTranslations;

  return {
    title: translations.resources.metaTitle,
    description: translations.resources.metaDescription,
  };
}

// Server Component
export default async function ResourcesPage() {
  // Fetch all resources on the server (we'll filter by language on the client)
  // This allows for language switching without page reload
  const allResources = getAllResources();

  // Pass data to client component with Suspense boundary
  return (
    <Suspense fallback={<ResourcesLoading />}>
      <ResourcesClient initialResources={allResources} />
    </Suspense>
  );
}
