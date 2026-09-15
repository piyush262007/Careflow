package com.careflow.recommendation.dto;

import com.careflow.hospital.dto.HospitalResponse;
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
public class AIRecommendationResponse {

    private String matchedSpecialty;
    private int confidenceScore;
    private String estimatedWaitTime;
    private HospitalResponse topHospitalMatch;
    private List<HospitalResponse> alternativeHospitals;
    private List<String> whyRecommended;
}
