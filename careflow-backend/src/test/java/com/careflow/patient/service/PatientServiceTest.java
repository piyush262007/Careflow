package com.careflow.patient.service;

import com.careflow.auth.entity.Role;
import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.patient.dto.HealthSummaryResponse;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.mapper.PatientMapper;
import com.careflow.patient.repository.PatientRepository;
import com.careflow.patient.service.impl.PatientServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PatientMapper patientMapper;

    @InjectMocks
    private PatientServiceImpl patientService;

    private User patientUser;
    private Patient patient;

    @BeforeEach
    void setUp() {
        patientUser = User.builder().id(1L).email("patient@careflow.com").fullName("Test Patient").role(Role.PATIENT).build();
        patient = Patient.builder()
                .id(10L)
                .user(patientUser)
                .bloodGroup("O+")
                .dateOfBirth(LocalDate.now().minusYears(30))
                .height(170.0)
                .weight(70.0)
                .emergencyContactName("John Emergency")
                .emergencyContactPhone("+1 555-9999")
                .build();
    }

    @Test
    void getHealthSummary_ShouldComputeAgeAndBmiCorrectly() {
        when(patientRepository.findByUserEmail("patient@careflow.com")).thenReturn(Optional.of(patient));

        HealthSummaryResponse summary = patientService.getHealthSummary("patient@careflow.com");

        assertNotNull(summary);
        assertEquals(30, summary.getAge());
        assertEquals("O+", summary.getBloodGroup());
        assertEquals(24.2, summary.getBmi());
        assertEquals("Normal weight", summary.getBmiCategory());
        assertEquals("John Emergency", summary.getEmergencyContact().getName());
    }
}
