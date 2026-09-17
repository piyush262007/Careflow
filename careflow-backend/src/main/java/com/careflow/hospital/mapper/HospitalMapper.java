package com.careflow.hospital.mapper;

import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.entity.Hospital;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HospitalMapper {

    @Mapping(target = "rating", constant = "0.0")
    @Mapping(target = "totalReviews", constant = "0")
    Hospital toEntity(HospitalRequest request);

    HospitalResponse toResponse(Hospital hospital);

    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "totalReviews", ignore = true)
    void updateHospitalFromDto(HospitalRequest request, @MappingTarget Hospital hospital);
}
