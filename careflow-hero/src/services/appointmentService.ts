import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';

export interface AppointmentData {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  specializationName: string;
  hospitalId: number;
  hospitalName: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms?: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_CONSULTATION' | 'REJECTED' | 'TIME_CHANGE_REQUESTED' | 'COMPLETED' | 'CANCELLED';
  consultationFee: number;
  qrCode: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookAppointmentPayload {
  doctorId: number;
  hospitalId: number;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm:ss or HH:mm
  symptoms?: string;
  notes?: string;
}

export const appointmentService = {
  async bookAppointment(payload: BookAppointmentPayload) {
    const res = await apiClient.post<ApiResponse<AppointmentData>>('/appointments', payload);
    return res.data;
  },

  async getPatientAppointments() {
    const res = await apiClient.get<ApiResponse<AppointmentData[]>>('/appointments/patient');
    return res.data;
  },

  async getMyDoctorAppointments() {
    const res = await apiClient.get<ApiResponse<AppointmentData[]>>('/appointments/doctor/me');
    return res.data;
  },

  async getAppointmentById(id: number) {
    const res = await apiClient.get<ApiResponse<AppointmentData>>(`/appointments/${id}`);
    return res.data;
  },

  async confirmAppointment(id: number) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/confirm`);
    return res.data;
  },

  async rejectAppointment(id: number, reason?: string) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/reject`, null, {
      params: { reason },
    });
    return res.data;
  },

  async suggestTime(id: number, payload: { date: string; time: string; reason?: string }) {
    const res = await apiClient.post<ApiResponse<AppointmentData>>(`/appointments/${id}/suggest-time`, payload);
    return res.data;
  },

  async acceptSuggestedTime(id: number) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/accept-suggested-time`);
    return res.data;
  },

  async rejectSuggestedTime(id: number) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/reject-suggested-time`);
    return res.data;
  },

  async completeAppointment(id: number) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/complete`);
    return res.data;
  },

  async startConsultation(id: number) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/start-consultation`);
    return res.data;
  },

  async updateAppointmentStatus(id: number, status: string) {
    const res = await apiClient.put<ApiResponse<AppointmentData>>(`/appointments/${id}/status`, null, {
      params: { status },
    });
    return res.data;
  },

  async cancelAppointment(id: number) {
    const res = await apiClient.patch<ApiResponse<AppointmentData>>(`/appointments/${id}/cancel`);
    return res.data;
  },

  async deleteAppointment(id: number) {
    const res = await apiClient.delete<ApiResponse<string>>(`/appointments/${id}`);
    return res.data;
  },

  async getQRCodeBlob(id: number): Promise<Blob> {
    const res = await apiClient.get(`/appointments/${id}/qr`, {
      responseType: 'blob',
    });
    return res.data;
  },
};
