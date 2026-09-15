package com.careflow.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String gender;
    private String bloodGroup;
    private LocalDate dateOfBirth;
    private Double height;
    private Double weight;
    private String address;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String allergies;
    private String medicalHistory;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
