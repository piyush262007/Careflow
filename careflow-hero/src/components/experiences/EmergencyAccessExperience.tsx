import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Navigation, PhoneCall, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { RippleButton } from '../RippleButton';

export const EmergencyAccessExperience: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 my-24">
      {/* Interactive Emergency Demo Side (Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full order-2 lg:order-1"
      >
        <div className="relative w-full rounded-2xl border border-rose-500/30 bg-[var(--bg-surface)] p-6 backdrop-blur-2xl shadow-apple-lg shadow-rose-500/10">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-500 border border-rose-500/30">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)]">Priority Triage Network</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 text-[10px] font-bold text-rose-500">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              24/7 ACTIVE
            </span>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Navigation className="h-3.5 w-3.5 text-rose-500" />
                St. Jude Emergency Medical Center
              </span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">1.2 miles</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>ER Capacity: Optimal</span>
              <span className="font-semibold text-rose-500">Est. ER Wait: &lt; 4 min</span>
            </div>
          </div>

          {/* 1-Tap Emergency Trigger Button */}
          <RippleButton
            onClick={() => setIsTriggered(!isTriggered)}
            className={`w-full py-4 rounded-xl font-heading font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isTriggered
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-500/30 hover:scale-[1.02]'
            }`}
          >
            {isTriggered ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Priority Triage Dispatched ✓</span>
              </>
            ) : (
              <>
                <PhoneCall className="h-4 w-4 animate-bounce" />
                <span>1-Tap Immediate Triage Dispatch</span>
              </>
            )}
          </RippleButton>
        </div>
      </motion.div>

      {/* Narrative Side (Right) */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center order-1 lg:order-2"
      >
        <span className="text-xs font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase mb-3 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
          EXPERIENCE 06 · EMERGENCY NETWORK
        </span>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight mb-4">
          Priority Emergency Network
        </h3>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          Instant 1-tap emergency triage, automated hospital ER capacity matching, and priority ambulance routing when seconds matter most.
        </p>
      </motion.div>
    </div>
  );
};
