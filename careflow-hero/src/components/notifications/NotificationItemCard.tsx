import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  AlertTriangle,
  FileSpreadsheet,
  Pill,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { CareFlowNotification } from './data/mockNotificationsData';

interface NotificationItemCardProps {
  notification: CareFlowNotification;
  onActionClick: (notification: CareFlowNotification) => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItemCard: React.FC<NotificationItemCardProps> = ({
  notification,
  onActionClick,
  onMarkAsRead,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'Appointment Accepted':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'Appointment Rejected':
        return <XCircle className="h-4 w-4 text-rose-500" />;
      case 'Doctor Suggested New Time':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Queue Position Updated':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'Doctor Running Late':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'Prescription Uploaded':
        return <FileSpreadsheet className="h-4 w-4 text-teal-500" />;
      case 'Medicine Reminder':
        return <Pill className="h-4 w-4 text-purple-500" />;
      default:
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getBadgeColor = () => {
    switch (notification.category) {
      case 'Appointments':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Queue':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Medications':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Records':
      default:
        return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
    }
  };

  return (
    <div
      onClick={() => onMarkAsRead(notification.id)}
      className={`p-4 rounded-2xl border transition-all duration-200 space-y-3 cursor-pointer relative overflow-hidden ${
        !notification.isRead
          ? 'bg-[var(--bg-surface)] border-emerald-500/30 shadow-md ring-1 ring-emerald-500/20'
          : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] opacity-85 hover:opacity-100'
      }`}
    >
      {!notification.isRead && (
        <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      )}

      {/* Top Title Bar */}
      <div className="flex items-start justify-between gap-3 pr-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 shrink-0">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] leading-tight">
              {notification.title}
            </h4>
            <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
              {notification.timeAgo}
            </span>
          </div>
        </div>

        <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border uppercase shrink-0 ${getBadgeColor()}`}>
          {notification.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-1">
        {notification.description}
      </p>

      {/* Relevant Action Button */}
      <div className="pt-1 flex items-center justify-between gap-2 border-t border-[var(--border-subtle)]">
        <span className="text-[10px] text-[var(--text-muted)] font-semibold">
          {!notification.isRead ? 'Tap to mark read' : 'Read'}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onActionClick(notification);
          }}
          className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm cursor-pointer transition-all"
        >
          <span>{notification.actionText}</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
