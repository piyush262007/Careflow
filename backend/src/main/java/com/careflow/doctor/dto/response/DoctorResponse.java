package com.careflow.doctor.dto.response;

import com.careflow.doctor.entity.ConsultationMode;
import com.careflow.doctor.entity.DoctorStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorResponse {

    private Long id;
    private Long hospitalId;
    private String hospitalName;
    private Long specializationId;
    private String specializationName;
    private String fullName;
    private String qualification;
    private Integer experienceYears;
    private Double consultationFee;
    private String phone;
    private String email;
    private String profileImage;
    private String bio;
    private ConsultationMode consultationMode;
    private DoctorStatus status;
    private boolean availableToday;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
