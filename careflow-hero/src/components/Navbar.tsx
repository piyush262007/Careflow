import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Activity, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFlowPulse } from '../context/FlowPulseContext';
import { useShowcase } from '../context/ShowcaseContext';
import { useAuth } from '../context/AuthContext';
import { NotificationBell } from './notifications/NotificationBell';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { activeStep, triggerPulse } = useFlowPulse();
  const { setActiveTab } = useShowcase();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [isScrolled80, setIsScrolled80] = useState(false);
  const [activeSection, setActiveSection] = useState('platform');

  const navRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const isLogoPulsing = activeStep === 'logo';

  const navItems = [
    { id: 'platform', label: 'Platform', targetId: 'enterprise', tab: 'patient', color: 'emerald' },
    { id: 'patients', label: 'Patients', targetId: 'enterprise', tab: 'patient', color: 'blue' },
    { id: 'doctors', label: 'Doctors', targetId: 'enterprise', tab: 'doctor', color: 'emerald' },
    { id: 'hospitals', label: 'Hospitals', targetId: 'enterprise', tab: 'hospital', color: 'purple' },
    { id: 'pricing', label: 'Pricing', targetId: 'pricing', tab: null, color: 'blue' },
  ] as const;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled80(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'enterprise') setActiveSection('platform');
          else if (entry.target.id === 'solutions') setActiveSection('patients');
          else if (entry.target.id === 'pricing') setActiveSection('pricing');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    ['enterprise', 'solutions', 'pricing'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlarePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[number]) => {
    e.preventDefault();
    setActiveSection(item.id);
    if (item.tab) {
      setActiveTab(item.tab);
    }
    const targetEl = document.getElementById(item.targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExperienceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated && user) {
      const targetRoute = user.role === 'doctor' ? '/doctor' : user.role === 'hospital' ? '/hospitals' : '/patient';
      navigate(targetRoute);
    } else {
      navigate('/welcome');
    }
  };

  const getCapsuleStyle = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/20 border-emerald-400/40 text-emerald-600 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
      case 'purple':
        return 'bg-purple-500/20 border-purple-400/40 text-purple-600 dark:text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]';
      case 'blue':
      default:
        return 'bg-blue-500/20 border-blue-400/40 text-blue-600 dark:text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.25)]';
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:px-8 transition-all duration-400"
    >
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-[20px] px-5 transition-all duration-400 overflow-hidden transform-gpu border ${
          theme === 'dark'
            ? 'bg-slate-950/60 border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]'
            : 'bg-white/88 border-slate-900/10 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]'
        } backdrop-blur-[30px] backdrop-saturate-[180%] ${
          isScrolled80 ? 'py-2.5 scale-[0.985] shadow-2xl' : 'py-3.5 scale-100'
        } before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-emerald-400/30 before:to-transparent before:pointer-events-none`}
      >
        {/* Dynamic Specular Light Reflection Glare */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(220px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255, 255, 255, 0.18), transparent 80%)`,
            }}
          />
        )}

        {/* Logo with Flow Pulse Glow */}
        <button
          onClick={triggerPulse}
          className="relative z-10 flex items-center gap-2.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
          title="Click to trigger CareFlow Signature Pulse"
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
                PRO
              </span>
            </span>
          </div>
        </button>

        {/* Navigation Links with Role-Adaptive Active Pill */}
        <nav className="relative z-10 hidden md:flex items-center gap-1.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.04] px-3 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-4 py-1.5 text-xs font-semibold transition-all duration-255 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl ${
                  isActive
                    ? item.color === 'emerald'
                      ? 'text-emerald-600 dark:text-emerald-300'
                      : item.color === 'purple'
                      ? 'text-purple-600 dark:text-purple-300'
                      : 'text-blue-600 dark:text-blue-300'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="flowGlassActiveCapsule"
                    className={`absolute inset-0 rounded-xl border backdrop-blur-md ${getCapsuleStyle(item.color)}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Notification Bell Component */}
          <NotificationBell />

          {/* Circular Flow Glass Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Dark / Light Theme"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 dark:border-white/15 bg-slate-100/70 dark:bg-white/10 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-md backdrop-blur-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="h-4 w-4 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="h-4 w-4 text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <Link
            to="/login"
            className="hidden sm:block text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
          >
            Sign In
          </Link>

          {/* Premium Green Healthcare Flow Glass Button */}
          <motion.div
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              type="button"
              onClick={handleExperienceClick}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-xl shadow-emerald-500/25 border border-white/25 backdrop-blur-xl transition-all duration-300 hover:shadow-emerald-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 group cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Sparkles className="h-3.5 w-3.5 text-emerald-100 animate-pulse relative z-10" />
              <span className="relative z-10">Experience CareFlow</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 relative z-10" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
