package com.careflow.qr;

public interface QRCodeService {

    byte[] generateAppointmentQRCode(Long appointmentId);
}
