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
import { NotificationToast } from './workspace/NotificationToast';
import { CalendarMiniCard } from './workspace/CalendarMiniCard';
import { useFlowPulse } from '../context/FlowPulseContext';

export const HeroRight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeStep } = useFlowPulse();

  // Mouse position tracking for 3D parallax tilt (MAX 3 DEGREES)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const springConfig = { damping: 30, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    setGlowPos({
      x: Math.round((e.clientX - rect.left) / rect.width * 100),
      y: Math.round((e.clientY - rect.top) / rect.height * 100),
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
      className="relative w-full max-w-2xl py-12 perspective-1200 z-10 flex items-center justify-center"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        {/* SVG Connection Lines Overlay with Flow Pulse Light Traveling */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full z-10 overflow-visible opacity-50 dark:opacity-40">
          <defs>
            <linearGradient id="lineGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Connection to Doctor Status (Top Right) */}
          <path
            d="M 500,40 L 440,80"
            stroke={activeStep === 'doctor' ? '#3B82F6' : 'url(#lineGradBlue)'}
            strokeWidth={activeStep === 'doctor' ? '2.5' : '1.2'}
            strokeDasharray="4 4"
            fill="none"
            className="transition-all duration-300"
          />

          {/* Connection to Medicine Reminder (Top Left) */}
          <path
            d="M 120,120 L 180,160"
            stroke={activeStep === 'medicine' ? '#F59E0B' : 'url(#lineGradBlue)'}
            strokeWidth={activeStep === 'medicine' ? '2.5' : '1.2'}
            strokeDasharray="4 4"
            fill="none"
            className="transition-all duration-300"
          />

          {/* Connection to AI Assistant (Bottom Left) */}
          <path
            d="M 150,380 L 220,340"
            stroke={activeStep === 'ai' ? '#8B5CF6' : 'url(#lineGradPurple)'}
            strokeWidth={activeStep === 'ai' ? '2.5' : '1.2'}
            strokeDasharray="4 4"
            fill="none"
            className="transition-all duration-300"
          />
        </svg>

        {/* Slow floating wrapper for entire dashboard */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Main Dashboard Window Base */}
          <DashboardFrame glowPos={glowPos}>
            <HealthScoreCard />
            <AppointmentsCard />
            <LiveQueueCard />
            <AnalyticsChartCard />
          </DashboardFrame>
        </motion.div>

        {/* ═══ Layered Floating Cards (Flow Pulse Step Highlights) ═══ */}

        {/* Doctor Status Card — Foreground Top Right */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 0.4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -top-6 -right-4 sm:-right-8 z-30 hidden sm:block transition-all duration-500 rounded-xl ${
            activeStep === 'doctor' ? 'ring-2 ring-blue-500/80 shadow-lg shadow-blue-500/40 scale-105' : ''
          }`}
        >
          <DoctorStatusCard />
        </motion.div>

        {/* Notification Toast — Foreground Mid Right */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className={`absolute top-1/3 -right-6 sm:-right-12 z-30 hidden sm:block transition-all duration-500 rounded-xl ${
            activeStep === 'toast' ? 'ring-2 ring-emerald-500/80 shadow-lg shadow-emerald-500/40 scale-105' : ''
          }`}
        >
          <NotificationToast />
        </motion.div>

        {/* Medicine Reminder — Midground Left */}
        <motion.div
          animate={{ y: [0, -7, 0], rotate: [0, -0.3, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className={`absolute top-1/4 -left-6 sm:-left-10 z-20 hidden sm:block transition-all duration-500 rounded-xl ${
            activeStep === 'medicine' ? 'ring-2 ring-amber-500/80 shadow-lg shadow-amber-500/40 scale-105' : ''
          }`}
        >
          <MedicineReminderCard />
        </motion.div>

        {/* AI Chat Widget — Foreground Bottom Left */}
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className={`absolute -bottom-6 left-4 sm:left-6 z-30 w-72 transition-all duration-500 rounded-xl ${
            activeStep === 'ai' ? 'ring-2 ring-purple-500/80 shadow-lg shadow-purple-500/40 scale-105' : ''
          }`}
        >
          <AIChatWidget />
        </motion.div>

        {/* Calendar Mini Card — Background Bottom Right */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -bottom-8 right-6 sm:right-10 z-10 hidden sm:block"
        >
          <CalendarMiniCard />
        </motion.div>
      </motion.div>
    </div>
  );
};
