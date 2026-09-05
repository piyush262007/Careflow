package com.careflow.qr.service;

import com.careflow.qr.dto.QrPassResponse;

public interface QrPassService {

    QrPassResponse getQrPassByAppointmentId(Long appointmentId);

    QrPassResponse verifyQrPass(String qrPassCode);
}
