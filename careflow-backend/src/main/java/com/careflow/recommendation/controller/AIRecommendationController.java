package com.careflow.recommendation.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.recommendation.dto.AIRecommendationRequest;
import com.careflow.recommendation.dto.AIRecommendationResponse;
import com.careflow.recommendation.service.AIRecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
@Tag(name = "AI Symptom Triage & Recommendations", description = "Endpoints for AI-powered symptom analysis, clinical specialty determination, and hospital matching")
public class AIRecommendationController {

    private final AIRecommendationService recommendationService;

    @PostMapping("/analyze")
    @Operation(summary = "Analyze symptoms and recommend care", description = "Evaluates symptom text, pain level, and duration to auto-assign clinical specialty and calculate top hospital match.")
    public ResponseEntity<ApiResponse<AIRecommendationResponse>> analyzeSymptoms(@Valid @RequestBody AIRecommendationRequest request) {
        AIRecommendationResponse response = recommendationService.analyzeSymptomsAndRecommendCare(request);
        return ResponseEntity.ok(ApiResponse.success(response, "AI triage recommendation generated successfully"));
    }
}
