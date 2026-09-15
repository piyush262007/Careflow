import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const AnalyticsChartCard: React.FC = () => {
  return (
    <div className="glass-card-mid rounded-xl p-3.5 md:col-span-2 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
          <TrendingUp className="h-3.5 w-3.5 text-teal-500" />
          <span>Patient Analytics</span>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-md">
          This Week
        </span>
      </div>

      {/* SVG Path Animated Chart */}
      <div className="h-16 w-full relative my-1 overflow-hidden">
        <svg viewBox="0 0 200 60" className="h-full w-full">
          <defs>
            <linearGradient id="analyticsAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--chart-line)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--chart-line)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,45 C20,42 30,35 50,30 C70,25 80,38 100,28 C120,18 140,22 160,15 C180,8 190,12 200,10 L200,60 L0,60 Z"
            fill="url(#analyticsAreaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.path
            d="M0,45 C20,42 30,35 50,30 C70,25 80,38 100,28 C120,18 140,22 160,15 C180,8 190,12 200,10"
            fill="none"
            stroke="var(--chart-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              d: [
                "M0,45 C20,42 30,35 50,30 C70,25 80,38 100,28 C120,18 140,22 160,15 C180,8 190,12 200,10",
                "M0,45 C20,40 30,37 50,28 C70,26 80,35 100,25 C120,20 140,20 160,13 C180,9 190,10 200,8",
                "M0,45 C20,42 30,35 50,30 C70,25 80,38 100,28 C120,18 140,22 160,15 C180,8 190,12 200,10",
              ],
            }}
            transition={{
              pathLength: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
              d: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </svg>
      </div>

      <div className="flex items-center gap-6 text-xs pt-1 border-t border-[var(--border-subtle)]">
        <div>
          <span className="font-stat text-sm font-bold text-[var(--text-primary)]">1,247</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Weekly Visits</span>
        </div>
        <div>
          <span className="font-stat text-sm font-bold text-teal-600 dark:text-teal-400">94%</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Satisfaction</span>
        </div>
      </div>
    </div>
  );
};
