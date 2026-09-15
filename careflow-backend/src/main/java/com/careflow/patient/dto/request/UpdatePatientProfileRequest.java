package com.careflow.patient.dto.request;

import com.careflow.patient.entity.BloodGroup;
import com.careflow.patient.entity.Gender;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePatientProfileRequest {

    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number format. Must contain 7 to 15 digits.")
    private String phone;

    private Gender gender;

    @Past(message = "Date of birth cannot be in the future")
    private LocalDate dateOfBirth;

    private BloodGroup bloodGroup;

    @Positive(message = "Height must be greater than 0")
    private Double height;

    @Positive(message = "Weight must be greater than 0")
    private Double weight;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @Size(max = 100, message = "Emergency contact name must not exceed 100 characters")
    private String emergencyContactName;

    @Pattern(regexp = "^$|^\\+?[0-9]{7,15}$", message = "Invalid emergency contact phone number format")
    private String emergencyContactNumber;

    @Size(max = 500, message = "Allergies description must not exceed 500 characters")
    private String allergies;

    @Size(max = 1000, message = "Medical history description must not exceed 1000 characters")
    private String medicalHistory;
}
