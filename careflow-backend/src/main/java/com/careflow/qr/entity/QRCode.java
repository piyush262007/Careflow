package com.careflow.qr.entity;

import com.careflow.appointment.entity.Appointment;
import com.careflow.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "qr_codes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QRCode extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;

    @Column(name = "qr_token", nullable = false, unique = true, length = 255)
    private String qrToken;

    @Column(name = "file_path", length = 500)
    private String filePath;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;
}
