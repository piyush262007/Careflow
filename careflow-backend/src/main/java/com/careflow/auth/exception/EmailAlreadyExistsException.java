package com.careflow.auth.exception;

import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;

public class EmailAlreadyExistsException extends CustomException {

    public EmailAlreadyExistsException(String email) {
        super(String.format("Email address '%s' is already registered in CareFlow", email), ErrorCode.EMAIL_ALREADY_EXISTS);
    }
}
