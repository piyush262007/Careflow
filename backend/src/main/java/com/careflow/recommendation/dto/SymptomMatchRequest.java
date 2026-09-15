package com.careflow.recommendation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SymptomMatchRequest {

    @NotBlank(message = "Symptom description is required")
    @Size(min = 3, max = 1000, message = "Symptom description must be between 3 and 1000 characters")
    private String symptoms;

    private List<String> quickTags;

    private String painLevel;

    private String symptomDuration;

    private Double userLatitude;

    private Double userLongitude;
}
