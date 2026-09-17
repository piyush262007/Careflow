import React from 'react';
import { Users, UserCheck, Building2, Calendar, Clock, Activity } from 'lucide-react';
import type { SystemMetrics } from '../../../services/mockAdminData';

interface AdminSystemOverviewProps {
  metrics: SystemMetrics;
}

export const AdminSystemOverview: React.FC<AdminSystemOverviewProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Patients',
      value: metrics.totalPatientsCount.toLocaleString(),
      subText: 'Across all registered facilities',
      icon: Users,
      color: 'blue',
      badge: 'Active Registry',
    },
    {
      title: 'Active Doctors',
      value: metrics.activeDoctorsCount.toString(),
      subText: 'Verified clinical specialists',
      icon: UserCheck,
      color: 'emerald',
      badge: 'On Duty',
    },
    {
      title: 'Hospitals',
      value: metrics.hospitalsCount.toString(),
      subText: 'Partner healthcare centers',
      icon: Building2,
      color: 'purple',
      badge: 'Integrated',
    },
    {
      title: 'Appointments Today',
      value: metrics.appointmentsTodayCount.toLocaleString(),
      subText: 'Scheduled visits across network',
      icon: Calendar,
      color: 'amber',
      badge: 'Today',
    },
    {
      title: 'Waiting Patients',
      value: metrics.waitingPatientsCount.toString(),
      subText: 'Live queues across clinics',
      icon: Clock,
      color: 'indigo',
      badge: 'Live Queue',
    },
    {
      title: 'System Status',
      value: metrics.systemStatus,
      subText: 'All services 100% online',
      icon: Activity,
      color: 'teal',
      badge: 'Healthy',
    },
  ];

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return { iconBg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', tagBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
      case 'purple':
        return { iconBg: 'bg-purple-500/15 text-purple-500 border-purple-500/30', tagBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' };
      case 'amber':
        return { iconBg: 'bg-amber-500/15 text-amber-500 border-amber-500/30', tagBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' };
      case 'indigo':
        return { iconBg: 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30', tagBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' };
      case 'teal':
        return { iconBg: 'bg-teal-500/15 text-teal-500 border-teal-500/30', tagBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400' };
      case 'blue':
      default:
        return { iconBg: 'bg-blue-500/15 text-blue-500 border-blue-500/30', tagBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const styles = getColorStyles(card.color);
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] truncate">{card.title}</span>
              <div className={`p-1.5 rounded-xl border ${styles.iconBg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-[var(--text-primary)] font-heading tracking-tight">
                {card.value}
              </h3>
              <p className="text-[10.5px] text-[var(--text-secondary)] font-medium mt-0.5 truncate">{card.subText}</p>
            </div>

            <div className="pt-0.5">
              <span className={`inline-block px-2 py-0.5 text-[9.5px] font-bold rounded-full ${styles.tagBg}`}>
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
