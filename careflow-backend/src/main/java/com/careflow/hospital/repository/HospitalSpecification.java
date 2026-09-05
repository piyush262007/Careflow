package com.careflow.hospital.repository;

import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.Specialization;
import com.careflow.hospital.entity.Hospital;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class HospitalSpecification {

    public static Specification<Hospital> filterHospitals(String city, String name, Boolean emergencyAvailable, String specialization) {
        return (root, query, cb) -> {
            query.distinct(true);
            List<Predicate> predicates = new ArrayList<>();

            if (city != null && !city.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("city")), "%" + city.toLowerCase() + "%"));
            }

            if (name != null && !name.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }

            if (emergencyAvailable != null) {
                predicates.add(cb.equal(root.get("emergencyAvailable"), emergencyAvailable));
            }

            if (specialization != null && !specialization.isBlank()) {
                Join<Hospital, Doctor> doctorJoin = root.join("doctors", JoinType.LEFT);
                Join<Doctor, Specialization> specJoin = doctorJoin.join("specialization", JoinType.LEFT);
                predicates.add(cb.like(cb.lower(specJoin.get("name")), "%" + specialization.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
