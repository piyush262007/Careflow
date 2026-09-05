package com.careflow.patient.dto.response;

import com.careflow.patient.entity.BloodGroup;
import com.careflow.patient.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private Gender gender;
    private LocalDate dateOfBirth;
    private BloodGroup bloodGroup;
    private Double height;
    private Double weight;
    private String address;
    private String emergencyContactName;
    private String emergencyContactNumber;
    private String allergies;
    private String medicalHistory;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
