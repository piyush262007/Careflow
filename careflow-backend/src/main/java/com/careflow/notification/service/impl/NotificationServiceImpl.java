package com.careflow.notification.service.impl;

import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.ForbiddenException;
import com.careflow.common.exception.ResourceNotFoundException;
import com.careflow.notification.dto.NotificationDto;
import com.careflow.notification.entity.Notification;
import com.careflow.notification.entity.NotificationType;
import com.careflow.notification.mapper.NotificationMapper;
import com.careflow.notification.repository.NotificationRepository;
import com.careflow.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Override
    @Transactional
    public void createNotification(User user, String title, String message, NotificationType type) {
        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .readStatus(false)
                .build();
        notificationRepository.save(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationDto> getUserNotifications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(notificationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NotificationDto markAsRead(Long id, String userEmail) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));

        if (!notification.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new ForbiddenException("Unauthorized access to notification.");
        }

        notification.setReadStatus(true);
        Notification saved = notificationRepository.save(notification);
        return notificationMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void markAllAsRead(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        List<Notification> unreadList = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        for (Notification notif : unreadList) {
            if (!notif.isReadStatus()) {
                notif.setReadStatus(true);
            }
        }
        notificationRepository.saveAll(unreadList);
    }

    @Override
    @Transactional
    public void deleteNotification(Long id, String userEmail) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));

        if (!notification.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new ForbiddenException("Unauthorized access to notification.");
        }

        notificationRepository.delete(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) return 0;
        return notificationRepository.countByUserIdAndReadStatusFalse(user.getId());
    }
}
