import { getAllBlogs } from '@/lib/mdUtils';
import BlogClientPage from '@/components/BlogClientPage';
import BlogLoadingState from '@/components/Blog/BlogLoadingState';
import { Suspense } from 'react';

// Metadata for the page
export const metadata = {
  title: 'Chess Blog | OnChess',
  description: 'Articles and insights about chess strategy, history, and online play',
};

// Server component
export default async function Blog({ searchParams }) {
  // Make the function async
  // Get blogs with language from search params
  const awaitedSearchParams = await searchParams; // Await searchParams
  const language = awaitedSearchParams?.lang;
  const blogs = getAllBlogs();

  return (
    <Suspense fallback={<BlogLoadingState />}>
      <BlogClientPage initialBlogs={blogs} initialLanguage={language} />
    </Suspense>
  );
}
