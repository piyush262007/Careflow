import React from 'react';
import { UserCheck, Settings } from 'lucide-react';
import type { DoctorProfile } from '../../../services/mockDoctorData';

interface DoctorProfileWidgetProps {
  doctor: DoctorProfile;
  onManageAvailability?: () => void;
}

export const DoctorProfileWidget: React.FC<DoctorProfileWidgetProps> = ({ doctor, onManageAvailability }) => {
  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-500" />
          <span>Doctor Profile</span>
        </h3>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {doctor.status}
        </span>
      </div>

      <div className="p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-center space-y-3">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/40 shadow-md mx-auto"
        />

        <div>
          <h4 className="font-extrabold text-base text-[var(--text-primary)] font-heading">{doctor.name}</h4>
          <p className="text-xs text-[var(--text-secondary)] font-medium">{doctor.specialty} · {doctor.title}</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{doctor.facility}</p>
        </div>

        <button
          onClick={onManageAvailability}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-500/25 transition-all cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Manage Availability</span>
        </button>
      </div>
    </div>
  );
};
