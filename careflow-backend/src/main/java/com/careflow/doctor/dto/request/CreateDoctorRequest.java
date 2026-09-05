package com.careflow.doctor.dto.request;

import com.careflow.doctor.entity.ConsultationMode;
import com.careflow.doctor.entity.DoctorStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateDoctorRequest {

    private Long hospitalId;

    private Long specializationId;

    @NotBlank(message = "Doctor full name is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Qualification is required")
    @Size(max = 150, message = "Qualification cannot exceed 150 characters")
    private String qualification;

    @NotNull(message = "Experience years is required")
    @Min(value = 0, message = "Experience years must be greater than or equal to 0")
    private Integer experienceYears;

    @NotNull(message = "Consultation fee is required")
    @DecimalMin(value = "0.0", message = "Consultation fee must be greater than or equal to 0.0")
    private Double consultationFee;

    @Pattern(regexp = "^$|^\\+?[0-9]{7,15}$", message = "Invalid phone number format")
    private String phone;

    @Email(message = "Please provide a valid email address")
    private String email;

    @Size(max = 500, message = "Profile image URL cannot exceed 500 characters")
    private String profileImage;

    @Size(max = 1000, message = "Bio cannot exceed 1000 characters")
    private String bio;

    private ConsultationMode consultationMode;

    private DoctorStatus status;

    @Builder.Default
    private boolean availableToday = false;
}
