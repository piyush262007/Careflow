package com.careflow.qr.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.qr.dto.QrPassResponse;
import com.careflow.qr.service.QrPassService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/qr-pass")
@RequiredArgsConstructor
@Tag(name = "QR Pass Verification", description = "Endpoints for generating and verifying hospital check-in QR passes")
public class QrPassController {

    private final QrPassService qrPassService;

    @GetMapping("/appointment/{appointmentId}")
    @Operation(summary = "Get QR pass by appointment", description = "Retrieves QR pass verification details for a booked appointment.")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<QrPassResponse>> getQrPassByAppointmentId(@PathVariable Long appointmentId) {
        QrPassResponse response = qrPassService.getQrPassByAppointmentId(appointmentId);
        return ResponseEntity.ok(ApiResponse.success(response, "QR pass retrieved successfully"));
    }

    @GetMapping("/verify")
    @Operation(summary = "Verify QR pass", description = "Verifies a QR pass code at hospital desk check-in.")
    public ResponseEntity<ApiResponse<QrPassResponse>> verifyQrPass(@RequestParam String code) {
        QrPassResponse response = qrPassService.verifyQrPass(code);
        return ResponseEntity.ok(ApiResponse.success(response, "QR pass verified successfully"));
    }
}
