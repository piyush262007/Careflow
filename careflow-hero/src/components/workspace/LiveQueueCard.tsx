import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

export const LiveQueueCard: React.FC = () => {
  const [queuePosition, setQueuePosition] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueuePosition((prev) => (prev === 3 ? 2 : 3));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = queuePosition === 3 ? 65 : 82;
  const waitMinutes = queuePosition === 3 ? 12 : 7;

  return (
    <div className="flow-glass flow-glass-interactive rounded-xl p-3.5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
          Live Queue Tracker
        </span>
        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="flex items-baseline gap-1 my-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={queuePosition}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="font-stat text-3xl font-extrabold text-blue-600 dark:text-blue-400"
          >
            {queuePosition}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          {queuePosition === 2 ? 'nd' : 'rd'}
        </span>
        <span className="text-xs text-[var(--text-muted)] ml-1">in line</span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden my-1">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-1">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-[var(--text-muted)]" />
          Est. wait:{' '}
          <strong className="font-stat text-[var(--text-primary)]">
            {waitMinutes} min
          </strong>
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3 text-[var(--text-muted)]" />
          Queue capacity: 85%
        </span>
      </div>
    </div>
  );
};
