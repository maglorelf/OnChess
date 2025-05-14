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
export default function Blog({ searchParams }) {
  // Get blogs with language from search params
  const language = searchParams?.lang;
  const blogs = getAllBlogs();

  return (
    <Suspense fallback={<BlogLoadingState />}>
      <BlogClientPage initialBlogs={blogs} initialLanguage={language} />
    </Suspense>
  );
}
