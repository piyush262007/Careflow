package com.careflow.appointment.service;

import com.careflow.appointment.dto.AppointmentRequest;
import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.appointment.mapper.AppointmentMapper;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.appointment.service.impl.AppointmentServiceImpl;
import com.careflow.auth.entity.Role;
import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.exception.BadRequestException;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.doctor.repository.DoctorScheduleRepository;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.notification.service.NotificationService;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.repository.PatientRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private HospitalRepository hospitalRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private DoctorScheduleRepository scheduleRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private AppointmentMapper appointmentMapper;

    @InjectMocks
    private AppointmentServiceImpl appointmentService;

    private User patientUser;
    private Patient patient;
    private Doctor doctor;
    private Hospital hospital;

    @BeforeEach
    void setUp() {
        patientUser = User.builder().id(1L).email("patient@careflow.com").fullName("Test Patient").role(Role.PATIENT).build();
        patient = Patient.builder().id(10L).user(patientUser).build();
        hospital = Hospital.builder().id(100L).name("St. Jude Central").build();
        doctor = Doctor.builder().id(200L).hospital(hospital).fullName("Dr. Sarah Chen").consultationFee(BigDecimal.valueOf(150)).build();
    }

    @Test
    void createAppointment_ShouldThrowException_WhenDateIsInPast() {
        AppointmentRequest pastRequest = AppointmentRequest.builder()
                .doctorId(200L)
                .hospitalId(100L)
                .appointmentDate(LocalDate.now().minusDays(1))
                .appointmentTime(LocalTime.of(10, 0))
                .build();

        when(userRepository.findByEmail("patient@careflow.com")).thenReturn(Optional.of(patientUser));
        when(patientRepository.findByUserId(1L)).thenReturn(Optional.of(patient));
        when(doctorRepository.findById(200L)).thenReturn(Optional.of(doctor));

        assertThrows(BadRequestException.class, () -> appointmentService.createAppointment("patient@careflow.com", pastRequest));
    }
}
