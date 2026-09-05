package com.careflow.doctor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorResponse {

    private Long id;
    private Long hospitalId;
    private String hospitalName;
    private Long specializationId;
    private String specializationName;
    private String fullName;
    private String qualification;
    private Integer experienceYears;
    private BigDecimal consultationFee;
    private String phone;
    private String email;
    private String profileImage;
    private String bio;
    private String consultationMode;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
