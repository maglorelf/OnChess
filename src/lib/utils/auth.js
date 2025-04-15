import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Secret key for JWT - in production this should be in environment variables
const JWT_SECRET = 'your-jwt-secret-key-should-be-from-env-variables';

// User roles
export const USER_ROLES = {
  ANONYMOUS: 'anonymous',
  NORMAL: 'normal',
  PREMIUM: 'premium',
  ADMIN: 'admin'
};

// Function to generate JWT token
export const generateToken = (user) => {
  // Don't include password in the token payload
  const { password, ...userWithoutPassword } = user;
  
  return jwt.sign(userWithoutPassword, JWT_SECRET, { expiresIn: '1d' });
};

// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Function to hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Function to compare password with hash
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Mock user database (in a real app, this would be a database)
// This is just for development/demo purposes
export const users = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uQxo4FC0R1n0OFEH2BzxnslFYJ3wfUpq', // password: admin123
    role: USER_ROLES.ADMIN
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uP.CgYynvgLJL7xhvp/.L0Fxt6xjL622', // password: user123
    role: USER_ROLES.NORMAL
  },
  {
    id: '3',
    username: 'premium',
    email: 'premium@example.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uLWyxD/UUVHxHxa/UcwHx4aUVLzJ2AWW', // password: premium123
    role: USER_ROLES.PREMIUM
  }
];

// Function to get user by credentials
export const getUserByCredentials = async (email, password) => {
  const user = users.find(u => u.email === email);
  if (!user) return null;
  
  const isPasswordValid = await comparePassword(password, user.password);
  return isPasswordValid ? user : null;
};

// Function to get user by ID
export const getUserById = (id) => {
  return users.find(u => u.id === id) || null;
};