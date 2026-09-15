import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  activeMode: 'before' | 'after';
  onChange: (mode: 'before' | 'after') => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ activeMode, onChange }) => {
  return (
    <div className="relative inline-flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-1 backdrop-blur-md">
      <button
        onClick={() => onChange('before')}
        className={`relative z-10 px-4 py-2 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
          activeMode === 'before' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        {activeMode === 'before' && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 rounded-lg bg-slate-300/80 dark:bg-slate-800 shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Before CareFlow
        </span>
      </button>

      <button
        onClick={() => onChange('after')}
        className={`relative z-10 px-4 py-2 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
          activeMode === 'after' ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        {activeMode === 'after' && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 shadow-md shadow-blue-500/25"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
          After CareFlow
        </span>
      </button>
    </div>
  );
};
