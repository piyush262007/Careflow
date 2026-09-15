package com.careflow.recommendation.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIRecommendationRequest {

    @NotBlank(message = "Symptom description is required")
    private String symptoms;

    private List<String> selectedChips;
    private String painLevel;
    private String duration;
    private Double userLatitude;
    private Double userLongitude;
}
