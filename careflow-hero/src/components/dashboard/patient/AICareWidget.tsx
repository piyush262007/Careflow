import React from 'react';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

interface AICareWidgetProps {
  onAskAI?: () => void;
}

export const AICareWidget: React.FC<AICareWidgetProps> = ({ onAskAI }) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/20 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-purple-500/25 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
          <Bot className="w-4 h-4" />
          <span>CareFlow AI Assistant</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
          AI v2.4
        </span>
      </div>

      <div>
        <h4 className="font-heading font-extrabold text-base text-[var(--text-primary)]">
          Need intelligent care navigation?
        </h4>
        <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
          Have a question about your upcoming appointment, medication dosages, or health care plan?
        </p>
      </div>

      <div className="pt-1">
        <button
          onClick={onAskAI}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 hover:scale-[1.01] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask CareFlow AI</span>
          <ArrowRight className="w-3.5 h-3.5 ml-auto" />
        </button>
      </div>
    </div>
  );
};
