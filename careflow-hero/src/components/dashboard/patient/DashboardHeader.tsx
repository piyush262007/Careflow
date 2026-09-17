import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { notificationService } from '../../../services/notificationService';

interface DashboardHeaderProps {
  onToggleMobileMenu?: () => void;
  onOpenNotifications?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleMobileMenu, onOpenNotifications }) => {
  const { currentUser } = useAuth();
  const firstName = currentUser?.name?.split(' ')[0] || 'Patient';
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationService.getUnreadCount();
      if (res.success && typeof res.data === 'number') {
        setUnreadCount(res.data);
      }
    } catch (err) {
      console.warn('Unread count fetch error:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* Left Greeting & Mobile Toggle */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-emerald-500/40 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
            Good morning, {firstName}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] hidden sm:block">
            Here's what's happening with your health today.
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Notification, Profile */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search records, doctors, prescriptions..."
            className="pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-colors w-64"
          />
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-center"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[var(--border-subtle)]">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/20">
            {firstName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
