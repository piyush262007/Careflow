package com.careflow.common.exception;

public class BadRequestException extends CustomException {

    public BadRequestException(String message) {
        super(message, ErrorCode.BAD_REQUEST);
    }
}
