'use client';

/**
 * OnChess Home Page
 *
 * This page uses the translation system from the language context.
 * If changes to translations aren't showing up, add ?refresh=true to the URL
 * Example: http://localhost:3000/?refresh=true
 *
 * The page is now split into modular components for easier maintenance and configuration:
 * - HeroSection: The main welcome section at the top
 * - FeaturesSection: The "Why OnChess" section with 3 feature cards
 * - BlogPreviewSection: Latest blog posts with preview cards
 * - CTASection: Call to action section at the bottom
 */

import { getAllBlogs } from '@/lib/mdUtils';
import { useLanguage } from '@/lib/languageContext';
import { useState, useEffect } from 'react';

// Import the modular components
import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import BlogPreviewSection from '@/components/Home/BlogPreviewSection';
import CTASection from '@/components/Home/CTASection';

export default function Home() {
  const { language } = useLanguage();
  const [latestBlogs, setLatestBlogs] = useState([]);

  // Get the latest blogs based on language
  useEffect(() => {
    // Get all blogs
    const allBlogs = getAllBlogs();

    // Sort blogs prioritizing the current language, then take the top 3
    const sortedBlogs = [...allBlogs]
      .sort((a, b) => {
        // Prioritize current language
        if (a.language === language && b.language !== language) return -1;
        if (a.language !== language && b.language === language) return 1;
        // Sort by date
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, 3);

    setLatestBlogs(sortedBlogs);
  }, [language]);

  // Reset cache approach based on URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use URL parameter approach for manual cache clearing
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('refresh')) {
        // Create a clean URL without the refresh parameter
        const cleanUrl = window.location.pathname;

        // Store timestamp in sessionStorage to track last refresh
        sessionStorage.setItem('lastCacheRefresh', Date.now().toString());

        // Navigate to the clean URL (history-friendly)
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Blog Preview Section */}
      <BlogPreviewSection blogs={latestBlogs} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
