import React from 'react';
import { Sparkles, ArrowRight, MessageSquareCode } from 'lucide-react';

interface AdminAICareWidgetProps {
  insightMessage?: string;
}

export const AdminAICareWidget: React.FC<AdminAICareWidgetProps> = ({
  insightMessage = "Today's appointment demand is 14% higher than the weekly average.",
}) => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-teal-900/10 border border-purple-500/20 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/20 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-heading">
                CareFlow AI Operations Insight
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                PROACTIVE
              </span>
            </div>
            <p className="text-xs font-semibold text-[var(--text-primary)] mt-1">{insightMessage}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => alert('CareFlow AI Insights requested')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            View Insights
          </button>
          <button
            onClick={() => alert('Opening CareFlow AI Copilot')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            Ask CareFlow AI
          </button>
        </div>
      </div>
    </div>
  );
};
