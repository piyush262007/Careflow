import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { appointmentService } from '../services/appointmentService';
import type { AppointmentData, BookAppointmentPayload } from '../services/appointmentService';
import { useAuth } from './AuthContext';

export interface AppointmentItem {
  id: string; // e.g. "CF-APT-1001" or numeric string
  rawId?: number;
  hospitalName: string;
  hospitalId?: number;
  doctorName: string;
  doctorId?: number;
  specialty: string;
  date: string;
  time: string;
  consultationFee: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  qrPassToken: string;
  createdAt: number;
}

export type NewAppointmentData = Omit<AppointmentItem, 'id' | 'createdAt'>;

interface AppointmentContextType {
  appointments: AppointmentItem[];
  isLoading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  addAppointmentApi: (payload: BookAppointmentPayload) => Promise<AppointmentItem>;
  addAppointment: (data: NewAppointmentData) => AppointmentItem;
  cancelAppointment: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mapBackendStatus = (status: string): AppointmentItem['status'] => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmed';
      case 'CANCELLED':
      case 'REJECTED':
        return 'Cancelled';
      case 'COMPLETED':
        return 'Completed';
      case 'PENDING':
      default:
        return 'Pending';
    }
  };

  const mapBackendAppointment = (b: AppointmentData): AppointmentItem => ({
    id: `CF-APT-${b.id}`,
    rawId: b.id,
    hospitalName: b.hospitalName,
    hospitalId: b.hospitalId,
    doctorName: b.doctorName,
    doctorId: b.doctorId,
    specialty: b.specializationName || 'Specialist Consultation',
    date: b.appointmentDate,
    time: b.appointmentTime,
    consultationFee: `₹${b.consultationFee}`,
    status: mapBackendStatus(b.status),
    qrPassToken: b.qrCode,
    createdAt: b.createdAt ? new Date(b.createdAt).getTime() : Date.now(),
  });

  const fetchAppointments = useCallback(async () => {
    if (!isAuthenticated) {
      setAppointments([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await appointmentService.getPatientAppointments();
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map(mapBackendAppointment);
        setAppointments(mapped);
      }
    } catch (err: any) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const addAppointmentApi = async (payload: BookAppointmentPayload): Promise<AppointmentItem> => {
    setIsLoading(true);
    try {
      const res = await appointmentService.bookAppointment(payload);
      if (res.success && res.data) {
        const newItem = mapBackendAppointment(res.data);
        setAppointments((prev) => [newItem, ...prev]);
        return newItem;
      }
      throw new Error(res.message || 'Booking failed');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Booking failed';
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const addAppointment = (data: NewAppointmentData): AppointmentItem => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: AppointmentItem = {
      ...data,
      id: `CF-APT-${randomDigits}`,
      createdAt: Date.now(),
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = async (id: string) => {
    // Extract raw numeric ID if string starts with CF-APT-
    const rawIdStr = id.startsWith('CF-APT-') ? id.replace('CF-APT-', '') : id;
    const rawId = parseInt(rawIdStr, 10);

    if (!isNaN(rawId)) {
      try {
        await appointmentService.updateAppointmentStatus(rawId, 'CANCELLED');
      } catch (err) {
        console.error('Failed to cancel appointment on backend', err);
      }
    }

    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id || appt.rawId === rawId ? { ...appt, status: 'Cancelled' as const } : appt
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        isLoading,
        error,
        fetchAppointments,
        addAppointmentApi,
        addAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
