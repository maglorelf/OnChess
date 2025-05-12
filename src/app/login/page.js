'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { refreshUserData, notifyAuthChange } from '@/lib/userUtils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Step 1: Authenticate with rook.escaques.com/login
      const loginResponse = await fetch('https://rook.escaques.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for storing cookies
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // Extract the authentication token from response
      const authData = await loginResponse.json();

      // Check for accessToken instead of token
      const token = authData.accessToken || '';
      const tokenType = authData.tokenType || 'Bearer';

      if (!token) {
        throw new Error('Authentication token not received');
      } // Store token details in localStorage for future use
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('expiresIn', authData.expiresIn || 3600);
      localStorage.setItem('loginTime', Date.now().toString());

      // Also store the refresh token if available
      if (authData.refreshToken) {
        localStorage.setItem('refreshToken', authData.refreshToken);
      } // Step 2: Call /Member/ByEmail/ endpoint with the token using our utility
      const memberData = await refreshUserData(email);

      if (!memberData) {
        console.warn('Failed to fetch member data, but continuing login process');
      } else {
        console.log('User data retrieved successfully');
      }

      // Redirect to home page on successful login
      router.push('/');
      router.refresh(); // Refresh to update UI based on auth state
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      // Clean up any partial data on error
      localStorage.removeItem('authToken');
      localStorage.removeItem('memberData');
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
              create a new account
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
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-600 
                          bg-gray-700 text-gray-200 placeholder-gray-400 rounded-t-md focus:outline-none 
                          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-600 
                          bg-gray-700 text-gray-200 placeholder-gray-400 rounded-b-md focus:outline-none 
                          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                Forgot your password?
              </a>
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
