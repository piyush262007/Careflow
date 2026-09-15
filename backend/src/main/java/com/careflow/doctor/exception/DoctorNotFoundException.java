package com.careflow.doctor.exception;

import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;

public class DoctorNotFoundException extends CustomException {

    public DoctorNotFoundException(Long id) {
        super("Doctor record not found with ID: " + id, ErrorCode.RESOURCE_NOT_FOUND);
    }

    public DoctorNotFoundException(String message) {
        super(message, ErrorCode.RESOURCE_NOT_FOUND);
    }
}
