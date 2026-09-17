package com.careflow.patient.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.patient.dto.HealthRecordResponse;
import com.careflow.patient.service.HealthRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/health-records")
@RequiredArgsConstructor
@Tag(name = "Health Records & EHR", description = "Endpoints for managing digital patient health records, EHR documents, and medical consultation histories")
@SecurityRequirement(name = "bearerAuth")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Get patient health records", description = "Retrieves all health records, consultation histories, and digital prescriptions for the authenticated patient.")
    public ResponseEntity<ApiResponse<List<HealthRecordResponse>>> getMyPatientHealthRecords(Principal principal) {
        List<HealthRecordResponse> response = healthRecordService.getPatientHealthRecords(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Health records retrieved successfully"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get health record by ID", description = "Retrieves a specific health record by ID with strict ownership authorization.")
    public ResponseEntity<ApiResponse<HealthRecordResponse>> getHealthRecordById(
            @PathVariable Long id,
            Principal principal
    ) {
        HealthRecordResponse response = healthRecordService.getHealthRecordByIdSecure(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/doctor/patient/{patientId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Doctor get patient health records", description = "Retrieves health records for a specific patient ID (Requires DOCTOR or ADMIN role).")
    public ResponseEntity<ApiResponse<List<HealthRecordResponse>>> getDoctorPatientHealthRecords(
            @PathVariable Long patientId,
            Principal principal
    ) {
        List<HealthRecordResponse> response = healthRecordService.getDoctorPatientHealthRecords(patientId, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
    @Operation(summary = "Upload medical report or document", description = "Uploads an EHR document file (JPEG, PNG, WEBP) and links it to patient record.")
    public ResponseEntity<ApiResponse<HealthRecordResponse>> uploadHealthRecord(
            Principal principal,
            @RequestPart("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "recordType", required = false) String recordType,
            @RequestParam(value = "appointmentId", required = false) Long appointmentId
    ) {
        HealthRecordResponse response = healthRecordService.uploadHealthRecord(principal.getName(), file, title, description, recordType, appointmentId);
        return new ResponseEntity<>(ApiResponse.success(response, "Medical document uploaded successfully"), HttpStatus.CREATED);
    }
}
