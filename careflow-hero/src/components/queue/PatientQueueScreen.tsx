import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Stethoscope, Building2, Ticket, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { QueuePatient } from './data/mockQueueData';

interface PatientQueueScreenProps {
  currentPatient: QueuePatient;
  activeDoctorInSessionToken: string;
}

export const PatientQueueScreen: React.FC<PatientQueueScreenProps> = ({
  currentPatient,
  activeDoctorInSessionToken,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-md">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[var(--text-primary)]">
                Live Clinic Queue Active
              </h2>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                Live Syncing
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Receiving live queue signals from {currentPatient.doctorName}'s examination suite.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] shrink-0">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Patient Pass: {currentPatient.tokenNumber}</span>
        </div>
      </motion.div>

      {/* Main 4 Metric Live Queue Highlight Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Queue Position */}
        <div className="flow-glass p-5 rounded-3xl border border-emerald-500/30 shadow-lg space-y-2 relative overflow-hidden">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] block">
            Queue Position
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              #{currentPatient.queuePosition}
            </span>
            <span className="text-xs font-bold text-[var(--text-secondary)]">in line</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">
            {currentPatient.queuePosition === 1 ? 'You are next in line!' : `${currentPatient.queuePosition - 1} patient(s) ahead of you`}
          </p>
        </div>

        {/* Metric 2: Current Token */}
        <div className="flow-glass p-5 rounded-3xl border border-blue-500/30 shadow-lg space-y-2 relative overflow-hidden">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] block">
            Your Token Number
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              {currentPatient.tokenNumber}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
            <Ticket className="h-3 w-3 text-blue-500" />
            <span>Currently Serving: <strong>{activeDoctorInSessionToken}</strong></span>
          </p>
        </div>

        {/* Metric 3: Estimated Wait Time */}
        <div className="flow-glass p-5 rounded-3xl border border-amber-500/30 shadow-lg space-y-2 relative overflow-hidden">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] block">
            Estimated Wait
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-amber-500">
              ~{currentPatient.estimatedWaitMins}
            </span>
            <span className="text-xs font-bold text-[var(--text-secondary)]">minutes</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-500" />
            <span>Expected Call: ~{currentPatient.appointmentTime}</span>
          </p>
        </div>

        {/* Metric 4: Room Number */}
        <div className="flow-glass p-5 rounded-3xl border border-[var(--border-color)] shadow-lg space-y-2 relative overflow-hidden">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] block">
            Examination Room
          </span>
          <div className="text-base font-extrabold text-[var(--text-primary)] truncate">
            {currentPatient.roomNumber}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 truncate">
            <Building2 className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="truncate">{currentPatient.department}</span>
          </p>
        </div>
      </div>

      {/* Doctor & Queue Status Card */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-base flex items-center justify-center shadow-md">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">{currentPatient.doctorName}</h3>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{currentPatient.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Queue Status: Active — Doctor In Session</span>
            </span>
          </div>
        </div>

        {/* Patient Instructions Bar */}
        <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-1">
          <span className="font-bold text-[var(--text-primary)] block">Patient Queue Instructions</span>
          <p>
            Please remain seated in the 3rd Floor Waiting Lounge. Audio chime and digital displays will call Token <strong>{currentPatient.tokenNumber}</strong> when {currentPatient.doctorName} is ready.
          </p>
        </div>
      </div>
    </div>
  );
};
