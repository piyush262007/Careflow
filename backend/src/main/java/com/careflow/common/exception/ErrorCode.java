package com.careflow.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    RESOURCE_NOT_FOUND("CAREFLOW_404_01", "Requested resource was not found", HttpStatus.NOT_FOUND),
    EMAIL_ALREADY_EXISTS("CAREFLOW_409_01", "Email address is already registered", HttpStatus.CONFLICT),
    SLOT_ALREADY_BOOKED("CAREFLOW_409_02", "Appointment slot is no longer available", HttpStatus.CONFLICT),
    INVALID_CREDENTIALS("CAREFLOW_401_01", "Invalid email or password", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED("CAREFLOW_401_02", "Authentication token has expired", HttpStatus.UNAUTHORIZED),
    TOKEN_INVALID("CAREFLOW_401_03", "Authentication token is invalid or corrupted", HttpStatus.UNAUTHORIZED),
    ACCESS_DENIED("CAREFLOW_403_01", "Access denied. Insufficient privileges", HttpStatus.FORBIDDEN),
    BAD_REQUEST("CAREFLOW_400_01", "Invalid request parameters", HttpStatus.BAD_REQUEST),
    VALIDATION_FAILED("CAREFLOW_400_02", "Validation failed for request fields", HttpStatus.BAD_REQUEST),
    INTERNAL_SERVER_ERROR("CAREFLOW_500_01", "An unexpected internal server error occurred", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String defaultMessage;
    private final HttpStatus httpStatus;

    ErrorCode(String code, String defaultMessage, HttpStatus httpStatus) {
        this.code = code;
        this.defaultMessage = defaultMessage;
        this.httpStatus = httpStatus;
    }
}
