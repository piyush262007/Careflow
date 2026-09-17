import React from 'react';
import { CalendarCheck, Pill, FileText, MessageSquare, Clock } from 'lucide-react';
import type { ActivityItem } from '../../../services/mockPatientData';

interface RecentActivityTimelineProps {
  activities: ActivityItem[];
}

export const RecentActivityTimeline: React.FC<RecentActivityTimelineProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'appointment':
        return { icon: CalendarCheck, color: 'text-emerald-500 bg-emerald-500/15 border-emerald-500/30' };
      case 'prescription':
        return { icon: Pill, color: 'text-amber-500 bg-amber-500/15 border-amber-500/30' };
      case 'report':
        return { icon: FileText, color: 'text-purple-500 bg-purple-500/15 border-purple-500/30' };
      case 'message':
      default:
        return { icon: MessageSquare, color: 'text-blue-500 bg-blue-500/15 border-blue-500/30' };
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight">
          Recent Activity
        </h3>
        <span className="text-[11px] font-semibold text-[var(--text-muted)]">Past 7 Days</span>
      </div>

      <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-subtle)]">
        {activities.map((act) => {
          const { icon: Icon, color } = getActivityIcon(act.type);
          return (
            <div key={act.id} className="relative flex items-start gap-3">
              {/* Dot Icon */}
              <div className={`absolute -left-6 top-0 h-6 w-6 rounded-full border flex items-center justify-center ${color} shadow-xs`}>
                <Icon className="w-3 h-3" />
              </div>

              <div className="flex-1 bg-[var(--bg-card-bg)] p-3 rounded-xl border border-[var(--border-color)]">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{act.title}</h4>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono flex items-center gap-1 shrink-0">
                    <Clock className="w-2.5 h-2.5" />
                    {act.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">{act.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
