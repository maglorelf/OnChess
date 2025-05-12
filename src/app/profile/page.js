'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserProfile from '@/components/UserProfile';
import { isLoggedIn } from '@/lib/userUtils';

export default function ProfilePage() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setUserLoggedIn(loggedIn);
    setLoading(false);

    // Redirect to login if not logged in
    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse p-8 bg-gray-800 rounded-lg">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
        <UserProfile />
      </div>
    </div>
  );
}
