import React, { useState } from 'react';
import { Calendar, UserCheck, Bot } from 'lucide-react';
import { RippleButton } from '../RippleButton';

export const DoctorWorkspace: React.FC = () => {
  const [dutyStatus, setDutyStatus] = useState<'duty' | 'consult' | 'break'>('duty');

  const statusConfig = {
    duty: { label: 'On Duty', color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' },
    consult: { label: 'In Consultation', color: 'bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400' },
    break: { label: 'On Break', color: 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400' },
  };

  return (
    <div className="w-full rounded-2xl flow-glass p-6 shadow-apple-lg border border-[var(--border-color)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-500/30 font-bold text-xs">
            SC
          </div>
          <div>
            <span className="text-sm font-bold text-[var(--text-primary)] block">Dr. Sarah Chen</span>
            <span className="text-xs text-[var(--text-muted)]">Cardiology Lead · Suite 4B</span>
          </div>
        </div>

        {/* Interactive Duty Status Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] hidden sm:inline">Status:</span>
          {(['duty', 'consult', 'break'] as const).map((st) => (
            <RippleButton
              key={st}
              onClick={() => setDutyStatus(st)}
              className={`px-3 py-1 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                dutyStatus === st
                  ? statusConfig[st].color
                  : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {statusConfig[st].label}
            </RippleButton>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Schedule */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-500" />
              Today's Schedule
            </span>
            <span className="text-[10px] font-mono text-blue-500 font-bold">4 Patients</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex justify-between items-center">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">John Doe</span>
                <span className="text-[10px] text-[var(--text-muted)]">Follow-up</span>
              </div>
              <span className="font-mono text-[10px] text-blue-500">09:30 AM</span>
            </div>
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex justify-between items-center">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Jane Smith</span>
                <span className="text-[10px] text-[var(--text-muted)]">ECG Review</span>
              </div>
              <span className="font-mono text-[10px] text-blue-500">11:00 AM</span>
            </div>
          </div>
        </div>

        {/* Patient Queue */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-emerald-500" />
              Triage Waiting Room
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 3 Waiting
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="font-medium text-[var(--text-primary)]">Priority #01 · John Doe</span>
              <span className="text-[9px] font-semibold bg-emerald-500/15 text-emerald-600 px-1.5 py-0.5 rounded">Ready</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="font-medium text-[var(--text-primary)]">Priority #02 · Robert K.</span>
              <span className="text-[9px] font-semibold bg-amber-500/15 text-amber-600 px-1.5 py-0.5 rounded">Triage</span>
            </div>
          </div>
        </div>

        {/* AI Clinical Notes */}
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/05 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Bot className="h-4 w-4 text-purple-500" />
              AI Visit Synthesizer
            </span>
            <span className="text-[10px] text-purple-500 font-mono">Auto-Draft</span>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--bg-surface)] p-2.5 rounded-lg border border-[var(--border-subtle)]">
            "Patient John Doe: Vitals stable (BP 118/78). Recommended 3-month follow-up for cardiology check."
          </p>
        </div>
      </div>
    </div>
  );
};
