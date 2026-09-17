import React from 'react';
import { UserCheck, Play, FileText } from 'lucide-react';
import type { NextPatientDetails } from '../../../services/mockDoctorData';

interface NextPatientCardProps {
  patient: NextPatientDetails;
  onStartConsultation?: (appointmentId?: string) => void;
}

export const NextPatientCard: React.FC<NextPatientCardProps> = ({ patient, onStartConsultation }) => {
  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-emerald-500/25 shadow-sm space-y-4">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          <UserCheck className="w-4 h-4" />
          <span>Next Patient Call</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
          READY FOR ENTRY
        </span>
      </div>

      {/* Patient Avatar & Key Info */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)]">
        <img
          src={patient.patientAvatar}
          alt={patient.patientName}
          className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/30 shadow-sm shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[var(--text-primary)] font-heading">{patient.patientName}</h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
              {patient.time}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
            Age: <strong>{patient.patientAge} Yrs</strong> · {patient.appointmentType}
          </p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
            <strong>Reason:</strong> {patient.reason}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => onStartConsultation?.()}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/35 hover:scale-[1.01] transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Consultation</span>
        </button>

        <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] font-bold text-xs transition-colors cursor-pointer">
          <FileText className="w-3.5 h-3.5" />
          <span>View History</span>
        </button>
      </div>
    </div>
  );
};
