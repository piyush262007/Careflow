package com.careflow.appointment.controller;

import com.careflow.appointment.dto.AppointmentRequest;
import com.careflow.appointment.dto.AppointmentResponse;
import com.careflow.appointment.dto.SuggestTimeRequest;
import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.appointment.service.AppointmentService;
import com.careflow.common.response.ApiResponse;
import com.careflow.qr.QRCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointment Booking & Doctor Workflow Engine", description = "Endpoints for booking, confirming, rejecting, rescheduling, and completing patient consultation appointments")
@SecurityRequirement(name = "bearerAuth")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final QRCodeService qrCodeService;

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Book new appointment", description = "Creates a new appointment booking. Validates double booking, doctor operating hours, and capacity limits.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> bookAppointment(
            Principal principal,
            @Valid @RequestBody AppointmentRequest request
    ) {
        AppointmentResponse response = appointmentService.createAppointment(principal.getName(), request);
        return new ResponseEntity<>(ApiResponse.success(response, "Appointment booked successfully"), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all appointments", description = "Retrieves all appointments across the system (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getAllAppointments() {
        List<AppointmentResponse> response = appointmentService.getAllAppointments();
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Get patient appointments", description = "Retrieves all appointments scheduled for the authenticated patient.")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getPatientAppointments(Principal principal) {
        List<AppointmentResponse> response = appointmentService.getAppointmentsForPatient(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/doctor/me")
    @PreAuthorize("hasRole('DOCTOR')")
    @Operation(summary = "Get current doctor's appointments", description = "Retrieves all appointments assigned to the authenticated doctor.")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getMyDoctorAppointments(Principal principal) {
        List<AppointmentResponse> response = appointmentService.getAppointmentsForDoctorUser(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @Operation(summary = "Get doctor appointments by doctorId", description = "Retrieves appointments assigned to a specific doctor ID.")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getDoctorAppointments(@RequestParam Long doctorId) {
        List<AppointmentResponse> response = appointmentService.getAppointmentsForDoctor(doctorId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get appointment by ID", description = "Retrieves appointment details by ID. Enforces strict ownership access control.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> getAppointmentById(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.getAppointmentByIdSecure(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    @Operation(summary = "Patient cancels appointment", description = "Cancels an existing appointment for the authenticated patient.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> cancelAppointment(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.cancelAppointmentByPatient(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Appointment cancelled successfully"));
    }

    @GetMapping("/{id}/qr")
    @Operation(summary = "Generate appointment QR Code image", description = "Generates a 300x300 PNG QR Code pass image for an appointment.")
    public ResponseEntity<byte[]> getAppointmentQRCode(@PathVariable Long id) {
        byte[] qrImageBytes = qrCodeService.generateAppointmentQRCode(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(qrImageBytes, headers, HttpStatus.OK);
    }

    @PatchMapping("/{id}/confirm")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Doctor confirms appointment", description = "Confirms a pending appointment for the authenticated doctor.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> confirmAppointment(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.confirmAppointmentByDoctor(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Appointment confirmed successfully"));
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Doctor rejects appointment", description = "Rejects a pending appointment with a specified reason.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> rejectAppointment(
            @PathVariable Long id,
            @RequestParam(required = false) String reason,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.rejectAppointmentByDoctor(id, principal.getName(), reason);
        return ResponseEntity.ok(ApiResponse.success(response, "Appointment rejected"));
    }

    @PostMapping("/{id}/suggest-time")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Doctor suggests alternative time", description = "Proposes a new date/time slot for an appointment.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> suggestTime(
            @PathVariable Long id,
            @Valid @RequestBody SuggestTimeRequest request,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.suggestTimeByDoctor(id, principal.getName(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Proposed time sent to patient for review"));
    }

    @PatchMapping("/{id}/accept-suggested-time")
    @Operation(summary = "Patient accepts proposed time", description = "Patient accepts proposed time change, confirming appointment.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> acceptSuggestedTime(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.acceptSuggestedTimeByPatient(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Proposed appointment time accepted"));
    }

    @PatchMapping("/{id}/reject-suggested-time")
    @Operation(summary = "Patient rejects proposed time", description = "Patient declines proposed time change, cancelling appointment.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> rejectSuggestedTime(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.rejectSuggestedTimeByPatient(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Proposed appointment time declined"));
    }

    @PatchMapping("/{id}/start-consultation")
    @PreAuthorize("hasRole('DOCTOR')")
    @Operation(summary = "Doctor starts consultation", description = "Updates appointment status to IN_CONSULTATION and notifies patient.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> startConsultation(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.startConsultationByDoctor(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Consultation started successfully"));
    }

    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Doctor marks appointment completed", description = "Marks consultation as completed.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> completeAppointment(
            @PathVariable Long id,
            Principal principal
    ) {
        AppointmentResponse response = appointmentService.completeAppointmentByDoctor(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Appointment marked as completed"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update appointment details", description = "Updates appointment information by ID.")
    public ResponseEntity<ApiResponse<AppointmentResponse>> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest request
    ) {
        AppointmentResponse response = appointmentService.updateAppointment(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Appointment updated successfully"));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @Operation(summary = "Update appointment status", description = "Updates status (PENDING, CONFIRMED, REJECTED, COMPLETED, CANCELLED).")
    public ResponseEntity<ApiResponse<AppointmentResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status
    ) {
        AppointmentResponse response = appointmentService.updateAppointmentStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success(response, "Appointment status updated to " + status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete appointment record", description = "Deletes appointment record by ID (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<String>> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment deleted successfully"));
    }
}
