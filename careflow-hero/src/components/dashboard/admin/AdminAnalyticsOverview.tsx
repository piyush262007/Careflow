import React from 'react';
import { BarChart3, TrendingUp, Users, Stethoscope, Clock } from 'lucide-react';

export const AdminAnalyticsOverview: React.FC = () => {
  const metrics = [
    { label: 'Appointment Growth', val: '+18.4%', sub: 'This month vs last', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Patient Registrations', val: '+2,480', sub: 'New patients added', icon: Users, color: 'text-emerald-600' },
    { label: 'Doctor Utilization', val: '86.5%', sub: 'Active consultation hours', icon: Stethoscope, color: 'text-indigo-600' },
    { label: 'Avg Network Wait Time', val: '14.2 min', sub: '-3.1 min reduction', icon: Clock, color: 'text-teal-600' },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Operational Analytics Overview
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Network efficiency and growth trends across the CareFlow platform
          </p>
        </div>
        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          Monthly Digest
        </span>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--text-muted)] truncate">{m.label}</span>
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
              </div>
              <p className="text-lg font-extrabold text-[var(--text-primary)] font-heading">{m.val}</p>
              <span className="text-[10px] text-[var(--text-secondary)] block truncate">{m.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Simple Visual SVG Chart */}
      <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[var(--text-primary)]">Monthly Patient Care Throughput (Jan - Sep)</span>
          <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" /> Completed Appointments
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Patient Enrollments
            </span>
          </div>
        </div>

        {/* Clean Line / Area Chart Representation */}
        <div className="h-32 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="25" x2="500" y2="25" stroke="var(--border-subtle)" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="var(--border-subtle)" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="var(--border-subtle)" strokeDasharray="3 3" />

            {/* Line 1: Appointments */}
            <path
              d="M 0,70 Q 60,50 120,60 T 240,35 T 360,45 T 500,20"
              fill="none"
              stroke="#9333ea"
              strokeWidth="3"
            />
            {/* Line 2: Enrollments */}
            <path
              d="M 0,85 Q 60,75 120,65 T 240,55 T 360,40 T 500,30"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
