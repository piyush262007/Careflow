package com.careflow.common.exception;

public class ForbiddenException extends CustomException {
    public ForbiddenException(String message) {
        super(message, ErrorCode.ACCESS_DENIED);
    }
}
