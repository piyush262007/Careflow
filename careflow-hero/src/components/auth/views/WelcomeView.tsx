import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Building2, Calendar, Activity as QueueIcon, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthButton } from '../ui/AuthButton';

export const WelcomeView: React.FC = () => {
  const { setActiveView } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    setActiveView('role-selection');
    navigate('/role-selection');
  };

  const handleLogin = () => {
    setActiveView('login');
    navigate('/login');
  };

  const featureList = [
    { icon: Building2, text: 'Find nearby hospitals', color: 'text-emerald-500' },
    { icon: Calendar, text: 'Book appointments', color: 'text-blue-500' },
    { icon: QueueIcon, text: 'Track your live queue', color: 'text-teal-500' },
    { icon: QrCode, text: 'Check in with one QR code', color: 'text-purple-500' },
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-2">
      {/* Large CareFlow Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-3 mb-1"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-500/10">
          <Activity className="h-9 w-9 text-white" />
        </div>
      </motion.div>

      {/* Main Welcome Copy */}
      <div className="max-w-sm mx-auto space-y-2">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] leading-tight">
          Welcome to CareFlow
        </h1>
        <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold italic">
          "Healthcare should feel calm."
        </p>
      </div>

      {/* Feature Bullet List Card */}
      <div className="w-full p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-2.5 text-left text-xs text-[var(--text-primary)]">
        {featureList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 font-medium">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 shrink-0">
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <span className="leading-snug">{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 pt-1">
        <AuthButton
          variant="primary"
          icon={ArrowRight}
          onClick={handleContinue}
        >
          Continue
        </AuthButton>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={handleLogin}
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  );
};
