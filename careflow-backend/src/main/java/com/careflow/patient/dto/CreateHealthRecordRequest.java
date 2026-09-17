package com.careflow.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateHealthRecordRequest {

    @NotBlank(message = "Record title is required")
    private String title;

    private String description;

    private String recordType;

    private Long appointmentId;

    private Long doctorId;
}
