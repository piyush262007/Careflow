package com.careflow.doctor.exception;

import com.careflow.common.exception.CustomException;
import org.springframework.http.HttpStatus;

public class SpecializationNotFoundException extends CustomException {

    public SpecializationNotFoundException(Long id) {
        super("Specialization not found with ID: " + id, HttpStatus.NOT_FOUND);
    }

    public SpecializationNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
