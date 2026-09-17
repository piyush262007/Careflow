package com.careflow.patient.exception;

import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;

public class PatientNotFoundException extends CustomException {

    public PatientNotFoundException(String message) {
        super(message, ErrorCode.RESOURCE_NOT_FOUND);
    }

    public PatientNotFoundException(Long patientId) {
        super("Patient record not found with ID: " + patientId, ErrorCode.RESOURCE_NOT_FOUND);
    }
}
