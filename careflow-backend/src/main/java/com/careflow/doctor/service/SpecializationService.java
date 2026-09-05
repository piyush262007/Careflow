package com.careflow.doctor.service;

import com.careflow.doctor.dto.request.SpecializationRequest;
import com.careflow.doctor.dto.response.SpecializationResponse;

import java.util.List;

public interface SpecializationService {

    SpecializationResponse createSpecialization(SpecializationRequest request);

    List<SpecializationResponse> getAllSpecializations();

    SpecializationResponse getSpecializationById(Long id);

    void deleteSpecialization(Long id);
}
