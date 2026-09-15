package com.careflow.patient.dto.response;

import com.careflow.patient.entity.BloodGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthSummaryResponse {

    private BloodGroup bloodGroup;
    private Double height;
    private Double weight;
    private Integer age;
    private Double bmi;
    private EmergencyContactDto emergencyContact;
}
