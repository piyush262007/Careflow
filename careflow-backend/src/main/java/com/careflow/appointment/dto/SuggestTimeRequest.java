package com.careflow.appointment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuggestTimeRequest {

    @NotNull(message = "Proposed appointment date is required")
    private LocalDate date;

    @NotNull(message = "Proposed appointment time is required")
    private LocalTime time;

    private String reason;
}
