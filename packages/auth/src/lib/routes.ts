/**
 * Routes that are accessible without authentication
 * @type {string[]}
 */
export const publicRoutes = ['/join-waitlist'];

/**
 * Routes that are used for authentication
 * Routes that are accessible with authentication
 * @type {string[]}
 */
export const authRoutes = ['/sign-up', '/private-beta'];

/**
 * Authenticated routes
 * Routes that are accessible with authentication
 * @type {string[]}
 */
export const apiAuthPrefix = '/api/auth';
