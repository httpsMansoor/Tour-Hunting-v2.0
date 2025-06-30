import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: 'https://3dde-223-123-0-47.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define paths that don't require login
const PUBLIC_ENDPOINTS = [
  '/api/accounts/register/',
  '/api/accounts/login/',
  '/api/accounts/token/',
  '/api/accounts/reset-password/',
  '/api/accounts/verify-email/',
  'api/accounts/send-reset-password-link/',
];

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('accessToken');

      // Check if this is a public API endpoint
      const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
        config.url.includes(endpoint)
      );

      if (!token && !isPublic) {
        const error = new Error('Please login to continue');
        error.code = 'NOT_AUTHENTICATED';
        throw error;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for expired/invalid tokens
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== 'undefined'
    ) {
      sessionStorage.removeItem('accessToken');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default instance;
