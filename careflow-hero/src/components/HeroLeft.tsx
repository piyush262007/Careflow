import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ShieldCheck, Zap, Bot, ArrowRight, Play, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatedCounter } from './AnimatedCounter';
import { RippleButton } from './RippleButton';

export const HeroLeft: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Magnetic spring values for Primary CTA
  const primaryX = useMotionValue(0);
  const primaryY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const primarySpringX = useSpring(primaryX, springConfig);
  const primarySpringY = useSpring(primaryY, springConfig);

  const handlePrimaryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    primaryX.set(x * 0.15);
    primaryY.set(y * 0.2);
  };

  const handlePrimaryMouseLeave = () => {
    primaryX.set(0);
    primaryY.set(0);
  };

  const handleStartTrial = () => {
    if (isAuthenticated && user) {
      const targetRoute = user.role === 'doctor' ? '/doctor' : user.role === 'hospital' ? '/hospitals' : '/patient';
      navigate(targetRoute);
    } else {
      navigate('/welcome');
    }
  };

  const handleWatchDemo = () => {
    const el = document.getElementById('enterprise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-xl z-10 pt-20 lg:pt-0">
      {/* Release Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
          CareFlow AI 3.0 Release
        </span>
        <span className="text-slate-400 dark:text-slate-500">|</span>
        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
          Next-Gen Health System <ArrowRight className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-6"
      >
        Healthcare,{' '}
        <span className="gradient-text block mt-1">
          Beautifully Connected.
        </span>
      </motion.h1>

      {/* Supporting Copy */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-8"
      >
        Streamline clinical workflows, automate queue management, and deliver 
        predictive patient intelligence with an enterprise-grade AI health platform.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-4 mb-10"
      >
        {/* Primary CTA with Magnetic Pull & Ripple Click */}
        <motion.div
          style={{ x: primarySpringX, y: primarySpringY }}
          onMouseMove={handlePrimaryMouseMove}
          onMouseLeave={handlePrimaryMouseLeave}
          className="inline-block"
        >
          <RippleButton
            onClick={handleStartTrial}
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-600/30 transition-shadow duration-300 hover:shadow-emerald-500/45 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </RippleButton>
        </motion.div>

        {/* Secondary CTA */}
        <RippleButton
          onClick={handleWatchDemo}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <Play className="h-3 w-3 fill-current ml-0.5" />
          </div>
          <span>Watch 2-Min Demo</span>
        </RippleButton>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-white/10"
      >
        <div className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-white/[0.03] px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <span>HIPAA & SOC2 Certified</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-white/[0.03] px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300">
          <Zap className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span>Real-time Clinical Engine</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-white/[0.03] px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300">
          <Bot className="h-4 w-4 text-purple-500 dark:text-purple-400" />
          <span>AI Intelligence 3.0</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 ml-1">
          <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          <span>Trusted by <strong className="text-slate-900 dark:text-white font-bold"><AnimatedCounter value={10000} suffix="+" /></strong> Clinicians</span>
        </div>
      </motion.div>
    </div>
  );
};
