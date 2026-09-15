package com.careflow.admin.dto;

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
public class AdminDashboardResponse {

    private long totalPatients;
    private long totalDoctors;
    private long activeDoctors;
    private long totalHospitals;
    private long activeHospitals;
    private long emergencyHospitals;
    private long appointmentsToday;
    private long pendingAppointments;
    private long confirmedAppointments;
    private long completedAppointments;
    private long cancelledAppointments;
}
