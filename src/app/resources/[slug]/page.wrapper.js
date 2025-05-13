'use client';

import React, { Suspense } from 'react';
import ResourcePage from './page';

// Loading fallback for Suspense
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

export default function ResourcePageWrapper(props) {
  return (
    <Suspense fallback={<ResourceLoading />}>
      <ResourcePage {...props} />
    </Suspense>
  );
}
