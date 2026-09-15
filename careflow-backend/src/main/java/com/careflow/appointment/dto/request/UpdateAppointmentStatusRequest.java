package com.careflow.appointment.dto.request;

import com.careflow.appointment.entity.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAppointmentStatusRequest {

    @NotNull(message = "Appointment status is required")
    private AppointmentStatus status;

    @Size(max = 1000, message = "Notes cannot exceed 1000 characters")
    private String notes;
}
