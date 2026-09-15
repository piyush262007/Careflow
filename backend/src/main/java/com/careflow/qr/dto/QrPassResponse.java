package com.careflow.qr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QrPassResponse {

    private String qrPassCode;
    private Long appointmentId;
    private String patientName;
    private String doctorName;
    private String hospitalName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
    private boolean valid;
}
