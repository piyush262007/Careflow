import React from 'react';
import { Clock, FileText, AlertCircle, HelpCircle, FileSpreadsheet } from 'lucide-react';

export const BeforeCard: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-slate-300/60 dark:border-slate-800/80 bg-slate-100/90 dark:bg-[#0F172A]/90 p-5 backdrop-blur-xl shadow-md transition-all duration-400">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
          <AlertCircle className="h-4 w-4 text-slate-400" />
          <span>Legacy Process (Traditional System)</span>
        </div>
        <span className="rounded border border-slate-300 dark:border-slate-700 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-500">
          STATUS: UNCERTAIN
        </span>
      </div>

      <div className="space-y-3">
        {/* Item 1: Long Queues */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/40 dark:bg-slate-900/60 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-300/60 dark:bg-slate-800 text-slate-500">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Queue Position</div>
              <div className="text-[11px] text-slate-500">Unknown · Est. wait &gt; 90 min</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">No Live Updates</span>
        </div>

        {/* Item 2: Paper Records */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/40 dark:bg-slate-900/60 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-300/60 dark:bg-slate-800 text-slate-500">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Physical Records</div>
              <div className="text-[11px] text-slate-500">Paper File Clipboard #8492</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-500">Filing Delayed</span>
        </div>

        {/* Item 3: Missed Appointments */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/40 dark:bg-slate-900/60 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-300/60 dark:bg-slate-800 text-slate-500">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Appointment Confirmation</div>
              <div className="text-[11px] text-slate-500">Unconfirmed · Paper Slip Mailed</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-rose-500">High No-Show Risk</span>
        </div>

        {/* Item 4: Manual Registration */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/40 dark:bg-slate-900/60 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-300/60 dark:bg-slate-800 text-slate-500">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Check-in Process</div>
              <div className="text-[11px] text-slate-500">Manual Clipboard Form</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Manual Data Entry</span>
        </div>
      </div>
    </div>
  );
};
