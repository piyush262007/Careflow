package com.careflow.notification.service;

import com.careflow.auth.entity.User;
import com.careflow.notification.dto.NotificationDto;
import com.careflow.notification.entity.NotificationType;

import java.util.List;

public interface NotificationService {

    void createNotification(User user, String title, String message, NotificationType type);

    List<NotificationDto> getUserNotifications(String userEmail);

    NotificationDto markAsRead(Long id, String userEmail);

    void markAllAsRead(String userEmail);

    void deleteNotification(Long id, String userEmail);

    long getUnreadCount(String userEmail);
}
