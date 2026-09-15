package com.careflow.hospital.dto;

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
public class HospitalRecommendationResponse {
    private HospitalResponse hospital;
    private Double matchScore;
    private String recommendationTitle;
    private String recommendationReason;
    private List<HospitalResponse> alternativeHospitals;
}
