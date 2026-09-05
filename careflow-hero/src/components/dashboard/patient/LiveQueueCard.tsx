import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Activity, ChevronRight } from 'lucide-react';

export const LiveQueueCard: React.FC = () => {
  const [position, setPosition] = useState(3);
  const [waitTime, setWaitTime] = useState(12);

  // Gentle live queue position update simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (position > 1) {
        setPosition(2);
        setWaitTime(6);
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [position]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Users className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Live Queue</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Live Updates</span>
        </div>
      </div>

      {/* Position Hero Metric */}
      <div className="p-4 rounded-xl bg-blue-500/05 border border-blue-500/20 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-0.5">
              Queue Position
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
              Position #{position}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
              Estimated Waiting Time
            </span>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-end gap-1">
              <Clock className="h-4 w-4" />
              <span>~{waitTime} mins</span>
            </div>
          </div>
        </div>

        {/* Animated Queue Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '40%' }}
              animate={{ width: position === 2 ? '70%' : '40%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full"
            />
          </div>
          <span className="text-[10px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Check-in Verified</span>
            <span>With Doctor Soon</span>
          </span>
        </div>
      </div>

      {/* Live Status Banner */}
      <div className="p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500 shrink-0 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Live Status</span>
            <span>Dr. Chen is currently seeing <strong>Patient #{position - 1}</strong></span>
          </div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
      </div>
    </motion.div>
  );
};
