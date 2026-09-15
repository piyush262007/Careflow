import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { AuthView } from '../../context/AuthContext';

export const AuthViewSwitcherBar: React.FC = () => {
  const { setActiveView } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace('/', '') || 'welcome';

  const views: { id: AuthView; route: string; label: string }[] = [
    { id: 'welcome', route: '/welcome', label: '1. Welcome' },
    { id: 'role-selection', route: '/role-selection', label: '2. Role Select' },
    { id: 'login', route: '/login', label: '3. Login' },
    { id: 'register', route: '/register', label: '4. Register' },
    { id: 'forgot-password', route: '/forgot-password', label: '5. Reset Pass' },
  ];

  const handleNavigate = (v: typeof views[number]) => {
    setActiveView(v.id);
    navigate(v.route);
  };

  return (
    <div className="flex items-center justify-center p-1.5 rounded-2xl flow-glass border border-emerald-500/20 shadow-lg max-w-xl mx-auto w-full mb-4 z-30 relative">
      <div className="flex items-center gap-1 w-full overflow-x-auto no-scrollbar">
        {views.map((v) => {
          const isActive = currentPath === v.id || (currentPath === '' && v.id === 'welcome');
          return (
            <button
              key={v.id}
              onClick={() => handleNavigate(v)}
              className={`relative flex-1 py-1.5 px-2.5 text-[11px] font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeAuthViewPill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{v.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
