package com.careflow.prescription.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePrescriptionRequest {

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    private String symptoms;

    @NotBlank(message = "Diagnosis is required")
    private String diagnosis;

    private String notes;

    private String recommendations;

    private String followUpInstructions;

    @NotEmpty(message = "At least one medicine item is required")
    @Valid
    private List<CreatePrescriptionItemRequest> items;
}
