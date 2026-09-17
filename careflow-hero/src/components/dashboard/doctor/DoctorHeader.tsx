import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface DoctorHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = ({ onToggleMobileMenu }) => {
  const { currentUser } = useAuth();
  const doctorName = currentUser?.name || 'Dr. Sarah Chen';

  return (
    <header className="sticky top-0 z-20 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* Left Title */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-blue-500/40 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
            Good morning, {doctorName}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] hidden sm:block">
            Here's your clinical overview for today.
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search patients, medical records..."
            className="pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors w-64"
          />
        </div>

        <button
          aria-label="View notifications"
          className="relative p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[var(--bg-surface)]" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-[var(--border-subtle)]">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-sm shadow-md shadow-blue-500/20">
            {doctorName.charAt(4) || 'D'}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[var(--bg-surface)]" />
          </div>
        </div>
      </div>
    </header>
  );
};
