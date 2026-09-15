package com.careflow.doctor.service.impl;

import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.dto.request.CreateScheduleRequest;
import com.careflow.doctor.dto.response.DoctorScheduleResponse;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import com.careflow.doctor.exception.DoctorNotFoundException;
import com.careflow.doctor.mapper.DoctorScheduleMapper;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.doctor.repository.DoctorScheduleRepository;
import com.careflow.doctor.service.DoctorScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DoctorScheduleServiceImpl implements DoctorScheduleService {

    private final DoctorScheduleRepository doctorScheduleRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorScheduleMapper scheduleMapper;

    @Override
    @Transactional
    public DoctorScheduleResponse createSchedule(CreateScheduleRequest request) {
        log.info("Creating schedule for doctor ID: {}", request.getDoctorId());
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new DoctorNotFoundException(request.getDoctorId()));

        DoctorSchedule schedule = scheduleMapper.toEntity(request, doctor);
        DoctorSchedule saved = doctorScheduleRepository.save(schedule);
        return scheduleMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorScheduleResponse> getSchedulesByDoctor(Long doctorId) {
        log.info("Fetching schedules for doctor ID: {}", doctorId);
        return doctorScheduleRepository.findByDoctorId(doctorId).stream()
                .map(scheduleMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteSchedule(Long scheduleId) {
        log.info("Deleting schedule ID: {}", scheduleId);
        if (!doctorScheduleRepository.existsById(scheduleId)) {
            throw new ResourceNotFoundException("Schedule not found with ID: " + scheduleId);
        }
        doctorScheduleRepository.deleteById(scheduleId);
    }
}
