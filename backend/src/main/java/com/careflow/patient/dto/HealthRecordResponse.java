package com.careflow.patient.dto;

import com.careflow.prescription.dto.response.PrescriptionResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecordResponse {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private String doctorSpecialization;
    private String hospitalName;

    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

    private String recordType;
    private String title;
    private String description;
    private String fileName;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private LocalDateTime uploadedAt;

    private PrescriptionResponse prescription;
}
