package com.careflow.auth.controller;

import com.careflow.auth.dto.request.LoginRequest;
import com.careflow.auth.dto.request.RefreshTokenRequest;
import com.careflow.auth.dto.request.RegisterRequest;
import com.careflow.auth.dto.response.LoginResponse;
import com.careflow.auth.dto.response.UserResponse;
import com.careflow.auth.service.AuthenticationService;
import com.careflow.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication & Authorization", description = "Endpoints for User Registration, Login, Token Refresh, and Profile Management")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Creates a new user account with role (PATIENT, DOCTOR, or ADMIN).")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = authenticationService.register(request);
        return new ResponseEntity<>(ApiResponse.success(response, "User registered successfully"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticates user credentials and returns JWT Bearer token.")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authenticationService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Authentication successful"));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh JWT Token", description = "Generates a new JWT access token using a valid refresh token.")
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        LoginResponse response = authenticationService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Token refreshed successfully"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user profile", description = "Retrieves details of the currently authenticated user.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Principal principal) {
        UserResponse response = authenticationService.getCurrentUser(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Profile retrieved successfully"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Revokes refresh tokens for current authenticated user.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<String>> logout(Principal principal) {
        authenticationService.logout(principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset password request", description = "Placeholder endpoint for initiating password reset.")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestParam String email) {
        authenticationService.resetPassword(email);
        return ResponseEntity.ok(ApiResponse.success("Password reset instructions sent to email"));
    }

    @PostMapping("/verify-email")
    @Operation(summary = "Verify email token", description = "Placeholder endpoint for verifying account registration token.")
    public ResponseEntity<ApiResponse<String>> verifyEmail(@RequestParam String token) {
        authenticationService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully"));
    }
}
