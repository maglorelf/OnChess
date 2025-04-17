import Image from "next/image";
import Link from "next/link";
import { getAllBlogs } from "@/lib/mdUtils";
import BlogPreview from "@/components/BlogPreview";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Home() {
  // Get the latest 2 blog posts
  const latestBlogs = getAllBlogs().slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Welcome to OnChess
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your destination for chess knowledge, strategy, and the latest in online chess.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-6"
                >
                  Explore Our Blog
                </Link>
                <a
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6"
                  href="#latest-articles"
                >
                  Latest Articles
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <PlaceholderImage 
                  text="Chess Hero" 
                  bgColor="#2c3e50"
                  textColor="#ffffff"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="latest-articles" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl">
              Discover strategies, history, and insights about the game of chess.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6 leading-[3rem]"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
