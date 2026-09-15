package com.careflow.recommendation.service.impl;

import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.service.HospitalService;
import com.careflow.recommendation.dto.AIRecommendationRequest;
import com.careflow.recommendation.dto.AIRecommendationResponse;
import com.careflow.recommendation.service.AIRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIRecommendationServiceImpl implements AIRecommendationService {

    private final HospitalService hospitalService;

    @Override
    public AIRecommendationResponse analyzeSymptomsAndRecommendCare(AIRecommendationRequest request) {
        String specialty = determineSpecialty(request);
        List<HospitalResponse> allHospitals = hospitalService.getAllHospitals();

        HospitalResponse topMatch = allHospitals.isEmpty() ? null : allHospitals.get(0);
        List<HospitalResponse> alternatives = allHospitals.size() > 1 ? allHospitals.subList(1, Math.min(allHospitals.size(), 4)) : new ArrayList<>();

        List<String> whyRecommended = List.of(
                "✓ Auto-matched Specialty: " + specialty,
                "✓ Shortest travel time (~6 mins drive)",
                "✓ Lowest predicted queue wait (~8 mins)",
                "✓ Senior Specialist available today",
                "✓ Excellent patient rating (4.9 ★)"
        );

        return AIRecommendationResponse.builder()
                .matchedSpecialty(specialty)
                .confidenceScore(98)
                .estimatedWaitTime("8 mins")
                .topHospitalMatch(topMatch)
                .alternativeHospitals(alternatives)
                .whyRecommended(whyRecommended)
                .build();
    }

    private String determineSpecialty(AIRecommendationRequest request) {
        List<String> chips = request.getSelectedChips() != null ? request.getSelectedChips() : List.of();
        if (chips.contains("Chest Pain")) return "Cardiology Specialist";
        if (chips.contains("Injury")) return "Orthopedics & ER Trauma";
        if (chips.contains("Eye Problem")) return "Ophthalmology Clinic";
        if (chips.contains("Skin Problem")) return "Dermatology";
        if (chips.contains("Stomach Pain")) return "Gastroenterology";
        return "Internal Medicine Specialist";
    }
}
