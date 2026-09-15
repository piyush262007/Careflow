import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Building2 } from 'lucide-react';

export const HospitalWorkspace: React.FC = () => {
  const departments = [
    { name: 'Emergency Room', capacity: 92, status: 'High Volume', color: 'text-rose-500 bg-rose-500' },
    { name: 'Cardiology', capacity: 85, status: 'Optimal', color: 'text-blue-500 bg-blue-500' },
    { name: 'Pediatrics', capacity: 60, status: 'Normal', color: 'text-emerald-500 bg-emerald-500' },
    { name: 'Intensive Care (ICU)', capacity: 78, status: 'Monitored', color: 'text-purple-500 bg-purple-500' },
  ];

  return (
    <div className="w-full rounded-2xl flow-glass p-6 shadow-apple-lg border border-[var(--border-color)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/30 font-bold text-xs">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-[var(--text-primary)] block">St. Jude Medical Center</span>
            <span className="text-xs text-[var(--text-muted)]">Hospital Operations Command Center</span>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-500">
          <ShieldAlert className="h-3.5 w-3.5" />
          Level 1 Triage Active
        </span>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3">
          <span className="text-[10px] text-[var(--text-muted)] block">Today's Admissions</span>
          <span className="font-stat text-2xl font-bold text-[var(--text-primary)]">142</span>
        </div>
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3">
          <span className="text-[10px] text-[var(--text-muted)] block">Average ER Wait</span>
          <span className="font-stat text-2xl font-bold text-emerald-500">4.2 min</span>
        </div>
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3">
          <span className="text-[10px] text-[var(--text-muted)] block">Active Staff</span>
          <span className="font-stat text-2xl font-bold text-blue-500">46 On Shift</span>
        </div>
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3">
          <span className="text-[10px] text-[var(--text-muted)] block">Bed Occupancy</span>
          <span className="font-stat text-2xl font-bold text-[var(--text-primary)]">84%</span>
        </div>
      </div>

      {/* Department Capacity Overview */}
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-4">
        <span className="text-xs font-bold text-[var(--text-primary)] block mb-3">
          Department Capacity & Monitoring
        </span>
        <div className="space-y-3">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--text-primary)]">{dept.name}</span>
                <span className={`font-mono font-bold ${dept.color.split(' ')[0]}`}>{dept.capacity}% ({dept.status})</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
                <motion.div
                  className={`h-full ${dept.color.split(' ')[1]} rounded-full`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${dept.capacity}%` }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
