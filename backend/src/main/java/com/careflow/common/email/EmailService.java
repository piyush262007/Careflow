package com.careflow.common.email;

public interface EmailService {

    void sendVerificationEmail(String toEmail, String fullName, String token);

    void sendAppointmentConfirmation(String toEmail, String patientName, String doctorName, String hospitalName, String date, String time);

    void sendAppointmentCancellation(String toEmail, String patientName, String doctorName, String date);

    void sendPasswordResetEmail(String toEmail, String token);

    void sendReminderEmail(String toEmail, String patientName, String doctorName, String time);
}
