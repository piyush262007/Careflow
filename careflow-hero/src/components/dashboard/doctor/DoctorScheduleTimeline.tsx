import React from 'react';
import { CalendarDays, Coffee } from 'lucide-react';
import type { ScheduleSlot } from '../../../services/mockDoctorData';

interface DoctorScheduleTimelineProps {
  slots: ScheduleSlot[];
}

export const DoctorScheduleTimeline: React.FC<DoctorScheduleTimelineProps> = ({ slots }) => {
  const getBadgeStyle = (status: ScheduleSlot['status']) => {
    switch (status) {
      case 'Current':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Break':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Completed':
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
      case 'Upcoming':
      default:
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-blue-500" />
          <span>Daily Schedule & Timeline</span>
        </h3>
        <span className="text-xs font-semibold text-[var(--text-muted)]">Today</span>
      </div>

      <div className="space-y-2">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              slot.status === 'Current'
                ? 'bg-emerald-500/05 border-emerald-500/30 shadow-xs'
                : 'bg-[var(--bg-card-bg)] border-[var(--border-color)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 w-16">
                {slot.time}
              </span>
              <div className="flex items-center gap-2">
                {slot.status === 'Break' ? (
                  <Coffee className="w-4 h-4 text-amber-500" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
                <span className="text-xs font-bold text-[var(--text-primary)]">{slot.patientName}</span>
                <span className="text-[11px] text-[var(--text-muted)]">({slot.type})</span>
              </div>
            </div>

            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${getBadgeStyle(slot.status)}`}>
              {slot.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
