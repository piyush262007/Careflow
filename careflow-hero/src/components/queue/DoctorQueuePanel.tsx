import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, CheckCircle2, Clock, Play, Activity } from 'lucide-react';
import type { QueuePatient } from './data/mockQueueData';

interface DoctorQueuePanelProps {
  patients: QueuePatient[];
  onCallNextPatient: () => void;
  onCompleteConsultation: () => void;
}

export const DoctorQueuePanel: React.FC<DoctorQueuePanelProps> = ({
  patients,
  onCallNextPatient,
  onCompleteConsultation,
}) => {
  const currentInConsultation = patients.find((p) => p.status === 'In Consultation');
  const waitingPatients = patients.filter((p) => p.status === 'Waiting');
  const completedPatients = patients.filter((p) => p.status === 'Completed');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Stethoscope className="h-3.5 w-3.5" />
            <span>Physician Queue Control Console</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
            Dr. Sarah Chen's Consultation Queue
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Manage active patient consultations, call next queued patients, and record completed sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCallNextPatient}
            disabled={waitingPatients.length === 0}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all shrink-0"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Call Next Patient</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Current Consultation Card | Right Waiting & Completed Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Patient in Consultation Card */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Current Active Consultation
          </h3>

          {currentInConsultation ? (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border-2 border-emerald-500/50 shadow-xl space-y-5 relative overflow-hidden"
            >
              {/* Top Pulse Status */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    In Session Now
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Token: {currentInConsultation.tokenNumber}
                </span>
              </div>

              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                  {currentInConsultation.avatarInitials}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">{currentInConsultation.patientName}</h4>
                  <span className="text-xs text-[var(--text-secondary)] block">
                    {currentInConsultation.department} • Room {currentInConsultation.roomNumber}
                  </span>
                </div>
              </div>

              {/* Consultation Timer Info */}
              <div className="p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5 font-semibold">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  <span>Session Elapsed: <strong>08:42 mins</strong></span>
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Checked In: {currentInConsultation.checkInTime}</span>
              </div>

              {/* Action Button: Complete Consultation */}
              <button
                type="button"
                onClick={onCompleteConsultation}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Complete Consultation & Call Next</span>
              </button>
            </motion.div>
          ) : (
            <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-center space-y-3 shadow-sm">
              <Activity className="h-8 w-8 text-[var(--text-muted)] mx-auto" />
              <h4 className="text-sm font-bold text-[var(--text-primary)]">No Active Consultation</h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Click <strong>"Call Next Patient"</strong> to bring the next queued patient into Suite 304.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Waiting Patients & Completed History */}
        <div className="lg:col-span-6 space-y-6">
          {/* Waiting Patients List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Waiting Patients ({waitingPatients.length})
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Next Queue Line
              </span>
            </div>

            <div className="space-y-2.5">
              {waitingPatients.length === 0 ? (
                <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] text-center">
                  No patients currently waiting in queue.
                </div>
              ) : (
                waitingPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[var(--text-muted)] w-6">#{patient.queuePosition}</span>
                      <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/10 text-[var(--text-primary)] font-bold text-xs flex items-center justify-center shrink-0">
                        {patient.avatarInitials}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[var(--text-primary)]">{patient.patientName}</h5>
                        <span className="text-[10.5px] text-[var(--text-muted)] block">Est. Wait: ~{patient.estimatedWaitMins} mins</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg">
                      {patient.tokenNumber}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Completed Consultations History */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Completed Today ({completedPatients.length})
            </h3>

            <div className="space-y-2">
              {completedPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-xs opacity-80"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="font-bold text-[var(--text-primary)]">{patient.patientName}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">({patient.tokenNumber})</span>
                  </div>
                  <span className="text-[10.5px] text-[var(--text-muted)]">Finished at 10:15 AM</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
