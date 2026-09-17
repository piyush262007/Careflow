import React from 'react';
import { Clock, Activity, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { QueueMonitorItem } from '../../../services/mockAdminData';

interface AdminLiveQueueMonitorProps {
  queueItems: QueueMonitorItem[];
}

export const AdminLiveQueueMonitor: React.FC<AdminLiveQueueMonitorProps> = ({ queueItems }) => {
  const getStatusBadge = (status: QueueMonitorItem['status']) => {
    switch (status) {
      case 'Normal':
        return {
          badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          pulse: 'bg-emerald-500',
          icon: CheckCircle2,
        };
      case 'Busy':
        return {
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          pulse: 'bg-amber-500',
          icon: AlertTriangle,
        };
      case 'Critical':
        return {
          badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          pulse: 'bg-rose-500',
          icon: ShieldAlert,
        };
      case 'Limited':
      default:
        return {
          badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
          pulse: 'bg-orange-500',
          icon: Activity,
        };
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Live Operations Queue Monitor
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Real-time patient waiting room capacity and emergency flow monitoring
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Live Sync Active
        </div>
      </div>

      {/* Grid of Queue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {queueItems.map((item) => {
          const config = getStatusBadge(item.status);
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] hover:border-purple-500/30 transition-all space-y-3 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${config.pulse}`} />

              <div className="flex items-start justify-between gap-2 pt-1">
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)] font-heading truncate max-w-[160px]">
                    {item.hospitalName}
                  </h3>
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                    {item.department}
                  </span>
                </div>

                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border flex items-center gap-1 ${config.badge}`}>
                  <Icon className="w-3 h-3" />
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">Current Queue</span>
                  <span className="text-lg font-extrabold text-[var(--text-primary)] font-heading">
                    #{item.currentQueueCount}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">Avg Wait</span>
                  <span className="text-lg font-extrabold text-[var(--text-primary)] font-heading">
                    {item.avgWaitMinutes} <span className="text-xs font-medium">min</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
