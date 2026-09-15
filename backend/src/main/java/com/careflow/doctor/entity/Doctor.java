package com.careflow.doctor.entity;

import com.careflow.auth.entity.User;
import com.careflow.common.entity.BaseEntity;
import com.careflow.hospital.entity.Hospital;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Doctor extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id", nullable = false)
    private Specialization specialization;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "qualification", nullable = false, length = 150)
    private String qualification;

    @Column(name = "experience_years", nullable = false)
    private Integer experienceYears;

    @Column(name = "consultation_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal consultationFee;

    @Column(name = "phone", nullable = false, length = 30)
    private String phone;

    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "profile_image", length = 500)
    private String profileImage;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Builder.Default
    @Column(name = "consultation_mode", length = 30)
    private String consultationMode = "IN_PERSON";

    @Builder.Default
    @Column(name = "status", length = 30)
    private String status = "AVAILABLE";
}
