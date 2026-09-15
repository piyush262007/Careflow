package com.careflow.recommendation.service.impl;

import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.repository.PatientRepository;
import com.careflow.recommendation.dto.RecommendationRequest;
import com.careflow.recommendation.dto.RecommendationResponse;
import com.careflow.recommendation.entity.AIConsultation;
import com.careflow.recommendation.mapper.RecommendationMapper;
import com.careflow.recommendation.repository.AIConsultationRepository;
import com.careflow.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MockRecommendationServiceImpl implements RecommendationService {

    private final AIConsultationRepository consultationRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final RecommendationMapper recommendationMapper;

    @Override
    @Transactional
    public RecommendationResponse analyzeSymptoms(String patientEmail, RecommendationRequest request) {
        User user = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", patientEmail));

        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseGet(() -> patientRepository.save(Patient.builder().user(user).build()));

        String department = determineDepartment(request);
        String severity = determineSeverity(request);

        // Dynamic hospital ranking algorithm
        List<Hospital> hospitals = hospitalRepository.findAll().stream()
                .sorted(Comparator.comparingDouble((Hospital h) -> {
                    double score = 0.0;
                    if ("HIGH".equalsIgnoreCase(severity) && Boolean.TRUE.equals(h.getEmergencyAvailable())) {
                        score += 10.0;
                    }
                    if (h.getRating() != null) {
                        score += h.getRating() * 2.0;
                    }
                    if (h.getTotalReviews() != null) {
                        score += Math.min(h.getTotalReviews() / 50.0, 3.0);
                    }
                    if (request.getUserLatitude() != null && request.getUserLongitude() != null && h.getLatitude() != null && h.getLongitude() != null) {
                        double dist = calculateHaversineKm(request.getUserLatitude(), request.getUserLongitude(), h.getLatitude(), h.getLongitude());
                        score += Math.max(0, 10.0 - dist);
                    }
                    return -score;
                }))
                .collect(Collectors.toList());

        Hospital topHospital = hospitals.isEmpty() ? null : hospitals.get(0);

        List<Doctor> doctors = doctorRepository.findAll().stream()
                .filter(d -> d.getSpecialization() == null || d.getSpecialization().getName().equalsIgnoreCase(department) || department.equalsIgnoreCase("General Care"))
                .collect(Collectors.toList());

        Doctor topDoctor = doctors.isEmpty() ? (!doctorRepository.findAll().isEmpty() ? doctorRepository.findAll().get(0) : null) : doctors.get(0);

        String reason = String.format(
                "Based on symptoms ('%s'), matched clinical department '%s' with %s severity. Recommended top facility '%s' with available senior specialist.",
                request.getSymptoms(), department, severity, topHospital != null ? topHospital.getName() : "CareFlow Partner Hospital"
        );

        AIConsultation consultation = AIConsultation.builder()
                .patient(patient)
                .symptoms(request.getSymptoms())
                .painLevel(request.getPainLevel() != null ? request.getPainLevel() : "MODERATE")
                .duration(request.getDuration() != null ? request.getDuration() : "1-3 Days")
                .predictedDepartment(department)
                .severity(severity)
                .confidenceScore(98)
                .recommendedHospital(topHospital)
                .recommendedDoctor(topDoctor)
                .recommendationReason(reason)
                .build();

        AIConsultation saved = consultationRepository.save(consultation);
        RecommendationResponse response = recommendationMapper.toResponse(saved);
        if (hospitals.size() > 1) {
            response.setAlternativeHospitals(hospitals.subList(1, Math.min(hospitals.size(), 5)).stream()
                    .map(h -> com.careflow.hospital.dto.HospitalResponse.builder()
                            .id(h.getId())
                            .name(h.getName())
                            .city(h.getCity())
                            .rating(h.getRating())
                            .emergencyAvailable(h.getEmergencyAvailable())
                            .imageUrl(h.getImageUrl())
                            .phone(h.getPhone())
                            .latitude(h.getLatitude())
                            .longitude(h.getLongitude())
                            .build())
                    .collect(Collectors.toList()));
        }

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecommendationResponse> getConsultationHistory(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile", "email", patientEmail));

        return consultationRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId()).stream()
                .map(recommendationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RecommendationResponse getConsultationById(Long id, String patientEmail) {
        AIConsultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AI Consultation", "id", id));

        if (!consultation.getPatient().getUser().getEmail().equals(patientEmail)) {
            throw new BadRequestException("Unauthorized access to consultation record");
        }

        return recommendationMapper.toResponse(consultation);
    }

    private String determineDepartment(RecommendationRequest request) {
        List<String> chips = request.getSelectedChips() != null ? request.getSelectedChips() : List.of();
        String symptomsLower = request.getSymptoms().toLowerCase();

        if (chips.contains("Chest Pain") || symptomsLower.contains("chest") || symptomsLower.contains("heart")) {
            return "Cardiology";
        }
        if (chips.contains("Headache") || symptomsLower.contains("headache") || symptomsLower.contains("migraine")) {
            return "Neurology";
        }
        if (chips.contains("Injury") || symptomsLower.contains("fracture") || symptomsLower.contains("joint")) {
            return "Orthopedics";
        }
        if (chips.contains("Skin Problem") || symptomsLower.contains("rash") || symptomsLower.contains("skin")) {
            return "Dermatology";
        }
        if (chips.contains("Stomach Pain") || symptomsLower.contains("stomach") || symptomsLower.contains("nausea")) {
            return "Gastroenterology";
        }
        if (chips.contains("Fever") || symptomsLower.contains("fever") || symptomsLower.contains("cold")) {
            return "Internal Medicine";
        }
        return "General Care";
    }

    private String determineSeverity(RecommendationRequest request) {
        if ("SEVERE".equalsIgnoreCase(request.getPainLevel())) return "HIGH";
        if ("MODERATE".equalsIgnoreCase(request.getPainLevel())) return "MEDIUM";
        return "LOW";
    }

    private double calculateHaversineKm(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
