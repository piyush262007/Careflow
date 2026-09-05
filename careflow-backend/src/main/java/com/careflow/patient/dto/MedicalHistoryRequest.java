package com.careflow.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalHistoryRequest {

    @NotBlank(message = "Condition name is required")
    private String conditionName;

    private String description;
    private LocalDate diagnosedDate;
    private String status;
}
