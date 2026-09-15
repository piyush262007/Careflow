package com.careflow.recommendation.service;

import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.repository.PatientRepository;
import com.careflow.recommendation.dto.RecommendationRequest;
import com.careflow.recommendation.dto.RecommendationResponse;
import com.careflow.recommendation.entity.AIConsultation;
import com.careflow.recommendation.mapper.RecommendationMapper;
import com.careflow.recommendation.repository.AIConsultationRepository;
import com.careflow.recommendation.service.impl.MockRecommendationServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecommendationServiceTest {

    @Mock
    private AIConsultationRepository consultationRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private HospitalRepository hospitalRepository;

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private RecommendationMapper recommendationMapper;

    @InjectMocks
    private MockRecommendationServiceImpl recommendationService;

    private User user;
    private Patient patient;

    @BeforeEach
    void setUp() {
        user = User.builder().id(1L).email("patient@careflow.com").build();
        patient = Patient.builder().id(10L).user(user).build();
    }

    @Test
    void analyzeSymptoms_ShouldMatchCardiologyForChestPain() {
        RecommendationRequest request = RecommendationRequest.builder()
                .symptoms("Severe chest pain radiating to left arm")
                .selectedChips(List.of("Chest Pain"))
                .painLevel("SEVERE")
                .build();

        AIConsultation consultation = AIConsultation.builder()
                .id(100L)
                .predictedDepartment("Cardiology")
                .severity("HIGH")
                .confidenceScore(98)
                .build();

        RecommendationResponse mockResponse = RecommendationResponse.builder()
                .id(100L)
                .predictedDepartment("Cardiology")
                .severity("HIGH")
                .confidenceScore(98)
                .build();

        when(userRepository.findByEmail("patient@careflow.com")).thenReturn(Optional.of(user));
        when(patientRepository.findByUserId(1L)).thenReturn(Optional.of(patient));
        when(consultationRepository.save(any())).thenReturn(consultation);
        when(recommendationMapper.toResponse(consultation)).thenReturn(mockResponse);

        RecommendationResponse response = recommendationService.analyzeSymptoms("patient@careflow.com", request);

        assertNotNull(response);
        assertEquals("Cardiology", response.getPredictedDepartment());
        assertEquals("HIGH", response.getSeverity());
    }
}
