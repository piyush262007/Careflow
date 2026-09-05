import React from 'react';
import { motion } from 'framer-motion';
import { User, UserCheck, Building2, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import type { UserRole } from '../../../context/AuthContext';
import { AuthButton } from '../ui/AuthButton';

export const RoleSelectionView: React.FC = () => {
  const { selectedRole, setSelectedRole, setActiveView } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    setActiveView('welcome');
    navigate('/welcome');
  };

  const handleContinue = () => {
    setActiveView('register');
    navigate('/register');
  };

  const handleLogin = () => {
    setActiveView('login');
    navigate('/login');
  };

  const roles = [
    {
      id: 'patient' as UserRole,
      title: 'Patient',
      subtitle: 'Track live queues, manage appointments & view health history',
      icon: User,
      badge: 'Personal',
      color: 'blue' as const,
      accentBg: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
      illustration: (
        <svg className="w-12 h-12 text-blue-500" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2.5" />
          <path d="M10 38C10 30.268 16.268 24 24 24C31.732 24 38 30.268 38 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="34" cy="14" r="3" fill="#3B82F6" />
        </svg>
      ),
    },
    {
      id: 'doctor' as UserRole,
      title: 'Doctor',
      subtitle: 'AI clinical notes, patient queue suite & schedule management',
      icon: UserCheck,
      badge: 'Clinical',
      color: 'emerald' as const,
      accentBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
      illustration: (
        <svg className="w-12 h-12 text-emerald-500" viewBox="0 0 48 48" fill="none">
          <path d="M14 10H34V38H14V10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M24 18V28M19 23H29" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 10V6H28V10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'hospital' as UserRole,
      title: 'Hospital',
      subtitle: 'Multi-department operations, staff capacity & emergency triage',
      icon: Building2,
      badge: 'Enterprise',
      color: 'purple' as const,
      accentBg: 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400',
      illustration: (
        <svg className="w-12 h-12 text-purple-500" viewBox="0 0 48 48" fill="none">
          <path d="M10 40V12L24 6L38 12V40H10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M20 20H28M24 16V24" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="18" y="30" width="12" height="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const currentRoleObj = roles.find((r) => r.id === selectedRole) || roles[0];

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Header */}
      <div>
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          How will you use CareFlow today?
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Select your perspective to personalize your workspace experience.
        </p>
      </div>

      {/* 3 Large Cards */}
      <div className="grid grid-cols-1 gap-3">
        {roles.map((r) => {
          const isSelected = selectedRole === r.id;

          const cardBorders: Record<'blue' | 'emerald' | 'purple', string> = {
            blue: isSelected
              ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-500/10 shadow-md'
              : 'border-[var(--border-color)] hover:border-blue-500/40 bg-[var(--bg-surface)]',
            emerald: isSelected
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/10 shadow-md'
              : 'border-[var(--border-color)] hover:border-emerald-500/40 bg-[var(--bg-surface)]',
            purple: isSelected
              ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-500/10 shadow-md'
              : 'border-[var(--border-color)] hover:border-purple-500/40 bg-[var(--bg-surface)]',
          };

          return (
            <motion.div
              key={r.id}
              whileHover={{ y: -2, scale: 1.01 }}
              onClick={() => setSelectedRole(r.id)}
              className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${cardBorders[r.color]}`}
            >
              <div className="flex items-center gap-3">
                {/* SVG Illustration Container */}
                <div className={`p-2.5 rounded-xl border shrink-0 ${r.accentBg}`}>
                  {r.illustration}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{r.title}</h3>
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-[var(--border-color)] bg-[var(--bg-card-bg)]'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-snug">{r.subtitle}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-2 space-y-2">
        <AuthButton
          variant="primary"
          icon={ArrowRight}
          onClick={handleContinue}
        >
          Continue as {currentRoleObj.title}
        </AuthButton>

        <div className="text-center">
          <button
            onClick={handleLogin}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  );
};
