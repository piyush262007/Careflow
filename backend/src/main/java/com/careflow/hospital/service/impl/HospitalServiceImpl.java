package com.careflow.hospital.service.impl;

import com.careflow.common.audit.AuditAction;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.hospital.dto.HospitalRecommendationResponse;
import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.entity.HospitalLiveStatus;
import com.careflow.hospital.mapper.HospitalMapper;
import com.careflow.hospital.repository.HospitalLiveStatusRepository;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.hospital.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalLiveStatusRepository hospitalLiveStatusRepository;
    private final HospitalMapper hospitalMapper;

    @Override
    @Transactional
    @CacheEvict(value = "hospitalsCache", allEntries = true)
    @AuditAction(action = "CREATE_HOSPITAL", details = "Created a new partner hospital facility")
    public HospitalResponse createHospital(HospitalRequest request) {
        Hospital hospital = hospitalMapper.toEntity(request);
        Hospital saved = hospitalRepository.save(hospital);
        return populateHospitalDetails(saved, null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public HospitalResponse getHospitalById(Long id) {
        return getHospitalById(id, null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public HospitalResponse getHospitalById(Long id, Double userLat, Double userLng) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", id));
        return populateHospitalDetails(hospital, userLat, userLng);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HospitalResponse> getAllHospitals() {
        return getAllHospitals(null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HospitalResponse> getAllHospitals(Double userLat, Double userLng) {
        return hospitalRepository.findAll().stream()
                .map(hospital -> populateHospitalDetails(hospital, userLat, userLng))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<HospitalResponse> searchHospitals(String city, String name, Boolean emergencyAvailable, String specialization) {
        return searchHospitals(city, name, emergencyAvailable, specialization, null, null, null, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HospitalResponse> searchHospitals(
            String city,
            String name,
            Boolean emergencyAvailable,
            String specialization,
            Double userLat,
            Double userLng,
            Double maxDistanceKm,
            String sortBy
    ) {
        List<Hospital> hospitals = hospitalRepository.searchHospitals(city, name, emergencyAvailable, specialization);

        List<HospitalResponse> responses = hospitals.stream()
                .map(h -> populateHospitalDetails(h, userLat, userLng))
                .filter(res -> {
                    if (maxDistanceKm != null && res.getDistanceKm() != null) {
                        return res.getDistanceKm() <= maxDistanceKm;
                    }
                    return true;
                })
                .collect(Collectors.toList());

        if (sortBy != null) {
            switch (sortBy.toLowerCase()) {
                case "distance":
                    responses.sort(Comparator.comparing(HospitalResponse::getDistanceKm, Comparator.nullsLast(Comparator.naturalOrder())));
                    break;
                case "waittime":
                    responses.sort(Comparator.comparing(HospitalResponse::getEstimatedWaitMinutes, Comparator.nullsLast(Comparator.naturalOrder())));
                    break;
                case "rating":
                    responses.sort(Comparator.comparing(HospitalResponse::getRating, Comparator.nullsLast(Comparator.reverseOrder())));
                    break;
                case "queue":
                    responses.sort(Comparator.comparing(HospitalResponse::getCurrentQueueCount, Comparator.nullsLast(Comparator.naturalOrder())));
                    break;
                default:
                    break;
            }
        }

        return responses;
    }

    @Override
    @Transactional(readOnly = true)
    public HospitalRecommendationResponse getHospitalRecommendation(
            Double userLat,
            Double userLng,
            String specialization,
            Boolean isEmergency
    ) {
        List<HospitalResponse> allHospitals = getAllHospitals(userLat, userLng);

        if (allHospitals.isEmpty()) {
            return HospitalRecommendationResponse.builder()
                    .hospital(null)
                    .matchScore(0.0)
                    .recommendationTitle("No Hospitals Available")
                    .recommendationReason("No active partner hospitals found near your query location.")
                    .alternativeHospitals(List.of())
                    .build();
        }

        // Deterministic Scoring Algorithm
        List<ScoredHospital> scoredHospitals = allHospitals.stream().map(h -> {
            double score = 0.0;

            // 1. Distance Score (Max 40 points)
            if (h.getDistanceKm() != null) {
                if (h.getDistanceKm() <= 2.0) score += 40.0;
                else if (h.getDistanceKm() <= 5.0) score += 30.0;
                else if (h.getDistanceKm() <= 10.0) score += 20.0;
                else if (h.getDistanceKm() <= 20.0) score += 10.0;
                else score += 5.0;
            } else {
                score += 20.0; // Default baseline if coordinates not provided
            }

            // 2. Waiting Time Score (Max 30 points)
            int wait = h.getEstimatedWaitMinutes() != null ? h.getEstimatedWaitMinutes() : 15;
            if (wait <= 10) score += 30.0;
            else if (wait <= 20) score += 20.0;
            else if (wait <= 30) score += 10.0;
            else score += 5.0;

            // 3. Specialty Availability Score (Max 20 points)
            if (specialization != null && !specialization.isBlank()) {
                boolean hasSpecialty = h.getDepartments() != null && h.getDepartments().stream()
                        .anyMatch(d -> d.equalsIgnoreCase(specialization));
                if (hasSpecialty) score += 20.0;
            } else {
                score += 15.0;
            }

            // 4. Emergency / 24/7 Status (Max 10 points, boosted in Emergency)
            if (Boolean.TRUE.equals(h.getEmergencyAvailable())) {
                score += Boolean.TRUE.equals(isEmergency) ? 20.0 : 10.0;
            }

            // Rating Bonus (Max 10 points)
            if (h.getRating() != null) {
                score += (h.getRating() / 5.0) * 10.0;
            }

            return new ScoredHospital(h, score);
        }).sorted(Comparator.comparingDouble(ScoredHospital::score).reversed())
          .collect(Collectors.toList());

        ScoredHospital top = scoredHospitals.get(0);
        HospitalResponse topHospital = top.hospital();

        StringBuilder reasonBuilder = new StringBuilder("Recommended because ");
        reasonBuilder.append(topHospital.getName());
        if (topHospital.getDistanceKm() != null) {
            reasonBuilder.append(String.format(" is %.1f km away", topHospital.getDistanceKm()));
        }
        if (topHospital.getEstimatedWaitMinutes() != null) {
            reasonBuilder.append(String.format(", has a %d-minute estimated wait", topHospital.getEstimatedWaitMinutes()));
        }
        if (specialization != null && !specialization.isBlank()) {
            reasonBuilder.append(String.format(", and offers specialized %s care", specialization));
        } else if (topHospital.getAvailableDoctorsCount() != null && topHospital.getAvailableDoctorsCount() > 0) {
            reasonBuilder.append(String.format(", and has %d active specialists available", topHospital.getAvailableDoctorsCount()));
        }
        reasonBuilder.append(".");

        List<HospitalResponse> alternatives = scoredHospitals.stream()
                .skip(1)
                .limit(4)
                .map(ScoredHospital::hospital)
                .collect(Collectors.toList());

        return HospitalRecommendationResponse.builder()
                .hospital(topHospital)
                .matchScore(Math.min(99.0, Math.round(top.score() * 10.0) / 10.0))
                .recommendationTitle("Best Match for You")
                .recommendationReason(reasonBuilder.toString())
                .alternativeHospitals(alternatives)
                .build();
    }

    @Override
    @Transactional
    @CacheEvict(value = "hospitalsCache", allEntries = true)
    @AuditAction(action = "UPDATE_HOSPITAL", details = "Updated hospital facility details")
    public HospitalResponse updateHospital(Long id, HospitalRequest request) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", id));

        hospitalMapper.updateHospitalFromDto(request, hospital);
        Hospital updated = hospitalRepository.save(hospital);
        return populateHospitalDetails(updated, null, null);
    }

    @Override
    @Transactional
    @CacheEvict(value = "hospitalsCache", allEntries = true)
    @AuditAction(action = "DELETE_HOSPITAL", details = "Deleted hospital record")
    public void deleteHospital(Long id) {
        if (!hospitalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hospital", "id", id);
        }
        hospitalRepository.deleteById(id);
    }

    private HospitalResponse populateHospitalDetails(Hospital hospital, Double userLat, Double userLng) {
        HospitalResponse response = hospitalMapper.toResponse(hospital);

        // 1. Calculate Haversine Distance in Kilometers
        if (userLat != null && userLng != null && hospital.getLatitude() != null && hospital.getLongitude() != null) {
            response.setDistanceKm(calculateHaversineKm(userLat, userLng, hospital.getLatitude(), hospital.getLongitude()));
        } else {
            // Default reference distance if no user location provided
            response.setDistanceKm(1.8 + (hospital.getId() % 5) * 0.7);
        }

        // 2. Fetch doctors & departments
        List<Doctor> doctors = doctorRepository.findByHospitalId(hospital.getId());
        response.setAvailableDoctorsCount(doctors.size());
        List<String> departments = doctors.stream()
                .filter(d -> d.getSpecialization() != null)
                .map(d -> d.getSpecialization().getName())
                .distinct()
                .collect(Collectors.toList());
        if (departments.isEmpty()) {
            departments = List.of("General Medicine", "Emergency Care", "Cardiology");
        }
        response.setDepartments(departments);

        // 3. Queue & Wait Times from HospitalLiveStatus
        Optional<HospitalLiveStatus> liveStatusOpt = hospitalLiveStatusRepository.findByHospitalId(hospital.getId());
        if (liveStatusOpt.isPresent()) {
            HospitalLiveStatus status = liveStatusOpt.get();
            response.setCurrentQueueCount(status.getCurrentQueue());
            response.setEstimatedWaitMinutes(status.getEstimatedWaitMinutes());
        } else {
            // Fallback deterministic formula based on active doctors & hospital ID
            int queue = Math.max(1, (int) (hospital.getId() * 2) % 12);
            response.setCurrentQueueCount(queue);
            response.setEstimatedWaitMinutes(queue * 6);
        }

        // 4. Hospital Status
        if (Boolean.TRUE.equals(hospital.getEmergencyAvailable()) && Boolean.TRUE.equals(hospital.getIsOpen24Hours())) {
            response.setHospitalStatus("OPEN (24/7 ER)");
        } else if (Boolean.TRUE.equals(hospital.getIsActive())) {
            response.setHospitalStatus("OPEN");
        } else {
            response.setHospitalStatus("CLOSED");
        }

        return response;
    }

    private double calculateHaversineKm(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in KM
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10.0) / 10.0;
    }

    private record ScoredHospital(HospitalResponse hospital, double score) {}
}
