import React from 'react';
import { Calendar, Play, Eye, RefreshCw } from 'lucide-react';
import type { DoctorAppointmentItem } from '../../../services/mockDoctorData';

interface DoctorUpcomingAppointmentsProps {
  appointments: DoctorAppointmentItem[];
  onStartConsultation?: (patientId: string) => void;
}

export const DoctorUpcomingAppointments: React.FC<DoctorUpcomingAppointmentsProps> = ({
  appointments,
  onStartConsultation,
}) => {
  const getStatusStyle = (status: DoctorAppointmentItem['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Waiting':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Upcoming':
      default:
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
          <Calendar className="w-4 h-4" />
          <span>Today's Appointment Schedule</span>
        </div>
        <span className="text-xs font-semibold text-[var(--text-muted)]">{appointments.length} Total Patients</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-3 px-3">Patient</th>
              <th className="py-3 px-3">Age</th>
              <th className="py-3 px-3">Time</th>
              <th className="py-3 px-3">Specialty / Reason</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-[var(--bg-card-bg)] transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={appt.patientAvatar}
                      alt={appt.patientName}
                      className="w-8 h-8 rounded-full object-cover border border-blue-500/30 shrink-0"
                    />
                    <span className="font-bold text-[var(--text-primary)]">{appt.patientName}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-[var(--text-secondary)] font-semibold">{appt.patientAge} Yrs</td>
                <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">{appt.time}</td>
                <td className="py-3 px-3 text-[var(--text-secondary)]">{appt.specialtyType}</td>
                <td className="py-3 px-3">
                  <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${getStatusStyle(appt.status)}`}>
                    {appt.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onStartConsultation?.(appt.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Start</span>
                    </button>

                    <button
                      title="View Patient Details"
                      className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      title="Reschedule Appointment"
                      className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
