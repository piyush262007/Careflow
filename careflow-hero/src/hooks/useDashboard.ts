import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { PatientDashboardData } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';

export const useDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<PatientDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!isAuthenticated) {
      setData(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getPatientDashboard();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching dashboard analytics:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, isLoading, error, refetch: fetchDashboard };
};
