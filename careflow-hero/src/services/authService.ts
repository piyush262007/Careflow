import { apiClient } from '../api/client';

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  enabled: boolean;
  createdAt: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export const authService = {
  async register(data: { fullName: string; email: string; password: string; role?: string }) {
    const res = await apiClient.post<ApiResponse<UserResponse>>('/auth/register', {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role || 'PATIENT',
    });
    return res.data;
  },

  async login(email: string, password: string) {
    const res = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', {
      email,
      password,
    });
    return res.data;
  },

  async getCurrentUser() {
    const res = await apiClient.get<ApiResponse<UserResponse>>('/auth/me');
    return res.data;
  },

  async logout(refreshToken: string) {
    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch {
      // Ignore network errors on logout
    }
  },
};
