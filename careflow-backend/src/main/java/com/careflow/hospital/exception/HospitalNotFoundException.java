package com.careflow.hospital.exception;

import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;

public class HospitalNotFoundException extends CustomException {

    public HospitalNotFoundException(Long id) {
        super("Hospital record not found with ID: " + id, ErrorCode.RESOURCE_NOT_FOUND);
    }

    public HospitalNotFoundException(String message) {
        super(message, ErrorCode.RESOURCE_NOT_FOUND);
    }
}
