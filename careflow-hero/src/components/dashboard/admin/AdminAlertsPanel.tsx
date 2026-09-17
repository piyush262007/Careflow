import React from 'react';
import { Bell, Info, AlertTriangle, ShieldAlert } from 'lucide-react';
import type { AdminAlert } from '../../../services/mockAdminData';

interface AdminAlertsPanelProps {
  alerts: AdminAlert[];
}

export const AdminAlertsPanel: React.FC<AdminAlertsPanelProps> = ({ alerts }) => {
  const getPriorityStyle = (priority: AdminAlert['priority']) => {
    switch (priority) {
      case 'Critical':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
          icon: ShieldAlert,
          badge: 'bg-rose-500 text-white',
        };
      case 'Warning':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
          icon: AlertTriangle,
          badge: 'bg-amber-500 text-white',
        };
      case 'Info':
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
          icon: Info,
          badge: 'bg-blue-500 text-white',
        };
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-600" />
          System Operational Alerts
        </h2>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = getPriorityStyle(alert.priority);
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`p-3 rounded-xl border ${config.bg} flex items-start gap-3 transition-all`}
            >
              <div className="p-1 rounded-lg shrink-0 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold font-heading tracking-tight">{alert.title}</h3>
                  <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${config.badge}`}>
                    {alert.priority}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">{alert.message}</p>
                <span className="text-[10px] text-[var(--text-muted)] block mt-1.5">{alert.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
