import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Pill, Bot, Activity } from 'lucide-react';

export const PatientWorkspace: React.FC = () => {
  return (
    <div className="w-full rounded-2xl flow-glass p-6 shadow-apple-lg border border-[var(--border-color)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold text-xs">
            JD
          </div>
          <div>
            <span className="text-sm font-bold text-[var(--text-primary)] block">John Doe</span>
            <span className="text-xs text-[var(--text-muted)]">Patient Portal · ID #CF-9482</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Active Session
        </span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Appointment */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-500" />
              Next Consultation
            </span>
            <span className="rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300 px-2 py-0.5 text-[10px] font-semibold">
              Today
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-[var(--text-primary)]">Dr. Sarah Chen</div>
            <div className="text-[11px] text-[var(--text-muted)]">Cardiology Follow-up</div>
            <div className="text-[11px] font-mono text-blue-500 font-semibold flex items-center gap-1 pt-1">
              <Clock className="h-3 w-3" /> 09:30 AM · Suite 4B
            </div>
          </div>
        </div>

        {/* Live Queue Tracker */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal-500" />
              Live Queue
            </span>
            <span className="text-[10px] font-bold text-emerald-500">LIVE</span>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="font-stat text-3xl font-extrabold text-blue-600 dark:text-blue-400">3</span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">rd</span>
            <span className="text-xs text-[var(--text-muted)] ml-1">in line</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </div>

        {/* Medicine Reminder */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Pill className="h-4 w-4 text-amber-500" />
              Medication Due
            </span>
            <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-0.5 text-[10px] font-semibold">
              2:00 PM
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-[var(--text-primary)]">Metformin 500mg</div>
            <div className="text-[11px] text-[var(--text-muted)]">1 Tablet after lunch</div>
            <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 pt-1">
              Refill Sync: Active
            </div>
          </div>
        </div>

        {/* CareFlow AI Widget */}
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/05 p-4 md:col-span-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-500 border border-purple-500/30">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--text-primary)]">CareFlow AI Assistant</div>
              <div className="text-[11px] text-[var(--text-muted)]">Clinical summary ready for Dr. Chen</div>
            </div>
          </div>
          <span className="rounded-lg bg-purple-600 text-white px-3 py-1.5 text-xs font-semibold shadow-md shadow-purple-500/20">
            View AI Insights
          </span>
        </div>

        {/* Health Score */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="font-stat text-xl font-bold text-[var(--text-primary)]">85</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Optimal Health Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
