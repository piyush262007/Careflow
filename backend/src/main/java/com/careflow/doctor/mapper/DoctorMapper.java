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

    @Mapping(target = "hospital", ignore = true)
    @Mapping(target = "specialization", ignore = true)
    Doctor toEntity(DoctorRequest request);

    @Mapping(target = "hospitalId", source = "hospital.id")
    @Mapping(target = "hospitalName", source = "hospital.name")
    @Mapping(target = "specializationId", source = "specialization.id")
    @Mapping(target = "specializationName", source = "specialization.name")
    DoctorResponse toResponse(Doctor doctor);

    @Mapping(target = "hospital", ignore = true)
    @Mapping(target = "specialization", ignore = true)
    void updateDoctorFromDto(DoctorRequest request, @MappingTarget Doctor doctor);

    SpecializationDto toSpecializationDto(Specialization specialization);
    Specialization toSpecializationEntity(SpecializationDto specializationDto);

    @Mapping(target = "doctorId", source = "doctor.id")
    DoctorScheduleDto toScheduleDto(DoctorSchedule schedule);

    @Mapping(target = "doctor", ignore = true)
    DoctorSchedule toScheduleEntity(DoctorScheduleDto scheduleDto);
}
