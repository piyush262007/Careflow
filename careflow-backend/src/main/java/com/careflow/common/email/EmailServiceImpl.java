package com.careflow.common.email;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void sendVerificationEmail(String toEmail, String fullName, String token) {
        String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>" +
                "<h2 style='color: #0d9488;'>Welcome to CareFlow, %s!</h2>" +
                "<p>Please verify your account by clicking the link below:</p>" +
                "<a href='https://careflow.health/verify?token=%s' style='background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;'>Verify Account</a>" +
                "</div>", fullName, token
        );
        sendHtmlEmail(toEmail, "CareFlow - Verify Your Account", htmlContent);
    }

    @Override
    @Async
    public void sendAppointmentConfirmation(String toEmail, String patientName, String doctorName, String hospitalName, String date, String time) {
        String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>" +
                "<h2 style='color: #0d9488;'>Appointment Confirmed!</h2>" +
                "<p>Dear %s, your consultation has been successfully booked.</p>" +
                "<ul>" +
                "<li><strong>Doctor:</strong> %s</li>" +
                "<li><strong>Hospital:</strong> %s</li>" +
                "<li><strong>Date & Time:</strong> %s at %s</li>" +
                "</ul>" +
                "<p>Please present your digital QR pass upon arrival.</p>" +
                "</div>", patientName, doctorName, hospitalName, date, time
        );
        sendHtmlEmail(toEmail, "CareFlow - Appointment Confirmation", htmlContent);
    }

    @Override
    @Async
    public void sendAppointmentCancellation(String toEmail, String patientName, String doctorName, String date) {
        String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>" +
                "<h2 style='color: #e11d48;'>Appointment Cancelled</h2>" +
                "<p>Dear %s, your appointment with %s on %s has been cancelled.</p>" +
                "</div>", patientName, doctorName, date
        );
        sendHtmlEmail(toEmail, "CareFlow - Appointment Cancellation", htmlContent);
    }

    @Override
    @Async
    public void sendPasswordResetEmail(String toEmail, String token) {
        String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>" +
                "<h2 style='color: #0d9488;'>Password Reset Request</h2>" +
                "<p>Click below to reset your password:</p>" +
                "<a href='https://careflow.health/reset-password?token=%s' style='background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;'>Reset Password</a>" +
                "</div>", token
        );
        sendHtmlEmail(toEmail, "CareFlow - Password Reset", htmlContent);
    }

    @Override
    @Async
    public void sendReminderEmail(String toEmail, String patientName, String doctorName, String time) {
        String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>" +
                "<h2 style='color: #0d9488;'>Upcoming Appointment Reminder</h2>" +
                "<p>Dear %s, reminder for your appointment with %s today at %s.</p>" +
                "</div>", patientName, doctorName, time
        );
        sendHtmlEmail(toEmail, "CareFlow - Appointment Reminder", htmlContent);
    }

    private void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("noreply@careflow.health");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Email sent successfully to {}", to);
        } catch (Exception ex) {
            log.warn("Could not send email to {}: {}", to, ex.getMessage());
        }
    }
}
