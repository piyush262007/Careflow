package com.careflow.patient.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileImageUploadRequest {

    @NotBlank(message = "Profile image URL or payload is required")
    private String imageUrl;
}
