package com.careflow.common.audit;

import com.careflow.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditServiceImpl implements AuditService {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;

    @Override
    @Async
    @Transactional
    public void logAudit(String username, String action, String ipAddress, String details) {
        Long userId = null;
        if (username != null && !username.isBlank()) {
            userId = userRepository.findByEmail(username).map(u -> u.getId()).orElse(null);
        }

        AuditLog logEntry = AuditLog.builder()
                .userId(userId)
                .username(username != null ? username : "ANONYMOUS")
                .action(action)
                .ipAddress(ipAddress != null ? ipAddress : "UNKNOWN")
                .details(details)
                .timestamp(LocalDateTime.now())
                .build();

        auditLogRepository.save(logEntry);
        log.info("AUDIT LOG -> User: {}, Action: {}, IP: {}, Details: {}", username, action, ipAddress, details);
    }
}
