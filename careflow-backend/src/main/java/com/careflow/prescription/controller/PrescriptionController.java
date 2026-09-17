package com.careflow.prescription.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.prescription.dto.request.CreatePrescriptionRequest;
import com.careflow.prescription.dto.response.PrescriptionResponse;
import com.careflow.prescription.service.PrescriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
@Tag(name = "Prescription & Consultation Management", description = "Endpoints for creating, managing, and retrieving digital prescriptions and consultation notes.")
@SecurityRequirement(name = "bearerAuth")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping
    @PreAuthorize("hasRole('DOCTOR')")
    @Operation(summary = "Create digital prescription & complete consultation", description = "Creates/saves a structured prescription with medicines, diagnosis, and notes for an assigned appointment. Marks appointment as COMPLETED.")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> createPrescription(
            Principal principal,
            @Valid @RequestBody CreatePrescriptionRequest request
    ) {
        PrescriptionResponse response = prescriptionService.createOrUpdatePrescription(principal.getName(), request);
        return new ResponseEntity<>(ApiResponse.success(response, "Prescription saved and consultation completed successfully"), HttpStatus.CREATED);
    }

    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get prescription by appointment ID", description = "Retrieves prescription details for a specific appointment ID with ownership access control.")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> getPrescriptionByAppointmentId(
            @PathVariable Long appointmentId,
            Principal principal
    ) {
        PrescriptionResponse response = prescriptionService.getPrescriptionByAppointmentId(appointmentId, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Get current patient's prescriptions", description = "Retrieves all digital prescriptions issued to the authenticated patient.")
    public ResponseEntity<ApiResponse<List<PrescriptionResponse>>> getMyPatientPrescriptions(Principal principal) {
        List<PrescriptionResponse> response = prescriptionService.getPatientPrescriptions(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    @Operation(summary = "Get current doctor's written prescriptions", description = "Retrieves all prescriptions issued by the authenticated doctor.")
    public ResponseEntity<ApiResponse<List<PrescriptionResponse>>> getMyDoctorPrescriptions(Principal principal) {
        List<PrescriptionResponse> response = prescriptionService.getDoctorPrescriptions(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get prescription by ID", description = "Retrieves a single prescription record by ID with ownership access control.")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> getPrescriptionById(
            @PathVariable Long id,
            Principal principal
    ) {
        PrescriptionResponse response = prescriptionService.getPrescriptionByIdSecure(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
