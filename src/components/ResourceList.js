'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/languageContext';
import ResourcePreview from '@/components/ResourcePreview';
import { ALL_TAGS, CATEGORIES, CONTENT_TYPES } from '@/lib/resourceUtils';

// Number of resources per page
const ITEMS_PER_PAGE = 6;

export default function ResourceList({ resources }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredResources, setFilteredResources] = useState(resources);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedResources, setPaginatedResources] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Initialize filters, search, and page from URL params on component mount
  useEffect(() => {
    const tags = searchParams.get('tags');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const page = searchParams.get('page');

    if (tags) {
      setSelectedTags(tags.split(','));
    }

    if (category) {
      setSelectedCategory(category);
    }

    if (type) {
      setSelectedType(type);
    }

    if (search) {
      setSearchTerm(search);
    }

    if (page) {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }
  }, [searchParams]);
  // Apply filters, search, and update pagination in a single effect
  useEffect(() => {
    // Filter resources
    let filtered = [...resources];

    // Apply search term first
    if (searchTerm && searchTerm.trim() !== '') {
      const searchTermLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        resource =>
          resource.title.toLowerCase().includes(searchTermLower) ||
          (resource.excerpt && resource.excerpt.toLowerCase().includes(searchTermLower)) ||
          (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(resource =>
        selectedTags.some(tag => resource.tags?.includes(tag))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by content type
    if (selectedType) {
      filtered = filtered.filter(resource => resource.contentType === selectedType);
    }

    // Update filtered resources
    setFilteredResources(filtered);

    // Calculate total pages
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));

    // Calculate pagination (separate from URL update to avoid re-renders)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filtered.slice(startIndex, endIndex);
    setPaginatedResources(currentItems);
  }, [selectedTags, selectedCategory, selectedType, searchTerm, resources, currentPage]);

  // Handle URL updates separately, with a debounce to prevent multiple calls
  useEffect(() => {
    // Create a simple debounce function
    const updateURLTimeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (selectedTags.length > 0) {
        params.set('tags', selectedTags.join(','));
      }
      if (selectedCategory) {
        params.set('category', selectedCategory);
      }
      if (selectedType) {
        params.set('type', selectedType);
      }
      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      }

      // Only include page parameter if greater than 1
      if (currentPage > 1) {
        params.set('page', currentPage.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/resources?${queryString}` : '/resources';
      router.replace(url, { scroll: false });
    }, 300); // 300ms debounce

    // Cleanup timeout on component unmount or when dependencies change
    return () => clearTimeout(updateURLTimeout);
  }, [selectedTags, selectedCategory, selectedType, searchTerm, currentPage, router]);

  // Toggle tag selection
  const toggleTag = tag => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // Handle search input change
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  // Handle page change
  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

      // Scroll to top of the resource list when changing pages
      window.scrollTo({
        top: document.getElementById('resources-top').offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory('');
    setSelectedType('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Show dots if current page is more than 3
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      // Show current page and one page before and after (if they exist)
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Show dots if current page is less than totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div id="resources-top">
      {/* Search Box */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>{' '}
          <input
            type="search"
            id="resource-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:ring-primary focus:border-primary"
            placeholder={t('resources.searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
              onClick={() => setSearchTerm('')}
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Filters */}{' '}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h3 className="text-lg font-semibold mb-2">{t('resources.filters')}</h3>
          {(selectedTags.length > 0 || selectedCategory || selectedType || searchTerm) && (
            <button onClick={clearFilters} className="text-sm text-primary hover:underline">
              {t('resources.clearFilters')}
            </button>
          )}
        </div>
        {/* Categories */}
        <div className="mb-4">
          {' '}
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
            {t('resources.category')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.values(CATEGORIES).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(prev => (prev === category ? '' : category))}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-gray-700 font-bold border-2 border-white outline outline-2 outline-primary shadow-md'
                    : 'bg-gray-200 text-slate-900 dark:bg-gray-700 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-600 border border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>{' '}
        {/* Content Types */}
        <div className="mb-4">
          {' '}
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
            {t('resources.contentType')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.values(CONTENT_TYPES).map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(prev => (prev === type ? '' : type))}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                  selectedType === type
                    ? 'bg-primary text-gray-700 font-bold border-2 border-white outline outline-2 outline-primary shadow-md'
                    : 'bg-gray-200 text-slate-900 dark:bg-gray-700 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-600 border border-transparent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>{' '}
        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
            {t('resources.tags')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-gray-700 font-bold border-2 border-white outline outline-2 outline-primary shadow-md'
                    : 'bg-gray-200 text-slate-900 dark:bg-gray-700 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-600 border border-transparent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {t('resources.showingCount', {
            count: paginatedResources.length,
            total: filteredResources.length,
            resourceWord:
              filteredResources.length === 1 ? t('resources.resource') : t('resources.resources'),
            page: currentPage,
            totalPages: totalPages,
          })}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </p>
      </div>
      {/* Resources grid */}
      {filteredResources.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedResources.map(resource => (
              <ResourcePreview
                key={resource.slug}
                title={resource.title}
                slug={resource.slug}
                excerpt={resource.excerpt}
                coverImage={resource.coverImage}
                tags={resource.tags}
                accessLevel={resource.accessLevel}
                contentType={resource.contentType}
                category={resource.category}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center my-8">
              <nav aria-label="Page navigation">
                <ul className="flex items-center -space-x-px h-10 text-base">
                  {/* Previous button */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight rounded-s-lg 
                        ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-800 dark:text-gray-600'
                            : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </button>
                  </li>

                  {/* Page numbers */}
                  {generatePageNumbers().map((pageNumber, index) => (
                    <li key={index}>
                      {pageNumber === '...' ? (
                        <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className={`flex items-center justify-center px-4 h-10 leading-tight 
                            ${
                              currentPage === pageNumber
                                ? 'text-blue-600 border border-gray-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      )}
                    </li>
                  ))}

                  {/* Next button */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center px-4 h-10 leading-tight rounded-e-lg 
                        ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-800 dark:text-gray-600'
                            : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('resources.noResourcesFound')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your filters or check back later for new content.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            {t('resources.clearFilters')}
          </button>
        </div>
      )}
    </div>
  );
}
