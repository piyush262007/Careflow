package com.careflow.doctor.repository;

import com.careflow.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByHospitalId(Long hospitalId);

    List<Doctor> findBySpecializationId(Long specializationId);

    @Query("SELECT DISTINCT d FROM Doctor d " +
           "LEFT JOIN DoctorSchedule ds ON ds.doctor.id = d.id " +
           "WHERE (:hospitalId IS NULL OR d.hospital.id = :hospitalId) " +
           "AND (:specializationId IS NULL OR d.specialization.id = :specializationId) " +
           "AND (:name IS NULL OR LOWER(d.fullName) LIKE LOWER(CONCAT('%', :name, '%'))) " +
           "AND (:dayOfWeek IS NULL OR (ds.dayOfWeek = :dayOfWeek AND ds.currentAppointments < ds.maxAppointments))")
    List<Doctor> searchDoctors(
            @Param("hospitalId") Long hospitalId,
            @Param("specializationId") Long specializationId,
            @Param("name") String name,
            @Param("dayOfWeek") String dayOfWeek
    );
}
