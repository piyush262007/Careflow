package com.careflow.admin.controller;

import com.careflow.admin.dto.AdminDashboardResponse;
import com.careflow.admin.service.AdminService;
import com.careflow.common.audit.AuditService;
import com.careflow.common.response.ApiResponse;
import com.careflow.doctor.dto.DoctorRequest;
import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.doctor.dto.SpecializationDto;
import com.careflow.doctor.service.DoctorService;
import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.entity.HospitalLiveStatus;
import com.careflow.hospital.repository.HospitalLiveStatusRepository;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.hospital.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin Operations & System Oversight", description = "Endpoints for managing hospitals, doctors, specializations, live status, and system analytics (ADMIN role required)")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final AdminService adminService;
    private final HospitalService hospitalService;
    private final DoctorService doctorService;
    private final HospitalRepository hospitalRepository;
    private final HospitalLiveStatusRepository liveStatusRepository;
    private final AuditService auditService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get admin dashboard metrics", description = "Aggregates total patients, doctors, active hospitals, emergency facilities, and appointment metrics.")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getAdminDashboard() {
        AdminDashboardResponse response = adminService.getAdminDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(response, "Admin dashboard stats retrieved successfully"));
    }

    @PostMapping("/hospitals")
    @Operation(summary = "Create partner hospital", description = "Adds a new hospital facility.")
    public ResponseEntity<ApiResponse<HospitalResponse>> createHospital(
            Principal principal,
            @Valid @RequestBody HospitalRequest request
    ) {
        HospitalResponse response = hospitalService.createHospital(request);
        auditService.logAudit(principal.getName(), "HOSPITAL_CREATED", "LOCAL", "Created hospital: " + request.getName());
        return new ResponseEntity<>(ApiResponse.success(response, "Hospital created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/hospitals/{id}")
    @Operation(summary = "Update partner hospital", description = "Updates hospital facility information by ID.")
    public ResponseEntity<ApiResponse<HospitalResponse>> updateHospital(
            @PathVariable Long id,
            Principal principal,
            @Valid @RequestBody HospitalRequest request
    ) {
        HospitalResponse response = hospitalService.updateHospital(id, request);
        auditService.logAudit(principal.getName(), "HOSPITAL_UPDATED", "LOCAL", "Updated hospital #" + id);
        return ResponseEntity.ok(ApiResponse.success(response, "Hospital updated successfully"));
    }

    @PatchMapping("/hospitals/{id}/toggle-active")
    @Operation(summary = "Toggle hospital active status", description = "Soft-deactivates or reactivates a hospital facility.")
    public ResponseEntity<ApiResponse<HospitalResponse>> toggleHospitalActive(
            @PathVariable Long id,
            Principal principal
    ) {
        HospitalResponse existing = hospitalService.getHospitalById(id);
        HospitalRequest req = HospitalRequest.builder()
                .name(existing.getName())
                .address(existing.getAddress())
                .city(existing.getCity())
                .state(existing.getState())
                .pincode(existing.getPincode() != null ? existing.getPincode() : "000000")
                .latitude(existing.getLatitude() != null ? existing.getLatitude() : 37.7749)
                .longitude(existing.getLongitude() != null ? existing.getLongitude() : -122.4194)
                .phone(existing.getPhone() != null ? existing.getPhone() : "+1 (555) 000-0000")
                .email(existing.getEmail())
                .website(existing.getWebsite())
                .emergencyAvailable(existing.getEmergencyAvailable())
                .isOpen24Hours(existing.getIsOpen24Hours())
                .imageUrl(existing.getImageUrl())
                .build();

        HospitalResponse updated = hospitalService.updateHospital(id, req);
        String action = Boolean.TRUE.equals(existing.getEmergencyAvailable()) ? "HOSPITAL_TOGGLE_OFF" : "HOSPITAL_TOGGLE_ON";
        auditService.logAudit(principal.getName(), action, "LOCAL", "Toggled active status for hospital #" + id);
        return ResponseEntity.ok(ApiResponse.success(updated, "Hospital active status updated"));
    }

    @PutMapping("/hospitals/{id}/live-status")
    @Operation(summary = "Update hospital live status", description = "Manages queue length, wait time, emergency availability, and available bed metrics.")
    public ResponseEntity<ApiResponse<String>> updateLiveStatus(
            @PathVariable Long id,
            @RequestParam Integer currentQueue,
            @RequestParam Integer estimatedWaitMinutes,
            @RequestParam(required = false, defaultValue = "AVAILABLE") String emergencyStatus,
            Principal principal
    ) {
        com.careflow.hospital.entity.Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new com.careflow.common.exception.ResourceNotFoundException("Hospital", "id", id));

        HospitalLiveStatus liveStatus = liveStatusRepository.findByHospitalId(id)
                .orElseGet(() -> HospitalLiveStatus.builder()
                        .hospital(hospital)
                        .build());

        liveStatus.setCurrentQueue(currentQueue);
        liveStatus.setEstimatedWaitMinutes(estimatedWaitMinutes);
        liveStatus.setEmergencyStatus(emergencyStatus);
        liveStatus.setLastUpdated(LocalDateTime.now());
        liveStatusRepository.save(liveStatus);

        auditService.logAudit(principal.getName(), "LIVE_STATUS_UPDATED", "LOCAL", "Updated live status for hospital #" + id);
        return ResponseEntity.ok(ApiResponse.success("Hospital live status updated successfully"));
    }

    @PostMapping("/doctors")
    @Operation(summary = "Create doctor profile", description = "Adds a new clinical doctor assigned to a hospital and specialization.")
    public ResponseEntity<ApiResponse<DoctorResponse>> createDoctor(
            Principal principal,
            @Valid @RequestBody DoctorRequest request
    ) {
        DoctorResponse response = doctorService.createDoctor(request);
        auditService.logAudit(principal.getName(), "DOCTOR_CREATED", "LOCAL", "Created doctor profile: " + request.getFullName());
        return new ResponseEntity<>(ApiResponse.success(response, "Doctor profile created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/doctors/{id}")
    @Operation(summary = "Update doctor profile", description = "Updates doctor information by ID.")
    public ResponseEntity<ApiResponse<DoctorResponse>> updateDoctor(
            @PathVariable Long id,
            Principal principal,
            @Valid @RequestBody DoctorRequest request
    ) {
        DoctorResponse response = doctorService.updateDoctor(id, request);
        auditService.logAudit(principal.getName(), "DOCTOR_UPDATED", "LOCAL", "Updated doctor profile #" + id);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor profile updated successfully"));
    }

    @PatchMapping("/doctors/{id}/toggle-active")
    @Operation(summary = "Toggle doctor active status", description = "Soft-deactivates or reactivates a doctor profile.")
    public ResponseEntity<ApiResponse<DoctorResponse>> toggleDoctorActive(
            @PathVariable Long id,
            Principal principal
    ) {
        DoctorResponse existing = doctorService.getDoctorById(id);
        String newStatus = "ACTIVE".equalsIgnoreCase(existing.getStatus()) ? "INACTIVE" : "ACTIVE";
        
        DoctorRequest req = DoctorRequest.builder()
                .hospitalId(existing.getHospitalId())
                .specializationId(existing.getSpecializationId())
                .fullName(existing.getFullName())
                .qualification(existing.getQualification())
                .experienceYears(existing.getExperienceYears())
                .consultationFee(existing.getConsultationFee())
                .phone(existing.getPhone())
                .email(existing.getEmail())
                .profileImage(existing.getProfileImage())
                .bio(existing.getBio())
                .consultationMode(existing.getConsultationMode())
                .status(newStatus)
                .build();

        DoctorResponse response = doctorService.updateDoctor(id, req);
        auditService.logAudit(principal.getName(), "DOCTOR_DEACTIVATED", "LOCAL", "Toggled status to " + newStatus + " for doctor #" + id);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor status updated to " + newStatus));
    }

    @PostMapping("/specializations")
    @Operation(summary = "Create medical specialization", description = "Adds a new clinical specialization category.")
    public ResponseEntity<ApiResponse<SpecializationDto>> createSpecialization(
            Principal principal,
            @Valid @RequestBody SpecializationDto request
    ) {
        SpecializationDto response = doctorService.createSpecialization(request);
        auditService.logAudit(principal.getName(), "SPECIALIZATION_CREATED", "LOCAL", "Created specialization: " + request.getName());
        return new ResponseEntity<>(ApiResponse.success(response, "Specialization created successfully"), HttpStatus.CREATED);
    }
}
