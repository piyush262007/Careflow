import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Clock, FileText, Calendar, Bell, Cloud, ShieldCheck } from 'lucide-react';

export const FloatingAuthWidgets: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[540px] flex flex-col justify-center items-center p-6 overflow-hidden">
      {/* Central Ambient Glow */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />

      {/* Hero Welcome Badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="flow-glass p-4 rounded-2xl border border-blue-500/30 max-w-sm w-full mb-6 shadow-2xl relative z-20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[var(--text-primary)]">CareFlow AI Assistant</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">"Your workspace is prepared & encrypted."</span>
          </div>
        </div>
      </motion.div>

      {/* Grid of Onboarding Floating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg relative z-20">
        {/* Card 1: Smart Queue */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="flow-glass p-3.5 rounded-xl border border-[var(--border-color)] shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Smart Queue</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              #02 Priority
            </span>
          </div>
          <p className="text-[10.5px] text-[var(--text-muted)] leading-tight">Live wait time: 8 mins</p>
        </motion.div>

        {/* Card 2: Digital Records */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="flow-glass p-3.5 rounded-xl border border-[var(--border-color)] shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-teal-500" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Medical Records</span>
            </div>
            <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
          </div>
          <p className="text-[10.5px] text-[var(--text-muted)] leading-tight">AES-256 Encrypted Vault</p>
        </motion.div>

        {/* Card 3: Appointment Booking */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="flow-glass p-3.5 rounded-xl border border-[var(--border-color)] shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Next Visit</span>
            </div>
            <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
              Today 09:30
            </span>
          </div>
          <p className="text-[10.5px] text-[var(--text-muted)] leading-tight">Dr. Sarah Chen · Suite 4B</p>
        </motion.div>

        {/* Card 4: Medicine Reminder */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="flow-glass p-3.5 rounded-xl border border-[var(--border-color)] shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Medicine Reminder</span>
            </div>
            <span className="text-[9px] font-bold text-amber-500">8:00 PM</span>
          </div>
          <p className="text-[10.5px] text-[var(--text-muted)] leading-tight">Metformin 500mg (1 Dose)</p>
        </motion.div>
      </div>

      {/* Cloud Sync Status Pill */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-6 flow-glass px-4 py-2 rounded-full border border-teal-500/30 flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-300 relative z-20"
      >
        <Cloud className="h-3.5 w-3.5 text-teal-500" />
        <span>Secure Cloud Sync Active · Multi-Region Backup</span>
      </motion.div>
    </div>
  );
};
