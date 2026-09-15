package com.careflow.patient.service;

import com.careflow.patient.dto.HealthSummaryResponse;
import com.careflow.patient.dto.PatientRequest;
import com.careflow.patient.dto.PatientResponse;

import java.util.List;

public interface PatientService {

    PatientResponse getPatientProfile(String email);

    PatientResponse getPatientById(Long id);

    PatientResponse updatePatientProfile(String email, PatientRequest request);

    HealthSummaryResponse getHealthSummary(String email);

    List<PatientResponse> getAllPatients();
}
