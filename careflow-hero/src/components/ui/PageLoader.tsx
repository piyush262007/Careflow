import React from 'react';
import { Activity } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-pulse">
          <Activity className="h-8 w-8 text-white" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/40 animate-ping pointer-events-none" />
      </div>
      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase animate-pulse">
        Loading CareFlow Workspace...
      </p>
    </div>
  );
};
