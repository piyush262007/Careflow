package com.careflow.dashboard.service.impl;

import com.careflow.appointment.dto.response.AppointmentResponse;
import com.careflow.appointment.service.AppointmentService;
import com.careflow.dashboard.dto.PatientDashboardResponse;
import com.careflow.dashboard.dto.TodayCareResponse;
import com.careflow.dashboard.service.DashboardService;
import com.careflow.hospital.dto.response.HospitalLiveStatusResponse;
import com.careflow.hospital.entity.HospitalLiveStatus;
import com.careflow.hospital.repository.HospitalLiveStatusRepository;
import com.careflow.notification.dto.response.NotificationResponse;
import com.careflow.notification.service.NotificationService;
import com.careflow.patient.dto.HealthSummaryResponse;
import com.careflow.patient.service.PatientService;
import com.careflow.recommendation.dto.RecommendationResponse;
import com.careflow.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final AppointmentService appointmentService;
    private final PatientService patientService;
    private final RecommendationService recommendationService;
    private final NotificationService notificationService;
    private final HospitalLiveStatusRepository hospitalLiveStatusRepository;

    @Override
    @Transactional(readOnly = true)
    public PatientDashboardResponse getPatientDashboard(String email) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsForPatient(email);
        AppointmentResponse upcoming = appointments.isEmpty() ? null : appointments.get(0);

        HealthSummaryResponse healthSummary = patientService.getHealthSummary(email);

        List<RecommendationResponse> consultations = recommendationService.getConsultationHistory(email);
        RecommendationResponse recentConsultation = consultations.isEmpty() ? null : consultations.get(0);

        long unreadNotifications = notificationService.getUnreadCount(email);

        return PatientDashboardResponse.builder()
                .upcomingAppointment(upcoming)
                .healthSummary(healthSummary)
                .recentConsultation(recentConsultation)
                .unreadNotificationsCount(unreadNotifications)
                .totalAppointmentsCount(appointments.size())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public TodayCareResponse getTodayCare(String email) {
        LocalDate today = LocalDate.now();
        List<AppointmentResponse> allAppointments = appointmentService.getAppointmentsForPatient(email);

        // Active appointments scheduled for today
        List<AppointmentResponse> todayAppointments = allAppointments.stream()
                .filter(a -> a.getAppointmentDate() != null &&
                        a.getAppointmentDate().equals(today) &&
                        !"CANCELLED".equalsIgnoreCase(a.getStatus()) &&
                        !"REJECTED".equalsIgnoreCase(a.getStatus()))
                .collect(Collectors.toList());

        boolean hasAppointmentToday = !todayAppointments.isEmpty();

        // Next upcoming appointment if none today
        AppointmentResponse nextAppointment = null;
        if (!hasAppointmentToday) {
            nextAppointment = allAppointments.stream()
                    .filter(a -> a.getAppointmentDate() != null &&
                            (a.getAppointmentDate().isAfter(today) || a.getAppointmentDate().equals(today)) &&
                            !"CANCELLED".equalsIgnoreCase(a.getStatus()) &&
                            !"REJECTED".equalsIgnoreCase(a.getStatus()))
                    .findFirst()
                    .orElse(null);
        }

        // Live hospital status if associated with today's appointment
        HospitalLiveStatusResponse liveStatus = null;
        AppointmentResponse primaryAppt = hasAppointmentToday ? todayAppointments.get(0) : nextAppointment;
        if (primaryAppt != null && primaryAppt.getHospitalId() != null) {
            Optional<HospitalLiveStatus> liveOpt = hospitalLiveStatusRepository.findByHospitalId(primaryAppt.getHospitalId());
            if (liveOpt.isPresent()) {
                HospitalLiveStatus ls = liveOpt.get();
                liveStatus = HospitalLiveStatusResponse.builder()
                        .hospitalId(ls.getHospital().getId())
                        .hospitalName(ls.getHospital().getName())
                        .currentQueue(ls.getCurrentQueue())
                        .estimatedWaitMinutes(ls.getEstimatedWaitMinutes())
                        .availableBeds(ls.getAvailableBeds())
                        .icuBedsAvailable(ls.getIcuBedsAvailable())
                        .emergencyStatus(ls.getEmergencyStatus())
                        .lastUpdated(ls.getLastUpdated())
                        .build();
            }
        }

        // Notifications for patient
        List<NotificationResponse> notifications = notificationService.getPatientNotifications(email).stream()
                .limit(5)
                .collect(Collectors.toList());

        return TodayCareResponse.builder()
                .date(today.toString())
                .hasAppointmentToday(hasAppointmentToday)
                .todayAppointments(todayAppointments)
                .nextAppointment(nextAppointment)
                .liveHospitalStatus(liveStatus)
                .importantNotifications(notifications)
                .build();
    }
}
