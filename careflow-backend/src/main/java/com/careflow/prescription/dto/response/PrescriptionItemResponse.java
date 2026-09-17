package com.careflow.prescription.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionItemResponse {

    private Long id;
    private String medicineName;
    private String dosage;
    private String frequency;
    private String timing;
    private Integer durationDays;
    private String instructions;
}
