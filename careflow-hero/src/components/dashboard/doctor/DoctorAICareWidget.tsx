import React from 'react';
import { Bot, Sparkles, BarChart2 } from 'lucide-react';

interface DoctorAICareWidgetProps {
  insightMessage: string;
  onViewInsights?: () => void;
  onAskAI?: () => void;
}

export const DoctorAICareWidget: React.FC<DoctorAICareWidgetProps> = ({
  insightMessage,
  onViewInsights,
  onAskAI,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/20 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-purple-500/25 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
          <Bot className="w-4 h-4" />
          <span>CareFlow Clinical AI</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
          AI v2.4
        </span>
      </div>

      <div>
        <h4 className="font-heading font-extrabold text-base text-[var(--text-primary)]">
          Live Clinical Intelligence
        </h4>
        <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed font-medium">
          "{insightMessage}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={onViewInsights}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] font-bold text-xs transition-colors cursor-pointer"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>View Insights</span>
        </button>

        <button
          onClick={onAskAI}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 hover:scale-[1.01] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask CareFlow AI</span>
        </button>
      </div>
    </div>
  );
};
