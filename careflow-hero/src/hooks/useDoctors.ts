import { useState, useEffect, useCallback } from 'react';
import { doctorService } from '../services/doctorService';
import type { DoctorData, SpecializationData, TimeSlotData } from '../services/doctorService';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [specializations, setSpecializations] = useState<SpecializationData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlotData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctorsAndSpecs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [doctorsRes, specsRes] = await Promise.all([
        doctorService.getAllDoctors(),
        doctorService.getAllSpecializations(),
      ]);

      if (doctorsRes.success && Array.isArray(doctorsRes.data)) {
        setDoctors(doctorsRes.data);
      }
      if (specsRes.success && Array.isArray(specsRes.data)) {
        setSpecializations(specsRes.data);
      }
    } catch (err: any) {
      console.error('Error fetching doctor directory:', err);
      setError(err.message || 'Failed to fetch doctor directory');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctorsAndSpecs();
  }, [fetchDoctorsAndSpecs]);

  const searchDoctors = async (filters: {
    hospitalId?: number;
    specializationId?: number;
    availableToday?: boolean;
    name?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await doctorService.searchDoctors(filters);
      if (res.success && Array.isArray(res.data)) {
        setDoctors(res.data);
      }
    } catch (err: any) {
      console.error('Error searching doctors:', err);
      setError(err.message || 'Doctor search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchScheduleSlots = async (doctorId: number, date?: string) => {
    try {
      const res = await doctorService.getDoctorScheduleSlots(doctorId, date);
      if (res.success && Array.isArray(res.data)) {
        setAvailableSlots(res.data);
        return res.data;
      }
    } catch (err) {
      console.error('Error fetching doctor schedule slots:', err);
    }
    return [];
  };

  return {
    doctors,
    specializations,
    selectedDoctor,
    availableSlots,
    isLoading,
    error,
    setSelectedDoctor,
    searchDoctors,
    fetchScheduleSlots,
    refetch: fetchDoctorsAndSpecs,
  };
};
