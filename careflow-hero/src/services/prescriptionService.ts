import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';

export interface PrescriptionItem {
  id?: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing?: string;
  durationDays: number;
  instructions?: string;
}

export interface CreatePrescriptionPayload {
  appointmentId: number;
  symptoms?: string;
  diagnosis: string;
  notes?: string;
  recommendations?: string;
  followUpInstructions?: string;
  items: PrescriptionItem[];
}

export interface PrescriptionResponse {
  id: number;
  appointmentId: number;
  appointmentDate?: string;
  appointmentTime?: string;

  patientId: number;
  patientName: string;
  patientEmail?: string;
  patientPhone?: string;
  patientGender?: string;
  patientDateOfBirth?: string;

  doctorId: number;
  doctorName: string;
  doctorSpecialization?: string;
  hospitalName?: string;

  symptoms?: string;
  diagnosis: string;
  notes?: string;
  recommendations?: string;
  followUpInstructions?: string;

  createdAt: string;
  items: PrescriptionItem[];
}

export const prescriptionService = {
  async createPrescription(payload: CreatePrescriptionPayload) {
    const response = await apiClient.post<ApiResponse<PrescriptionResponse>>('/prescriptions', payload);
    return response.data;
  },

  async getPrescriptionByAppointmentId(appointmentId: number) {
    const response = await apiClient.get<ApiResponse<PrescriptionResponse>>(`/prescriptions/appointment/${appointmentId}`);
    return response.data;
  },

  async getPatientPrescriptions() {
    const response = await apiClient.get<ApiResponse<PrescriptionResponse[]>>('/prescriptions/patient');
    return response.data;
  },

  async getDoctorPrescriptions() {
    const response = await apiClient.get<ApiResponse<PrescriptionResponse[]>>('/prescriptions/doctor');
    return response.data;
  },

  async getPrescriptionById(id: number) {
    const response = await apiClient.get<ApiResponse<PrescriptionResponse>>(`/prescriptions/${id}`);
    return response.data;
  },
};
