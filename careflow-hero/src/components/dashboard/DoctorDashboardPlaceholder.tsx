import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShieldCheck, Stethoscope } from 'lucide-react';

export const DoctorDashboardPlaceholder: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] p-6 sm:p-12 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl flow-glass border border-blue-500/20 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-500 border border-blue-500/30">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">
                Doctor Clinical Suite
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">CareFlow Provider Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-500 border border-blue-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Role: DOCTOR
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border border-rose-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* User Details Card */}
        <div className="p-8 rounded-2xl flow-glass border border-[var(--border-color)] space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {currentUser?.name?.charAt(0) || 'D'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">{currentUser?.name || 'Doctor'}</h2>
              <p className="text-sm text-[var(--text-muted)]">{currentUser?.email}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono">
            ✓ Protected Route Verified: /doctor/dashboard (Role-based access active)
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-[var(--text-muted)] py-4">
        CareFlow Authentication Architecture — Development Mode
      </div>
    </div>
  );
};
