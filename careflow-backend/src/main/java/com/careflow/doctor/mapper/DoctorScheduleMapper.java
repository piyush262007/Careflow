package com.careflow.doctor.mapper;

import com.careflow.doctor.dto.request.CreateScheduleRequest;
import com.careflow.doctor.dto.response.DoctorScheduleResponse;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import org.springframework.stereotype.Component;

@Component
public class DoctorScheduleMapper {

    public DoctorSchedule toEntity(CreateScheduleRequest request, Doctor doctor) {
        if (request == null) {
            return null;
        }

        return DoctorSchedule.builder()
                .doctor(doctor)
                .dayOfWeek(request.getDayOfWeek())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .slotDurationMinutes(request.getSlotDurationMinutes() != null ? request.getSlotDurationMinutes() : 30)
                .maxAppointments(request.getMaxAppointments() != null ? request.getMaxAppointments() : 20)
                .currentAppointments(0)
                .available(true)
                .build();
    }

    public DoctorScheduleResponse toResponse(DoctorSchedule schedule) {
        if (schedule == null) {
            return null;
        }

        return DoctorScheduleResponse.builder()
                .id(schedule.getId())
                .doctorId(schedule.getDoctor() != null ? schedule.getDoctor().getId() : null)
                .doctorName(schedule.getDoctor() != null ? schedule.getDoctor().getFullName() : null)
                .dayOfWeek(schedule.getDayOfWeek())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .slotDurationMinutes(schedule.getSlotDurationMinutes())
                .maxAppointments(schedule.getMaxAppointments())
                .currentAppointments(schedule.getCurrentAppointments())
                .available(schedule.isAvailable())
                .build();
    }
}
