package com.careflow.recommendation.repository;

import com.careflow.recommendation.entity.AIConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AIConsultationRepository extends JpaRepository<AIConsultation, Long> {

    List<AIConsultation> findByPatientIdOrderByCreatedAtDesc(Long patientId);

    Optional<AIConsultation> findFirstByPatientIdOrderByCreatedAtDesc(Long patientId);
}
