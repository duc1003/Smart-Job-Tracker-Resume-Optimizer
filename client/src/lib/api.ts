import axios from 'axios';
import { authUtils } from './auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Token expired or invalid
      authUtils.clearAuth();
      window.location.href = '/signin';
    }
    
    // Return a consistent error format
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  register: async (userData: { 
    name: string; 
    email: string; 
    password: string; 
    role: string; 
  }) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  logout: async () => {
    // If you have a logout endpoint
    const response = await api.post('/users/logout');
    return response.data;
  },

  refreshToken: async () => {
    // If you have a refresh token endpoint
    const response = await api.post('/users/refresh');
    return response.data;
  },
};

// Export the configured axios instance for other API calls
export default api;