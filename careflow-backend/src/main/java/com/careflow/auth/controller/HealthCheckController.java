package com.careflow.auth.controller;

import com.careflow.common.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class HealthCheckController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealthStatus() {
        Map<String, Object> healthInfo = Map.of(
                "status", "UP",
                "service", "CareFlow Healthcare Backend",
                "version", "v1.0.0",
                "javaVersion", System.getProperty("java.version")
        );
        return ResponseEntity.ok(ApiResponse.success(healthInfo, "CareFlow Backend Service is running cleanly"));
    }
}
