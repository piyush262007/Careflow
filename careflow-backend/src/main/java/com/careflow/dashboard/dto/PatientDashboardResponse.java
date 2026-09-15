package com.careflow.dashboard.dto;

import com.careflow.appointment.dto.AppointmentResponse;
import com.careflow.patient.dto.HealthSummaryResponse;
import com.careflow.recommendation.dto.RecommendationResponse;
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
public class PatientDashboardResponse {

    private AppointmentResponse upcomingAppointment;
    private HealthSummaryResponse healthSummary;
    private RecommendationResponse recentConsultation;
    private long unreadNotificationsCount;
    private int totalAppointmentsCount;
}
