import React from 'react';
import { UserCheck } from 'lucide-react';

export const DoctorStatusCard: React.FC = () => {
  return (
    <div className="glass-card-fg rounded-xl p-3 shadow-[var(--shadow-main)] border border-blue-500/30">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
          <UserCheck className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[var(--text-primary)]">Dr. Sarah Chen</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available Now
          </span>
        </div>
      </div>
    </div>
  );
};
