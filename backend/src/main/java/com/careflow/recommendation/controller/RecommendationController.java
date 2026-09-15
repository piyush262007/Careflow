package com.careflow.recommendation.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.recommendation.dto.RecommendationRequest;
import com.careflow.recommendation.dto.RecommendationResponse;
import com.careflow.recommendation.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
@Tag(name = "AI Symptom Triage & Recommendations", description = "Endpoints for AI-powered symptom analysis, clinical specialty determination, and hospital matching")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping("/analyze")
    @Operation(summary = "Analyze symptoms & recommend care", description = "Evaluates symptom text, pain level, and duration to auto-assign clinical specialty and calculate top hospital match.")
    public ResponseEntity<ApiResponse<RecommendationResponse>> analyzeSymptoms(
            Principal principal,
            @Valid @RequestBody RecommendationRequest request
    ) {
        String email = principal != null ? principal.getName() : "patient@careflow.com";
        RecommendationResponse response = recommendationService.analyzeSymptoms(email, request);
        return ResponseEntity.ok(ApiResponse.success(response, "AI triage recommendation generated successfully"));
    }

    @GetMapping("/history")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get AI consultation history", description = "Retrieves past AI symptom triage consultations for the authenticated patient.")
    public ResponseEntity<ApiResponse<List<RecommendationResponse>>> getConsultationHistory(Principal principal) {
        List<RecommendationResponse> response = recommendationService.getConsultationHistory(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get consultation record by ID", description = "Retrieves details of a past AI triage consultation by ID.")
    public ResponseEntity<ApiResponse<RecommendationResponse>> getConsultationById(
            @PathVariable Long id,
            Principal principal
    ) {
        RecommendationResponse response = recommendationService.getConsultationById(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
