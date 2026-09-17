package com.careflow.prescription.service.impl;

import com.careflow.appointment.entity.Appointment;
import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.audit.AuditService;
import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.ForbiddenException;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.notification.entity.NotificationType;
import com.careflow.notification.service.NotificationService;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.repository.PatientRepository;
import com.careflow.prescription.dto.request.CreatePrescriptionItemRequest;
import com.careflow.prescription.dto.request.CreatePrescriptionRequest;
import com.careflow.prescription.dto.response.PrescriptionItemResponse;
import com.careflow.prescription.dto.response.PrescriptionResponse;
import com.careflow.prescription.entity.Prescription;
import com.careflow.prescription.entity.PrescriptionItem;
import com.careflow.prescription.repository.PrescriptionRepository;
import com.careflow.prescription.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditService auditService;

    @Override
    @Transactional
    public PrescriptionResponse createOrUpdatePrescription(String doctorEmail, CreatePrescriptionRequest request) {
        User doctorUser = userRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", doctorEmail));

        Doctor doctor = doctorRepository.findByUserId(doctorUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile", "email", doctorEmail));

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", request.getAppointmentId()));

        // Security authorization check: Doctor can only create prescription for their assigned appointment
        if (appointment.getDoctor() == null || !appointment.getDoctor().getId().equals(doctor.getId())) {
            throw new ForbiddenException("Unauthorized: You are not the assigned doctor for this appointment.");
        }

        Prescription prescription = prescriptionRepository.findByAppointmentId(appointment.getId())
                .orElse(Prescription.builder()
                        .appointment(appointment)
                        .patient(appointment.getPatient())
                        .doctor(doctor)
                        .items(new ArrayList<>())
                        .build());

        prescription.setSymptoms(request.getSymptoms());
        prescription.setDiagnosis(request.getDiagnosis());
        prescription.setNotes(request.getNotes());
        prescription.setRecommendations(request.getRecommendations());
        prescription.setFollowUpInstructions(request.getFollowUpInstructions());

        // Update items list safely
        prescription.getItems().clear();
        for (CreatePrescriptionItemRequest itemReq : request.getItems()) {
            PrescriptionItem item = PrescriptionItem.builder()
                    .prescription(prescription)
                    .medicineName(itemReq.getMedicineName())
                    .dosage(itemReq.getDosage())
                    .frequency(itemReq.getFrequency())
                    .timing(itemReq.getTiming() != null ? itemReq.getTiming() : "As directed")
                    .durationDays(itemReq.getDurationDays())
                    .instructions(itemReq.getInstructions())
                    .build();
            prescription.addItem(item);
        }

        Prescription saved = prescriptionRepository.save(prescription);

        // Update appointment status to COMPLETED upon saving prescription & notes
        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);

        // Send completion & prescription ready notification to patient
        if (appointment.getPatient() != null && appointment.getPatient().getUser() != null) {
            notificationService.createNotification(
                    appointment.getPatient().getUser(),
                    "Prescription Ready & Consultation Completed 💊",
                    String.format("Dr. %s has completed your consultation and issued your digital prescription.", doctor.getFullName()),
                    NotificationType.GENERAL
            );
        }

        auditService.logAudit(doctorEmail, "PRESCRIPTION_CREATED", "LOCAL", "Created prescription for appointment #" + appointment.getId());
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PrescriptionResponse getPrescriptionByAppointmentId(Long appointmentId, String principalEmail) {
        Prescription prescription = prescriptionRepository.findByAppointmentId(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription", "appointmentId", appointmentId));

        verifyPrescriptionAccess(prescription, principalEmail);
        return mapToResponse(prescription);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PrescriptionResponse> getPatientPrescriptions(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile", "email", patientEmail));

        return prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PrescriptionResponse> getDoctorPrescriptions(String doctorEmail) {
        User doctorUser = userRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", doctorEmail));

        Doctor doctor = doctorRepository.findByUserId(doctorUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile", "email", doctorEmail));

        return prescriptionRepository.findByDoctorIdOrderByCreatedAtDesc(doctor.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PrescriptionResponse getPrescriptionByIdSecure(Long id, String principalEmail) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription", "id", id));

        verifyPrescriptionAccess(prescription, principalEmail);
        return mapToResponse(prescription);
    }

    private void verifyPrescriptionAccess(Prescription prescription, String principalEmail) {
        User requestingUser = userRepository.findByEmail(principalEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", principalEmail));

        boolean isAdmin = "ADMIN".equalsIgnoreCase(requestingUser.getRole().name());
        boolean isPatientOwner = prescription.getPatient() != null &&
                prescription.getPatient().getUser() != null &&
                prescription.getPatient().getUser().getEmail().equalsIgnoreCase(principalEmail);
        boolean isDoctorOwner = prescription.getDoctor() != null &&
                prescription.getDoctor().getUser() != null &&
                prescription.getDoctor().getUser().getEmail().equalsIgnoreCase(principalEmail);

        if (!isAdmin && !isPatientOwner && !isDoctorOwner) {
            throw new ForbiddenException("You do not have permission to access this prescription.");
        }
    }

    private PrescriptionResponse mapToResponse(Prescription p) {
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
                .patientEmail(p.getPatient() != null && p.getPatient().getUser() != null ? p.getPatient().getUser().getEmail() : null)
                .patientPhone(p.getPatient() != null ? p.getPatient().getPhone() : null)
                .patientGender(p.getPatient() != null ? p.getPatient().getGender() : null)
                .patientDateOfBirth(p.getPatient() != null ? p.getPatient().getDateOfBirth() : null)
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
