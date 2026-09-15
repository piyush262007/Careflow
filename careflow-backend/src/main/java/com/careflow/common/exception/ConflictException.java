package com.careflow.common.exception;

public class ConflictException extends CustomException {

    public ConflictException(String message) {
        super(ErrorCode.SLOT_ALREADY_BOOKED, message);
    }
}
