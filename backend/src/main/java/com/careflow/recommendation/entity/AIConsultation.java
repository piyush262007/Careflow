package com.careflow.recommendation.entity;

import com.careflow.common.entity.BaseEntity;
import com.careflow.doctor.entity.Doctor;
import com.careflow.hospital.entity.Hospital;
import com.careflow.patient.entity.Patient;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "ai_consultations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AIConsultation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(name = "symptoms", nullable = false, columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "pain_level", length = 30)
    private String painLevel;

    @Column(name = "duration", length = 50)
    private String duration;

    @Column(name = "predicted_department", nullable = false, length = 100)
    private String predictedDepartment;

    @Column(name = "severity", length = 30)
    private String severity;

    @Column(name = "confidence_score", nullable = false)
    private Integer confidenceScore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recommended_hospital_id")
    private Hospital recommendedHospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recommended_doctor_id")
    private Doctor recommendedDoctor;

    @Column(name = "recommendation_reason", columnDefinition = "TEXT")
    private String recommendationReason;
}
