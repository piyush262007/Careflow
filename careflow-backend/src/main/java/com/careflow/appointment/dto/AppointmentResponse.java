package com.careflow.appointment.dto;

import com.careflow.appointment.entity.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponse {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private String specializationName;
    private Long hospitalId;
    private String hospitalName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String symptoms;
    private String notes;
    private AppointmentStatus status;
    private BigDecimal consultationFee;
    private String qrCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
