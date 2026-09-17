package com.careflow.prescription.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionResponse {

    private Long id;
    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

    private Long patientId;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private String patientGender;
    private LocalDate patientDateOfBirth;

    private Long doctorId;
    private String doctorName;
    private String doctorSpecialization;
    private String hospitalName;

    private String symptoms;
    private String diagnosis;
    private String notes;
    private String recommendations;
    private String followUpInstructions;

    private LocalDateTime createdAt;
    private List<PrescriptionItemResponse> items;
}
