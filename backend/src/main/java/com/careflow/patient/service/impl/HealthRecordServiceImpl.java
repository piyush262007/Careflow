package com.careflow.patient.service.impl;

import com.careflow.appointment.entity.Appointment;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.audit.AuditService;
import com.careflow.common.exception.ForbiddenException;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.patient.dto.HealthRecordResponse;
import com.careflow.patient.entity.HealthRecord;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.repository.HealthRecordRepository;
import com.careflow.patient.repository.PatientRepository;
import com.careflow.patient.service.HealthRecordService;
import com.careflow.prescription.dto.response.PrescriptionItemResponse;
import com.careflow.prescription.dto.response.PrescriptionResponse;
import com.careflow.prescription.entity.Prescription;
import com.careflow.prescription.repository.PrescriptionRepository;
import com.careflow.storage.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HealthRecordServiceImpl implements HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final StorageService storageService;
    private final AuditService auditService;

    @Override
    @Transactional(readOnly = true)
    public List<HealthRecordResponse> getPatientHealthRecords(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile", "email", patientEmail));

        List<HealthRecordResponse> records = new ArrayList<>();

        // 1. Fetch uploaded HealthRecord documents
        List<HealthRecord> uploadedRecords = healthRecordRepository.findByPatientIdOrderByUploadedAtDesc(patient.getId());
        for (HealthRecord hr : uploadedRecords) {
            records.add(mapToResponse(hr));
        }

        // 2. Synthesize completed consultations and prescriptions as Health Records if not already created
        List<Prescription> prescriptions = prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId());
        for (Prescription rx : prescriptions) {
            boolean alreadyMapped = uploadedRecords.stream()
                    .anyMatch(hr -> hr.getAppointment() != null && hr.getAppointment().getId().equals(rx.getAppointment().getId()));

            if (!alreadyMapped) {
                records.add(mapPrescriptionToHealthRecordResponse(rx));
            }
        }

        return records;
    }

    @Override
    @Transactional(readOnly = true)
    public HealthRecordResponse getHealthRecordByIdSecure(Long id, String principalEmail) {
        User requestingUser = userRepository.findByEmail(principalEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", principalEmail));

        Optional<HealthRecord> hrOpt = healthRecordRepository.findById(id);
        if (hrOpt.isPresent()) {
            HealthRecord hr = hrOpt.get();
            verifyHealthRecordAccess(hr, requestingUser);
            return mapToResponse(hr);
        }

        // Check if ID refers to a Prescription consultation record
        Optional<Prescription> rxOpt = prescriptionRepository.findById(id);
        if (rxOpt.isPresent()) {
            Prescription rx = rxOpt.get();
            verifyPrescriptionAccess(rx, requestingUser);
            return mapPrescriptionToHealthRecordResponse(rx);
        }

        throw new ResourceNotFoundException("Health Record", "id", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HealthRecordResponse> getDoctorPatientHealthRecords(Long patientId, String doctorEmail) {
        User doctorUser = userRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", doctorEmail));

        Doctor doctor = doctorRepository.findByUserId(doctorUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile", "email", doctorEmail));

        if (!patientRepository.existsById(patientId)) {
            throw new ResourceNotFoundException("Patient", "id", patientId);
        }

        List<HealthRecordResponse> records = new ArrayList<>();

        // Fetch uploaded records
        List<HealthRecord> uploadedRecords = healthRecordRepository.findByPatientIdOrderByUploadedAtDesc(patientId);
        for (HealthRecord hr : uploadedRecords) {
            records.add(mapToResponse(hr));
        }

        // Fetch prescriptions for this patient
        List<Prescription> prescriptions = prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
        for (Prescription rx : prescriptions) {
            boolean alreadyMapped = uploadedRecords.stream()
                    .anyMatch(hr -> hr.getAppointment() != null && hr.getAppointment().getId().equals(rx.getAppointment().getId()));

            if (!alreadyMapped) {
                records.add(mapPrescriptionToHealthRecordResponse(rx));
            }
        }

        return records;
    }

    @Override
    @Transactional
    public HealthRecordResponse uploadHealthRecord(String principalEmail, MultipartFile file, String title, String description, String recordType, Long appointmentId) {
        User user = userRepository.findByEmail(principalEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", principalEmail));

        Patient patient = patientRepository.findByUserEmail(principalEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile", "email", principalEmail));

        String fileUrl = storageService.storeFile(file, "records");

        Appointment appointment = null;
        Doctor doctor = null;
        if (appointmentId != null) {
            appointment = appointmentRepository.findById(appointmentId).orElse(null);
            if (appointment != null) {
                doctor = appointment.getDoctor();
            }
        }

        HealthRecord record = HealthRecord.builder()
                .patient(patient)
                .doctor(doctor)
                .appointment(appointment)
                .title(title)
                .description(description)
                .recordType(recordType != null ? recordType : "MEDICAL_REPORT")
                .fileName(file.getOriginalFilename())
                .fileUrl(fileUrl)
                .fileType(file.getContentType())
                .fileSize(file.getSize())
                .uploadedAt(LocalDateTime.now())
                .build();

        HealthRecord saved = healthRecordRepository.save(record);
        auditService.logAudit(principalEmail, "HEALTH_RECORD_UPLOADED", "LOCAL", "Uploaded medical record: " + title);
        return mapToResponse(saved);
    }

    private void verifyHealthRecordAccess(HealthRecord hr, User user) {
        boolean isAdmin = "ADMIN".equalsIgnoreCase(user.getRole().name());
        boolean isPatientOwner = hr.getPatient() != null &&
                hr.getPatient().getUser() != null &&
                hr.getPatient().getUser().getEmail().equalsIgnoreCase(user.getEmail());
        boolean isDoctorOwner = hr.getDoctor() != null &&
                hr.getDoctor().getUser() != null &&
                hr.getDoctor().getUser().getEmail().equalsIgnoreCase(user.getEmail());

        if (!isAdmin && !isPatientOwner && !isDoctorOwner) {
            throw new ForbiddenException("You do not have permission to access this health record.");
        }
    }

    private void verifyPrescriptionAccess(Prescription rx, User user) {
        boolean isAdmin = "ADMIN".equalsIgnoreCase(user.getRole().name());
        boolean isPatientOwner = rx.getPatient() != null &&
                rx.getPatient().getUser() != null &&
                rx.getPatient().getUser().getEmail().equalsIgnoreCase(user.getEmail());
        boolean isDoctorOwner = rx.getDoctor() != null &&
                rx.getDoctor().getUser() != null &&
                rx.getDoctor().getUser().getEmail().equalsIgnoreCase(user.getEmail());

        if (!isAdmin && !isPatientOwner && !isDoctorOwner) {
            throw new ForbiddenException("You do not have permission to access this health record.");
        }
    }

    private HealthRecordResponse mapToResponse(HealthRecord hr) {
        PrescriptionResponse prescriptionResp = null;
        if (hr.getAppointment() != null) {
            Optional<Prescription> rxOpt = prescriptionRepository.findByAppointmentId(hr.getAppointment().getId());
            if (rxOpt.isPresent()) {
                prescriptionResp = mapPrescriptionToDto(rxOpt.get());
            }
        }

        return HealthRecordResponse.builder()
                .id(hr.getId())
                .patientId(hr.getPatient() != null ? hr.getPatient().getId() : null)
                .patientName(hr.getPatient() != null && hr.getPatient().getUser() != null ? hr.getPatient().getUser().getFullName() : "Patient")
                .doctorId(hr.getDoctor() != null ? hr.getDoctor().getId() : null)
                .doctorName(hr.getDoctor() != null ? hr.getDoctor().getFullName() : null)
                .doctorSpecialization(hr.getDoctor() != null && hr.getDoctor().getSpecialization() != null ? hr.getDoctor().getSpecialization().getName() : null)
                .hospitalName(hr.getAppointment() != null && hr.getAppointment().getHospital() != null ? hr.getAppointment().getHospital().getName() : null)
                .appointmentId(hr.getAppointment() != null ? hr.getAppointment().getId() : null)
                .appointmentDate(hr.getAppointment() != null ? hr.getAppointment().getAppointmentDate() : null)
                .appointmentTime(hr.getAppointment() != null ? hr.getAppointment().getAppointmentTime() : null)
                .recordType(hr.getRecordType() != null ? hr.getRecordType() : "MEDICAL_RECORD")
                .title(hr.getTitle())
                .description(hr.getDescription())
                .fileName(hr.getFileName())
                .fileUrl(hr.getFileUrl())
                .fileType(hr.getFileType())
                .fileSize(hr.getFileSize())
                .uploadedAt(hr.getUploadedAt())
                .prescription(prescriptionResp)
                .build();
    }

    private HealthRecordResponse mapPrescriptionToHealthRecordResponse(Prescription rx) {
        return HealthRecordResponse.builder()
                .id(rx.getId())
                .patientId(rx.getPatient() != null ? rx.getPatient().getId() : null)
                .patientName(rx.getPatient() != null && rx.getPatient().getUser() != null ? rx.getPatient().getUser().getFullName() : "Patient")
                .doctorId(rx.getDoctor() != null ? rx.getDoctor().getId() : null)
                .doctorName(rx.getDoctor() != null ? rx.getDoctor().getFullName() : "Doctor")
                .doctorSpecialization(rx.getDoctor() != null && rx.getDoctor().getSpecialization() != null ? rx.getDoctor().getSpecialization().getName() : "General Medicine")
                .hospitalName(rx.getAppointment() != null && rx.getAppointment().getHospital() != null ? rx.getAppointment().getHospital().getName() : "CareFlow Hospital")
                .appointmentId(rx.getAppointment() != null ? rx.getAppointment().getId() : null)
                .appointmentDate(rx.getAppointment() != null ? rx.getAppointment().getAppointmentDate() : null)
                .appointmentTime(rx.getAppointment() != null ? rx.getAppointment().getAppointmentTime() : null)
                .recordType("CONSULTATION_PRESCRIPTION")
                .title("Clinical Consultation & Digital Prescription")
                .description("Diagnosis: " + rx.getDiagnosis() + (rx.getNotes() != null ? " | Notes: " + rx.getNotes() : ""))
                .uploadedAt(rx.getCreatedAt())
                .prescription(mapPrescriptionToDto(rx))
                .build();
    }

    private PrescriptionResponse mapPrescriptionToDto(Prescription p) {
        List<PrescriptionItemResponse> itemResponses = p.getItems() != null ?
                p.getItems().stream().map(i -> PrescriptionItemResponse.builder()
                        .id(i.getId())
                        .medicineName(i.getMedicineName())
                        .dosage(i.getDosage())
                        .frequency(i.getFrequency())
                        .timing(i.getTiming())
                        .durationDays(i.getDurationDays())
                        .instructions(i.getInstructions())
                        .build()).collect(Collectors.toList()) : new ArrayList<>();

        return PrescriptionResponse.builder()
                .id(p.getId())
                .appointmentId(p.getAppointment() != null ? p.getAppointment().getId() : null)
                .appointmentDate(p.getAppointment() != null ? p.getAppointment().getAppointmentDate() : null)
                .appointmentTime(p.getAppointment() != null ? p.getAppointment().getAppointmentTime() : null)
                .patientId(p.getPatient() != null ? p.getPatient().getId() : null)
                .patientName(p.getPatient() != null && p.getPatient().getUser() != null ? p.getPatient().getUser().getFullName() : "Patient")
                .doctorId(p.getDoctor() != null ? p.getDoctor().getId() : null)
                .doctorName(p.getDoctor() != null ? p.getDoctor().getFullName() : "Doctor")
                .doctorSpecialization(p.getDoctor() != null && p.getDoctor().getSpecialization() != null ? p.getDoctor().getSpecialization().getName() : "General Medicine")
                .hospitalName(p.getAppointment() != null && p.getAppointment().getHospital() != null ? p.getAppointment().getHospital().getName() : "CareFlow Hospital")
                .symptoms(p.getSymptoms())
                .diagnosis(p.getDiagnosis())
                .notes(p.getNotes())
                .recommendations(p.getRecommendations())
                .followUpInstructions(p.getFollowUpInstructions())
                .createdAt(p.getCreatedAt())
                .items(itemResponses)
                .build();
    }
}
