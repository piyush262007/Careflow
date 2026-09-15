package com.careflow.recommendation.service.impl;

import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.doctor.service.DoctorService;
import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.service.HospitalService;
import com.careflow.recommendation.dto.RecommendationRequest;
import com.careflow.recommendation.dto.RecommendationResponse;
import com.careflow.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Primary;

@Primary
@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService {

    private final HospitalService hospitalService;
    private final DoctorService doctorService;

    @Override
    public RecommendationResponse analyzeSymptoms(String patientEmail, RecommendationRequest request) {
        log.info("Analyzing symptoms for patient {}: {}", patientEmail, request.getSymptoms());
        String input = (request.getSymptoms() != null ? request.getSymptoms() : "").toLowerCase();

        String specialty = "General Medicine";
        String reasoning = "Recommended consultation with a General Physician for clinical evaluation.";

        if (input.contains("chest") || input.contains("heart") || input.contains("breath")) {
            specialty = "Cardiology";
            reasoning = "Cardiovascular symptoms detected. Recommended senior cardiologist assessment.";
        } else if (input.contains("joint") || input.contains("bone") || input.contains("back")) {
            specialty = "Orthopedics";
            reasoning = "Musculoskeletal symptoms detected. Recommended orthopedist evaluation.";
        } else if (input.contains("skin") || input.contains("rash")) {
            specialty = "Dermatology";
            reasoning = "Dermatological symptom match detected. Recommended dermatologist consultation.";
        }

        List<HospitalResponse> hospitals = hospitalService.getAllHospitals();
        HospitalResponse topHospital = hospitals.isEmpty() ? null : hospitals.get(0);
        List<DoctorResponse> doctors = doctorService.getAllDoctors();
        DoctorResponse topDoctor = doctors.isEmpty() ? null : doctors.get(0);

        return RecommendationResponse.builder()
                .id(1L)
                .symptoms(request.getSymptoms())
                .painLevel(request.getPainLevel())
                .duration(request.getDuration())
                .predictedDepartment(specialty)
                .severity("Moderate")
                .confidenceScore(92)
                .recommendedHospital(topHospital)
                .recommendedDoctor(topDoctor)
                .recommendationReason(reasoning)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Override
    public List<RecommendationResponse> getConsultationHistory(String patientEmail) {
        return new ArrayList<>();
    }

    @Override
    public RecommendationResponse getConsultationById(Long id, String patientEmail) {
        List<HospitalResponse> hospitals = hospitalService.getAllHospitals();
        HospitalResponse topHospital = hospitals.isEmpty() ? null : hospitals.get(0);
        List<DoctorResponse> doctors = doctorService.getAllDoctors();
        DoctorResponse topDoctor = doctors.isEmpty() ? null : doctors.get(0);

        return RecommendationResponse.builder()
                .id(id)
                .symptoms("Chest tightness")
                .predictedDepartment("Cardiology")
                .severity("Moderate")
                .confidenceScore(95)
                .recommendedHospital(topHospital)
                .recommendedDoctor(topDoctor)
                .recommendationReason("Cardiovascular symptoms detected")
                .createdAt(LocalDateTime.now())
                .build();
    }
}
