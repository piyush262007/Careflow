import { useState, useEffect, useCallback } from 'react';
import { patientService } from '../services/patientService';
import type { PatientResponseData, HealthSummaryData } from '../services/patientService';
import { uploadService } from '../services/uploadService';
import { useAuth } from '../context/AuthContext';

export const usePatient = () => {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<PatientResponseData | null>(null);
  const [healthSummary, setHealthSummary] = useState<HealthSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatientData = useCallback(async () => {
    if (!isAuthenticated) {
      setProfile(null);
      setHealthSummary(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const [profileRes, summaryRes] = await Promise.all([
        patientService.getProfile(),
        patientService.getHealthSummary(),
      ]);

      if (profileRes.success) setProfile(profileRes.data);
      if (summaryRes.success) setHealthSummary(summaryRes.data);
    } catch (err: any) {
      console.error('Error fetching patient profile:', err);
      setError(err.message || 'Failed to load patient details');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  const updateProfile = async (updatedData: Partial<PatientResponseData>) => {
    setIsLoading(true);
    try {
      const res = await patientService.updateProfile(updatedData);
      if (res.success && res.data) {
        setProfile(res.data);
        // Refresh health summary in case height/weight updated
        const summaryRes = await patientService.getHealthSummary();
        if (summaryRes.success) setHealthSummary(summaryRes.data);
        return res.data;
      }
      throw new Error(res.message || 'Update failed');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    setIsLoading(true);
    try {
      const uploadRes = await uploadService.uploadProfileImage(file);
      if (uploadRes.success && uploadRes.data?.url) {
        const updated = await updateProfile({ profileImage: uploadRes.data.url });
        return updated;
      }
      throw new Error(uploadRes.message || 'Upload failed');
    } catch (err: any) {
      throw new Error(err.message || 'Avatar upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    healthSummary,
    isLoading,
    error,
    updateProfile,
    uploadAvatar,
    refetch: fetchPatientData,
  };
};
