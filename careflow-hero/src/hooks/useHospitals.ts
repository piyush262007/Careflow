import { useState, useEffect, useCallback } from 'react';
import { hospitalService } from '../services/hospitalService';
import type { HospitalData } from '../services/hospitalService';

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHospitals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await hospitalService.getAllHospitals();
      if (res.success && Array.isArray(res.data)) {
        setHospitals(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching hospitals:', err);
      setError(err.message || 'Failed to fetch hospital list');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  const searchHospitals = async (filters: {
    city?: string;
    name?: string;
    emergencyAvailable?: boolean;
    specialization?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await hospitalService.searchHospitals(filters);
      if (res.success && Array.isArray(res.data)) {
        setHospitals(res.data);
      }
    } catch (err: any) {
      console.error('Error searching hospitals:', err);
      setError(err.message || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getHospitalById = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await hospitalService.getHospitalById(id);
      if (res.success && res.data) {
        setSelectedHospital(res.data);
        return res.data;
      }
    } catch (err: any) {
      console.error('Error fetching hospital by ID:', err);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  return {
    hospitals,
    selectedHospital,
    isLoading,
    error,
    searchHospitals,
    getHospitalById,
    refetch: fetchHospitals,
  };
};
