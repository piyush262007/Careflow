import { useState, useEffect, useCallback } from 'react';
import { hospitalService } from '../services/hospitalService';
import type { HospitalData, HospitalRecommendationData } from '../services/hospitalService';

export const useHospitals = (userLocation?: { lat: number; lng: number } | null) => {
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);
  const [recommendation, setRecommendation] = useState<HospitalRecommendationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRecommendationLoading, setIsRecommendationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHospitals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await hospitalService.getAllHospitals(userLocation?.lat, userLocation?.lng);
      if (res.success && Array.isArray(res.data)) {
        setHospitals(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching hospitals:', err);
      setError(err.message || 'Failed to fetch hospital list');
    } finally {
      setIsLoading(false);
    }
  }, [userLocation?.lat, userLocation?.lng]);

  const fetchRecommendation = useCallback(async (specialization?: string, isEmergency?: boolean) => {
    setIsRecommendationLoading(true);
    try {
      const res = await hospitalService.getHospitalRecommendation({
        userLat: userLocation?.lat,
        userLng: userLocation?.lng,
        specialization,
        isEmergency,
      });
      if (res.success && res.data) {
        setRecommendation(res.data);
      }
    } catch (err: any) {
      console.warn('Error fetching hospital recommendation:', err);
    } finally {
      setIsRecommendationLoading(false);
    }
  }, [userLocation?.lat, userLocation?.lng]);

  useEffect(() => {
    fetchHospitals();
    fetchRecommendation();
  }, [fetchHospitals, fetchRecommendation]);

  const searchHospitals = async (filters: {
    city?: string;
    name?: string;
    emergencyAvailable?: boolean;
    specialization?: string;
    maxDistanceKm?: number;
    sortBy?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await hospitalService.searchHospitals({
        ...filters,
        userLat: userLocation?.lat,
        userLng: userLocation?.lng,
      });
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
      const res = await hospitalService.getHospitalById(id, userLocation?.lat, userLocation?.lng);
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
    recommendation,
    isLoading,
    isRecommendationLoading,
    error,
    searchHospitals,
    fetchRecommendation,
    getHospitalById,
    refetch: fetchHospitals,
  };
};
