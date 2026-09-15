import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';
import { useNotifications } from '../../hooks/useNotifications';
import type { CareFlowNotification } from './data/mockNotificationsData';
import { useNavigate } from 'react-router-dom';

interface NotificationBellProps {
  onOpenBooking?: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { notifications: backendNotifications, unreadCount, markAsRead, deleteNotification } = useNotifications();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const mappedNotifications: CareFlowNotification[] = backendNotifications.length > 0
    ? backendNotifications.map((n) => ({
        id: `n-${n.id}`,
        title: n.title,
        description: n.message,
        timeAgo: n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent',
        category: (n.type === 'APPOINTMENT_BOOKED' || n.type === 'APPOINTMENT_CONFIRMED') ? 'Appointments' : 'Queue',
        isRead: n.readStatus,
        actionText: 'View Details',
        type: n.type === 'APPOINTMENT_CONFIRMED' ? 'Appointment Accepted' : 'Appointment Update' as any,
      }))
    : [
        {
          id: 'n1',
          title: 'Appointment Confirmed',
          description: 'Dr. Sarah Chen confirmed your appointment request.',
          timeAgo: '10m ago',
          category: 'Appointments',
          isRead: false,
          actionText: 'View Pass',
          type: 'Appointment Accepted',
        },
      ];

  const handleMarkAsRead = (id: string) => {
    const numericId = parseInt(id.replace('n-', ''), 10);
    if (!isNaN(numericId)) {
      markAsRead(numericId);
    }
  };

  const handleMarkAllAsRead = () => {
    backendNotifications.forEach((n) => markAsRead(n.id));
    showToast('All notifications marked as read.');
  };

  const handleClearAll = () => {
    backendNotifications.forEach((n) => deleteNotification(n.id));
    showToast('Cleared all notifications.');
  };

  const handleActionClick = (notif: CareFlowNotification) => {
    handleMarkAsRead(notif.id);
    setIsOpen(false);
    navigate('/appointments');
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-emerald-500/40 shadow-sm cursor-pointer transition-all"
        title="Open Notification Center"
      >
        <Bell className="h-4 w-4 text-[var(--text-secondary)]" />

        {unreadCount > 0 && (
          <>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-md">
              {unreadCount}
            </span>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </>
        )}
      </motion.button>

      <NotificationDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notifications={mappedNotifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onActionClick={handleActionClick}
      />

      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700">
          <span>{toastMsg}</span>
        </div>
      )}
    </>
  );
};
