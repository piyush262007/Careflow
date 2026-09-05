package com.careflow.doctor.service;

import com.careflow.doctor.dto.DoctorRequest;
import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.doctor.dto.DoctorScheduleDto;
import com.careflow.doctor.dto.SpecializationDto;
import com.careflow.doctor.dto.TimeSlotDto;

import java.time.LocalDate;
import java.util.List;

public interface DoctorService {

    DoctorResponse createDoctor(DoctorRequest request);

    DoctorResponse getDoctorById(Long id);

    List<DoctorResponse> getAllDoctors();

    List<DoctorResponse> getDoctorsByHospital(Long hospitalId);

    List<DoctorResponse> searchDoctors(Long hospitalId, Long specializationId, Boolean availableToday, String name);

    DoctorResponse updateDoctor(Long id, DoctorRequest request);

    void deleteDoctor(Long id);

    SpecializationDto createSpecialization(SpecializationDto dto);

    List<SpecializationDto> getAllSpecializations();

    DoctorScheduleDto createOrUpdateDoctorSchedule(Long doctorId, DoctorScheduleDto dto);

    List<DoctorScheduleDto> getDoctorSchedules(Long doctorId);

    List<TimeSlotDto> getAvailableTimeSlots(Long doctorId, LocalDate date);
}
