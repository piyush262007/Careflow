package com.careflow.hospital.service;

import com.careflow.hospital.dto.HospitalRecommendationResponse;
import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;

import java.util.List;

public interface HospitalService {

    HospitalResponse createHospital(HospitalRequest request);

    HospitalResponse getHospitalById(Long id);

    HospitalResponse getHospitalById(Long id, Double userLat, Double userLng);

    List<HospitalResponse> getAllHospitals();

    List<HospitalResponse> getAllHospitals(Double userLat, Double userLng);

    List<HospitalResponse> searchHospitals(String city, String name, Boolean emergencyAvailable, String specialization);

    List<HospitalResponse> searchHospitals(String city, String name, Boolean emergencyAvailable, String specialization, Double userLat, Double userLng, Double maxDistanceKm, String sortBy);

    HospitalRecommendationResponse getHospitalRecommendation(Double userLat, Double userLng, String specialization, Boolean isEmergency);

    HospitalResponse updateHospital(Long id, HospitalRequest request);

    void deleteHospital(Long id);
}
