package com.careflow.qr;

import com.careflow.appointment.entity.Appointment;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;
import com.careflow.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QRCodeServiceImpl implements QRCodeService {

    private final AppointmentRepository appointmentRepository;
    private final QRCodeGenerator qrCodeGenerator;

    @Override
    @Transactional(readOnly = true)
    public byte[] generateAppointmentQRCode(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", appointmentId));

        String qrPayload = String.format(
                "CAREFLOW_PASS_TOKEN:%s|APPT_ID:%d|PATIENT:%s|DOCTOR:%s|HOSPITAL:%s|DATE:%s|TIME:%s",
                appointment.getQrCode(),
                appointment.getId(),
                appointment.getPatient().getUser().getFullName(),
                appointment.getDoctor().getFullName(),
                appointment.getHospital().getName(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime()
        );

        try {
            return qrCodeGenerator.generateQRCodeImage(qrPayload, 300, 300);
        } catch (Exception ex) {
            throw new CustomException("Failed to generate QR code image: " + ex.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
