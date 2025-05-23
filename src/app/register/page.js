'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext'; // Added import

const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export default function RegisterPage() {
  const { translations, t } = useLanguage(); // Added useLanguage hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(t('validation.passwordMatch')); // Replaced hardcoded string
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError(t('validation.passwordLength')); // Replaced hardcoded string
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('errors.register')); // Replaced hardcoded string
      }

      // Redirect to login page on successful registration
      router.push('/login');
    } catch (err) {
      setError(err.message || t('errors.registerGeneric')); // Replaced hardcoded string
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <Image
              src="/logo-on-chess-text.png"
              alt="OnChess Logo"
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t('auth.register')} {/* Replaced hardcoded string */}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {t('auth.haveAccount')}{' '}
            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
              {t('auth.loginButton')} {/* Replaced hardcoded string */}
            </Link>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="name" className="sr-only">
                {t('auth.fullNameLabel')} {/* Replaced hardcoded string */}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 
                          bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none 
                          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('auth.fullNamePlaceholder')} // Replaced hardcoded string
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {t('auth.email')} {/* Replaced hardcoded string */}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 
                          bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none 
                          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('auth.emailPlaceholder')} // Replaced hardcoded string
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('auth.password')} {/* Replaced hardcoded string */}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 
                          bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none 
                          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('auth.passwordPlaceholderMinChars')} // Replaced hardcoded string
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {t('auth.confirmPassword')} {/* Replaced hardcoded string */}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 
                          bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none 
                          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('auth.confirmPasswordPlaceholder')} // Replaced hardcoded string
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
                      text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                      transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
              ) : null}
              {t('auth.registerButton')} {/* Replaced hardcoded string */}
            </button>
          </div>
        </form>

        <div className="text-xs text-gray-400 text-center mt-4">
          {t('auth.agreeToTermsPrefix')}{' '}
          <Link href="/terminos-de-uso" className="text-blue-400 hover:underline">
            {t('footer.termsOfUse')}
          </Link>{' '}
          {t('common.and')}{' '}
          <Link href="/politica-de-privacidad" className="text-blue-400 hover:underline">
            {t('footer.privacyPolicy')}
          </Link>
        </div>
      </div>
    </div>
  );
}
