'use client';

import { useState, useEffect } from 'react';
import { isLoggedIn, getUserData } from '@/lib/userUtils';

/**
 * ResourceProgress component for tracking user progress on resources
 * This component allows users to mark resources as completed, in progress, or to save them for later
 */
export default function ResourceProgress({ resourceSlug }) {
  const [progressState, setProgressState] = useState('not-started'); // 'not-started', 'in-progress', 'completed', 'saved'
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  // Initialize progress data from localStorage on mount
  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      return;
    }

    const user = getUserData();
    setUserData(user);

    // Try to get stored progress data
    try {
      const progressData = localStorage.getItem('resource-progress');
      if (progressData) {
        const parsedData = JSON.parse(progressData);
        if (parsedData[resourceSlug]) {
          setProgressState(parsedData[resourceSlug]);
        }
      }

      setIsVisible(true);
    } catch (error) {
      console.error('Error loading resource progress:', error);
    }
  }, [resourceSlug]);

  // Update progress state in localStorage
  const updateProgressState = newState => {
    setProgressState(newState);

    try {
      // Get existing progress data
      const progressData = localStorage.getItem('resource-progress') || '{}';
      const parsedData = JSON.parse(progressData);

      // Update with new state for this resource
      parsedData[resourceSlug] = newState;

      // Save back to localStorage
      localStorage.setItem('resource-progress', JSON.stringify(parsedData));

      // This would be a good place to send data to the server in a real app
    } catch (error) {
      console.error('Error saving resource progress:', error);
    }
  };

  // Render appropriate button based on current progress state
  const renderButton = () => {
    switch (progressState) {
      case 'completed':
        return (
          <button
            onClick={() => updateProgressState('not-started')}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Completed
          </button>
        );

      case 'in-progress':
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateProgressState('completed')}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Mark Complete
            </button>

            <button
              onClick={() => updateProgressState('not-started')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );

      case 'saved':
        return (
          <button
            onClick={() => updateProgressState('in-progress')}
            className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
                clipRule="evenodd"
              />
            </svg>
            Saved for Later
          </button>
        );

      default: // 'not-started'
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateProgressState('in-progress')}
              className="flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Start Learning
            </button>

            <button
              onClick={() => updateProgressState('saved')}
              className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Save for Later
            </button>
          </div>
        );
    }
  };

  if (!isVisible || !userData) {
    return null;
  }

  return (
    <div className="mt-6 mb-10">
      <h3 className="text-lg font-medium mb-3">Your Progress</h3>
      <div className="flex items-center">{renderButton()}</div>
    </div>
  );
}
