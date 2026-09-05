package com.careflow.recommendation.dto;

import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.hospital.dto.HospitalResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private Long id;
    private String symptoms;
    private String painLevel;
    private String duration;
    private String predictedDepartment;
    private String severity;
    private Integer confidenceScore;
    private String recommendationReason;
    private HospitalResponse recommendedHospital;
    private DoctorResponse recommendedDoctor;
    private List<HospitalResponse> alternativeHospitals;
    private LocalDateTime createdAt;
}
