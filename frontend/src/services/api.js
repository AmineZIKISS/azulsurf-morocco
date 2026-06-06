import axios from 'axios';

// ── Global Axios defaults ────────────────────────────────────────────
axios.defaults.withCredentials = true;

// ── Configured Axios instance for API calls ──────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// ── CSRF cookie helper ───────────────────────────────────────────────
/**
 * Fetch the Sanctum CSRF cookie from the backend.
 * This sets the XSRF-TOKEN cookie which Axios will automatically
 * read and send as the X-XSRF-TOKEN header on subsequent requests.
 */
export const getCsrfCookie = () => {
  return axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true,
  });
};

// ── Request interceptor: auto-fetch CSRF cookie before mutating requests ──
let csrfCookieFetched = false;

api.interceptors.request.use(async (config) => {
  // Add Bearer token if present
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // For state-changing methods, ensure CSRF cookie has been fetched at least once
  const mutatingMethods = ['post', 'put', 'patch', 'delete'];
  if (mutatingMethods.includes(config.method?.toLowerCase()) && !csrfCookieFetched) {
    await getCsrfCookie();
    csrfCookieFetched = true;
  }

  return config;
}, (error) => Promise.reject(error));

// Reset the CSRF flag on 419 (token mismatch) so it re-fetches on next request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 419) {
      csrfCookieFetched = false;
    }
    return Promise.reject(error);
  }
);

export default api;

