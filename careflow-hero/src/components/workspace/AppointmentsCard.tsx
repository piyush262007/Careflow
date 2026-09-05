import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { Appointment } from '../../types/hero';

export const AppointmentsCard: React.FC = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Chen',
      specialty: 'Cardiology Follow-up',
      time: '09:30 AM',
      status: 'Confirmed',
      avatarInitials: 'SC',
    },
    {
      id: '2',
      doctorName: 'Dr. James Wilson',
      specialty: 'General Checkup',
      time: '11:00 AM',
      status: 'In Progress',
      avatarInitials: 'JW',
    },
  ];

  return (
    <div className="flow-glass flow-glass-interactive rounded-xl p-3.5 md:col-span-2 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
          <Calendar className="h-3.5 w-3.5 text-blue-500" />
          <span>Today's Appointments</span>
        </div>
        <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-300">
          3 Upcoming
        </span>
      </div>

      <div className="space-y-2">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-center justify-between rounded-lg bg-[var(--bg-card-bg)] p-2 border border-[var(--border-subtle)] transition-colors hover:bg-[var(--bg-item-hover)]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/15 text-[10px] font-bold text-blue-600 dark:text-blue-300">
                {appt.avatarInitials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[var(--text-primary)]">{appt.doctorName}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{appt.specialty}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-stat text-[var(--text-secondary)] flex items-center gap-1">
                <Clock className="h-3 w-3 text-[var(--text-muted)]" />
                {appt.time}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                  appt.status === 'Confirmed'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {appt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
