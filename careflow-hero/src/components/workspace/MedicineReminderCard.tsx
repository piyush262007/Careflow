import React from 'react';
import { Pill } from 'lucide-react';

export const MedicineReminderCard: React.FC = () => {
  return (
    <div className="glass-card-mid rounded-xl p-3 shadow-[var(--shadow-card)] border border-amber-500/30">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <Pill className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[var(--text-primary)]">Medicine Reminder</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-300 font-mono">Metformin 500mg · 2:00 PM</span>
        </div>
      </div>
    </div>
  );
};
