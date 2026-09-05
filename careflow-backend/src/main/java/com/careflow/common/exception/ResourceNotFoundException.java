package com.careflow.common.exception;

public class ResourceNotFoundException extends CustomException {

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue), ErrorCode.RESOURCE_NOT_FOUND);
    }

    public ResourceNotFoundException(String message) {
        super(message, ErrorCode.RESOURCE_NOT_FOUND);
    }
}
