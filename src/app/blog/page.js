import { getAllBlogs } from '@/lib/mdUtils';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog | OnChess',
  description: 'Articles and insights about chess strategy, history, and online play',
};

export default function Blog() {
  const blogs = getAllBlogs();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="saas-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chess Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Articles and insights about chess strategy, history, and online play. 
              Expand your understanding of the game.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="saas-section bg-white dark:bg-gray-900">
        <div className="saas-container">
          <BlogList blogs={blogs} />
        </div>
      </section>
    </div>
  );
}