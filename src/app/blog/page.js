import { getAllBlogs } from '@/lib/mdUtils';
import BlogClientPage from '@/components/BlogClientPage';
import { Suspense } from 'react';

// Metadata for the page
export const metadata = {
  title: 'Chess Blog | OnChess',
  description: 'Articles and insights about chess strategy, history, and online play',
};

function BlogLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="hero-gradient py-16 md:py-24">
        <div className="saas-container">
          <div className="animate-pulse max-w-3xl mx-auto text-center">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 w-24 mx-auto mb-4 rounded-full"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 w-48 mx-auto mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 w-96 mx-auto rounded"></div>
          </div>
        </div>
      </section>

      <section className="saas-section bg-white dark:bg-gray-900">
        <div className="saas-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse saas-card h-72"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Server component
export default function Blog({ searchParams }) {
  // Get blogs with language from search params
  const language = searchParams?.lang;
  const blogs = getAllBlogs();

  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogClientPage initialBlogs={blogs} initialLanguage={language} />
    </Suspense>
  );
}
