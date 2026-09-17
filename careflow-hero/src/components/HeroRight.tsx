import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { DashboardFrame } from './workspace/DashboardFrame';
import { HealthScoreCard } from './workspace/HealthScoreCard';
import { AppointmentsCard } from './workspace/AppointmentsCard';
import { LiveQueueCard } from './workspace/LiveQueueCard';
import { AnalyticsChartCard } from './workspace/AnalyticsChartCard';
import { DoctorStatusCard } from './workspace/DoctorStatusCard';
import { AIChatWidget } from './workspace/AIChatWidget';
import { MedicineReminderCard } from './workspace/MedicineReminderCard';
import { useFlowPulse } from '../context/FlowPulseContext';

export const HeroRight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeStep } = useFlowPulse();

  // Mouse position tracking for gentle 3D parallax tilt (MAX 2.5 DEGREES)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const springConfig = { damping: 35, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    setGlowPos({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl px-2 sm:px-4 py-6 sm:py-10 perspective-1200 z-10 flex items-center justify-center"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        {/* Subtle Ambient Background Glow for Elevation */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/15 via-teal-500/10 to-indigo-600/15 rounded-3xl blur-2xl pointer-events-none opacity-60 dark:opacity-40" />

        {/* SVG Subtle Connecting Lines (Hidden on Mobile) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full z-10 overflow-visible hidden md:block opacity-40">
          <defs>
            <linearGradient id="lineGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Line to Doctor Status (Top Right) */}
          <path
            d="M 480,25 L 420,60"
            stroke={activeStep === 'doctor' ? '#3B82F6' : 'url(#lineGradBlue)'}
            strokeWidth={activeStep === 'doctor' ? '2' : '1'}
            strokeDasharray="4 4"
            fill="none"
            className="transition-all duration-300"
          />

          {/* Line to Medicine Reminder (Mid Left) */}
          <path
            d="M 20,160 L 90,180"
            stroke={activeStep === 'medicine' ? '#F59E0B' : 'url(#lineGradAmber)'}
            strokeWidth={activeStep === 'medicine' ? '2' : '1'}
            strokeDasharray="4 4"
            fill="none"
            className="transition-all duration-300"
          />

          {/* Line to AI Chat Widget (Bottom Left) */}
          <path
            d="M 80,360 L 150,330"
            stroke={activeStep === 'ai' ? '#8B5CF6' : 'url(#lineGradPurple)'}
            strokeWidth={activeStep === 'ai' ? '2' : '1'}
            strokeDasharray="4 4"
            fill="none"
            className="transition-all duration-300"
          />
        </svg>

        {/* Central Main Dashboard Frame */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20 rounded-2xl border border-blue-500/20"
        >
          <DashboardFrame glowPos={glowPos}>
            <HealthScoreCard />
            <AppointmentsCard />
            <LiveQueueCard />
            <AnalyticsChartCard />
          </DashboardFrame>
        </motion.div>

        {/* ═══ Supporting Floating Cards (Clean 3-Card Ecosystem) ═══ */}

        {/* 1. Doctor Availability Card — Upper Right (Desktop & Tablet) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -top-5 -right-2 md:-right-6 lg:-right-8 z-30 hidden md:block transition-all duration-300 scale-90 lg:scale-100 ${
            activeStep === 'doctor'
              ? 'ring-2 ring-blue-500/80 shadow-lg shadow-blue-500/30 scale-95 lg:scale-105'
              : 'shadow-md shadow-blue-500/10'
          }`}
        >
          <DoctorStatusCard />
        </motion.div>

        {/* 2. Medicine Reminder Card — Mid-Left (Desktop & Tablet) */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className={`absolute top-1/3 -left-3 md:-left-6 lg:-left-8 z-20 hidden md:block transition-all duration-300 scale-90 lg:scale-100 ${
            activeStep === 'medicine'
              ? 'ring-2 ring-amber-500/80 shadow-lg shadow-amber-500/30 scale-95 lg:scale-105'
              : 'shadow-md shadow-amber-500/10'
          }`}
        >
          <MedicineReminderCard />
        </motion.div>

        {/* 3. CareFlow AI Card — Bottom-Left (Desktop only) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className={`absolute -bottom-5 left-3 md:left-6 lg:left-8 z-30 hidden lg:block w-64 transition-all duration-300 scale-90 lg:scale-100 ${
            activeStep === 'ai'
              ? 'ring-2 ring-purple-500/80 shadow-lg shadow-purple-500/30 scale-95 lg:scale-105'
              : 'shadow-md shadow-purple-500/10'
          }`}
        >
          <AIChatWidget />
        </motion.div>
      </motion.div>
    </div>
  );
};

