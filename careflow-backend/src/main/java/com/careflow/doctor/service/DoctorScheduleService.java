package com.careflow.doctor.service;

import com.careflow.doctor.dto.request.CreateScheduleRequest;
import com.careflow.doctor.dto.response.DoctorScheduleResponse;

import java.util.List;

public interface DoctorScheduleService {

    DoctorScheduleResponse createSchedule(CreateScheduleRequest request);

    List<DoctorScheduleResponse> getSchedulesByDoctor(Long doctorId);

    void deleteSchedule(Long scheduleId);
}
