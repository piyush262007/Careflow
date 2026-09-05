import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';
import type { HospitalData } from './hospitalService';
import type { DoctorData } from './doctorService';

export interface RecommendationRequestPayload {
  symptoms: string;
  selectedChips?: string[];
  painLevel?: string;
  duration?: string;
  userLatitude?: number;
  userLongitude?: number;
}

export interface RecommendationResponseData {
  id?: number;
  symptoms?: string;
  painLevel?: string;
  duration?: string;
  predictedDepartment: string;
  severity: string;
  confidenceScore: number;
  recommendationReason?: string;
  recommendedHospital?: HospitalData;
  recommendedDoctor?: DoctorData;
  alternativeHospitals?: HospitalData[];
  createdAt?: string;
}

export const recommendationService = {
  async analyzeSymptoms(payload: RecommendationRequestPayload) {
    const res = await apiClient.post<ApiResponse<RecommendationResponseData>>('/recommendations/analyze', payload);
    return res.data;
  },

  async getConsultationHistory() {
    const res = await apiClient.get<ApiResponse<RecommendationResponseData[]>>('/recommendations/history');
    return res.data;
  },

  async getConsultationById(id: number) {
    const res = await apiClient.get<ApiResponse<RecommendationResponseData>>(`/recommendations/${id}`);
    return res.data;
  },
};
