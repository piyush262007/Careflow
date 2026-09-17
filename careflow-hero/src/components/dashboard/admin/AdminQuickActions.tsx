import React from 'react';
import { Plus, UserPlus, Calendar, Layers, BarChart3 } from 'lucide-react';

interface AdminQuickActionsProps {
  onActionClick?: (actionId: string) => void;
}

export const AdminQuickActions: React.FC<AdminQuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { id: 'add-hospital', label: 'Add Hospital', icon: Plus, color: 'text-purple-600 bg-purple-500/10' },
    { id: 'add-doctor', label: 'Add Doctor', icon: UserPlus, color: 'text-emerald-600 bg-emerald-500/10' },
    { id: 'appointments', label: 'View Appointments', icon: Calendar, color: 'text-blue-600 bg-blue-500/10' },
    { id: 'departments', label: 'Manage Departments', icon: Layers, color: 'text-amber-600 bg-amber-500/10' },
    { id: 'reports', label: 'View Reports', icon: BarChart3, color: 'text-indigo-600 bg-indigo-500/10' },
  ];

  return (
    <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
      <h3 className="text-xs font-bold text-[var(--text-primary)] font-heading uppercase tracking-wider">
        Quick Administrative Actions
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onActionClick && onActionClick(act.id)}
              className="p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] hover:border-purple-500/30 hover:shadow-sm transition-all flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className={`p-2 rounded-lg shrink-0 ${act.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-purple-600 transition-colors truncate">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
