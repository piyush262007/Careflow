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
  distanceKm?: number;
  currentQueueCount?: number;
  estimatedWaitMinutes?: number;
  availableDoctorsCount?: number;
  departments?: string[];
  hospitalStatus?: string;
}

export interface HospitalRecommendationData {
  hospital: HospitalData;
  matchScore: number;
  recommendationTitle: string;
  recommendationReason: string;
  alternativeHospitals: HospitalData[];
}

export const hospitalService = {
  async getAllHospitals(userLat?: number, userLng?: number) {
    const res = await apiClient.get<ApiResponse<HospitalData[]>>('/hospitals', {
      params: { userLat, userLng },
    });
    return res.data;
  },

  async getHospitalById(id: number, userLat?: number, userLng?: number) {
    const res = await apiClient.get<ApiResponse<HospitalData>>(`/hospitals/${id}`, {
      params: { userLat, userLng },
    });
    return res.data;
  },

  async searchHospitals(params: {
    city?: string;
    name?: string;
    emergencyAvailable?: boolean;
    specialization?: string;
    userLat?: number;
    userLng?: number;
    maxDistanceKm?: number;
    sortBy?: string;
  }) {
    const res = await apiClient.get<ApiResponse<HospitalData[]>>('/hospitals/search', { params });
    return res.data;
  },

  async getHospitalRecommendation(params: {
    userLat?: number;
    userLng?: number;
    specialization?: string;
    isEmergency?: boolean;
  }) {
    const res = await apiClient.get<ApiResponse<HospitalRecommendationData>>('/hospitals/recommend', { params });
    return res.data;
  },

  // Admin Operations
  async createHospital(data: Partial<HospitalData>) {
    const res = await apiClient.post<ApiResponse<HospitalData>>('/hospitals', data);
    return res.data;
  },

  async updateHospital(id: number, data: Partial<HospitalData>) {
    const res = await apiClient.put<ApiResponse<HospitalData>>(`/hospitals/${id}`, data);
    return res.data;
  },

  async deleteHospital(id: number) {
    const res = await apiClient.delete<ApiResponse<string>>(`/hospitals/${id}`);
    return res.data;
  },
};
