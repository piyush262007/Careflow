package com.careflow.doctor.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.doctor.dto.DoctorRequest;
import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.doctor.dto.DoctorScheduleDto;
import com.careflow.doctor.dto.SpecializationDto;
import com.careflow.doctor.dto.TimeSlotDto;
import com.careflow.doctor.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Tag(name = "Doctors & Specializations", description = "Endpoints for managing medical specialists, clinical specializations, and schedules")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/doctors")
    @Operation(summary = "List all doctors", description = "Retrieves doctor directory.")
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getAllDoctors() {
        List<DoctorResponse> response = doctorService.getAllDoctors();
        return ResponseEntity.ok(ApiResponse.success(response, "Doctors retrieved successfully"));
    }

    @GetMapping("/doctors/search")
    @Operation(summary = "Search doctors", description = "Filters doctors by hospital, specialization, name, or availability today.")
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> searchDoctors(
            @RequestParam(required = false) Long hospitalId,
            @RequestParam(required = false) Long specializationId,
            @RequestParam(required = false) Boolean availableToday,
            @RequestParam(required = false) String name
    ) {
        List<DoctorResponse> response = doctorService.searchDoctors(hospitalId, specializationId, availableToday, name);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor search results retrieved"));
    }

    @GetMapping("/doctors/hospital/{hospitalId}")
    @Operation(summary = "Get doctors by hospital", description = "Retrieves specialists practicing at a specific hospital.")
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getDoctorsByHospital(@PathVariable Long hospitalId) {
        List<DoctorResponse> response = doctorService.getDoctorsByHospital(hospitalId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/doctors/{id}")
    @Operation(summary = "Get doctor details", description = "Retrieves doctor profile by ID.")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorById(@PathVariable Long id) {
        DoctorResponse response = doctorService.getDoctorById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/doctors")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Create doctor profile", description = "Adds a doctor specialist to a hospital (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<DoctorResponse>> createDoctor(@Valid @RequestBody DoctorRequest request) {
        DoctorResponse response = doctorService.createDoctor(request);
        return new ResponseEntity<>(ApiResponse.success(response, "Doctor profile created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/doctors/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Update doctor profile", description = "Updates doctor information by ID (Requires DOCTOR or ADMIN role).")
    public ResponseEntity<ApiResponse<DoctorResponse>> updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequest request
    ) {
        DoctorResponse response = doctorService.updateDoctor(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor profile updated successfully"));
    }

    @DeleteMapping("/doctors/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Delete doctor profile", description = "Deletes doctor record by ID (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<String>> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok(ApiResponse.success("Doctor deleted successfully"));
    }


    @GetMapping("/doctors/{doctorId}/schedule")
    @Operation(summary = "Get doctor schedule & time slots", description = "Retrieves schedule configuration and generated available slots for a target date.")
    public ResponseEntity<ApiResponse<List<TimeSlotDto>>> getDoctorScheduleSlots(
            @PathVariable Long doctorId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        LocalDate targetDate = date != null ? date : LocalDate.now();
        List<TimeSlotDto> slots = doctorService.getAvailableTimeSlots(doctorId, targetDate);
        return ResponseEntity.ok(ApiResponse.success(slots, "Available time slots generated successfully"));
    }

    @PutMapping("/doctors/{doctorId}/schedule")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Update doctor schedule", description = "Configures doctor day schedule slots (Requires DOCTOR or ADMIN role).")
    public ResponseEntity<ApiResponse<DoctorScheduleDto>> updateDoctorSchedule(
            @PathVariable Long doctorId,
            @Valid @RequestBody DoctorScheduleDto dto
    ) {
        DoctorScheduleDto response = doctorService.createOrUpdateDoctorSchedule(doctorId, dto);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor schedule updated successfully"));
    }
}
