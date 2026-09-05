package com.careflow.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthSummaryResponse {

    private Integer age;
    private Double bmi;
    private String bmiCategory;
    private String bloodGroup;
    private Double height;
    private Double weight;
    private EmergencyContactDto emergencyContact;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmergencyContactDto {
        private String name;
        private String phone;
    }
}
