import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import type { WeeklyCareMetric } from '../../../services/mockPatientData';

interface CareActivityChartProps {
  metrics: WeeklyCareMetric[];
}

export const CareActivityChart: React.FC<CareActivityChartProps> = ({ metrics }) => {
  const maxScore = 100;

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>Care Activity & Vitals Log</span>
          </h3>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Weekly Health Index Performance</p>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>94 Avg</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-4 flex items-end justify-between gap-2 h-36 border-b border-[var(--border-subtle)] pb-2">
        {metrics.map((item, idx) => {
          const heightPercent = Math.round((item.score / maxScore) * 100);
          const isToday = idx === metrics.length - 1;

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div className="text-[10px] font-bold text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                {item.score}%
              </div>
              <div className="w-full bg-[var(--bg-card-bg)] rounded-t-lg h-full flex items-end overflow-hidden">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday
                      ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md shadow-emerald-500/20'
                      : 'bg-emerald-500/20 group-hover:bg-emerald-500/40'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className={`text-[11px] font-bold ${isToday ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] font-medium pt-1">
        <span>Daily vitals logged consistently</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Compliance</span>
      </div>
    </div>
  );
};
