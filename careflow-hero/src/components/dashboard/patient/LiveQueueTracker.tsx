import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import type { LiveQueueData } from '../../../services/mockPatientData';

interface LiveQueueTrackerProps {
  queue: LiveQueueData;
}

export const LiveQueueTracker: React.FC<LiveQueueTrackerProps> = ({ queue }) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/20 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-blue-500/25 shadow-sm space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
          <Clock className="w-4 h-4" />
          <span>Live Queue Tracker</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          {queue.statusText}
        </span>
      </div>

      {/* Main Queue Status Banner */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Your Queue Ticket</span>
          <h3 className="text-3xl font-extrabold text-[var(--text-primary)] font-heading tracking-tight">
            You are <span className="text-blue-600 dark:text-blue-400">#{queue.position}</span> in line
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Currently seeing Patient #{queue.currentPatientSeen} · Total queued: {queue.totalInQueue}
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-right">
          <div className="h-10 w-10 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Est. Waiting</span>
            <p className="text-sm font-extrabold text-[var(--text-primary)] font-heading">
              ~{queue.estimatedWaitMinutes} mins
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-semibold">
          <span>Queue Progress</span>
          <span>{queue.progressPercent}% Completed</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-[var(--bg-card-bg)] overflow-hidden border border-[var(--border-color)]">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${queue.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Status Tip */}
      <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-300 bg-blue-500/05 p-2.5 rounded-xl border border-blue-500/15 font-medium">
        <AlertCircle className="w-4 h-4 shrink-0 text-blue-500" />
        <span>Please remain near Clinic Suite 304. Notifications will alert you when it's your turn.</span>
      </div>
    </div>
  );
};
