import React from 'react';
import { Activity, UserCheck, Building2, Calendar, ShieldCheck } from 'lucide-react';
import type { SystemActivityLog } from '../../../services/mockAdminData';

interface SystemActivityTimelineProps {
  activities: SystemActivityLog[];
}

export const SystemActivityTimeline: React.FC<SystemActivityTimelineProps> = ({ activities }) => {
  const getIcon = (type: SystemActivityLog['type']) => {
    switch (type) {
      case 'doctor':
        return { icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
      case 'hospital':
        return { icon: Building2, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' };
      case 'appointment':
        return { icon: Calendar, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
      case 'system':
      default:
        return { icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' };
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-600" />
          System Activity Log
        </h2>
        <span className="text-[11px] font-semibold text-[var(--text-muted)]">Real-time Feed</span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => {
          const config = getIcon(act.type);
          const Icon = config.icon;

          return (
            <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-card-bg)] transition-colors">
              <div className={`p-2 rounded-xl border shrink-0 ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-[var(--text-primary)] truncate">{act.title}</h3>
                  <span className="text-[10px] text-[var(--text-muted)] shrink-0">{act.timestamp}</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">{act.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
