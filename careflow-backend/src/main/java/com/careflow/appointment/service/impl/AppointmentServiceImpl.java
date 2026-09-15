package com.careflow.appointment.service.impl;

import com.careflow.appointment.dto.AppointmentRequest;
import com.careflow.appointment.dto.AppointmentResponse;
import com.careflow.appointment.dto.SuggestTimeRequest;
import com.careflow.appointment.entity.Appointment;
import com.careflow.appointment.entity.AppointmentStatus;
import com.careflow.appointment.mapper.AppointmentMapper;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.appointment.service.AppointmentService;
import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.audit.AuditService;
import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.doctor.entity.Doctor;
import com.careflow.doctor.entity.DoctorSchedule;
import com.careflow.doctor.repository.DoctorRepository;
import com.careflow.doctor.repository.DoctorScheduleRepository;
import com.careflow.hospital.entity.Hospital;
import com.careflow.hospital.repository.HospitalRepository;
import com.careflow.notification.entity.NotificationType;
import com.careflow.notification.service.NotificationService;
import com.careflow.patient.entity.Patient;
import com.careflow.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final UserRepository userRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final NotificationService notificationService;
    private final AppointmentMapper appointmentMapper;
    private final AuditService auditService;

    @Override
    @Transactional
    public AppointmentResponse createAppointment(String patientEmail, AppointmentRequest request) {
        User user = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", patientEmail));

        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseGet(() -> patientRepository.save(Patient.builder().user(user).build()));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", request.getDoctorId()));

        if (!"ACTIVE".equalsIgnoreCase(doctor.getStatus())) {
            throw new BadRequestException("Doctor " + doctor.getFullName() + " is not currently active for appointments");
        }

        Hospital hospital = hospitalRepository.findById(request.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", request.getHospitalId()));

        if (hospital.getIsActive() != null && !hospital.getIsActive()) {
            throw new BadRequestException("Hospital " + hospital.getName() + " is not currently active for appointments");
        }

        if (!doctor.getHospital().getId().equals(hospital.getId())) {
            throw new BadRequestException("Doctor " + doctor.getFullName() + " does not belong to hospital " + hospital.getName());
        }

        LocalDateTime scheduledDateTime = LocalDateTime.of(request.getAppointmentDate(), request.getAppointmentTime());
        if (scheduledDateTime.isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Cannot schedule appointments in the past");
        }

        String dayOfWeek = request.getAppointmentDate().getDayOfWeek().name();
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndDayOfWeek(doctor.getId(), dayOfWeek);
        if (schedules.isEmpty()) {
            throw new BadRequestException(String.format("Doctor %s does not have an active schedule on %s", doctor.getFullName(), dayOfWeek));
        }

        DoctorSchedule matchingSchedule = schedules.stream()
                .filter(s -> !request.getAppointmentTime().isBefore(s.getStartTime()) && !request.getAppointmentTime().isAfter(s.getEndTime()))
                .findFirst()
                .orElseThrow(() -> new BadRequestException(String.format("Requested appointment time %s is outside Doctor's operating hours", request.getAppointmentTime())));

        if (matchingSchedule.getCurrentAppointments() >= matchingSchedule.getMaxAppointments()) {
            throw new BadRequestException(String.format("Doctor %s has reached maximum appointment capacity for %s", doctor.getFullName(), dayOfWeek));
        }

        // Pessimistic lock check to prevent concurrent double-booking
        if (appointmentRepository.findExistingSlotForUpdate(doctor.getId(), request.getAppointmentDate(), request.getAppointmentTime()).isPresent()) {
            throw new com.careflow.common.exception.ConflictException(String.format("That appointment slot at %s on %s is no longer available. Please choose another time.", request.getAppointmentTime(), request.getAppointmentDate()));
        }

        matchingSchedule.setCurrentAppointments(matchingSchedule.getCurrentAppointments() + 1);
        scheduleRepository.save(matchingSchedule);

        Appointment appointment = appointmentMapper.toEntity(request);
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setHospital(hospital);
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setConsultationFee(doctor.getConsultationFee());
        appointment.setQrCode("CF-QR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        Appointment saved = appointmentRepository.save(appointment);

        // Send notification to patient
        notificationService.createNotification(
                user,
                "Appointment Requested",
                String.format("Your appointment with %s at %s on %s is pending confirmation.", doctor.getFullName(), hospital.getName(), request.getAppointmentDate()),
                NotificationType.APPOINTMENT_BOOKED
        );

        // Send notification to doctor
        if (doctor.getUser() != null) {
            notificationService.createNotification(
                    doctor.getUser(),
                    "New Appointment Request",
                    String.format("New pending appointment request from %s for %s at %s.", patient.getUser().getFullName(), request.getAppointmentDate(), request.getAppointmentTime()),
                    NotificationType.APPOINTMENT_BOOKED
            );
        }

        return appointmentMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        return appointmentMapper.toResponse(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(appointmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsForPatient(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile", "email", patientEmail));

        return appointmentRepository.findByPatientIdOrderByAppointmentDateDescAppointmentTimeDesc(patient.getId()).stream()
                .map(appointmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsForDoctor(Long doctorId) {
        if (!doctorRepository.existsById(doctorId)) {
            throw new ResourceNotFoundException("Doctor", "id", doctorId);
        }
        return appointmentRepository.findByDoctorIdOrderByAppointmentDateDescAppointmentTimeDesc(doctorId).stream()
                .map(appointmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsForDoctorUser(String doctorEmail) {
        User user = userRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", doctorEmail));
        Doctor doctor = doctorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile", "email", doctorEmail));

        return appointmentRepository.findByDoctorIdOrderByAppointmentDateDescAppointmentTimeDesc(doctor.getId()).stream()
                .map(appointmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AppointmentResponse updateAppointment(Long id, AppointmentRequest request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        appointmentMapper.updateAppointmentFromDto(request, appointment);
        Appointment updated = appointmentRepository.save(appointment);
        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse updateAppointmentStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        appointment.setStatus(status);
        Appointment updated = appointmentRepository.save(appointment);

        NotificationType notifType = (status == AppointmentStatus.CONFIRMED) ? NotificationType.APPOINTMENT_CONFIRMED :
                (status == AppointmentStatus.CANCELLED) ? NotificationType.APPOINTMENT_CANCELLED : NotificationType.GENERAL;

        notificationService.createNotification(
                appointment.getPatient().getUser(),
                "Appointment Status Updated: " + status,
                String.format("Your appointment with %s on %s status changed to %s.", appointment.getDoctor().getFullName(), appointment.getAppointmentDate(), status),
                notifType
        );

        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse confirmAppointmentByDoctor(Long id, String doctorEmail) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (!appointment.getDoctor().getUser().getEmail().equalsIgnoreCase(doctorEmail)) {
            throw new BadRequestException("Unauthorized: You are not the doctor assigned to this appointment");
        }

        appointment.setStatus(AppointmentStatus.CONFIRMED);
        Appointment updated = appointmentRepository.save(appointment);

        notificationService.createNotification(
                appointment.getPatient().getUser(),
                "Appointment Confirmed! 🎉",
                String.format("Dr. %s has confirmed your appointment for %s at %s.", appointment.getDoctor().getFullName(), appointment.getAppointmentDate(), appointment.getAppointmentTime()),
                NotificationType.APPOINTMENT_CONFIRMED
        );

        auditService.logAudit(doctorEmail, "APPOINTMENT_CONFIRMED", "LOCAL", "Confirmed appointment #" + id);
        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse rejectAppointmentByDoctor(Long id, String doctorEmail, String reason) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (!appointment.getDoctor().getUser().getEmail().equalsIgnoreCase(doctorEmail)) {
            throw new BadRequestException("Unauthorized: You are not the doctor assigned to this appointment");
        }

        appointment.setStatus(AppointmentStatus.REJECTED);
        if (reason != null && !reason.isBlank()) {
            appointment.setNotes((appointment.getNotes() != null ? appointment.getNotes() + " | " : "") + "Rejection Reason: " + reason);
        }
        Appointment updated = appointmentRepository.save(appointment);

        notificationService.createNotification(
                appointment.getPatient().getUser(),
                "Appointment Request Update",
                String.format("Dr. %s was unable to confirm your appointment request for %s. Reason: %s", appointment.getDoctor().getFullName(), appointment.getAppointmentDate(), reason != null ? reason : "Doctor unavailable"),
                NotificationType.APPOINTMENT_CANCELLED
        );

        auditService.logAudit(doctorEmail, "APPOINTMENT_REJECTED", "LOCAL", "Rejected appointment #" + id + " Reason: " + reason);
        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse suggestTimeByDoctor(Long id, String doctorEmail, SuggestTimeRequest request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (!appointment.getDoctor().getUser().getEmail().equalsIgnoreCase(doctorEmail)) {
            throw new BadRequestException("Unauthorized: You are not the doctor assigned to this appointment");
        }

        appointment.setStatus(AppointmentStatus.TIME_CHANGE_REQUESTED);
        appointment.setAppointmentDate(request.getDate());
        appointment.setAppointmentTime(request.getTime());
        if (request.getReason() != null) {
            appointment.setNotes((appointment.getNotes() != null ? appointment.getNotes() + " | " : "") + "Doctor Proposed Time: " + request.getReason());
        }

        Appointment updated = appointmentRepository.save(appointment);

        notificationService.createNotification(
                appointment.getPatient().getUser(),
                "New Appointment Time Proposed",
                String.format("Dr. %s has proposed a new appointment time: %s at %s. Please review and respond in your portal.", appointment.getDoctor().getFullName(), request.getDate(), request.getTime()),
                NotificationType.APPOINTMENT_REMINDER
        );

        auditService.logAudit(doctorEmail, "APPOINTMENT_TIME_SUGGESTED", "LOCAL", "Suggested new time for appointment #" + id);
        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse acceptSuggestedTimeByPatient(Long id, String patientEmail) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (!appointment.getPatient().getUser().getEmail().equalsIgnoreCase(patientEmail)) {
            throw new BadRequestException("Unauthorized: You are not the patient for this appointment");
        }

        appointment.setStatus(AppointmentStatus.CONFIRMED);
        Appointment updated = appointmentRepository.save(appointment);

        if (appointment.getDoctor().getUser() != null) {
            notificationService.createNotification(
                    appointment.getDoctor().getUser(),
                    "Proposed Time Accepted",
                    String.format("Patient %s accepted your proposed appointment time for %s at %s.", appointment.getPatient().getUser().getFullName(), appointment.getAppointmentDate(), appointment.getAppointmentTime()),
                    NotificationType.APPOINTMENT_CONFIRMED
            );
        }

        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse rejectSuggestedTimeByPatient(Long id, String patientEmail) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (!appointment.getPatient().getUser().getEmail().equalsIgnoreCase(patientEmail)) {
            throw new BadRequestException("Unauthorized: You are not the patient for this appointment");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        Appointment updated = appointmentRepository.save(appointment);

        if (appointment.getDoctor().getUser() != null) {
            notificationService.createNotification(
                    appointment.getDoctor().getUser(),
                    "Proposed Time Declined",
                    String.format("Patient %s declined the proposed time for appointment #%d.", appointment.getPatient().getUser().getFullName(), appointment.getId()),
                    NotificationType.APPOINTMENT_CANCELLED
            );
        }

        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public AppointmentResponse completeAppointmentByDoctor(Long id, String doctorEmail) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (!appointment.getDoctor().getUser().getEmail().equalsIgnoreCase(doctorEmail)) {
            throw new BadRequestException("Unauthorized: You are not the doctor assigned to this appointment");
        }

        appointment.setStatus(AppointmentStatus.COMPLETED);
        Appointment updated = appointmentRepository.save(appointment);

        notificationService.createNotification(
                appointment.getPatient().getUser(),
                "Consultation Completed",
                String.format("Your consultation with Dr. %s on %s has been completed.", appointment.getDoctor().getFullName(), appointment.getAppointmentDate()),
                NotificationType.GENERAL
        );

        auditService.logAudit(doctorEmail, "APPOINTMENT_COMPLETED", "LOCAL", "Completed appointment #" + id);
        return appointmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Appointment", "id", id);
        }
        appointmentRepository.deleteById(id);
    }
}
