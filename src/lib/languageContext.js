'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Import language files
import enTranslations from './translations/en';
import esTranslations from './translations/es';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

// Create the context
export const LanguageContext = createContext();

// Helper function to get browser language preference
function getBrowserLanguage() {
  if (typeof window === 'undefined') return 'en'; // Default for server-side rendering

  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('es') ? 'es' : 'en';
}

// Language provider component
export function LanguageProvider({ children, initialLanguage }) {
  const [language, setLanguage] = useState(initialLanguage || 'en');

  // Load language preference on client side
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      // Set language based on browser preference if not set in storage
      const browserLang = getBrowserLanguage();
      setLanguage(browserLang);
      localStorage.setItem('language', browserLang);
    }
  }, []);

  // Function to change language
  const changeLanguage = newLanguage => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  // Translation function
  const t = (key, params = {}) => {
    // Split the key by dots to traverse the translations object
    const keys = key.split('.');
    let value = translations[language];

    // Traverse the translations object
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if key not found in current language
        let fallback = translations.en;
        for (const k of keys) {
          if (fallback && fallback[k]) {
            fallback = fallback[k];
          } else {
            return key; // Return the key if not found in fallback
          }
        }
        value = fallback;
        break;
      }
    }

    // Handle string with parameters
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      Object.keys(params).forEach(param => {
        value = value.replace(`{${param}}`, params[param]);
      });
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
