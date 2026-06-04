import axios from 'axios';

// Create a configured axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Required for Laravel Sanctum cookie-based authentication
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Axios request interceptor (adds authorization bearer token if present in localStorage)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Initialize CSRF cookie protection for Laravel Sanctum.
 * Call this before executing state-changing requests like login.
 */
export const getCsrfCookie = () => {
  return axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
    withCredentials: true,
  });
};

export default api;
