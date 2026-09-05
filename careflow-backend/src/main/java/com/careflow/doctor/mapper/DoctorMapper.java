package com.careflow.doctor.mapper;

import com.careflow.doctor.dto.DoctorRequest;
import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.doctor.dto.DoctorScheduleDto;
import com.careflow.doctor.dto.SpecializationDto;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import com.careflow.doctor.entity.Specialization;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hospital", ignore = true)
    @Mapping(target = "specialization", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    Doctor toEntity(DoctorRequest request);

    @Mapping(target = "hospitalId", source = "hospital.id")
    @Mapping(target = "hospitalName", source = "hospital.name")
    @Mapping(target = "specializationId", source = "specialization.id")
    @Mapping(target = "specializationName", source = "specialization.name")
    DoctorResponse toResponse(Doctor doctor);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hospital", ignore = true)
    @Mapping(target = "specialization", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    void updateDoctorFromDto(DoctorRequest request, @MappingTarget Doctor doctor);

    SpecializationDto toSpecializationDto(Specialization specialization);
    Specialization toSpecializationEntity(SpecializationDto specializationDto);

    @Mapping(target = "doctorId", source = "doctor.id")
    DoctorScheduleDto toScheduleDto(DoctorSchedule schedule);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    DoctorSchedule toScheduleEntity(DoctorScheduleDto scheduleDto);
}
