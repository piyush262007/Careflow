package com.careflow.recommendation.service;

import com.careflow.recommendation.dto.RecommendationRequest;
import com.careflow.recommendation.dto.RecommendationResponse;

import java.util.List;

public interface RecommendationService {

    RecommendationResponse analyzeSymptoms(String patientEmail, RecommendationRequest request);

    List<RecommendationResponse> getConsultationHistory(String patientEmail);

    RecommendationResponse getConsultationById(Long id, String patientEmail);
}
