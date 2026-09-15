import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';

export const TodayJourneyTimeline: React.FC = () => {
  const milestones = [
    {
      id: '1',
      time: '8:00 AM',
      title: 'Morning Prescription',
      subtitle: 'Amoxicillin 500mg — Take with full glass of water',
      status: 'completed',
      statusText: 'Taken at 8:00 AM',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      id: '2',
      time: '10:30 AM',
      title: 'Cardiology Consultation',
      subtitle: 'Dr. Sarah Chen • St. Jude Medical Center, Suite 402',
      status: 'active',
      statusText: 'Upcoming in 2 hrs',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    },
    {
      id: '3',
      time: '2:00 PM',
      title: 'Afternoon Prescription',
      subtitle: 'Lisinopril 10mg — Take with food after lunch',
      status: 'pending',
      statusText: 'Scheduled',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
      id: '4',
      time: '4:00 PM',
      title: 'Evening AI Health Check-In',
      subtitle: 'Log blood pressure reading & evening symptom update',
      status: 'pending',
      statusText: 'Scheduled',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Today's Journey</h3>
            <span className="text-[10.5px] text-[var(--text-muted)]">Chronological timeline of your care schedule</span>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          4 Milestones
        </span>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500/30">
        {milestones.map((m) => {
          const isCompleted = m.status === 'completed';
          const isActive = m.status === 'active';

          return (
            <div key={m.id} className="relative flex items-start justify-between gap-4 group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 top-1.5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md ring-4 ring-blue-500/20 animate-pulse'
                    : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 p-3.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[var(--text-primary)]">{m.time}</span>
                    <span className="text-xs font-bold text-[var(--text-primary)]">• {m.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                    {m.statusText}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{m.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
