import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Check, Clock } from 'lucide-react';

export const MedicineCenterExperience: React.FC = () => {
  const [meds, setMeds] = useState([
    { id: '1', name: 'Metformin 500mg', time: '08:00 AM', taken: true, instructions: 'With breakfast' },
    { id: '2', name: 'Amoxicillin 250mg', time: '02:00 PM', taken: false, instructions: 'After lunch' },
    { id: '3', name: 'Vitamin D3 1000IU', time: '08:00 PM', taken: false, instructions: 'Before bed' },
  ]);

  const toggleMed = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  const completedCount = meds.filter((m) => m.taken).length;

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 my-24">
      {/* Interactive Demo Side (Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full order-2 lg:order-1"
      >
        <div className="relative w-full rounded-2xl border border-amber-500/30 bg-[var(--bg-surface)] p-5 backdrop-blur-2xl shadow-apple-lg shadow-amber-500/10">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500 border border-amber-500/30">
                <Pill className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)]">Medication Schedule</span>
            </div>
            <span className="text-[10.5px] font-mono text-amber-600 dark:text-amber-400 font-bold">
              {completedCount}/{meds.length} Doses Taken
            </span>
          </div>

          <div className="space-y-2.5">
            {meds.map((med) => (
              <motion.div
                key={med.id}
                onClick={() => toggleMed(med.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  med.taken
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                      med.taken
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-400 text-transparent'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold block ${med.taken ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                      {med.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">{med.instructions}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-500" />
                    {med.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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
        <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-3 flex items-center gap-1.5">
          <Pill className="h-3.5 w-3.5 text-amber-500" />
          EXPERIENCE 04 · MEDICINE CENTER
        </span>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight mb-4">
          Smart Medication & Adherence
        </h3>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          Automated pill schedules, intelligent dose reminders, and pharmacy refill sync to ensure uninterrupted treatment regimens.
        </p>
      </motion.div>
    </div>
  );
};
