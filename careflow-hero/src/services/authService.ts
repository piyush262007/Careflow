import { apiClient } from '../api/client';

export interface SpringBootUser {
  id: number | string;
  fullName: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  enabled?: boolean;
}

export interface SpringBootLoginData {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  userId?: number;
  fullName?: string;
  email?: string;
  role?: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  user?: SpringBootUser;
  expiresIn?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export const authService = {
  async register(data: { fullName: string; email: string; password: string; role?: string }) {
    const res = await apiClient.post<ApiResponse<SpringBootUser>>('/auth/register', {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role || 'PATIENT',
    });
    return res.data;
  },

  async login(email: string, password: string) {
    const res = await apiClient.post<ApiResponse<SpringBootLoginData>>('/auth/login', {
      email,
      password,
    });
    return res.data;
  },

  async getCurrentUser() {
    const res = await apiClient.get<ApiResponse<SpringBootUser>>('/auth/me');
    return res.data;
  },

  async logout(refreshToken?: string) {
    try {
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch {
      // Ignore errors on logout network call
    }
  },
};
