import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Play, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { RippleButton } from '../RippleButton';

export const LiveQueueExperience: React.FC = () => {
  const [position, setPosition] = useState(5);
  const [waitTime, setWaitTime] = useState(20);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Auto-progress queue position
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev > 1 ? prev - 1 : 5));
      setWaitTime((prev) => (prev > 4 ? prev - 4 : 20));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.round(((6 - position) / 5) * 100);

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 my-24">
      {/* Narrative Side */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center"
      >
        <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          EXPERIENCE 01 · LIVE QUEUE
        </span>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight mb-4">
          Live Queue Intelligence
        </h3>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          Real-time queue progression, live wait estimates, and smart priority routing so patients never sit in uncertain waiting rooms.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <RippleButton
            onClick={() => setPosition((prev) => (prev > 1 ? prev - 1 : 5))}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 text-xs font-semibold shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Simulate Queue Movement</span>
          </RippleButton>

          <RippleButton
            onClick={() => setIsCheckedIn(!isCheckedIn)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] px-5 py-3 text-xs font-semibold text-[var(--text-primary)] hover:border-blue-500/40 cursor-pointer"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>{isCheckedIn ? 'Checked In ✓' : 'Instant Self Check-in'}</span>
          </RippleButton>
        </div>
      </motion.div>

      {/* Interactive Demo Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="relative w-full rounded-2xl border border-blue-500/30 bg-[var(--bg-surface)] p-6 backdrop-blur-2xl shadow-apple-lg shadow-blue-500/10">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Cardiology Live Queue</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <RefreshCw className="h-3 w-3 animate-spin" /> Auto-syncing
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center bg-[var(--bg-card-bg)] rounded-xl border border-[var(--border-subtle)] mb-5">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Current Position</span>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={position}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-stat text-5xl font-extrabold text-blue-600 dark:text-blue-400"
              >
                {position}
              </motion.span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th'}
              </span>
              <span className="text-xs text-[var(--text-muted)] ml-1">in line</span>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Next up for consultation
            </span>
          </div>

          {/* Progress fill bar */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <span>Queue Progression</span>
              <span className="font-mono font-bold text-[var(--text-primary)]">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <span className="block text-[10px]">Est. Wait</span>
                <strong className="text-[var(--text-primary)] font-stat">{waitTime} min</strong>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
              <Users className="h-4 w-4 text-teal-500" />
              <div>
                <span className="block text-[10px]">Doctors Active</span>
                <strong className="text-[var(--text-primary)] font-stat">4 On Duty</strong>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
