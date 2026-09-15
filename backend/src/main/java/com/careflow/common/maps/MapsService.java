package com.careflow.common.maps;

import com.careflow.hospital.dto.HospitalResponse;

import java.util.List;

public interface MapsService {

    List<HospitalResponse> findNearbyHospitals(double latitude, double longitude, double radiusKm);

    double calculateDistanceKm(double startLat, double startLng, double endLat, double endLng);

    String calculateTravelTime(double distanceKm);

    String generateNavigationLink(double destinationLat, double destinationLng);
}
