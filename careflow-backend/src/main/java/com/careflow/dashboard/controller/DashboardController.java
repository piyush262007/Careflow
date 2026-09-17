package com.careflow.dashboard.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.dashboard.dto.PatientDashboardResponse;
import com.careflow.dashboard.dto.TodayCareResponse;
import com.careflow.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Tag(name = "Patient Dashboard Analytics", description = "Endpoints for aggregated patient health analytics, upcoming appointments, and notification metrics")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Get patient dashboard analytics", description = "Aggregates upcoming appointment, health summary, recent AI triage consultation, and unread notification counts.")
    public ResponseEntity<ApiResponse<PatientDashboardResponse>> getPatientDashboard(Principal principal) {
        PatientDashboardResponse response = dashboardService.getPatientDashboard(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Patient dashboard analytics retrieved successfully"));
    }

    @GetMapping("/today-care")
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Get Today Care daily healthcare summary", description = "Retrieves today's appointments, live hospital status, upcoming appointments, and key notifications for the authenticated patient.")
    public ResponseEntity<ApiResponse<TodayCareResponse>> getTodayCare(Principal principal) {
        TodayCareResponse response = dashboardService.getTodayCare(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Today Care summary retrieved successfully"));
    }
}
