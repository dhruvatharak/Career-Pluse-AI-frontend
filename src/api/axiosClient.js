/**
 * CareerPulse AI - Axios HTTP Client
 * Configures base URL and request/response interceptors for JWT token propagation,
 * automatic session expiration handling, and network reachability feedback.
 */

import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor: Attach JWT token if present in storage
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('careerpulse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Extract data or reject formatted error
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Check for network unreachable error
    if (!error.response || error.code === 'ERR_NETWORK') {
      toast.error('Server not reachable, please try again.');
      return Promise.reject(new Error('Server not reachable, please try again.'));
    }

    // Handle 401 Unauthorized / Token Expiration
    if (error.response.status === 401) {
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        localStorage.removeItem('careerpulse_token');
        localStorage.removeItem('careerpulse_user');
        toast.error('Session expired. Please sign in again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      }
    }

    const customMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Request failed. Please try again.';

    return Promise.reject(new Error(customMessage));
  }
);

export default axiosClient;
