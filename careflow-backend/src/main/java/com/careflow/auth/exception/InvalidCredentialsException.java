package com.careflow.auth.exception;

import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;

public class InvalidCredentialsException extends CustomException {

    public InvalidCredentialsException() {
        super("Invalid email or password provided", ErrorCode.INVALID_CREDENTIALS);
    }

    public InvalidCredentialsException(String message) {
        super(message, ErrorCode.INVALID_CREDENTIALS);
    }
}
