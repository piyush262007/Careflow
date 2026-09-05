import React, { memo } from 'react';
import {
  Activity,
  Building2,
  Calendar,
  Heart,
  Bot,
  User,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExit: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = memo(({
  activeTab,
  setActiveTab,
  onExit,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, route: '/patient' },
    { id: 'hospitals', label: 'Hospitals', icon: Building2, route: '/hospitals' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, route: '/appointments' },
    { id: 'today', label: "Today's Care", icon: Heart, route: '/today-care' },
    { id: 'companion', label: 'Companion', icon: Bot, route: '/companion' },
    { id: 'profile', label: 'Profile', icon: User, route: '/profile' },
  ];

  const handleNavClick = (item: typeof navItems[number]) => {
    setActiveTab(item.id);
    if (item.route && location.pathname !== item.route) {
      navigate(item.route);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between w-56 h-screen sticky top-0 p-5 bg-[var(--bg-surface)] border-r border-[var(--border-color)] shadow-sm z-30 shrink-0 select-none">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
              CareFlow
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-medium">Healthcare Workspace</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isPathActive = item.route ? location.pathname === item.route : activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  isPathActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {isPathActive && <ChevronRight className="h-3.5 w-3.5 opacity-80" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Theme Toggle Footer */}
      <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
        {/* User Card */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.name ? user.name.split(' ').map((n) => n[0]).join('') : 'SJ'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
                {user?.name || 'Sarah Jenkins'}
              </h4>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block capitalize truncate">
                {user?.role || 'Patient'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex-1 py-2 px-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-indigo-500" />
                <span>Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onExit}
            className="py-2 px-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0 active:scale-[0.98]"
            title="Sign Out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
});
