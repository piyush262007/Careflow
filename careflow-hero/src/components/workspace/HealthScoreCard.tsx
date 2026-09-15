import React from 'react';
import { motion } from 'framer-motion';

export const HealthScoreCard: React.FC = () => {
  return (
    <div className="glass-card-mid rounded-xl p-3.5 flex flex-col items-center justify-center text-center">
      <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase mb-2">
        Health Index
      </span>

      <div className="relative h-20 w-20 flex items-center justify-center mb-1">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="33"
            stroke="var(--border-color)"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="33"
            stroke="url(#healthScoreGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="207"
            initial={{ strokeDashoffset: 207 }}
            animate={{ strokeDashoffset: 31 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="healthScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center font-stat text-xl font-bold text-[var(--text-primary)]">
          85
        </div>
      </div>

      <span className="text-[11px] font-medium text-emerald-500 dark:text-emerald-400">
        Optimal Health Score
      </span>
    </div>
  );
};
