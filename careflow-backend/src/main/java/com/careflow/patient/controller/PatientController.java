package com.careflow.patient.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.patient.dto.HealthSummaryResponse;
import com.careflow.patient.dto.PatientRequest;
import com.careflow.patient.dto.PatientResponse;
import com.careflow.patient.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
@Tag(name = "Patient Profile Management", description = "Endpoints for managing Patient medical profiles, health summaries, and personal details")
@SecurityRequirement(name = "bearerAuth")
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/profile")
    @Operation(summary = "Get patient profile", description = "Retrieves the medical profile of the currently authenticated patient.")
    public ResponseEntity<ApiResponse<PatientResponse>> getMyProfile(Principal principal) {
        PatientResponse response = patientService.getPatientProfile(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Patient profile retrieved successfully"));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update patient profile", description = "Updates medical and personal details for the authenticated patient.")
    public ResponseEntity<ApiResponse<PatientResponse>> updateMyProfile(
            Principal principal,
            @Valid @RequestBody PatientRequest request
    ) {
        PatientResponse response = patientService.updatePatientProfile(principal.getName(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Patient profile updated successfully"));
    }

    @GetMapping("/health-summary")
    @Operation(summary = "Get patient health summary", description = "Returns computed Age, BMI, Blood Group, Height, Weight, and Emergency Contact details.")
    public ResponseEntity<ApiResponse<HealthSummaryResponse>> getHealthSummary(Principal principal) {
        HealthSummaryResponse response = patientService.getHealthSummary(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Health summary computed successfully"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @Operation(summary = "Get patient by ID", description = "Retrieves patient record by ID (Requires DOCTOR or ADMIN role).")
    public ResponseEntity<ApiResponse<PatientResponse>> getPatientById(@PathVariable Long id) {
        PatientResponse response = patientService.getPatientById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all patients", description = "Retrieves all registered patient profiles (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<List<PatientResponse>>> getAllPatients() {
        List<PatientResponse> response = patientService.getAllPatients();
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
