// Utils for handling user data and authentication

// Event system for auth state changes
const authEventListeners = [];

/**
 * Subscribe to authentication state changes
 * @param {Function} callback Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAuthChanges(callback) {
  authEventListeners.push(callback);
  return () => {
    const index = authEventListeners.indexOf(callback);
    if (index !== -1) {
      authEventListeners.splice(index, 1);
    }
  };
}

/**
 * Notify subscribers about an auth state change
 */
export function notifyAuthChange() {
  const isUserLoggedIn = isLoggedIn();
  const userData = getUserData();
  authEventListeners.forEach(callback => callback(isUserLoggedIn, userData));
}

/**
 * Gets the current user data from localStorage
 * @returns {Object|null} The user data or null if not logged in
 */
export function getUserData() {
  if (typeof window === 'undefined') return null;

  try {
    const memberDataStr = localStorage.getItem('memberData');
    return memberDataStr ? JSON.parse(memberDataStr) : null;
  } catch (err) {
    console.error('Error parsing user data:', err);
    return null;
  }
}

/**
 * Checks if the user is logged in
 * @returns {boolean} True if the user is logged in
 */
export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('authToken');
}

/**
 * Gets the auth token for API requests
 * @returns {string|null} The auth token or null if not logged in
 */
export function getAuthToken() {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('authToken');
  const tokenType = localStorage.getItem('tokenType') || 'Bearer';

  return token ? `${tokenType} ${token}` : null;
}

/**
 * Logs out the user by clearing localStorage
 */
export function logout() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenType');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('memberData');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('isTeacher');
  localStorage.removeItem('isStudent');

  // Notify subscribers about logout
  notifyAuthChange();
}

/**
 * Checks if the auth token is expired
 * @returns {boolean} True if the token is expired or missing
 */
export function isTokenExpired() {
  if (typeof window === 'undefined') return true;

  const token = localStorage.getItem('authToken');
  if (!token) return true;

  // In a production app, you would decode the JWT token and check its exp claim
  // For now, we'll just use the expiresIn value and the current time
  const expiresIn = localStorage.getItem('expiresIn');
  const loginTime = localStorage.getItem('loginTime');

  if (!expiresIn || !loginTime) return true;

  const expirationTime = parseInt(loginTime) + parseInt(expiresIn) * 1000;
  return Date.now() > expirationTime;
}

/**
 * Fetches the latest user data from the API
 * @param {string} email User's email
 * @returns {Promise<Object>} The user data
 */
export async function refreshUserData(email) {
  if (typeof window === 'undefined' || !email) return null;

  const token = getAuthToken();
  if (!token) return null;

  try {
    const memberResponse = await fetch(
      `https://rook.escaques.com/Member/ByEmail/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!memberResponse.ok) {
      console.warn('Failed to refresh member data');
      return null;
    }

    const memberData = await memberResponse.json();
    localStorage.setItem('memberData', JSON.stringify(memberData)); // Update individual fields
    if (memberData.name) localStorage.setItem('userName', memberData.name);
    if (memberData.email) localStorage.setItem('userEmail', memberData.email);
    if (memberData.isTeacher) localStorage.setItem('isTeacher', memberData.isTeacher);
    if (memberData.isStudent) localStorage.setItem('isStudent', memberData.isStudent);

    // Notify subscribers about user data update
    notifyAuthChange();

    return memberData;
  } catch (err) {
    console.error('Error refreshing user data:', err);
    return null;
  }
}
