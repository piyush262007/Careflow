import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Check, Clock } from 'lucide-react';

export const MedicineReminderCard: React.FC = () => {
  const [meds, setMeds] = useState([
    { id: '1', name: 'Amoxicillin 500mg', time: '8:00 AM', taken: true },
    { id: '2', name: 'Lisinopril 10mg', time: '2:00 PM', taken: false, isDueSoon: true },
    { id: '3', name: 'Vitamin D3 1000 IU', time: '8:00 PM', taken: false },
  ]);

  const toggleMed = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken, isDueSoon: false } : m))
    );
  };

  const takenCount = meds.filter((m) => m.taken).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Pill className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Medicine Reminder</h3>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          {takenCount} of {meds.length} Taken
        </span>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-2.5">
        {meds.map((med) => (
          <div
            key={med.id}
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
              med.taken
                ? 'border-emerald-500/20 bg-emerald-500/05 text-[var(--text-secondary)]'
                : med.isDueSoon
                ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--text-primary)] ring-2 ring-emerald-500/20 animate-pulse'
                : 'border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                <Pill className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className={`text-xs font-bold ${med.taken ? 'line-through opacity-70' : ''}`}>
                  {med.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                  <Clock className="h-3 w-3" />
                  <span>{med.time}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => toggleMed(med.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                med.taken
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              {med.taken ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Taken</span>
                </>
              ) : (
                <span>Mark as Taken</span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Summary Helper */}
      <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
        <span>Next dosage: Lisinopril 10mg at 2:00 PM</span>
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </motion.div>
  );
};
