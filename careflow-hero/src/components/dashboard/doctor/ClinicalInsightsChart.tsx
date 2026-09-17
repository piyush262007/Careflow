import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import type { ClinicalInsightMetrics } from '../../../services/mockDoctorData';

interface ClinicalInsightsChartProps {
  insights: ClinicalInsightMetrics;
}

export const ClinicalInsightsChart: React.FC<ClinicalInsightsChartProps> = ({ insights }) => {
  const maxCount = 20;

  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-extrabold text-sm text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>Today's Clinical Care Activity</span>
          </h3>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Consultation Efficiency & Volume</p>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{insights.queueEfficiencyPercent}% Efficiency</span>
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs">
        <div>
          <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Avg Consult Time</span>
          <p className="text-base font-extrabold text-[var(--text-primary)] font-heading">{insights.avgConsultationMinutes} mins</p>
        </div>
        <div>
          <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Patients Served</span>
          <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">{insights.completed} Completed</p>
        </div>
      </div>

      {/* Weekly Trend Bar Chart */}
      <div className="pt-2 flex items-end justify-between gap-2 h-32 border-b border-[var(--border-subtle)] pb-2">
        {insights.weeklyPerformance.map((item, idx) => {
          const heightPercent = Math.round((item.patientsCount / maxCount) * 100);
          const isToday = idx === 4; // Friday

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
              <span className="text-[10px] font-bold text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                {item.patientsCount}
              </span>
              <div className="w-full bg-[var(--bg-card-bg)] rounded-t-lg h-full flex items-end overflow-hidden">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday
                      ? 'bg-gradient-to-t from-blue-600 to-teal-400 shadow-md shadow-blue-500/20'
                      : 'bg-blue-500/20 group-hover:bg-blue-500/40'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className={`text-[10.5px] font-bold ${isToday ? 'text-blue-500' : 'text-[var(--text-muted)]'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
