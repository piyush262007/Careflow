package com.careflow.doctor.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorRequest {

    @NotNull(message = "Hospital ID is required")
    private Long hospitalId;

    @NotNull(message = "Specialization ID is required")
    private Long specializationId;

    @NotBlank(message = "Doctor full name is required")
    private String fullName;

    @NotBlank(message = "Qualification is required")
    private String qualification;

    @NotNull(message = "Years of experience is required")
    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;

    @NotNull(message = "Consultation fee is required")
    @DecimalMin(value = "0.0", message = "Consultation fee must be greater than or equal to 0")
    private BigDecimal consultationFee;

    @NotBlank(message = "Contact phone is required")
    @Pattern(regexp = "^\\+?[0-9\\s\\-\\(\\)]{7,25}$", message = "Please provide a valid contact phone number")
    private String phone;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String profileImage;
    private String bio;
    private String consultationMode;
    private String status;
}
