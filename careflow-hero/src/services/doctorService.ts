import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';

export interface SpecializationData {
  id: number;
  name: string;
  description?: string;
}

export interface DoctorData {
  id: number;
  hospitalId: number;
  hospitalName: string;
  specializationId: number;
  specializationName: string;
  fullName: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number;
  phone: string;
  email: string;
  profileImage?: string;
  bio?: string;
  consultationMode?: string;
  status?: string;
}

export interface TimeSlotData {
  startTime: string;
  endTime: string;
  available: boolean;
}

export const doctorService = {
  async getAllDoctors() {
    const res = await apiClient.get<ApiResponse<DoctorData[]>>('/doctors');
    return res.data;
  },

  async getDoctorById(id: number) {
    const res = await apiClient.get<ApiResponse<DoctorData>>(`/doctors/${id}`);
    return res.data;
  },

  async searchDoctors(params: {
    hospitalId?: number;
    specializationId?: number;
    availableToday?: boolean;
    name?: string;
  }) {
    const res = await apiClient.get<ApiResponse<DoctorData[]>>('/doctors/search', { params });
    return res.data;
  },

  async getDoctorsByHospital(hospitalId: number) {
    const res = await apiClient.get<ApiResponse<DoctorData[]>>(`/doctors/hospital/${hospitalId}`);
    return res.data;
  },

  async getAllSpecializations() {
    const res = await apiClient.get<ApiResponse<SpecializationData[]>>('/specializations');
    return res.data;
  },

  async getDoctorScheduleSlots(doctorId: number, date?: string) {
    const res = await apiClient.get<ApiResponse<TimeSlotData[]>>(`/doctors/${doctorId}/schedule`, {
      params: { date },
    });
    return res.data;
  },
};
