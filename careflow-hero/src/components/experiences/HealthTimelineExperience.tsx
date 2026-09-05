import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Heart, Activity, Calendar } from 'lucide-react';

export const HealthTimelineExperience: React.FC = () => {
  const events = [
    {
      id: '1',
      date: 'July 19, 2026',
      title: 'Cardiology Follow-up',
      doctor: 'Dr. Sarah Chen',
      tag: 'Report Attached',
      icon: Heart,
      iconColor: 'text-rose-500',
    },
    {
      id: '2',
      date: 'June 04, 2026',
      title: 'Comprehensive Blood Analysis',
      doctor: 'Central Health Lab',
      tag: '98% Normal Vitals',
      icon: Activity,
      iconColor: 'text-blue-500',
    },
    {
      id: '3',
      date: 'May 12, 2026',
      title: 'Annual Physical Checkup',
      doctor: 'Dr. James Wilson',
      tag: 'Completed',
      icon: FileText,
      iconColor: 'text-teal-500',
    },
  ];

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
          <Calendar className="h-3.5 w-3.5 text-blue-500" />
          EXPERIENCE 05 · HEALTH HISTORY
        </span>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight mb-4">
          Unified Patient Record & Timeline
        </h3>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          A continuous, chronological vertical timeline tracking clinical visits, digital prescriptions, lab diagnostic reports, and physician follow-ups in one secure vault.
        </p>
      </motion.div>

      {/* Interactive Vertical Timeline Demo Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="relative w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 backdrop-blur-2xl shadow-apple-lg">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-5">
            <span className="text-xs font-bold text-[var(--text-primary)]">Clinical Records Vault</span>
            <span className="text-[10px] font-mono text-blue-500 font-semibold">AES-256 Encrypted</span>
          </div>

          <div className="relative border-l-2 border-[var(--border-color)] ml-3 pl-6 space-y-6">
            {events.map((evt) => {
              const Icon = evt.icon;
              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline Dot Node */}
                  <div className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-surface)] border-2 border-blue-500">
                    <Icon className={`h-3 w-3 ${evt.iconColor}`} />
                  </div>

                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] p-3.5 transition-all hover:border-blue-500/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10.5px] font-mono text-[var(--text-muted)]">{evt.date}</span>
                      <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-semibold text-blue-600 dark:text-blue-300">
                        {evt.tag}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">{evt.title}</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{evt.doctor}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
