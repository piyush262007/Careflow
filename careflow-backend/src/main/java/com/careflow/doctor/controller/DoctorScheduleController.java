package com.careflow.doctor.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.doctor.dto.request.CreateScheduleRequest;
import com.careflow.doctor.dto.response.DoctorScheduleResponse;
import com.careflow.doctor.service.DoctorScheduleService;
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
@RequestMapping("/schedules")
@RequiredArgsConstructor
@Tag(name = "Doctor Schedule Management", description = "Endpoints for managing doctor availability schedules")
public class DoctorScheduleController {

    private final DoctorScheduleService doctorScheduleService;

    @GetMapping("/doctor/{doctorId}")
    @Operation(summary = "Get schedules by doctor ID", description = "Retrieves weekly schedule for a specific doctor.")
    public ResponseEntity<ApiResponse<List<DoctorScheduleResponse>>> getSchedulesByDoctor(@PathVariable Long doctorId) {
        List<DoctorScheduleResponse> response = doctorScheduleService.getSchedulesByDoctor(doctorId);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor schedules retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    @Operation(summary = "Create schedule", description = "Adds a new recurring schedule slot for a doctor.")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<DoctorScheduleResponse>> createSchedule(@Valid @RequestBody CreateScheduleRequest request) {
        DoctorScheduleResponse response = doctorScheduleService.createSchedule(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Schedule created successfully"));
    }

    @DeleteMapping("/{scheduleId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    @Operation(summary = "Delete schedule", description = "Removes a doctor schedule slot by ID.")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(@PathVariable Long scheduleId) {
        doctorScheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.ok(ApiResponse.success("Schedule deleted successfully"));
    }
}
