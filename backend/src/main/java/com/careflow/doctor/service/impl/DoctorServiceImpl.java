package com.careflow.doctor.service.impl;

import com.careflow.common.audit.AuditAction;
import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.dto.DoctorRequest;
import com.careflow.doctor.dto.DoctorResponse;
import com.careflow.doctor.dto.DoctorScheduleDto;
import com.careflow.doctor.dto.SpecializationDto;
import com.careflow.doctor.dto.TimeSlotDto;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import com.careflow.doctor.entity.Specialization;
import com.careflow.doctor.mapper.DoctorMapper;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.doctor.repository.DoctorScheduleRepository;
import com.careflow.doctor.repository.SpecializationRepository;
import com.careflow.doctor.service.DoctorService;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final SpecializationRepository specializationRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final DoctorMapper doctorMapper;

    @Override
    @Transactional
    @CacheEvict(value = "doctorsCache", allEntries = true)
    @AuditAction(action = "CREATE_DOCTOR", details = "Added new doctor specialist to hospital")
    public DoctorResponse createDoctor(DoctorRequest request) {
        Hospital hospital = hospitalRepository.findById(request.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", request.getHospitalId()));

        Specialization specialization = specializationRepository.findById(request.getSpecializationId())
                .orElseThrow(() -> new ResourceNotFoundException("Specialization", "id", request.getSpecializationId()));

        Doctor doctor = doctorMapper.toEntity(request);
        doctor.setHospital(hospital);
        doctor.setSpecialization(specialization);

        Doctor saved = doctorRepository.save(doctor);
        return doctorMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "doctorsCache", key = "#id")
    public DoctorResponse getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return doctorMapper.toResponse(doctor);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "doctorsCache", key = "'all'")
    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(doctorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorResponse> getDoctorsByHospital(Long hospitalId) {
        if (!hospitalRepository.existsById(hospitalId)) {
            throw new ResourceNotFoundException("Hospital", "id", hospitalId);
        }
        return doctorRepository.findByHospitalId(hospitalId).stream()
                .map(doctorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorResponse> searchDoctors(Long hospitalId, Long specializationId, Boolean availableToday, String name) {
        String todayDayOfWeek = Boolean.TRUE.equals(availableToday) ? LocalDate.now().getDayOfWeek().name() : null;
        List<Doctor> doctors = doctorRepository.searchDoctors(hospitalId, specializationId, name, todayDayOfWeek);
        return doctors.stream()
                .map(doctorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    @CacheEvict(value = "doctorsCache", allEntries = true)
    @AuditAction(action = "UPDATE_DOCTOR", details = "Updated doctor specialist profile")
    public DoctorResponse updateDoctor(Long id, DoctorRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));

        if (!doctor.getHospital().getId().equals(request.getHospitalId())) {
            Hospital hospital = hospitalRepository.findById(request.getHospitalId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", request.getHospitalId()));
            doctor.setHospital(hospital);
        }

        if (!doctor.getSpecialization().getId().equals(request.getSpecializationId())) {
            Specialization specialization = specializationRepository.findById(request.getSpecializationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Specialization", "id", request.getSpecializationId()));
            doctor.setSpecialization(specialization);
        }

        doctorMapper.updateDoctorFromDto(request, doctor);
        Doctor updated = doctorRepository.save(doctor);
        return doctorMapper.toResponse(updated);
    }

    @Override
    @Transactional
    @CacheEvict(value = "doctorsCache", allEntries = true)
    @AuditAction(action = "DELETE_DOCTOR", details = "Deleted doctor specialist profile")
    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Doctor", "id", id);
        }
        doctorRepository.deleteById(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = "specializationsCache", allEntries = true)
    @AuditAction(action = "CREATE_SPECIALIZATION", details = "Created clinical specialization category")
    public SpecializationDto createSpecialization(SpecializationDto dto) {
        if (specializationRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new BadRequestException("Specialization name already exists: " + dto.getName());
        }
        Specialization entity = doctorMapper.toSpecializationEntity(dto);
        Specialization saved = specializationRepository.save(entity);
        return doctorMapper.toSpecializationDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "specializationsCache", key = "'all'")
    public List<SpecializationDto> getAllSpecializations() {
        return specializationRepository.findAll().stream()
                .map(doctorMapper::toSpecializationDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    @AuditAction(action = "UPDATE_DOCTOR_SCHEDULE", details = "Updated doctor operating schedule slots")
    public DoctorScheduleDto createOrUpdateDoctorSchedule(Long doctorId, DoctorScheduleDto dto) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", doctorId));

        List<DoctorSchedule> existing = scheduleRepository.findByDoctorIdAndDayOfWeek(doctorId, dto.getDayOfWeek());
        DoctorSchedule schedule;
        if (!existing.isEmpty()) {
            schedule = existing.get(0);
            schedule.setStartTime(dto.getStartTime());
            schedule.setEndTime(dto.getEndTime());
            if (dto.getSlotDurationMinutes() != null) schedule.setSlotDurationMinutes(dto.getSlotDurationMinutes());
            if (dto.getMaxAppointments() != null) schedule.setMaxAppointments(dto.getMaxAppointments());
        } else {
            schedule = doctorMapper.toScheduleEntity(dto);
            schedule.setDoctor(doctor);
        }

        DoctorSchedule saved = scheduleRepository.save(schedule);
        return doctorMapper.toScheduleDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorScheduleDto> getDoctorSchedules(Long doctorId) {
        return scheduleRepository.findByDoctorId(doctorId).stream()
                .map(doctorMapper::toScheduleDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TimeSlotDto> getAvailableTimeSlots(Long doctorId, LocalDate date) {
        String dayOfWeek = date.getDayOfWeek().name();
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndDayOfWeek(doctorId, dayOfWeek);

        List<TimeSlotDto> slots = new ArrayList<>();
        for (DoctorSchedule schedule : schedules) {
            int duration = schedule.getSlotDurationMinutes() != null ? schedule.getSlotDurationMinutes() : 15;
            LocalTime current = schedule.getStartTime();
            while (current.plusMinutes(duration).isBefore(schedule.getEndTime()) || current.plusMinutes(duration).equals(schedule.getEndTime())) {
                LocalTime next = current.plusMinutes(duration);
                boolean isPast = date.equals(LocalDate.now()) && current.isBefore(LocalTime.now());
                boolean isAvailable = !isPast && schedule.getCurrentAppointments() < schedule.getMaxAppointments();

                slots.add(TimeSlotDto.builder()
                        .startTime(current)
                        .endTime(next)
                        .available(isAvailable)
                        .build());

                current = next;
            }
        }
        return slots;
    }
}
