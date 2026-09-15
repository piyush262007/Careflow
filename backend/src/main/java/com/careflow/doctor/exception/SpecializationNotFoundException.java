package com.careflow.doctor.exception;

import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;

public class SpecializationNotFoundException extends CustomException {

    public SpecializationNotFoundException(Long id) {
        super("Specialization not found with ID: " + id, ErrorCode.RESOURCE_NOT_FOUND);
    }

    public SpecializationNotFoundException(String message) {
        super(message, ErrorCode.RESOURCE_NOT_FOUND);
    }
}
