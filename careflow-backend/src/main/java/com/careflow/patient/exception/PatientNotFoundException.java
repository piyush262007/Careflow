package com.careflow.patient.exception;

import com.careflow.common.exception.CustomException;
import org.springframework.http.HttpStatus;

public class PatientNotFoundException extends CustomException {

    public PatientNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

    public PatientNotFoundException(Long patientId) {
        super("Patient record not found with ID: " + patientId, HttpStatus.NOT_FOUND);
    }
}
