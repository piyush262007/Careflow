import React from 'react';
import { ShieldCheck, Settings, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const AdminProfileWidget: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          Admin Profile Session
        </h3>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Active
        </span>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20 shrink-0">
          {currentUser?.name?.charAt(0) || 'A'}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
            {currentUser?.name || 'CareFlow Administrator'}
          </h4>
          <p className="text-[10px] text-[var(--text-muted)] truncate">Role: System Administrator</p>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block mt-0.5">
            Full Operations & Security Clearance
          </span>
        </div>
      </div>

      <button
        onClick={() => alert('Opening Account Management')}
        className="w-full py-2 rounded-xl text-xs font-bold bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-purple-500/40 transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <Settings className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        Manage Account Settings
      </button>
    </div>
  );
};
