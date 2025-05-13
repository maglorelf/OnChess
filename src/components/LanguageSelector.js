'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import Image from 'next/image';

export default function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = lang => {
    changeLanguage(lang);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex items-center justify-center px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition border border-gray-300 dark:border-gray-600"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <Image
          src={
            language === 'en'
              ? '/images/languages/language-english.svg'
              : '/images/languages/language-spanish.svg'
          }
          alt={language === 'en' ? 'English' : 'Español'}
          width={24}
          height={16}
          className="w-8 h-5 object-cover"
        />
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`${
                language === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''
              } flex w-full items-center justify-center px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
              role="menuitem"
              title="English (UK)"
              aria-label="Switch to English"
            >
              <Image
                src="/images/languages/language-english.svg"
                alt="English"
                width={32}
                height={20}
                className="w-12 h-8 object-cover"
              />
            </button>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`${
                language === 'es' ? 'bg-gray-100 dark:bg-gray-700' : ''
              } flex w-full items-center justify-center px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
              role="menuitem"
              title="Español"
              aria-label="Cambiar a Español"
            >
              <Image
                src="/images/languages/language-spanish.svg"
                alt="Español"
                width={32}
                height={20}
                className="w-12 h-8 object-cover"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
