package com.careflow.common.constants;

import lombok.Getter;

@Getter
public enum ErrorCode {
    RESOURCE_NOT_FOUND("ERR_NOT_FOUND", "Requested resource was not found"),
    BAD_REQUEST("ERR_BAD_REQUEST", "Invalid input parameters"),
    UNAUTHORIZED("ERR_UNAUTHORIZED", "Authentication is required to access this resource"),
    FORBIDDEN("ERR_FORBIDDEN", "You do not have permission to perform this action"),
    INTERNAL_SERVER_ERROR("ERR_INTERNAL", "An unexpected error occurred"),
    INVALID_TOKEN("ERR_INVALID_TOKEN", "Expired or invalid JWT token"),
    ALREADY_EXISTS("ERR_ALREADY_EXISTS", "Resource with given unique identifier already exists"),
    SLOT_UNAVAILABLE("ERR_SLOT_UNAVAILABLE", "Requested doctor schedule slot is full or unavailable");

    private final String code;
    private final String defaultMessage;

    ErrorCode(String code, String defaultMessage) {
        this.code = code;
        this.defaultMessage = defaultMessage;
    }
}
