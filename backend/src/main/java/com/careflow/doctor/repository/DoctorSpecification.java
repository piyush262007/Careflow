package com.careflow.doctor.repository;

import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class DoctorSpecification {

    public static Specification<Doctor> filterDoctors(Long hospitalId, Long specializationId, String name, String dayOfWeek) {
        return (root, query, cb) -> {
            query.distinct(true);
            List<Predicate> predicates = new ArrayList<>();

            if (hospitalId != null) {
                predicates.add(cb.equal(root.get("hospital").get("id"), hospitalId));
            }

            if (specializationId != null) {
                predicates.add(cb.equal(root.get("specialization").get("id"), specializationId));
            }

            if (name != null && !name.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("fullName")), "%" + name.toLowerCase() + "%"));
            }

            if (dayOfWeek != null && !dayOfWeek.isBlank()) {
                Join<Doctor, DoctorSchedule> scheduleJoin = root.join("schedules", JoinType.LEFT);
                predicates.add(cb.equal(scheduleJoin.get("dayOfWeek"), dayOfWeek));
                predicates.add(cb.lt(scheduleJoin.get("currentAppointments"), scheduleJoin.get("maxAppointments")));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
