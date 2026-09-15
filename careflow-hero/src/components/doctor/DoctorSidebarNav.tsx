import React from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Calendar,
  Users,
  FileSpreadsheet,
  BarChart3,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DoctorSidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExit: () => void;
}

export const DoctorSidebarNav: React.FC<DoctorSidebarNavProps> = ({
  activeTab,
  setActiveTab,
  onExit,
}) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'schedule', label: 'Schedule & Requests', icon: Calendar, badge: '4' },
    { id: 'patients', label: 'Patient Directory', icon: Users },
    { id: 'prescriptions', label: 'E-Prescriptions', icon: FileSpreadsheet },
    { id: 'analytics', label: 'Clinical Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 h-screen sticky top-0 p-6 bg-[var(--bg-surface)] border-r border-[var(--border-color)] shadow-sm z-30">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-tight text-[var(--text-primary)]">
              CareFlow MD
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Physician Workspace
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-item-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="doctorSidebarActivePill"
                      className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Doctor Profile & Action Footer */}
      <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
        {/* User Card */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              SC
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                Dr. Sarah Chen
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Senior Cardiologist
              </span>
            </div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex-1 py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="h-3.5 w-3.5 text-emerald-400" /> : <Sun className="h-3.5 w-3.5 text-amber-500" />}
            <span className="capitalize">{theme}</span>
          </button>

          <button
            onClick={onExit}
            className="py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-muted)] hover:text-rose-500 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            title="Exit to Landing Page"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
