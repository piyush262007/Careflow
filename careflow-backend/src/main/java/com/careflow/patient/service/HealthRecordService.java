package com.careflow.patient.service;

import com.careflow.patient.dto.HealthRecordResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HealthRecordService {

    List<HealthRecordResponse> getPatientHealthRecords(String patientEmail);

    HealthRecordResponse getHealthRecordByIdSecure(Long id, String principalEmail);

    List<HealthRecordResponse> getDoctorPatientHealthRecords(Long patientId, String doctorEmail);

    HealthRecordResponse uploadHealthRecord(String principalEmail, MultipartFile file, String title, String description, String recordType, Long appointmentId);
}
