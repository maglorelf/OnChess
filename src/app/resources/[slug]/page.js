import React from 'react';
import { Suspense } from 'react';
import { getResourceBySlug } from '@/lib/resourceUtils';
import ResourceDetail from '@/components/ResourceDetail';
import Link from 'next/link';

// Loading component for Suspense
function ResourceLoading() {
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

// Not Found Component
function ResourceNotFound() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
        <p className="mb-8">
          The resource you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/resources" className="text-primary hover:underline">
          Back to resources
        </Link>
      </div>
    </div>
  );
}

// Server Component to generate metadata
export async function generateMetadata({ params }) {
  // Await params before destructuring
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {
      title: 'Resource Not Found - OnChess',
      description: 'The requested resource could not be found.',
    };
  }

  return {
    title: `${resource.title} - OnChess Resources`,
    description: resource.excerpt || 'Chess learning resource',
    openGraph: resource.coverImage
      ? {
          images: [{ url: resource.coverImage }],
        }
      : undefined,
  };
}

// Main page component (server component)
export default async function ResourcePage({ params }) {
  // Await params before destructuring
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch resource data on the server
  const resource = await getResourceBySlug(slug);

  // Handle not found
  if (!resource) {
    return <ResourceNotFound />;
  }

  // Pass data to client component
  return (
    <Suspense fallback={<ResourceLoading />}>
      <ResourceDetail resource={resource} />
    </Suspense>
  );
}
