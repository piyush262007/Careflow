package com.careflow.prescription.service;

import com.careflow.prescription.dto.request.CreatePrescriptionRequest;
import com.careflow.prescription.dto.response.PrescriptionResponse;

import java.util.List;

public interface PrescriptionService {

    PrescriptionResponse createOrUpdatePrescription(String doctorEmail, CreatePrescriptionRequest request);

    PrescriptionResponse getPrescriptionByAppointmentId(Long appointmentId, String principalEmail);

    List<PrescriptionResponse> getPatientPrescriptions(String patientEmail);

    List<PrescriptionResponse> getDoctorPrescriptions(String doctorEmail);

    PrescriptionResponse getPrescriptionByIdSecure(Long id, String principalEmail);
}
