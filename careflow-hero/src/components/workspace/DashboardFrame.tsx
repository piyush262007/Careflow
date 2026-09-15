import React from 'react';
import { Activity, Search, Bell } from 'lucide-react';

interface DashboardFrameProps {
  children: React.ReactNode;
  glowPos?: { x: number; y: number };
}

export const DashboardFrame: React.FC<DashboardFrameProps> = ({ children, glowPos = { x: 50, y: 50 } }) => {
  return (
    <div className="relative w-full rounded-2xl flow-glass overflow-hidden group">
      {/* Dynamic Cursor Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 350px at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.09) 0%, rgba(37, 99, 235, 0.05) 40%, transparent 80%)`,
        }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-header)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-heading font-bold text-xs text-[var(--text-primary)]">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Activity className="h-3.5 w-3.5" />
            </div>
            <span>CareFlow OS</span>
          </div>
          <span className="h-3 w-px bg-[var(--border-color)]" />
          <span className="text-[11px] font-medium text-[var(--text-muted)]">Dashboard / Overview</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-bg)] px-2.5 py-1 text-[11px] text-[var(--text-muted)]">
            <Search className="h-3 w-3 text-[var(--text-muted)]" />
            <span>Search records...</span>
            <kbd className="rounded border border-[var(--border-color)] bg-[var(--bg-surface)] px-1 font-mono text-[9px] text-[var(--text-muted)]">⌘K</kbd>
          </div>

          <div className="relative rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-[var(--bg-surface)]" />
          </div>

          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 text-[10px] font-bold text-white shadow-sm">
            DR
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-[var(--bg-surface)]" />
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 p-4 grid grid-cols-1 md:grid-cols-3 gap-3 bg-[var(--bg-main)]">
        {children}
      </div>
    </div>
  );
};
