'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  getUserData,
  isLoggedIn as checkIsLoggedIn,
  logout as logoutUser,
  subscribeToAuthChanges,
} from '@/lib/userUtils';
import { useLanguage } from '@/lib/languageContext';
import LanguageSelector from '@/components/LanguageSelector';

const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  // Define fetchMemberData
  const fetchMemberData = useCallback(async (email, token) => {
    try {
      const memberResponse = await fetch(
        `${BACKEND_API_BASE_URL}/Member/ByEmail/${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (memberResponse.ok) {
        const data = await memberResponse.json();
        setMemberData(data);
        localStorage.setItem('memberData', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  }, []);

  // Define checkAuthStatus with useCallback, but avoid unnecessary dependencies
  const checkAuthStatus = useCallback(async () => {
    // First check local storage for token
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    // If we have a token, consider the user logged in initially
    if (authToken) {
      setIsLoggedIn(true);
    }

    try {
      // Verify the session with the server
      const response = await fetch(`${BACKEND_API_BASE_URL}/user/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);

        // If the user has email and token, fetch member data
        // But avoid causing circular dependencies by not checking memberData state
        if (userData.email && authToken) {
          fetchMemberData(userData.email, authToken);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        // Clear localStorage on failed auth check
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('memberData');
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [fetchMemberData]); // Only depend on fetchMemberData to avoid circular updates

  // Check auth status on component mount, on window focus, and via subscription
  useEffect(() => {
    // Function to update auth status from any source
    const updateAuthStatus = () => {
      const loggedIn = checkIsLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const userData = getUserData();

        if (userData) {
          setMemberData(userData);
        }
        // If no userData but still logged in, fetch from server
        // but limit to initial mount to prevent infinite loops
        else if (typeof window !== 'undefined') {
          checkAuthStatus();
        }
      } else {
        setMemberData(null);
      }
    };

    // Initial auth check
    updateAuthStatus();

    // Update auth status when window gets focus
    const handleFocus = () => updateAuthStatus();
    window.addEventListener('focus', handleFocus);

    // Subscribe to auth changes (login, logout, user data updates)
    const unsubscribe = subscribeToAuthChanges((isLoggedIn, userData) => {
      console.log('Auth state changed:', isLoggedIn ? 'logged in' : 'logged out');
      setIsLoggedIn(isLoggedIn);
      if (userData) {
        setMemberData(userData);
      }
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
      unsubscribe(); // Clean up subscription
    };
  }, [checkAuthStatus]); // Include checkAuthStatus as dependency

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (authToken) {
        await fetch(`${BACKEND_API_BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
      // Clear state and local storage
      setUser(null);
      setMemberData(null);
      setIsLoggedIn(false);
      // Use our utility function to clear all user data
      logoutUser();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get display name with priority to memberData (which has more details)
  const getDisplayName = () => {
    if (memberData) {
      return memberData.name || memberData.username || 'Member';
    }
    if (user) {
      return user.name || user.email?.split('@')[0] || 'User';
    }
    return 'User';
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-on-chess-text.png"
              alt="OnChess Logo"
              width={140}
              height={40}
              className="h-10 w-auto transform transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="font-medium text-gray-100 hover:text-blue-400 transition-all duration-200 relative group"
          >
            {t('nav.home')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/blog"
            className="font-medium text-gray-100 hover:text-blue-400 transition-all duration-200 relative group"
          >
            {t('nav.blog')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/resources"
            className="font-medium text-gray-100 hover:text-blue-400 transition-all duration-200 relative group"
          >
            {t('nav.resources')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className="font-medium text-gray-100 hover:text-blue-400 transition-all duration-200 relative group"
          >
            {t('nav.about')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-300">
                {memberData && memberData.isTeacher && (
                  <span className="mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-200 text-xs">
                    Teacher
                  </span>
                )}
                {memberData && memberData.isStudent && (
                  <span className="mr-2 px-2.5 py-0.5 rounded bg-green-900 text-green-200 text-xs">
                    Student
                  </span>
                )}
                <Link href="/profile" className="hover:text-blue-400 transition-all duration-200">
                  Hello, {getDisplayName()}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:shadow-blue-600/40 disabled:opacity-70 flex items-center"
              >
                {isLoading ? (
                  <span className="inline-block animate-spin rounded-full h-3 w-3 border-t-2 border-white mr-2"></span>
                ) : null}
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-transparent border border-blue-500 hover:bg-blue-500/20 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:shadow-blue-600/40"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
