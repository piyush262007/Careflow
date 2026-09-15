package com.careflow.common.maps;

import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Primary
@RequiredArgsConstructor
public class MockMapsService implements MapsService {

    private final HospitalService hospitalService;

    @Override
    public List<HospitalResponse> findNearbyHospitals(double latitude, double longitude, double radiusKm) {
        return hospitalService.getAllHospitals();
    }

    @Override
    public double calculateDistanceKm(double startLat, double startLng, double endLat, double endLng) {
        final int R = 6371; // Earth radius in km
        double latDistance = Math.toRadians(endLat - startLat);
        double lonDistance = Math.toRadians(endLng - startLng);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(startLat)) * Math.cos(Math.toRadians(endLat))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;

        return BigDecimal.valueOf(distance).setScale(1, RoundingMode.HALF_UP).doubleValue();
    }

    @Override
    public String calculateTravelTime(double distanceKm) {
        int estimatedMinutes = (int) Math.ceil((distanceKm / 30.0) * 60);
        if (estimatedMinutes < 5) estimatedMinutes = 5;
        return estimatedMinutes + " mins drive";
    }

    @Override
    public String generateNavigationLink(double destinationLat, double destinationLng) {
        return String.format("https://www.google.com/maps/dir/?api=1&destination=%f,%f", destinationLat, destinationLng);
    }
}
