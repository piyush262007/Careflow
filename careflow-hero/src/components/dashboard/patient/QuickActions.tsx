import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Pill, Bot, ArrowUpRight } from 'lucide-react';

interface QuickActionsProps {
  onBookAppointment?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onBookAppointment }) => {
  const actions = [
    {
      id: 'book',
      title: 'Book Appointment',
      subtitle: 'Schedule physician visit',
      icon: Calendar,
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      action: onBookAppointment,
    },
    {
      id: 'checkin',
      title: 'Queue Check-In',
      subtitle: 'Digital arrival pass',
      icon: CheckCircle2,
      accentBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      action: () => alert("Checked in! You're in line for Dr. Chen."),
    },
    {
      id: 'meds',
      title: 'Log Dose Taken',
      subtitle: 'Track daily prescriptions',
      icon: Pill,
      accentBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
      action: () => alert('Lisinopril 10mg logged as taken at 2:00 PM.'),
    },
    {
      id: 'ai',
      title: 'Ask AI Companion',
      subtitle: 'Symptom & visit guidance',
      icon: Bot,
      accentBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      action: () => {
        const input = document.querySelector('input[placeholder*="Ask CareFlow"]') as HTMLInputElement;
        if (input) input.focus();
      },
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
          Quick Actions
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <motion.button
              key={act.id}
              type="button"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={act.action}
              className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${act.accentBg}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {act.title}
                </h4>
                <span className="text-[10.5px] text-[var(--text-muted)] block mt-0.5">
                  {act.subtitle}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
