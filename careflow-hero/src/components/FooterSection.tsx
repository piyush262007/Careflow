import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Activity, ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RippleButton } from './RippleButton';
import { useAuth } from '../context/AuthContext';

export const FooterSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Magnetic spring physics for Primary CTA
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

  const handleExperienceClick = () => {
    if (isAuthenticated && user) {
      const targetRoute = user.role === 'doctor' ? '/doctor' : user.role === 'hospital' ? '/hospitals' : '/patient';
      navigate(targetRoute);
    } else {
      navigate('/welcome');
    }
  };

  const handleWatchTour = () => {
    const el = document.getElementById('enterprise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-20 lg:py-28 theme-transition">
      {/* Soft Ambient Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 text-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300 tracking-widest uppercase">
            THE FUTURE OF HEALTHCARE IS HERE
          </span>
        </motion.div>

        {/* Headline ("Healthcare should feel calm.") */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[var(--text-primary)] mb-6 max-w-3xl mx-auto"
        >
          Healthcare should feel{' '}
          <span className="gradient-text">calm.</span>
        </motion.h2>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-[var(--text-secondary)] font-normal max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Empower your entire medical network with intelligent live queues, instant patient triage, and unified hospital workflows today.
        </motion.p>

        {/* Dual Primary & Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA with Magnetic Pull & Ripple Click */}
          <motion.div
            style={{ x: primarySpringX, y: primarySpringY }}
            onMouseMove={handlePrimaryMouseMove}
            onMouseLeave={handlePrimaryMouseLeave}
            className="inline-block"
          >
            <RippleButton
              onClick={handleExperienceClick}
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-600/30 transition-shadow duration-300 hover:shadow-emerald-500/45 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-emerald-100 animate-pulse" />
                Experience CareFlow
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </RippleButton>
          </motion.div>

          {/* Secondary CTA */}
          <RippleButton
            onClick={handleWatchTour}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] px-7 py-4 text-base font-medium text-[var(--text-primary)] backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-[var(--bg-item-hover)] cursor-pointer"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
              <Play className="h-3 w-3 fill-current ml-0.5" />
            </div>
            <span>Watch Product Tour</span>
          </RippleButton>
        </motion.div>

        {/* Four Product Values */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] mb-16"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Instant 14-Day Free Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>99.99% Uptime Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>24/7 Dedicated Support</span>
          </div>
        </motion.div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm">
              <Activity className="h-3.5 w-3.5" />
            </div>
            <span className="font-heading font-extrabold text-sm text-[var(--text-primary)]">CareFlow Inc.</span>
            <span>© 2026 CareFlow Technologies. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[var(--text-secondary)] font-medium">
            <a href="#privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-emerald-500 transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
