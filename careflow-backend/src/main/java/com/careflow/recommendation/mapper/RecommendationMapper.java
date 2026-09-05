package com.careflow.recommendation.mapper;

import com.careflow.doctor.mapper.DoctorMapper;
import com.careflow.hospital.mapper.HospitalMapper;
import com.careflow.recommendation.dto.RecommendationResponse;
import com.careflow.recommendation.entity.AIConsultation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {HospitalMapper.class, DoctorMapper.class})
public interface RecommendationMapper {

    @Mapping(target = "recommendedHospital", source = "recommendedHospital")
    @Mapping(target = "recommendedDoctor", source = "recommendedDoctor")
    @Mapping(target = "alternativeHospitals", ignore = true)
    RecommendationResponse toResponse(AIConsultation consultation);
}
