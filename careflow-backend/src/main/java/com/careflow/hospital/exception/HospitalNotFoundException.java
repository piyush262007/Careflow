package com.careflow.hospital.exception;

import com.careflow.common.exception.CustomException;
import org.springframework.http.HttpStatus;

public class HospitalNotFoundException extends CustomException {

    public HospitalNotFoundException(Long id) {
        super("Hospital record not found with ID: " + id, HttpStatus.NOT_FOUND);
    }

    public HospitalNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
