package com.careflow.hospital.service;

import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;

import java.util.List;

public interface HospitalService {

    HospitalResponse createHospital(HospitalRequest request);

    HospitalResponse getHospitalById(Long id);

    List<HospitalResponse> getAllHospitals();

    List<HospitalResponse> searchHospitals(String city, String name, Boolean emergencyAvailable, String specialization);

    HospitalResponse updateHospital(Long id, HospitalRequest request);

    void deleteHospital(Long id);
}
