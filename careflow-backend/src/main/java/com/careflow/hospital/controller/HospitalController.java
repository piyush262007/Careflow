package com.careflow.hospital.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.hospital.dto.HospitalRecommendationResponse;
import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hospitals")
@RequiredArgsConstructor
@Tag(name = "Hospital Directory Management", description = "Endpoints for searching, filtering, and managing partner hospital facilities")
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping
    @Operation(summary = "List all hospitals", description = "Retrieves all registered partner hospital facilities with distance and live queue metrics.")
    public ResponseEntity<ApiResponse<List<HospitalResponse>>> getAllHospitals(
            @RequestParam(required = false) Double userLat,
            @RequestParam(required = false) Double userLng
    ) {
        List<HospitalResponse> response = hospitalService.getAllHospitals(userLat, userLng);
        return ResponseEntity.ok(ApiResponse.success(response, "Hospitals retrieved successfully"));
    }

    @GetMapping("/search")
    @Operation(summary = "Search hospitals", description = "Filters hospitals by city, name, emergency availability, specialization, max distance, or sorting.")
    public ResponseEntity<ApiResponse<List<HospitalResponse>>> searchHospitals(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean emergencyAvailable,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) Double userLat,
            @RequestParam(required = false) Double userLng,
            @RequestParam(required = false) Double maxDistanceKm,
            @RequestParam(required = false) String sortBy
    ) {
        List<HospitalResponse> response = hospitalService.searchHospitals(
                city, name, emergencyAvailable, specialization, userLat, userLng, maxDistanceKm, sortBy
        );
        return ResponseEntity.ok(ApiResponse.success(response, "Hospital search results retrieved"));
    }

    @GetMapping("/recommend")
    @Operation(summary = "Smart hospital recommendation", description = "Generates top hospital recommendation based on distance, wait times, specialist availability, and operational status.")
    public ResponseEntity<ApiResponse<HospitalRecommendationResponse>> getHospitalRecommendation(
            @RequestParam(required = false) Double userLat,
            @RequestParam(required = false) Double userLng,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false, defaultValue = "false") Boolean isEmergency
    ) {
        HospitalRecommendationResponse response = hospitalService.getHospitalRecommendation(userLat, userLng, specialization, isEmergency);
        return ResponseEntity.ok(ApiResponse.success(response, "Hospital recommendation generated successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hospital details", description = "Retrieves full hospital details by ID.")
    public ResponseEntity<ApiResponse<HospitalResponse>> getHospitalById(
            @PathVariable Long id,
            @RequestParam(required = false) Double userLat,
            @RequestParam(required = false) Double userLng
    ) {
        HospitalResponse response = hospitalService.getHospitalById(id, userLat, userLng);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Create hospital facility", description = "Adds a new partner hospital (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<HospitalResponse>> createHospital(@Valid @RequestBody HospitalRequest request) {
        HospitalResponse response = hospitalService.createHospital(request);
        return new ResponseEntity<>(ApiResponse.success(response, "Hospital created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Update hospital facility", description = "Updates hospital information by ID (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<HospitalResponse>> updateHospital(
            @PathVariable Long id,
            @Valid @RequestBody HospitalRequest request
    ) {
        HospitalResponse response = hospitalService.updateHospital(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Hospital updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Delete hospital facility", description = "Deletes hospital record by ID (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<String>> deleteHospital(@PathVariable Long id) {
        hospitalService.deleteHospital(id);
        return ResponseEntity.ok(ApiResponse.success("Hospital deleted successfully"));
    }
}
