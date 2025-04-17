import { getAllBlogs } from '@/lib/mdUtils';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog | OnChess',
  description: 'Articles and insights about chess strategy, history, and online play',
};

export default function Blog() {
  const blogs = getAllBlogs();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Chess Blog</h1>
      
      <BlogList blogs={blogs} />
    </div>
  );
}