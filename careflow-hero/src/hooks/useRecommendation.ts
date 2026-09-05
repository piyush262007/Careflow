import { useState, useEffect, useCallback } from 'react';
import { recommendationService } from '../services/recommendationService';
import type {
  RecommendationRequestPayload,
  RecommendationResponseData,
} from '../services/recommendationService';
import { useAuth } from '../context/AuthContext';

export const useRecommendation = () => {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<RecommendationResponseData[]>([]);
  const [latestRecommendation, setLatestRecommendation] = useState<RecommendationResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await recommendationService.getConsultationHistory();
      if (res.success && Array.isArray(res.data)) {
        setHistory(res.data);
        if (res.data.length > 0) {
          setLatestRecommendation(res.data[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching consultation history:', err);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const analyzeSymptoms = async (payload: RecommendationRequestPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await recommendationService.analyzeSymptoms(payload);
      if (res.success && res.data) {
        setLatestRecommendation(res.data);
        setHistory((prev) => [res.data, ...prev]);
        return res.data;
      }
      throw new Error(res.message || 'Analysis failed');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'AI Triage service unavailable';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    history,
    latestRecommendation,
    isLoading,
    error,
    analyzeSymptoms,
    refetchHistory: fetchHistory,
  };
};
