package com.careflow.notification.controller;

import com.careflow.common.response.ApiResponse;
import com.careflow.notification.dto.NotificationDto;
import com.careflow.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification Center", description = "Endpoints for managing user system and appointment notifications")
@SecurityRequirement(name = "bearerAuth")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Get user notifications", description = "Retrieves all notifications for the authenticated user ordered newest first.")
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getNotifications(Principal principal) {
        List<NotificationDto> response = notificationService.getUserNotifications(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}/read")
    @Operation(summary = "Mark notification as read", description = "Marks a specific notification as read by ID.")
    public ResponseEntity<ApiResponse<NotificationDto>> markAsRead(
            @PathVariable Long id,
            Principal principal
    ) {
        NotificationDto response = notificationService.markAsRead(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Notification marked as read"));
    }

    @PutMapping("/read-all")
    @Operation(summary = "Mark all notifications as read", description = "Marks all unread notifications for the authenticated user as read.")
    public ResponseEntity<ApiResponse<String>> markAllAsRead(Principal principal) {
        notificationService.markAllAsRead(principal.getName());
        return ResponseEntity.ok(ApiResponse.success("All notifications marked as read"));
    }

    @GetMapping("/unread-count")
    @Operation(summary = "Get unread notifications count", description = "Returns total count of unread notifications for the header badge.")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount(Principal principal) {
        long count = notificationService.getUnreadCount(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(count));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete notification", description = "Deletes a notification by ID.")
    public ResponseEntity<ApiResponse<String>> deleteNotification(
            @PathVariable Long id,
            Principal principal
    ) {
        notificationService.deleteNotification(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Notification deleted successfully"));
    }
}
