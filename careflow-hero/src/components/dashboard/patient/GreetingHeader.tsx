import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Pill } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const GreetingHeader: React.FC = () => {
  const { user } = useAuth();

  const name = user?.name ? user.name.split(' ')[0] : 'Sarah';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4 relative overflow-hidden"
    >
      {/* Soft Green Ambient Glow */}
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/08 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Today's Care Companion</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] mb-1">
            Good Morning, {name} 🌿
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
            Here is your care plan for today. You have <strong>1 appointment</strong> and <strong>2 medication reminders</strong>.
          </p>
        </div>

        {/* 5-Second Care Summary Chips */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Calendar className="h-4 w-4" />
            <span>1 Appt</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Pill className="h-4 w-4" />
            <span>2 Meds Due</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
