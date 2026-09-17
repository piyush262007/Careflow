package com.careflow.appointment.mapper;

import com.careflow.appointment.dto.AppointmentRequest;
import com.careflow.appointment.dto.AppointmentResponse;
import com.careflow.appointment.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "hospital", ignore = true)
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "consultationFee", ignore = true)
    @Mapping(target = "qrCode", ignore = true)
    Appointment toEntity(AppointmentRequest request);

    @Mapping(target = "patientId", source = "patient.id")
    @Mapping(target = "patientName", source = "patient.user.fullName")
    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.fullName")
    @Mapping(target = "specializationName", source = "doctor.specialization.name")
    @Mapping(target = "hospitalId", source = "hospital.id")
    @Mapping(target = "hospitalName", source = "hospital.name")
    AppointmentResponse toResponse(Appointment appointment);

    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "hospital", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "consultationFee", ignore = true)
    @Mapping(target = "qrCode", ignore = true)
    void updateAppointmentFromDto(AppointmentRequest request, @MappingTarget Appointment appointment);
}
