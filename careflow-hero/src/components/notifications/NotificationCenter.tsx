import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NotificationData } from '../../services/notificationService';
import { notificationService } from '../../services/notificationService';
import {
  Bell,
  CheckCheck,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface NotificationCenterProps {
  onNotificationRead?: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onNotificationRead }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await notificationService.getNotifications();
      if (res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        setNotifications([]);
      }
    } catch (err: any) {
      console.error('Fetch notifications error:', err);
      setErrorMsg(err?.response?.data?.message || err.message || 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      const res = await notificationService.markAsRead(id);
      if (res.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
        );
        onNotificationRead?.();
      }
    } catch (err: any) {
      console.error('Mark notification read error:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await notificationService.markAllAsRead();
      if (res.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, readStatus: true })));
        setSuccessMsg('All notifications marked as read.');
        onNotificationRead?.();
      }
    } catch (err: any) {
      console.error('Mark all read error:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await notificationService.deleteNotification(id);
      if (res.success) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        onNotificationRead?.();
      }
    } catch (err: any) {
      console.error('Delete notification error:', err);
    }
  };

  const handleNotificationClick = (notif: NotificationData) => {
    if (!notif.readStatus) {
      handleMarkAsRead(notif.id);
    }

    if (notif.type === 'APPOINTMENT_BOOKED' || notif.type === 'APPOINTMENT_CONFIRMED' || notif.type === 'APPOINTMENT_CANCELLED') {
      navigate('/patient/appointments');
    } else if (notif.message?.toLowerCase().includes('prescription') || notif.title?.toLowerCase().includes('prescription')) {
      navigate('/patient/prescriptions');
    } else if (notif.type === 'REMINDER') {
      navigate('/queue');
    }
  };

  const getNotificationIcon = (type: NotificationData['type']) => {
    switch (type) {
      case 'APPOINTMENT_CONFIRMED':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'APPOINTMENT_CANCELLED':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'REMINDER':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'APPOINTMENT_BOOKED':
      default:
        return <Calendar className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">Notification Center</h1>
            <p className="text-xs text-[var(--text-muted)] font-medium">Real-time alerts, appointment updates, and clinical notifications</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notifications.some((n) => !n.readStatus) && (
            <button
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/15 transition-all cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All as Read
            </button>
          )}

          <button
            onClick={fetchNotifications}
            className="p-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-bg)] text-[var(--text-secondary)] transition-colors cursor-pointer"
            title="Refresh Notifications"
          >
            <RefreshCw className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-xs font-bold text-[var(--text-muted)]">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
          <Bell className="w-12 h-12 text-[var(--text-muted)] mx-auto opacity-40" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">No Notifications</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            You're all caught up! New updates regarding your appointments and prescriptions will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                notif.readStatus
                  ? 'bg-[var(--bg-surface)] border-[var(--border-color)] opacity-85'
                  : 'bg-blue-500/5 border-blue-500/30 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] shrink-0 mt-0.5">
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm tracking-tight ${notif.readStatus ? 'font-bold text-[var(--text-primary)]' : 'font-extrabold text-blue-600 dark:text-blue-400'}`}>
                      {notif.title}
                    </h3>
                    {!notif.readStatus && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{notif.message}</p>

                  <span className="text-[10px] text-[var(--text-muted)] font-medium block pt-1">
                    {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : 'Just now'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {!notif.readStatus && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer text-xs font-bold"
                    title="Mark as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleNotificationClick(notif)}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-blue-600 hover:bg-[var(--bg-card-bg)] transition-colors cursor-pointer"
                  title="View details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(notif.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
