import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';
import type { PrescriptionResponse } from './prescriptionService';

export interface HealthRecordData {
  id: number;
  patientId: number;
  patientName: string;
  doctorId?: number;
  doctorName?: string;
  doctorSpecialization?: string;
  hospitalName?: string;

  appointmentId?: number;
  appointmentDate?: string;
  appointmentTime?: string;

  recordType?: string;
  title: string;
  description?: string;
  fileName?: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt: string;

  prescription?: PrescriptionResponse;
}

export const healthRecordService = {
  async getPatientHealthRecords() {
    const res = await apiClient.get<ApiResponse<HealthRecordData[]>>('/health-records/patient');
    return res.data;
  },

  async getHealthRecordById(id: number) {
    const res = await apiClient.get<ApiResponse<HealthRecordData>>(`/health-records/${id}`);
    return res.data;
  },

  async getDoctorPatientHealthRecords(patientId: number) {
    const res = await apiClient.get<ApiResponse<HealthRecordData[]>>(`/health-records/doctor/patient/${patientId}`);
    return res.data;
  },

  async uploadHealthRecord(formData: FormData) {
    const res = await apiClient.post<ApiResponse<HealthRecordData>>('/health-records/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
