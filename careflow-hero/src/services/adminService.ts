import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';
import type { HospitalData } from './hospitalService';
import type { DoctorData } from './doctorService';

export interface AdminDashboardData {
  totalPatients: number;
  totalDoctors: number;
  activeDoctors: number;
  totalHospitals: number;
  activeHospitals: number;
  emergencyHospitals: number;
  appointmentsToday: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

export const adminService = {
  async getAdminDashboard() {
    const res = await apiClient.get<ApiResponse<AdminDashboardData>>('/admin/dashboard');
    return res.data;
  },

  async createHospital(payload: any) {
    const res = await apiClient.post<ApiResponse<HospitalData>>('/admin/hospitals', payload);
    return res.data;
  },

  async updateHospital(id: number, payload: any) {
    const res = await apiClient.put<ApiResponse<HospitalData>>(`/admin/hospitals/${id}`, payload);
    return res.data;
  },

  async toggleHospitalActive(id: number) {
    const res = await apiClient.patch<ApiResponse<HospitalData>>(`/admin/hospitals/${id}/toggle-active`);
    return res.data;
  },

  async updateHospitalLiveStatus(id: number, currentQueue: number, estimatedWaitMinutes: number, emergencyStatus: string = 'AVAILABLE') {
    const res = await apiClient.put<ApiResponse<string>>(`/admin/hospitals/${id}/live-status`, null, {
      params: { currentQueue, estimatedWaitMinutes, emergencyStatus },
    });
    return res.data;
  },

  async createDoctor(payload: any) {
    const res = await apiClient.post<ApiResponse<DoctorData>>('/admin/doctors', payload);
    return res.data;
  },

  async updateDoctor(id: number, payload: any) {
    const res = await apiClient.put<ApiResponse<DoctorData>>(`/admin/doctors/${id}`, payload);
    return res.data;
  },

  async toggleDoctorActive(id: number) {
    const res = await apiClient.patch<ApiResponse<DoctorData>>(`/admin/doctors/${id}/toggle-active`);
    return res.data;
  },
};
