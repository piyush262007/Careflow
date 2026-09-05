import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { AuthView } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useFlowPulse } from '../../context/FlowPulseContext';
import { AuthViewSwitcherBar } from './AuthViewSwitcherBar';
import { WelcomeView } from './views/WelcomeView';
import { RoleSelectionView } from './views/RoleSelectionView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';

interface AuthLayoutProps {
  viewOverride?: AuthView;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ viewOverride }) => {
  const { activeView: contextView, user, isAuthenticated, isLoading, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { activeStep, triggerPulse } = useFlowPulse();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated && user) {
    const targetRoute = user.role === 'doctor' ? '/doctor' : user.role === 'hospital' ? '/hospitals' : '/patient';
    return <Navigate to={targetRoute} replace />;
  }

  const isLogoPulsing = activeStep === 'logo';

  const currentPath = location.pathname.replace('/', '');
  const activeView: AuthView = viewOverride || (
    ['welcome', 'role-selection', 'login', 'register', 'forgot-password'].includes(currentPath)
      ? (currentPath as AuthView)
      : contextView
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'welcome':
        return <WelcomeView />;
      case 'role-selection':
        return <RoleSelectionView />;
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'forgot-password':
        return <ForgotPasswordView />;
      default:
        return <WelcomeView />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col justify-between p-4 sm:p-6 lg:p-8 theme-transition selection:bg-emerald-600 selection:text-white">
      {/* Soft Ambient Background Light Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/08 blur-[140px]" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-30 flex items-center justify-between max-w-5xl mx-auto w-full mb-4">
        {/* CareFlow Logo with Flow Pulse Glow */}
        <button
          onClick={() => {
            triggerPulse();
            navigate('/');
          }}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
          title="Return to CareFlow Home Page"
        >
          <div
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white transition-all duration-500 ${
              isLogoPulsing ? 'scale-110 shadow-lg shadow-emerald-500/60 ring-2 ring-emerald-400' : 'shadow-emerald-500/25 group-hover:scale-105'
            }`}
          >
            <Activity className="h-5 w-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1120] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
              CareFlow
              <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                AUTH
              </span>
            </span>
          </div>
        </button>

        {/* Right Header Actions: Theme Toggle, Close Button */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Signed in as <strong>{user.name}</strong></span>
              <button
                onClick={logoutUser}
                className="ml-1 text-[10px] underline font-bold hover:text-rose-400 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          )}

          {/* Circular Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Dark / Light Theme"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all duration-300 shadow-sm backdrop-blur-xl cursor-pointer"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4 text-emerald-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
          </motion.button>

          {/* Return to Landing Page */}
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-sm cursor-pointer"
          >
            <span>Landing Page</span>
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      </header>

      {/* Top Quick Page Switcher Bar */}
      <AuthViewSwitcherBar />

      {/* Centered Spacious Auth Container */}
      <main className="relative z-20 flex-1 flex items-center justify-center my-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] shadow-xl min-h-[440px] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col justify-between"
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 max-w-5xl mx-auto w-full pt-4 text-center text-xs text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[var(--border-subtle)] mt-4">
        <span>© 2026 CareFlow Technologies Inc. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-[var(--text-primary)]">Privacy Policy</a>
          <a href="#terms" className="hover:text-[var(--text-primary)]">Terms of Service</a>
          <a href="#security" className="hover:text-[var(--text-primary)]">Security Architecture</a>
        </div>
      </footer>
    </div>
  );
};
