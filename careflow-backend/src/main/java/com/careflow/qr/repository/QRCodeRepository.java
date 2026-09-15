package com.careflow.qr.repository;

import com.careflow.qr.entity.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QRCodeRepository extends JpaRepository<QRCode, Long> {
    Optional<QRCode> findByAppointmentId(Long appointmentId);
    Optional<QRCode> findByQrToken(String qrToken);
}
