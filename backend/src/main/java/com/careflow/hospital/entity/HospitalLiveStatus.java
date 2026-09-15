package com.careflow.hospital.entity;

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
@Table(name = "hospital_live_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HospitalLiveStatus extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false, unique = true)
    private Hospital hospital;

    @Builder.Default
    @Column(name = "current_queue", nullable = false)
    private Integer currentQueue = 0;

    @Builder.Default
    @Column(name = "estimated_wait_minutes", nullable = false)
    private Integer estimatedWaitMinutes = 0;

    @Builder.Default
    @Column(name = "available_beds")
    private Integer availableBeds = 0;

    @Builder.Default
    @Column(name = "icu_beds_available")
    private Integer icuBedsAvailable = 0;

    @Builder.Default
    @Column(name = "emergency_status", length = 30)
    private String emergencyStatus = "AVAILABLE";

    @Builder.Default
    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();
}
