package com.careflow.hospital.service.impl;

import com.careflow.common.audit.AuditAction;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.hospital.dto.HospitalRequest;
import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.mapper.HospitalMapper;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.hospital.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;
    private final HospitalMapper hospitalMapper;

    @Override
    @Transactional
    @CacheEvict(value = "hospitalsCache", allEntries = true)
    @AuditAction(action = "CREATE_HOSPITAL", details = "Created a new partner hospital facility")
    public HospitalResponse createHospital(HospitalRequest request) {
        Hospital hospital = hospitalMapper.toEntity(request);
        Hospital saved = hospitalRepository.save(hospital);
        return hospitalMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "hospitalsCache", key = "#id")
    public HospitalResponse getHospitalById(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", id));
        return hospitalMapper.toResponse(hospital);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "hospitalsCache", key = "'all'")
    public List<HospitalResponse> getAllHospitals() {
        return hospitalRepository.findAll().stream()
                .map(hospitalMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<HospitalResponse> searchHospitals(String city, String name, Boolean emergencyAvailable, String specialization) {
        List<Hospital> hospitals = hospitalRepository.searchHospitals(city, name, emergencyAvailable, specialization);
        return hospitals.stream()
                .map(hospitalMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    @CacheEvict(value = "hospitalsCache", allEntries = true)
    @AuditAction(action = "UPDATE_HOSPITAL", details = "Updated hospital facility details")
    public HospitalResponse updateHospital(Long id, HospitalRequest request) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", id));

        hospitalMapper.updateHospitalFromDto(request, hospital);
        Hospital updated = hospitalRepository.save(hospital);
        return hospitalMapper.toResponse(updated);
    }

    @Override
    @Transactional
    @CacheEvict(value = "hospitalsCache", allEntries = true)
    @AuditAction(action = "DELETE_HOSPITAL", details = "Deleted hospital record")
    public void deleteHospital(Long id) {
        if (!hospitalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hospital", "id", id);
        }
        hospitalRepository.deleteById(id);
    }
}
