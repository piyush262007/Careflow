package com.careflow.admin.service.impl;

import com.careflow.admin.dto.AdminDashboardResponse;
import com.careflow.admin.service.AdminService;
import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    @Transactional(readOnly = true)
    public AdminDashboardResponse getAdminDashboardStats() {
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long activeDoctors = doctorRepository.findAll().stream().filter(d -> "ACTIVE".equalsIgnoreCase(d.getStatus())).count();
        
        long totalHospitals = hospitalRepository.count();
        long activeHospitals = hospitalRepository.findAll().stream().filter(h -> Boolean.TRUE.equals(h.getIsActive())).count();
        long emergencyHospitals = hospitalRepository.findAll().stream().filter(h -> Boolean.TRUE.equals(h.getEmergencyAvailable())).count();

        LocalDate today = LocalDate.now();
        long apptsToday = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate() != null && a.getAppointmentDate().equals(today))
                .count();

        long pendingAppts = appointmentRepository.findAll().stream()
                .filter(a -> a.getStatus() == AppointmentStatus.PENDING)
                .count();

        long confirmedAppts = appointmentRepository.findAll().stream()
                .filter(a -> a.getStatus() == AppointmentStatus.CONFIRMED)
                .count();

        long completedAppts = appointmentRepository.findAll().stream()
                .filter(a -> a.getStatus() == AppointmentStatus.COMPLETED)
                .count();

        long cancelledAppts = appointmentRepository.findAll().stream()
                .filter(a -> a.getStatus() == AppointmentStatus.CANCELLED || a.getStatus() == AppointmentStatus.REJECTED)
                .count();

        return AdminDashboardResponse.builder()
                .totalPatients(totalPatients)
                .totalDoctors(totalDoctors)
                .activeDoctors(activeDoctors)
                .totalHospitals(totalHospitals)
                .activeHospitals(activeHospitals)
                .emergencyHospitals(emergencyHospitals)
                .appointmentsToday(apptsToday)
                .pendingAppointments(pendingAppts)
                .confirmedAppointments(confirmedAppts)
                .completedAppointments(completedAppts)
                .cancelledAppointments(cancelledAppts)
                .build();
    }
}
