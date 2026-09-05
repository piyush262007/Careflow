import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';
import type { AppointmentData } from './appointmentService';
import type { HealthSummaryData } from './patientService';
import type { RecommendationResponseData } from './recommendationService';

export interface PatientDashboardData {
  upcomingAppointment?: AppointmentData;
  healthSummary?: HealthSummaryData;
  recentConsultation?: RecommendationResponseData;
  unreadNotificationsCount: number;
  totalAppointmentsCount: number;
}

export interface HospitalLiveStatusData {
  hospitalId: number;
  hospitalName: string;
  currentQueue: number;
  estimatedWaitMinutes: number;
  availableBeds?: number;
  icuBedsAvailable?: number;
  emergencyStatus: string;
  lastUpdated: string;
}

export interface TodayCareData {
  date: string;
  hasAppointmentToday: boolean;
  todayAppointments: AppointmentData[];
  nextAppointment?: AppointmentData;
  liveHospitalStatus?: HospitalLiveStatusData;
  importantNotifications?: Array<{
    id: number;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
  }>;
}

export const dashboardService = {
  async getPatientDashboard() {
    const res = await apiClient.get<ApiResponse<PatientDashboardData>>('/dashboard/patient');
    return res.data;
  },

  async getTodayCare() {
    const res = await apiClient.get<ApiResponse<TodayCareData>>('/dashboard/today-care');
    return res.data;
  },
};
