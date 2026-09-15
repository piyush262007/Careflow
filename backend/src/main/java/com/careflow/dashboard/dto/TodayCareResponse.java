package com.careflow.dashboard.dto;

import com.careflow.appointment.dto.AppointmentResponse;
import com.careflow.hospital.dto.response.HospitalLiveStatusResponse;
import com.careflow.notification.dto.NotificationResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodayCareResponse {

    private String date;
    private boolean hasAppointmentToday;
    private List<AppointmentResponse> todayAppointments;
    private AppointmentResponse nextAppointment;
    private HospitalLiveStatusResponse liveHospitalStatus;
    private List<NotificationResponse> importantNotifications;
}
