package com.careflow.hospital.repository;

import com.careflow.hospital.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    List<Hospital> findByCityIgnoreCase(String city);

    List<Hospital> findByEmergencyAvailableTrue();

    @Query("SELECT DISTINCT h FROM Hospital h " +
           "LEFT JOIN Doctor d ON d.hospital.id = h.id " +
           "LEFT JOIN Specialization s ON d.specialization.id = s.id " +
           "WHERE (:city IS NULL OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%'))) " +
           "AND (:name IS NULL OR LOWER(h.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
           "AND (:emergencyAvailable IS NULL OR h.emergencyAvailable = :emergencyAvailable) " +
           "AND (:specialization IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :specialization, '%')))")
    List<Hospital> searchHospitals(
            @Param("city") String city,
            @Param("name") String name,
            @Param("emergencyAvailable") Boolean emergencyAvailable,
            @Param("specialization") String specialization
    );
}
