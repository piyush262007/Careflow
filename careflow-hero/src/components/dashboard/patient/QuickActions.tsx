import React from 'react';
import { Calendar, UserCheck, FileText, Pill } from 'lucide-react';

interface QuickActionsProps {
  onBookAppointment?: () => void;
  onFindDoctor?: () => void;
  onViewRecords?: () => void;
  onViewPrescription?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onBookAppointment,
  onFindDoctor,
  onViewRecords,
  onViewPrescription,
}) => {
  const actions = [
    {
      title: 'Book Appointment',
      subtitle: 'Schedule a visit with specialists',
      icon: Calendar,
      color: 'emerald',
      onClick: onBookAppointment,
    },
    {
      title: 'Find Doctor',
      subtitle: 'Browse qualified doctors & schedules',
      icon: UserCheck,
      color: 'blue',
      onClick: onFindDoctor,
    },
    {
      title: 'View Records',
      subtitle: 'Access lab reports & history',
      icon: FileText,
      color: 'purple',
      onClick: onViewRecords,
    },
    {
      title: 'Digital Prescription',
      subtitle: 'Check active dosage & refills',
      icon: Pill,
      color: 'amber',
      onClick: onViewPrescription,
    },
  ];

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50';
      case 'blue':
        return 'bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400 hover:border-blue-500/50';
      case 'purple':
        return 'bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400 hover:border-purple-500/50';
      case 'amber':
      default:
        return 'bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400 hover:border-amber-500/50';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={act.onClick}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${getColorStyles(act.color)}`}
            >
              <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-[var(--text-primary)] leading-snug">{act.title}</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-tight mt-0.5">{act.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
