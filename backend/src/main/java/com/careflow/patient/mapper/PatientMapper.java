package com.careflow.patient.mapper;

import com.careflow.patient.dto.PatientRequest;
import com.careflow.patient.dto.PatientResponse;
import com.careflow.patient.entity.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    @Mapping(target = "user", ignore = true)
    Patient toEntity(PatientRequest request);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "fullName", source = "user.fullName")
    @Mapping(target = "email", source = "user.email")
    PatientResponse toResponse(Patient patient);

    @Mapping(target = "user", ignore = true)
    void updatePatientFromDto(PatientRequest request, @MappingTarget Patient patient);
}
