package com.careflow.doctor.service.impl;

import com.careflow.common.exception.BadRequestException;
import com.careflow.doctor.dto.request.SpecializationRequest;
import com.careflow.doctor.dto.response.SpecializationResponse;
import com.careflow.doctor.entity.Specialization;
import com.careflow.doctor.exception.SpecializationNotFoundException;
import com.careflow.doctor.mapper.SpecializationMapper;
import com.careflow.doctor.repository.SpecializationRepository;
import com.careflow.doctor.service.SpecializationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpecializationServiceImpl implements SpecializationService {

    private final SpecializationRepository specializationRepository;
    private final SpecializationMapper specializationMapper;

    @Override
    @Transactional
    public SpecializationResponse createSpecialization(SpecializationRequest request) {
        String normalizedName = request.getName().trim();
        log.info("Creating specialization: {}", normalizedName);

        if (specializationRepository.existsByNameIgnoreCase(normalizedName)) {
            throw new BadRequestException("Specialization '" + normalizedName + "' already exists");
        }

        Specialization specialization = specializationMapper.toEntity(request);
        Specialization saved = specializationRepository.save(specialization);
        return specializationMapper.toSpecializationResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SpecializationResponse> getAllSpecializations() {
        log.info("Fetching all specializations");
        return specializationRepository.findAll().stream()
                .map(specializationMapper::toSpecializationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SpecializationResponse getSpecializationById(Long id) {
        log.info("Fetching specialization by ID: {}", id);
        Specialization specialization = specializationRepository.findById(id)
                .orElseThrow(() -> new SpecializationNotFoundException(id));
        return specializationMapper.toSpecializationResponse(specialization);
    }

    @Override
    @Transactional
    public void deleteSpecialization(Long id) {
        log.info("Deleting specialization with ID: {}", id);
        if (!specializationRepository.existsById(id)) {
            throw new SpecializationNotFoundException(id);
        }
        specializationRepository.deleteById(id);
    }
}
