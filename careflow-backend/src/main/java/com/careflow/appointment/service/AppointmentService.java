package com.careflow.appointment.service;

import com.careflow.appointment.dto.AppointmentRequest;
import com.careflow.appointment.dto.AppointmentResponse;
import com.careflow.appointment.dto.SuggestTimeRequest;
import com.careflow.appointment.entity.AppointmentStatus;

import java.util.List;

public interface AppointmentService {

    AppointmentResponse createAppointment(String patientEmail, AppointmentRequest request);

    AppointmentResponse getAppointmentById(Long id);

    List<AppointmentResponse> getAllAppointments();

    List<AppointmentResponse> getAppointmentsForPatient(String patientEmail);

    List<AppointmentResponse> getAppointmentsForDoctor(Long doctorId);

    List<AppointmentResponse> getAppointmentsForDoctorUser(String doctorEmail);

    AppointmentResponse updateAppointment(Long id, AppointmentRequest request);

    AppointmentResponse updateAppointmentStatus(Long id, AppointmentStatus status);

    AppointmentResponse confirmAppointmentByDoctor(Long id, String doctorEmail);

    AppointmentResponse rejectAppointmentByDoctor(Long id, String doctorEmail, String reason);

    AppointmentResponse suggestTimeByDoctor(Long id, String doctorEmail, SuggestTimeRequest request);

    AppointmentResponse acceptSuggestedTimeByPatient(Long id, String patientEmail);

    AppointmentResponse rejectSuggestedTimeByPatient(Long id, String patientEmail);

    AppointmentResponse completeAppointmentByDoctor(Long id, String doctorEmail);

    void deleteAppointment(Long id);
}
