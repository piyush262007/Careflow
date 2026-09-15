package com.careflow.doctor.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.doctor.dto.request.SpecializationRequest;
import com.careflow.doctor.dto.response.SpecializationResponse;
import com.careflow.doctor.service.SpecializationService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/specializations")
@RequiredArgsConstructor
@Tag(name = "Specialization Management", description = "Endpoints for managing medical specializations")
public class SpecializationController {

    private final SpecializationService specializationService;

    @GetMapping
    @Operation(summary = "Get all specializations", description = "Retrieves all medical specializations.")
    public ResponseEntity<ApiResponse<List<SpecializationResponse>>> getAllSpecializations() {
        List<SpecializationResponse> response = specializationService.getAllSpecializations();
        return ResponseEntity.ok(ApiResponse.success(response, "Specializations retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get specialization by ID", description = "Retrieves a medical specialization by its ID.")
    public ResponseEntity<ApiResponse<SpecializationResponse>> getSpecializationById(@PathVariable Long id) {
        SpecializationResponse response = specializationService.getSpecializationById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Specialization retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create specialization (ADMIN)", description = "Creates a new medical specialization. Requires ADMIN role.")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<SpecializationResponse>> createSpecialization(@Valid @RequestBody SpecializationRequest request) {
        SpecializationResponse response = specializationService.createSpecialization(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Specialization created successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete specialization (ADMIN)", description = "Deletes a medical specialization by ID. Requires ADMIN role.")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deleteSpecialization(@PathVariable Long id) {
        specializationService.deleteSpecialization(id);
        return ResponseEntity.ok(ApiResponse.success("Specialization deleted successfully"));
    }
}
