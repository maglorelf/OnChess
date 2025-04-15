import { verifyToken, USER_ROLES } from './auth.js';

// Re-export USER_ROLES so it can be imported from middleware
export { USER_ROLES };

// Extract token from cookies
export const getTokenFromCookies = (request) => {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  return cookies.token;
};

// Auth middleware
export const auth = async (request) => {
  // Get token from cookies
  const token = getTokenFromCookies(request);
  if (!token) return { user: null, isAuthenticated: false };
  
  // Verify token
  const user = verifyToken(token);
  return {
    user,
    isAuthenticated: !!user
  };
};

// Authorization middleware - check if user has required role
export const authorize = (user, allowedRoles) => {
  if (!user) return false;
  
  // Admin role has access to everything
  if (user.role === USER_ROLES.ADMIN) return true;
  
  // Check if user's role is in the allowed roles
  return allowedRoles.includes(user.role);
};

// Protected route middleware
export const protectRoute = async (request, allowedRoles) => {
  const { user, isAuthenticated } = await auth(request);
  
  if (!isAuthenticated) {
    return {
      isAllowed: false,
      redirect: '/signin'
    };
  }
  
  const isAuthorized = authorize(user, allowedRoles);
  
  return {
    user,
    isAuthenticated,
    isAllowed: isAuthorized,
    redirect: isAuthorized ? null : '/unauthorized'
  };
};