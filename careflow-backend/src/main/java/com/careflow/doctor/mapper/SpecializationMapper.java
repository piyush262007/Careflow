package com.careflow.doctor.mapper;

import com.careflow.doctor.dto.request.SpecializationRequest;
import com.careflow.doctor.dto.response.SpecializationResponse;
import com.careflow.doctor.entity.Specialization;
import org.springframework.stereotype.Component;

@Component
public class SpecializationMapper {

    public Specialization toEntity(SpecializationRequest request) {
        if (request == null) {
            return null;
        }

        return Specialization.builder()
                .name(request.getName().trim())
                .description(request.getDescription())
                .build();
    }

    public SpecializationResponse toSpecializationResponse(Specialization specialization) {
        if (specialization == null) {
            return null;
        }

        return SpecializationResponse.builder()
                .id(specialization.getId())
                .name(specialization.getName())
                .description(specialization.getDescription())
                .build();
    }
}
