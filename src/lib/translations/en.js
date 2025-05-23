// English translations
const englishTranslations = {
  // Metadata
  metadata: {
    description: 'Your destination for chess knowledge, strategy, and the latest in online chess',
    siteTitle: 'OnChess',
  },

  // Common UI elements
  common: {
    loading: 'Loading...',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    viewAll: 'View All',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    readMore: 'Read More',
    viewMore: 'View More',
    seeAll: 'See All',
    download: 'Download',
    share: 'Share',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    profile: 'Profile',
    and: 'and', // Added new key
  },

  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    blog: 'Blog',
    resources: 'Resources',
    login: 'Login',
    register: 'Register',
    profile: 'Profile',
    logout: 'Logout',
  }, // Home page
  home: {
    hero: {
      label: 'The Chess Revolution',
      welcomePrefix: 'Welcome to',
      description:
        'Your destination for chess knowledge, strategy, and the latest in online chess. Elevate your game with expert insights.',
      exploreBlog: 'Explore Our Blog',
      latestArticles: 'Latest Articles',
    },
    featuresSection: {
      title: 'Why OnChess',
      subtitle: 'Discover a world of chess resources designed to help players of all levels',
      feature1: {
        title: 'Expert Strategies',
        description:
          'Learn winning strategies and tactics from chess masters and improve your game.',
      },
      feature2: {
        title: 'Community Insights',
        description:
          'Connect with fellow chess enthusiasts and share your experiences and knowledge.',
      },
      feature3: {
        title: 'Latest News',
        description:
          'Stay updated with the latest trends, tournaments, and developments in the chess world.',
      },
    },
    blogSection: {
      label: 'Our Latest Content',
      title: 'Latest Articles',
      subtitle: 'Discover strategies, history, and insights about the game of chess.',
      viewAll: 'View All Articles',
    },
    ctaSection: {
      title: 'Ready to improve your chess game?',
      description:
        'Join our community and get access to expert strategies, exclusive tutorials, and connect with fellow chess enthusiasts.',
      button: 'Start Learning Today',
    },
  },

  // Footer
  footer: {
    copyright: '© {year} OnChess. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    cookiePolicy: 'Cookie Policy',
    quickLinks: 'Quick Links',
  },
  // Blog preview
  blogPreview: {
    readArticle: 'Read Article',
  },

  // Resources page
  resources: {
    title: 'Chess Resources',
    subtitle: 'Educational materials to improve your chess',
    metaTitle: 'Chess Resources - OnChess',
    metaDescription: 'Educational resources to help you improve your chess skills',
    loading: 'Loading resources...',
    searchPlaceholder: 'Search for resources...',
    filters: 'Filters',
    clearFilters: 'Clear all filters',
    category: 'Category',
    contentType: 'Content Type',
    tags: 'Tags',
    noResourcesFound: 'No resources found',
    signInPrompt: 'Sign in to access all resources',
    previewMessage: "You're seeing limited previews. Log in to access full content.",
    filterByCategory: 'Filter by Category',
    filterByContentType: 'Filter by Content Type',
    filterByTags: 'Filter by Tags',
    categoryTheory: 'Theory',
    categoryPractice: 'Practice',
    contentTypeText: 'Text',
    contentTypeVideo: 'Video',
    contentTypePuzzle: 'Puzzle',
    contentTypePgn: 'PGN',
    contentTypePdf: 'PDF',
    backToResources: 'Back to resources',
    resourceNotFound: 'Resource not found',
    resourceNotFoundDesc: "The resource you're looking for doesn't exist or has been moved.",
    accessLevelStudent: 'This content requires student access.',
    accessLevelPremium: 'This is premium content for teachers and coaches.',
    accessLevelMessage: 'You do not have access to this content.',
    studentAccessMessage:
      'Students have access to this content. Contact the administrator if you are a student.',
    premiumAccessMessage: 'Teachers and coaches have access to this premium content.',
    contactSupportMessage: 'Please contact support for more information.',
    relatedResources: 'Related Resources',
    pgnFileDownload: 'Download PGN File',
    pgnFileDesc: 'Open this file in your preferred chess analysis software.',
    pdfDocumentView: 'View PDF',
    interactivePuzzle: 'Interactive Puzzle',
    viewResource: 'View Resource',
    showingCount: 'Showing {count} of {total} {resourceWord}',
    tag_initiation: 'Initiation',
    tag_medium: 'Intermediate',
    tag_advance: 'Advanced',
    tag_opening: 'Opening',
    tag_middlegame: 'Middlegame',
    tag_ending: 'Ending',
    tag_test: 'Test',
    tag_game: 'Game',
    tag_tactics: 'Tactics',
    tag_strategy: 'Strategy',
    tag_endgame: 'Endgame',
    tag_analysis: 'Analysis',
  },

  // Blog page
  blog: {
    label: 'Knowledge Hub',
    description:
      'Articles and insights about chess strategy, history, and online play. Expand your understanding of the game.',
    noEntries: 'No blog entries found.',
    backToBlog: 'Back to blog',
    readingTime: '{time} min read',
    title: 'Chess Blog',
    subtitle: 'News, articles, and updates from the chess world',
    readTime: '{time} min read',
    publishedOn: 'Published on {date}',
    recentPosts: 'Recent Posts',
    popularPosts: 'Popular Posts',
    categories: 'Categories',
    tags: 'Tags',
    relatedPosts: 'Related Posts',
    authorBy: 'By {author}',
    postNotFound: 'Post not found',
    postNotFoundDesc: "The blog post you're looking for doesn't exist or has been moved.",
    blogPreview: {
      readArticle: 'Read Article',
    },
  },

  // User profiles
  profile: {
    title: 'Your Profile',
    personalInfo: 'Personal Information',
    name: 'Name',
    email: 'Email',
    username: 'Username',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    updateProfileButton: 'Update Profile',
    progress: 'Learning Progress',
    resourcesCompleted: 'Resources Completed',
    resourcesInProgress: 'Resources In Progress',
    achievements: 'Achievements',
    memberSince: 'Member since {date}',
    currentLanguage: 'Current language',
    languages: {
      english: 'English',
      spanish: 'Spanish',
    },
    languageDescription:
      'Your language preference affects the content displayed across the site. Some content may not be available in all languages.',
  },

  // Authentication
  auth: {
    login: 'Login',
    loginSubtitle: 'Welcome back to OnChess',
    signInToYourAccount: 'Sign in to your account', // Added new key
    register: 'Create an Account',
    registerSubtitle: 'Join OnChess today',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    haveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    signInWith: 'Sign in with {provider}',
    agreeToTerms: 'By registering, you agree to our Terms of Service and Privacy Policy',
    loginButton: 'Sign In',
    registerButton: 'Sign Up',
    rememberMe: 'Remember me',
    fullNameLabel: 'Full Name', // Added new key
    fullNamePlaceholder: 'Full name', // Added new key
    emailPlaceholder: 'Email address', // Added new key
    passwordPlaceholderMinChars: 'Password (min 8 characters)', // Added new key
    confirmPasswordPlaceholder: 'Confirm password', // Added new key
    agreeToTermsPrefix: 'By creating an account, you agree to our', // Added new key
  },

  // Validation and messages
  validation: {
    required: '{field} is required',
    invalidEmail: 'Please enter a valid email address',
    passwordLength: 'Password must be at least 8 characters long',
    passwordMatch: 'Passwords do not match',
    usernameLength: 'Username must be between 3 and 20 characters',
  },

  // Notifications
  notifications: {
    welcome: 'Welcome to OnChess!',
    loginSuccess: 'Successfully logged in',
    logoutSuccess: 'Successfully logged out',
    profileUpdated: 'Profile updated successfully',
    passwordChanged: 'Password changed successfully',
    emailVerification: 'Please check your email to verify your account',
    resetPasswordLink: 'Password reset link sent to your email',
  },

  // Error messages
  errors: {
    generic: 'Something went wrong. Please try again.',
    login: 'Login failed. Please check your credentials.',
    loginGeneric: 'Login failed', // Added new key
    loginErrorGeneric: 'An error occurred during login', // Added new key
    register: 'Registration failed. Please try again.',
    registerGeneric: 'An error occurred during registration', // Added new key
    unauthorized: 'You need to be logged in to access this page',
    forbidden: 'You do not have permission to access this resource',
    notFound: 'Page not found',
    serverError: 'Server error. Please try again later.',
  },

  // About page
  about: {
    title: 'About OnChess',
    mission: 'Our Mission',
    story: 'Our Story',
    team: 'Our Team',
    contact: 'Contact Us',
    joinUs: 'Join Us',
  },

  // Language selection
  language: {
    select: 'Select Language',
    en: 'English',
    es: 'Spanish',
  },
};

export default englishTranslations;
