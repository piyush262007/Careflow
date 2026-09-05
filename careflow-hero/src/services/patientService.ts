import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';

export interface PatientResponseData {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  bloodGroup?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  allergies?: string;
  medicalHistory?: string;
  profileImage?: string;
}

export interface HealthSummaryData {
  age?: number;
  bmi?: number;
  bmiCategory?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  emergencyContact?: {
    name?: string;
    phone?: string;
  };
}

export const patientService = {
  async getProfile() {
    const res = await apiClient.get<ApiResponse<PatientResponseData>>('/patient/profile');
    return res.data;
  },

  async updateProfile(data: Partial<PatientResponseData>) {
    const res = await apiClient.put<ApiResponse<PatientResponseData>>('/patient/profile', data);
    return res.data;
  },

  async getHealthSummary() {
    const res = await apiClient.get<ApiResponse<HealthSummaryData>>('/patient/health-summary');
    return res.data;
  },

  async getPatientById(id: number) {
    const res = await apiClient.get<ApiResponse<PatientResponseData>>(`/patient/${id}`);
    return res.data;
  },
};
