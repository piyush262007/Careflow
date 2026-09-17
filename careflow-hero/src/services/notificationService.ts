import { apiClient } from '../api/client';
import type { ApiResponse } from './authService';

export interface NotificationData {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'APPOINTMENT_BOOKED' | 'APPOINTMENT_CONFIRMED' | 'APPOINTMENT_CANCELLED' | 'REMINDER' | 'GENERAL';
  readStatus: boolean;
  createdAt: string;
}

export const notificationService = {
  async getNotifications() {
    const res = await apiClient.get<ApiResponse<NotificationData[]>>('/notifications');
    return res.data;
  },

  async getUnreadCount() {
    const res = await apiClient.get<ApiResponse<number>>('/notifications/unread-count');
    return res.data;
  },

  async markAsRead(id: number) {
    const res = await apiClient.put<ApiResponse<NotificationData>>(`/notifications/${id}/read`);
    return res.data;
  },

  async markAllAsRead() {
    const res = await apiClient.put<ApiResponse<string>>('/notifications/read-all');
    return res.data;
  },

  async deleteNotification(id: number) {
    const res = await apiClient.delete<ApiResponse<string>>(`/notifications/${id}`);
    return res.data;
  },
};
