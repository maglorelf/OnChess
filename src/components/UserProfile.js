'use client';

import { useState, useEffect } from 'react';
import { getUserData, isLoggedIn } from '@/lib/userUtils';
import { useLanguage } from '@/lib/languageContext';
import { LANGUAGES } from '@/lib/resourceUtils';

// Language settings component
function LanguageSettings({ userData }) {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = newLanguage => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        {t('profile.currentLanguage')}:
        <span className="ml-2 font-semibold">
          {language === LANGUAGES.EN
            ? t('profile.languages.english')
            : t('profile.languages.spanish')}
        </span>
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleLanguageChange(LANGUAGES.EN)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            language === LANGUAGES.EN
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}
        >
          <span className="text-sm font-medium">{t('profile.languages.english')}</span>
        </button>

        <button
          onClick={() => handleLanguageChange(LANGUAGES.ES)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            language === LANGUAGES.ES
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}
        >
          <span className="text-sm font-medium">{t('profile.languages.spanish')}</span>
        </button>
      </div>

      <div className="mt-4 text-gray-400 text-sm">
        <p>{t('profile.languageDescription')}</p>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (isLoggedIn()) {
      const data = getUserData();
      setUserData(data);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-md text-gray-300">
        <p>You need to log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">User Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Personal Details</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="text-gray-400 font-medium">Name:</span> {userData.name}{' '}
              {userData.surname}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400 font-medium">Email:</span> {userData.email}
            </p>
            {userData.idNumber && (
              <p className="text-gray-300">
                <span className="text-gray-400 font-medium">ID Number:</span> {userData.idNumber}
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Chess Details</h3>
          <div className="space-y-2">
            {userData.fideId ? (
              <p className="text-gray-300">
                <span className="text-gray-400 font-medium">FIDE ID:</span> {userData.fideId}
              </p>
            ) : (
              <p className="text-gray-400">No FIDE ID registered</p>
            )}

            {userData.lichessId ? (
              <p className="text-gray-300">
                <span className="text-gray-400 font-medium">Lichess ID:</span> {userData.lichessId}
              </p>
            ) : (
              <p className="text-gray-400">No Lichess ID registered</p>
            )}
          </div>
        </div>
      </div>{' '}
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Roles</h3>
        <div className="flex flex-wrap gap-2">
          {userData.isTeacher && (
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">Teacher</span>
          )}
          {userData.isStudent && (
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">Student</span>
          )}
          {!userData.isTeacher && !userData.isStudent && (
            <span className="text-gray-400">No specific roles assigned</span>
          )}
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Language Preferences</h3>
        <LanguageSettings userData={userData} />
      </div>
    </div>
  );
}
