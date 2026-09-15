package com.careflow.recommendation.service;

import com.careflow.recommendation.dto.AIRecommendationRequest;
import com.careflow.recommendation.dto.AIRecommendationResponse;

public interface AIRecommendationService {

    AIRecommendationResponse analyzeSymptomsAndRecommendCare(AIRecommendationRequest request);
}
