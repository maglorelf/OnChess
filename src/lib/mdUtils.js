import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

export function getAllBlogSlugs() {
  const fileNames = fs.readdirSync(blogsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.(md|mdx)$/, ''),
      },
    };
  });
}

export function getBlogData(slug) {
  // Decode URL-encoded slug (convert %20 to spaces, etc.)
  const decodedSlug = decodeURIComponent(slug);

  // Try to find the file with .mdx extension first, then fall back to .md
  let fullPath = path.join(blogsDirectory, `${decodedSlug}.mdx`);
  let extension = 'mdx';

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogsDirectory, `${decodedSlug}.md`);
    extension = 'md';
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`No file found for slug: ${decodedSlug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Combine the data with the slug and mark the file type
  return {
    slug: decodedSlug,
    content,
    fileType: extension,
    ...data,
  };
}

export function getAllBlogs() {
  // Get file names under /blogs
  const fileNames = fs.readdirSync(blogsDirectory);

  const allBlogsData = fileNames
    .map(fileName => {
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

      // Combine the data with the slug
      return {
        slug,
        fileType,
        ...data,
      };
    })
    .filter(Boolean); // Filter out any null values (drafts in production)

  // Sort blogs by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
