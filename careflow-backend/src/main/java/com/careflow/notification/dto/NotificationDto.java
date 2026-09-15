package com.careflow.notification.dto;

import com.careflow.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDto {

    private Long id;
    private Long userId;
    private String title;
    private String message;
    private NotificationType type;
    private boolean readStatus;
    private LocalDateTime createdAt;
}
