"use client";

import BlogPreview from './BlogPreview';

export default function BlogList({ blogs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
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
  );
}