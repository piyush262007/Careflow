package com.careflow.common.exception;

public class ConflictException extends CustomException {

    public ConflictException(String message) {
        super(message, ErrorCode.SLOT_ALREADY_BOOKED);
    }
}
