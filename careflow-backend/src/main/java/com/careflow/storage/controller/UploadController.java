package com.careflow.storage.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.storage.service.StorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@Tag(name = "File Upload & Storage", description = "Endpoints for uploading patient avatar, doctor profile, and hospital facility media images")
@SecurityRequirement(name = "bearerAuth")
public class UploadController {

    private final StorageService storageService;

    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload patient profile picture", description = "Uploads patient avatar image (Max 5MB, JPEG/PNG/WEBP).")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        String fileUrl = storageService.storeFile(file, "profiles");
        return ResponseEntity.ok(ApiResponse.success(Map.of("url", fileUrl), "Profile image uploaded successfully"));
    }

    @PostMapping(value = "/hospital", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Upload hospital banner image", description = "Uploads hospital facility photo (Requires ADMIN role).")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadHospitalImage(@RequestParam("file") MultipartFile file) {
        String fileUrl = storageService.storeFile(file, "hospitals");
        return ResponseEntity.ok(ApiResponse.success(Map.of("url", fileUrl), "Hospital image uploaded successfully"));
    }

    @PostMapping(value = "/doctor", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @Operation(summary = "Upload doctor avatar image", description = "Uploads doctor profile photo (Requires DOCTOR or ADMIN role).")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadDoctorImage(@RequestParam("file") MultipartFile file) {
        String fileUrl = storageService.storeFile(file, "doctors");
        return ResponseEntity.ok(ApiResponse.success(Map.of("url", fileUrl), "Doctor profile image uploaded successfully"));
    }
}
