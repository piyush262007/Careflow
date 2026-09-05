package com.careflow.hospital.repository;

import com.careflow.hospital.entity.HospitalLiveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HospitalLiveStatusRepository extends JpaRepository<HospitalLiveStatus, Long> {
    Optional<HospitalLiveStatus> findByHospitalId(Long hospitalId);
}
