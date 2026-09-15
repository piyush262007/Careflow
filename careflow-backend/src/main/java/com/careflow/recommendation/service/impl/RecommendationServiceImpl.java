package com.careflow.recommendation.service.impl;

import com.careflow.doctor.dto.response.DoctorResponse;
import com.careflow.doctor.mapper.DoctorMapper;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.doctor.repository.SpecializationRepository;
import com.careflow.hospital.dto.response.HospitalResponse;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.mapper.HospitalMapper;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.recommendation.dto.AIRecommendationResponse;
import com.careflow.recommendation.dto.SymptomMatchRequest;
import com.careflow.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService {

    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;
    private final HospitalMapper hospitalMapper;
    private final DoctorMapper doctorMapper;

    @Override
    @Transactional(readOnly = true)
    public AIRecommendationResponse recommendCare(SymptomMatchRequest request) {
        log.info("Processing AI Care Recommendation request for symptoms: {}", request.getSymptoms());

        String input = (request.getSymptoms() + " " + (request.getQuickTags() != null ? String.join(" ", request.getQuickTags()) : "")).toLowerCase();

        String detectedSpecialty = "General Medicine";
        String reasoning = "Based on symptom analysis, we recommend consultation with a General Physician for comprehensive assessment.";
        double confidence = 0.88;

        if (input.contains("chest") || input.contains("heart") || input.contains("cardio") || input.contains("breath")) {
            detectedSpecialty = "Cardiology";
            reasoning = "Symptoms indicate potential cardiovascular involvement requiring immediate evaluation by a Senior Cardiologist.";
            confidence = 0.96;
        } else if (input.contains("bone") || input.contains("joint") || input.contains("fracture") || input.contains("knee") || input.contains("back")) {
            detectedSpecialty = "Orthopedics";
            reasoning = "Musculoskeletal symptoms detected. Recommended specialist consultation with an Orthopedic Surgeon.";
            confidence = 0.94;
        } else if (input.contains("skin") || input.contains("rash") || input.contains("itch") || input.contains("acne")) {
            detectedSpecialty = "Dermatology";
            reasoning = "Dermatological symptom match detected. Recommended evaluation by a Consultant Dermatologist.";
            confidence = 0.92;
        } else if (input.contains("eye") || input.contains("vision") || input.contains("blur")) {
            detectedSpecialty = "Ophthalmology";
            reasoning = "Ocular symptoms detected. Recommended specialized examination by an Ophthalmologist.";
            confidence = 0.93;
        } else if (input.contains("stomach") || input.contains("digest") || input.contains("acid")) {
            detectedSpecialty = "Gastroenterology";
            reasoning = "Gastrointestinal symptoms detected. Recommended consultation with a Gastroenterologist.";
            confidence = 0.91;
        }

        boolean isSevere = "Severe".equalsIgnoreCase(request.getPainLevel()) || input.contains("chest pain") || input.contains("shortness of breath");
        String urgency = isSevere ? "Immediate / Emergency ER" :
                "Moderate".equalsIgnoreCase(request.getPainLevel()) ? "Priority (Within 24 Hours)" : "Routine Consultation";

        final String targetSpecialty = detectedSpecialty;
        final boolean requireEmergency = isSevere;

        // Dynamic ranking algorithm considering ER availability, rating, and review count
        List<HospitalResponse> matchedHospitals = hospitalRepository.findAll().stream()
                .sorted(Comparator.comparingDouble((Hospital h) -> {
                    double score = 0.0;
                    if (requireEmergency && Boolean.TRUE.equals(h.getEmergencyAvailable())) {
                        score += 10.0; // Higher weight for ER when severe
                    }
                    if (h.getRating() != null) {
                        score += h.getRating() * 2.0;
                    }
                    if (h.getTotalReviews() != null) {
                        score += Math.min(h.getTotalReviews() / 50.0, 3.0);
                    }
                    return -score; // Descending score order
                }))
                .limit(4)
                .map(hospitalMapper::toHospitalResponse)
                .collect(Collectors.toList());

        List<DoctorResponse> matchedDoctors = doctorRepository.findAll().stream()
                .filter(d -> d.getSpecialization() == null || d.getSpecialization().getName().equalsIgnoreCase(targetSpecialty) || targetSpecialty.equalsIgnoreCase("General Medicine"))
                .limit(4)
                .map(doctorMapper::toDoctorResponse)
                .collect(Collectors.toList());

        return AIRecommendationResponse.builder()
                .detectedSpecialty(detectedSpecialty)
                .confidenceScore(confidence)
                .matchReasoning(reasoning)
                .recommendedUrgency(urgency)
                .matchedHospitals(matchedHospitals)
                .matchedDoctors(matchedDoctors)
                .build();
    }
}
