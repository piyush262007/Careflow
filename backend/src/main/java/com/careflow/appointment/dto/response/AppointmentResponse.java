package com.careflow.appointment.dto.response;

import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.doctor.entity.ConsultationMode;
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
public class AppointmentResponse {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private String doctorSpecialization;
    private Long hospitalId;
    private String hospitalName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private AppointmentStatus status;
    private ConsultationMode consultationMode;
    private Double consultationFee;
    private String reason;
    private String notes;
    private String qrPassCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
