import React from 'react';
import { Calendar, Clock, MapPin, ChevronRight, RefreshCw, XCircle } from 'lucide-react';
import type { AppointmentData } from '../../../services/mockPatientData';

interface UpcomingAppointmentCardProps {
  appointment: AppointmentData;
}

export const UpcomingAppointmentCard: React.FC<UpcomingAppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-emerald-500/20 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          <Calendar className="w-4 h-4" />
          <span>Upcoming Appointment</span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          {appointment.status}
        </span>
      </div>

      {/* Main Doctor Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={appointment.doctorAvatar}
            alt={appointment.doctorName}
            className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/30 shadow-sm shrink-0"
          />
          <div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">{appointment.doctorName}</h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium">{appointment.specialty}</p>
            <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{appointment.hospital} ({appointment.room})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-end text-xs space-y-1 pl-2 sm:pl-0 border-l sm:border-l-0 border-[var(--border-subtle)]">
          <div className="flex items-center gap-1 font-bold text-[var(--text-primary)]">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{appointment.time}</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">{appointment.type}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--border-subtle)]">
        <button className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
          <span>View Appointment Pass</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors cursor-pointer">
            <RefreshCw className="w-3 h-3" />
            <span>Reschedule</span>
          </button>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer">
            <XCircle className="w-3 h-3" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
