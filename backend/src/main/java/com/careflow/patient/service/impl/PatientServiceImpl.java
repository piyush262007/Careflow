package com.careflow.patient.service.impl;

import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.patient.dto.HealthSummaryResponse;
import com.careflow.patient.dto.PatientRequest;
import com.careflow.patient.dto.PatientResponse;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.mapper.PatientMapper;
import com.careflow.patient.repository.PatientRepository;
import com.careflow.patient.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PatientMapper patientMapper;

    @Override
    @Transactional(readOnly = true)
    public PatientResponse getPatientProfile(String email) {
        Patient patient = patientRepository.findByUserEmail(email)
                .orElseGet(() -> createDefaultPatientProfile(email));
        return patientMapper.toResponse(patient);
    }

    @Override
    @Transactional(readOnly = true)
    public PatientResponse getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        return patientMapper.toResponse(patient);
    }

    @Override
    @Transactional
    public PatientResponse updatePatientProfile(String email, PatientRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Patient newPatient = Patient.builder().user(user).build();
                    return patientRepository.save(newPatient);
                });

        patientMapper.updatePatientFromDto(request, patient);
        Patient updated = patientRepository.save(patient);
        return patientMapper.toResponse(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public HealthSummaryResponse getHealthSummary(String email) {
        Patient patient = patientRepository.findByUserEmail(email)
                .orElseGet(() -> createDefaultPatientProfile(email));

        Integer age = null;
        if (patient.getDateOfBirth() != null) {
            age = Period.between(patient.getDateOfBirth(), LocalDate.now()).getYears();
        }

        Double bmi = null;
        String bmiCategory = "Unknown";
        if (patient.getHeightCm() != null && patient.getHeightCm().doubleValue() > 0 && patient.getWeightKg() != null && patient.getWeightKg().doubleValue() > 0) {
            double heightInMeters = patient.getHeightCm().doubleValue() / 100.0;
            double calculatedBmi = patient.getWeightKg().doubleValue() / (heightInMeters * heightInMeters);
            bmi = BigDecimal.valueOf(calculatedBmi).setScale(1, RoundingMode.HALF_UP).doubleValue();

            if (bmi < 18.5) bmiCategory = "Underweight";
            else if (bmi < 25.0) bmiCategory = "Normal weight";
            else if (bmi < 30.0) bmiCategory = "Overweight";
            else bmiCategory = "Obese";
        }

        HealthSummaryResponse.EmergencyContactDto emergencyContact = HealthSummaryResponse.EmergencyContactDto.builder()
                .name(patient.getEmergencyContactName())
                .phone(patient.getEmergencyContactPhone())
                .build();

        return HealthSummaryResponse.builder()
                .age(age)
                .bmi(bmi)
                .bmiCategory(bmiCategory)
                .bloodGroup(patient.getBloodGroup())
                .height(patient.getHeightCm() != null ? patient.getHeightCm().doubleValue() : null)
                .weight(patient.getWeightKg() != null ? patient.getWeightKg().doubleValue() : null)
                .emergencyContact(emergencyContact)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(patientMapper::toResponse)
                .collect(Collectors.toList());
    }

    private Patient createDefaultPatientProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Patient patient = Patient.builder().user(user).build();
        return patientRepository.save(patient);
    }
}
