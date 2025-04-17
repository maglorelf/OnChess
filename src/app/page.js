import Image from "next/image";
import Link from "next/link";
import { getAllBlogs } from "@/lib/mdUtils";
import BlogPreview from "@/components/BlogPreview";

export default function Home() {
  // Get the latest 3 blog posts
  const latestBlogs = getAllBlogs().slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - SaaS UI Style */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="saas-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                The Chess Revolution
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to <span className="text-primary">OnChess</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Your destination for chess knowledge, strategy, and the latest in online chess. Elevate your game with expert insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="btn-primary"
                >
                  Explore Our Blog
                </Link>
                <a
                  className="btn-secondary"
                  href="#latest-articles"
                >
                  Latest Articles
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/logo-on-chess-text.png"
                    alt="OnChess Logo"
                    width={400}
                    height={400}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="saas-section bg-gray-50 dark:bg-gray-800/50">
        <div className="saas-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why OnChess</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover a world of chess resources designed to help players of all levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="saas-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Strategies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn winning strategies and tactics from chess masters and improve your game.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="saas-card p-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with fellow chess enthusiasts and share your experiences and knowledge.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="saas-card p-6">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Latest News</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay updated with the latest trends, tournaments, and developments in the chess world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="latest-articles" className="saas-section bg-white dark:bg-gray-900">
        <div className="saas-container">
          <div className="flex flex-col items-center mb-12">
            <span className="px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              Our Latest Content
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Latest Articles</h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl">
              Discover strategies, history, and insights about the game of chess.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestBlogs.map((blog) => (
              <BlogPreview
                key={blog.slug}
                title={blog.title}
                date={blog.date}
                excerpt={blog.excerpt}
                slug={blog.slug}
                coverImage={blog.coverImage}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="btn-secondary"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="saas-section gradient-bg text-white">
        <div className="saas-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve your chess game?</h2>
            <p className="text-xl mb-8">
              Join our community and get access to expert strategies, exclusive tutorials, and connect with fellow chess enthusiasts.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:transform hover:translate-y-[-2px]"
            >
              Start Learning Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="saas-container">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="/blog"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
                className="dark:invert"
              />
              Blog
            </Link>
            <a
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
                className="dark:invert"
              />
              Resources
            </a>
            <a
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
                className="dark:invert"
              />
              Visit Us
            </a>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} OnChess. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
