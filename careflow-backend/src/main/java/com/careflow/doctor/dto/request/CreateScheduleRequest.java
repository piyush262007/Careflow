package com.careflow.doctor.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateScheduleRequest {

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Day of week is required")
    private DayOfWeek dayOfWeek;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;

    @Builder.Default
    @Min(value = 5, message = "Slot duration must be at least 5 minutes")
    private Integer slotDurationMinutes = 30;

    @Builder.Default
    @Min(value = 1, message = "Max appointments must be at least 1")
    private Integer maxAppointments = 20;
}
