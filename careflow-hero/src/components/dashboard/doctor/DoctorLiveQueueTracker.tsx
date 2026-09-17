import React from 'react';
import { Clock, UserCheck, Activity } from 'lucide-react';
import type { DoctorAppointmentItem } from '../../../services/mockDoctorData';

interface DoctorLiveQueueTrackerProps {
  appointments: DoctorAppointmentItem[];
}

export const DoctorLiveQueueTracker: React.FC<DoctorLiveQueueTrackerProps> = ({ appointments }) => {
  const current = appointments[0] || { patientName: 'John Carter', patientAge: 32 };
  const next = appointments[1] || { patientName: 'Emma Wilson', patientAge: 27 };
  const then = appointments[2] || { patientName: 'Michael Brown', patientAge: 45 };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/20 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-blue-500/25 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
          <Clock className="w-4 h-4" />
          <span>Patient Queue Management</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          LIVE QUEUE · ACTIVE
        </span>
      </div>

      {/* Queue Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Currently Seeing */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" />
            Currently Seeing (#1)
          </span>
          <p className="text-sm font-extrabold text-[var(--text-primary)]">{current.patientName}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">{current.patientAge} Yrs · In Consultation</p>
        </div>

        {/* Next Patient */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <UserCheck className="w-3 h-3" />
            Next Up (#2)
          </span>
          <p className="text-sm font-extrabold text-[var(--text-primary)]">{next.patientName}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">{next.patientAge} Yrs · Ready at Door</p>
        </div>

        {/* Following Patient */}
        <div className="p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Following (#3)
          </span>
          <p className="text-sm font-bold text-[var(--text-primary)]">{then.patientName}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{then.patientAge} Yrs · Waiting Room</p>
        </div>
      </div>

      {/* Queue Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-semibold">
          <span>Today's Queue Velocity</span>
          <span>7 of 12 Patients Completed (58%)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--bg-card-bg)] overflow-hidden border border-[var(--border-color)]">
          <div className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full w-[58%]" />
        </div>
      </div>
    </div>
  );
};
