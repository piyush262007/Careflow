package com.careflow.common.audit;

public interface AuditService {

    void logAudit(String username, String action, String ipAddress, String details);
}
