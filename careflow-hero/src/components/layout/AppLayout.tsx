import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SidebarNav } from '../dashboard/patient/SidebarNav';
import { MobileNav } from '../dashboard/patient/MobileNav';
import { useAuth } from '../../context/AuthContext';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthOpen, logout } = useAuth();

  // Derive activeTab directly from location.pathname to prevent state sync lag & extra renders
  const activeTab = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith('/today-care')) return 'today';
    if (path.startsWith('/hospitals')) return 'hospitals';
    if (path.startsWith('/appointments')) return 'appointments';
    if (path.startsWith('/companion')) return 'companion';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/doctor')) return 'doctor';
    return 'dashboard';
  }, [location.pathname]);

  const handleExit = useCallback(() => {
    setIsAuthOpen(false);
    logout();
    navigate('/login');
  }, [setIsAuthOpen, logout, navigate]);

  const handleNavChange = useCallback((tab: string) => {
    if (tab === 'today') {
      navigate('/today-care');
    } else if (tab === 'hospitals') {
      navigate('/hospitals');
    } else if (tab === 'appointments') {
      navigate('/appointments');
    } else if (tab === 'dashboard') {
      navigate('/patient');
    } else if (tab === 'companion') {
      navigate('/companion');
    } else if (tab === 'profile' || tab === 'settings') {
      navigate('/profile');
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col lg:flex-row theme-transition selection:bg-emerald-600 selection:text-white">
      {/* Persistent Left Sidebar Navigation */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={handleNavChange}
        onExit={handleExit}
      />

      {/* Main Content Viewport — Smooth Non-Blocking Fade (Zero Flicker) */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-[var(--bg-main)]">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="flex-1 flex flex-col w-full h-full"
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Persistent Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={handleNavChange} />
    </div>
  );
};
