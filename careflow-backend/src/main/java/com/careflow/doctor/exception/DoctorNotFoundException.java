package com.careflow.doctor.exception;

import com.careflow.common.exception.CustomException;
import org.springframework.http.HttpStatus;

public class DoctorNotFoundException extends CustomException {

    public DoctorNotFoundException(Long id) {
        super("Doctor record not found with ID: " + id, HttpStatus.NOT_FOUND);
    }

    public DoctorNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
