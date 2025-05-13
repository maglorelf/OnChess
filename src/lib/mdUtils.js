import matter from 'gray-matter';
import { LANGUAGES } from './resourceUtils';

// Dynamic imports for server-side only
let fs;
let path;

// Only import fs/path on the server side
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
}

const getBlogsDirectory = () => {
  if (typeof window === 'undefined' && path) {
    return path.join(process.cwd(), 'src/content/blogs');
  }
  return null;
};

export function getAllBlogSlugs() {
  // Only run server-side
  if (typeof window !== 'undefined') {
    console.warn('getAllBlogSlugs() should only be called on the server side');
    return [];
  }

  const blogsDirectory = getBlogsDirectory();
  if (!blogsDirectory || !fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.(md|mdx)$/, ''),
      },
    };
  });
}

export function getBlogData(slug, language = null) {
  // Only run server-side
  if (typeof window !== 'undefined') {
    console.warn('getBlogData() should only be called on the server side');
    return null;
  }

  const blogsDirectory = getBlogsDirectory();
  if (!blogsDirectory) {
    return null;
  }

  // Decode URL-encoded slug (convert %20 to spaces, etc.)
  const decodedSlug = decodeURIComponent(slug);

  try {
    // Try to find the file with .mdx extension first, then fall back to .md
    let fullPath = path.join(blogsDirectory, `${decodedSlug}.mdx`);
    let extension = 'mdx';

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(blogsDirectory, `${decodedSlug}.md`);
      extension = 'md';
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // If a language is specified and doesn't match the blog's language, return null
    if (language && data.language && data.language !== language) {
      return null;
    }

    // Combine the data with the slug and mark the file type
    return {
      slug: decodedSlug,
      content,
      fileType: extension,
      language: data.language || LANGUAGES.EN, // Default to English if not specified
      ...data,
    };
  } catch (error) {
    console.error(`Error getting blog data for slug "${slug}":`, error);
    return null;
  }
}

export function getAllBlogs(language = null) {
  // Only run server-side
  if (typeof window !== 'undefined') {
    console.warn('getAllBlogs() should only be called on the server side');
    return [];
  }

  const blogsDirectory = getBlogsDirectory();
  if (!blogsDirectory || !fs.existsSync(blogsDirectory)) {
    return [];
  }

  try {
    // Get file names under /blogs
    const fileNames = fs.readdirSync(blogsDirectory);

    const allBlogsData = fileNames
      .map(fileName => {
        try {
          // Remove ".md" or ".mdx" from file name to get slug
          const slug = fileName.replace(/\.(md|mdx)$/, '');

          // Get file extension
          const extension = path.extname(fileName).toLowerCase();
          const fileType = extension.substring(1); // Remove the dot

          // Read markdown file as string
          const fullPath = path.join(blogsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          // Use gray-matter to parse the post metadata section
          const { data } = matter(fileContents);

          // Skip draft posts in production
          if (process.env.NODE_ENV === 'production' && data.draft === true) {
            return null;
          }

          // Add default language if not specified
          const blogLanguage = data.language || LANGUAGES.EN;

          // Filter by language if specified
          if (language && blogLanguage !== language) {
            return null;
          }

          // Combine the data with the slug
          return {
            slug,
            fileType,
            language: blogLanguage,
            ...data,
          };
        } catch (err) {
          console.error(`Error processing blog file "${fileName}":`, err);
          return null;
        }
      })
      .filter(Boolean); // Filter out any null values (drafts in production or wrong language)

    // Sort blogs by date
    return allBlogsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting all blogs:', error);
    return [];
  }
}
