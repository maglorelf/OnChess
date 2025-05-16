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
export default function Blog() {
  // Get all blogs - language filtering will happen client-side
  const blogs = getAllBlogs();

  return (
    <Suspense fallback={<BlogLoadingState />}>
      <BlogClientPage initialBlogs={blogs} />
    </Suspense>
  );
}
