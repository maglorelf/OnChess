import matter from 'gray-matter';

// Dynamic imports for server-side only
let fs;
let path;

// Only import fs/path on the server side
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
}

// Since the HTML content rendering lacks proper styling,
// let's return the raw markdown content instead and let the client-side
// React Markdown component handle it with proper styling
async function processMarkdownToHtml(content) {
  // Simply return the raw markdown content
  // The client-side component will handle rendering with proper styling
  return content;
}

// Resource access levels
export const ACCESS_LEVELS = {
  REGISTERED: 1, // All registered users
  STUDENT: 2, // Users with isStudent flag
  PREMIUM: 3, // Users with isTeacher flag
};

// Categories
export const CATEGORIES = {
  THEORY: 'theory',
  PRACTICE: 'practice',
};

// Content types
export const CONTENT_TYPES = {
  TEXT: 'text',
  VIDEO: 'video',
  PUZZLE: 'puzzle',
  PGN: 'pgn',
  PDF: 'pdf',
};

// Supported languages
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
};

// All possible tags
export const ALL_TAGS = [
  'initiation',
  'medium',
  'advance',
  'opening',
  'middlegame',
  'ending',
  'test',
  'game',
  'tactics',
  'strategy',
  'endgame',
  'analysis',
];

// Resource directory path generator (server-side only)
function getResourcesDirectory() {
  if (typeof window === 'undefined' && path) {
    return path.join(process.cwd(), 'src/content/resources');
  }
  return null;
}

// Get all resource files (server-side only)
export function getResourceFiles() {
  if (typeof window !== 'undefined') {
    console.warn('getResourceFiles() should only be called on the server side');
    return [];
  }

  const resourcesDirectory = getResourcesDirectory();
  if (!resourcesDirectory || !fs.existsSync(resourcesDirectory)) {
    return [];
  }

  return fs.readdirSync(resourcesDirectory);
}

// Get all resources with their metadata
export function getAllResources(language = null) {
  // For server-side execution
  if (typeof window === 'undefined') {
    const fileNames = getResourceFiles();
    const allResources = fileNames.map(fileName => {
      // Remove ".md" or ".mdx" from file name to get id
      const slug = fileName.replace(/\.mdx?$/, '');

      // Read markdown file as string
      const resourcesDirectory = getResourcesDirectory();
      const fullPath = path.join(resourcesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the resource metadata section
      const { data, content } = matter(fileContents);

      // Validate access level
      const accessLevel = Number(data.accessLevel) || ACCESS_LEVELS.REGISTERED;

      // Ensure tags are in the correct format (array)
      const tags = Array.isArray(data.tags) ? data.tags : [];

      // Determine language (default to English if not specified)
      const resourceLanguage = data.language || LANGUAGES.EN;

      // Combine the data with slug
      return {
        slug,
        content,
        accessLevel,
        category: data.category || CATEGORIES.THEORY,
        contentType: data.contentType || CONTENT_TYPES.TEXT,
        tags,
        language: resourceLanguage,
        ...data,
      };
    }); // Filter by language if specified
    let filteredResources = allResources;
    if (language) {
      filteredResources = allResources.filter(
        resource => resource.language === language || !resource.language // Include resources with no language specified
      );
    }

    // Sort resources by date
    return filteredResources.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  // For client-side, return empty array or fetch from an API endpoint
  // You would typically set up an API route to serve this data from the server
  console.warn('getAllResources() should only be called on the server side');
  return [];
}

// Get a single resource by slug
export async function getResourceBySlug(slug, language = null) {
  // Only run server-side
  if (typeof window !== 'undefined') {
    console.warn('getResourceBySlug() should only be called on the server side');
    return null;
  }

  const resourcesDirectory = getResourcesDirectory();
  const fullPath = path.join(resourcesDirectory, `${slug}.mdx`);
  let fileContents;

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    // Try with .md extension
    try {
      fileContents = fs.readFileSync(path.join(resourcesDirectory, `${slug}.md`), 'utf8');
    } catch (e) {
      return null;
    }
  } // Use gray-matter to parse the resource metadata section
  const { data, content } = matter(fileContents);
  // Process markdown to HTML using our async function
  const contentHtml = await processMarkdownToHtml(content); // Validate access level
  const accessLevel = Number(data.accessLevel) || ACCESS_LEVELS.REGISTERED;

  // Ensure tags are in the correct format (array)
  const tags = Array.isArray(data.tags) ? data.tags : [];

  // Get language (default to English if not specified)
  const resourceLanguage = data.language || LANGUAGES.EN;

  // If a specific language is requested and doesn't match, return null
  if (language && resourceLanguage !== language) {
    return null;
  }

  // Combine the data with the slug and content
  return {
    slug,
    contentHtml,
    content,
    accessLevel,
    category: data.category || CATEGORIES.THEORY,
    contentType: data.contentType || CONTENT_TYPES.TEXT,
    tags,
    language: resourceLanguage,
    ...data,
  };
}

// Filter resources by tags
export function filterResourcesByTags(resources, selectedTags) {
  if (!selectedTags || selectedTags.length === 0) {
    return resources;
  }

  return resources.filter(resource => {
    // Check if the resource has at least one of the selected tags
    return selectedTags.some(tag => resource.tags.includes(tag));
  });
}

// Filter resources by category
export function filterResourcesByCategory(resources, category) {
  if (!category) {
    return resources;
  }

  return resources.filter(resource => resource.category === category);
}

// Filter resources by content type
export function filterResourcesByContentType(resources, contentType) {
  if (!contentType) {
    return resources;
  }

  return resources.filter(resource => resource.contentType === contentType);
}

// Filter resources by access level
export function filterResourcesByAccessLevel(resources, maxAccessLevel) {
  return resources.filter(resource => resource.accessLevel <= maxAccessLevel);
}

// Filter resources by language
export function filterResourcesByLanguage(resources, language) {
  if (!language) {
    return resources;
  }

  return resources.filter(
    resource => resource.language === language || !resource.language // Include resources with no language specified
  );
}

// Get user access level based on user data
export function getUserAccessLevel(userData) {
  if (!userData) {
    return 0; // Not logged in
  }

  if (userData.isTeacher) {
    return ACCESS_LEVELS.PREMIUM; // Level 3
  }

  if (userData.isStudent) {
    return ACCESS_LEVELS.STUDENT; // Level 2
  }

  return ACCESS_LEVELS.REGISTERED; // Level 1 (registered user)
}

// Check if a user can access a specific resource
export function canAccessResource(userData, resource) {
  const userAccessLevel = getUserAccessLevel(userData);
  return userAccessLevel >= resource.accessLevel;
}
