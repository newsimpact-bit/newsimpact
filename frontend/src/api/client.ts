import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '../types/index';

// Use relative URLs in development (Vite proxy will handle routing to localhost:3000)
// Use environment variable in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post<AuthResponse>(
            '/auth/refresh',
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data.data || {};

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Auth API calls
 */
export const authAPI = {
  register: (email: string, username: string, password: string, name?: string) =>
    apiClient.post<AuthResponse>('/auth/register', {
      email,
      username,
      password,
      name,
    }),

  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    }),

  logout: () => apiClient.post('/auth/logout'),

  getCurrentUser: () => apiClient.get<AuthResponse>('/auth/me'),
};
