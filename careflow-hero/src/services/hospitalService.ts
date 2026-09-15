import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';

export interface HospitalData {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email?: string;
  website?: string;
  rating?: number;
  totalReviews?: number;
  emergencyAvailable?: boolean;
  isOpen24Hours?: boolean;
  imageUrl?: string;
}

export const hospitalService = {
  async getAllHospitals() {
    const res = await apiClient.get<ApiResponse<HospitalData[]>>('/hospitals');
    return res.data;
  },

  async getHospitalById(id: number) {
    const res = await apiClient.get<ApiResponse<HospitalData>>(`/hospitals/${id}`);
    return res.data;
  },

  async searchHospitals(params: {
    city?: string;
    name?: string;
    emergencyAvailable?: boolean;
    specialization?: string;
  }) {
    const res = await apiClient.get<ApiResponse<HospitalData[]>>('/hospitals/search', { params });
    return res.data;
  },
};
