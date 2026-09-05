import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, ShieldCheck, Sparkles, Clock, Pill } from 'lucide-react';

export const AfterCard: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-blue-500/30 bg-[var(--bg-surface)] p-5 backdrop-blur-2xl shadow-apple-lg shadow-blue-500/10 transition-all duration-400">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Activity className="h-4 w-4" />
          <span>CareFlow OS (Intelligent System)</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          CONNECTED & LIVE
        </span>
      </div>

      <div className="space-y-3">
        {/* Item 1: Live Queue Tracking */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/05 p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/30">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--text-primary)]">Live Queue Tracking</div>
                <div className="text-[11px] text-[var(--text-muted)]">3rd in line · Est. wait: 12 min</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 font-bold">Priority #03</span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '70%' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Item 2: AI Appointment Booking */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3.5 flex items-center justify-between transition-colors hover:border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">AI Appointment Booking</div>
              <div className="text-[11px] text-[var(--text-muted)]">Dr. Sarah Chen · Today, 09:30 AM</div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold">
            Confirmed ✓
          </span>
        </div>

        {/* Item 3: Digital Medical Records */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3.5 flex items-center justify-between transition-colors hover:border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">Digital Health Vault</div>
              <div className="text-[11px] text-[var(--text-muted)]">AES-256 Encrypted Cloud Sync</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-teal-600 dark:text-teal-300 font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-teal-400 animate-pulse" />
            Instant Access
          </span>
        </div>

        {/* Item 4: Medicine Reminder */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3.5 flex items-center justify-between transition-colors hover:border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Pill className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">Smart Medicine Reminder</div>
              <div className="text-[11px] text-[var(--text-muted)]">Metformin 500mg · Scheduled 2:00 PM</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Active Alert</span>
        </div>
      </div>
    </div>
  );
};
