import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import type { DoctorPatientRecord } from '../../../services/mockDoctorData';

interface DoctorPatientOverviewProps {
  patients: DoctorPatientRecord[];
}

export const DoctorPatientOverview: React.FC<DoctorPatientOverviewProps> = ({ patients }) => {
  const getStatusBadge = (status: DoctorPatientRecord['status']) => {
    switch (status) {
      case 'Stable':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Follow-up required':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Under control':
      default:
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span>Recent Patient Records</span>
        </h3>
        <span className="text-xs font-semibold text-[var(--text-muted)]">Recently Seen</span>
      </div>

      <div className="space-y-2.5">
        {patients.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] hover:border-blue-500/30 transition-all gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={rec.patientAvatar}
                alt={rec.patientName}
                className="w-9 h-9 rounded-xl object-cover border border-blue-500/30 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{rec.patientName}</h4>
                <p className="text-[11px] text-[var(--text-muted)] truncate">
                  {rec.condition} · <span className="font-medium">Last visit: {rec.lastVisit}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(rec.status)}`}>
                {rec.status}
              </span>
              <button
                title="View Full Patient Record"
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-blue-500 hover:bg-[var(--bg-surface)] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
