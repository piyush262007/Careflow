import React from 'react';
import { Calendar, CheckCircle2, Clock, XCircle, CheckCheck, TrendingUp } from 'lucide-react';
import type { AppointmentOperationStats } from '../../../services/mockAdminData';

interface AppointmentOperationsProps {
  stats: AppointmentOperationStats;
}

export const AppointmentOperations: React.FC<AppointmentOperationsProps> = ({ stats }) => {
  const maxVolume = Math.max(...stats.weeklyTrend.map((d) => d.volume), 1500);

  const statusCards = [
    { label: 'Total', value: stats.total, icon: Calendar, color: 'text-purple-600 bg-purple-500/10 border-purple-500/20' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600 bg-amber-500/10 border-amber-500/20' },
    { label: 'Completed', value: stats.completed, icon: CheckCheck, color: 'text-teal-600 bg-teal-500/10 border-teal-500/20' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-rose-600 bg-rose-500/10 border-rose-500/20' },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Appointment Operations
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Real-time tracking of today's appointment load and weekly trend
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 self-start sm:self-auto">
          <TrendingUp className="w-3.5 h-3.5" />
          +12.4% vs last week
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statusCards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] font-medium">{item.label}</span>
                <div className={`p-1.5 rounded-lg border ${item.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-[var(--text-primary)] font-heading">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Weekly Trend Chart */}
      <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)]">Weekly Appointment Activity</span>
          <span className="text-[11px] text-[var(--text-muted)]">Avg: 1,120 appts/day</span>
        </div>

        <div className="h-36 flex items-end gap-3 sm:gap-6 pt-4 pb-2 px-2">
          {stats.weeklyTrend.map((item, idx) => {
            const heightPercent = (item.volume / maxVolume) * 100;
            const isToday = item.day === 'Wed';
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-0.5 px-2 rounded pointer-events-none z-10 shadow-lg">
                  {item.volume} appts
                </div>
                <div className="w-full bg-[var(--bg-card-bg)] rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-purple-600 to-indigo-500 shadow-md shadow-purple-500/30'
                        : 'bg-purple-500/20 hover:bg-purple-500/30 dark:bg-purple-500/30'
                    }`}
                  />
                </div>
                <span className={`text-[11px] font-semibold ${isToday ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-[var(--text-muted)]'}`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
