package com.careflow.qr.service.impl;

import com.careflow.appointment.entity.Appointment;
import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.qr.dto.QrPassResponse;
import com.careflow.qr.service.QrPassService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class QrPassServiceImpl implements QrPassService {

    private final AppointmentRepository appointmentRepository;

    @Override
    @Transactional(readOnly = true)
    public QrPassResponse getQrPassByAppointmentId(Long appointmentId) {
        log.info("Fetching QR pass for appointment ID: {}", appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointmentId));

        return buildResponse(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public QrPassResponse verifyQrPass(String qrPassCode) {
        log.info("Verifying QR pass code: {}", qrPassCode);
        Appointment appointment = appointmentRepository.findByQrPassCode(qrPassCode)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or non-existent QR Pass code: " + qrPassCode));

        return buildResponse(appointment);
    }

    private QrPassResponse buildResponse(Appointment appointment) {
        boolean isValid = appointment.getStatus() == AppointmentStatus.CONFIRMED || appointment.getStatus() == AppointmentStatus.PENDING;

        String patientName = null;
        if (appointment.getPatient() != null && appointment.getPatient().getUser() != null) {
            patientName = appointment.getPatient().getUser().getFullName();
        }

        return QrPassResponse.builder()
                .qrPassCode(appointment.getQrPassCode())
                .appointmentId(appointment.getId())
                .patientName(patientName)
                .doctorName(appointment.getDoctor() != null ? appointment.getDoctor().getFullName() : null)
                .hospitalName(appointment.getHospital() != null ? appointment.getHospital().getName() : null)
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus() != null ? appointment.getStatus().name() : null)
                .valid(isValid)
                .build();
    }
}
