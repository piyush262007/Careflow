import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, Calendar, Stethoscope, AlertCircle, ArrowRight } from 'lucide-react';
import type { AppointmentRequest } from './data/mockDoctorData';

interface AppointmentRequestCardProps {
  request: AppointmentRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onSuggestNewTime: (request: AppointmentRequest) => void;
}

export const AppointmentRequestCard: React.FC<AppointmentRequestCardProps> = ({
  request,
  onAccept,
  onReject,
  onSuggestNewTime,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-2xl border transition-all duration-300 bg-[var(--bg-surface)] p-5 space-y-4 shadow-sm hover:shadow-md ${
        request.status === 'Confirmed'
          ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
          : request.status === 'Declined'
          ? 'border-rose-500/30 opacity-75'
          : request.status === 'Time Suggested'
          ? 'border-blue-500/40 ring-1 ring-blue-500/20'
          : 'border-[var(--border-color)] hover:border-emerald-500/40'
      }`}
    >
      {/* Card Header: Patient Avatar, Name & Status Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shadow-md shrink-0">
            {request.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                {request.patientName}
              </h3>
              <span className="text-[11px] text-[var(--text-muted)] font-normal">
                ({request.patientAge}y • {request.patientGender})
              </span>
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
              {request.department}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span
            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${
              request.status === 'Confirmed'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : request.status === 'Declined'
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                : request.status === 'Time Suggested'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
            }`}
          >
            {request.status}
          </span>
          <span className="text-[10px] font-bold text-[var(--text-primary)]">
            {request.consultationFee}
          </span>
        </div>
      </div>

      {/* Patient Symptoms & History Box */}
      <div className="p-3.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-start gap-2">
          <Stethoscope className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
              Symptoms / Chief Complaint
            </span>
            <p className="text-xs text-[var(--text-primary)] font-semibold leading-relaxed">
              "{request.symptoms}"
            </p>
          </div>
        </div>

        {request.historyNotes && (
          <div className="text-[11px] text-[var(--text-secondary)] pl-6 border-t border-[var(--border-subtle)] pt-1.5 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Clinical Note: {request.historyNotes}</span>
          </div>
        )}
      </div>

      {/* Requested Time & Suggested Time Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
        <div className="flex items-center gap-1.5 text-[var(--text-secondary)] font-semibold">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>Requested: <strong className="text-[var(--text-primary)]">{request.requestedTime}</strong></span>
        </div>

        {request.suggestedTime && (
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
            Suggested: {request.suggestedTime}
          </div>
        )}
      </div>

      {/* Action Buttons: Accept, Reject, Suggest New Time */}
      <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-end gap-2">
        {request.status === 'Pending' ? (
          <>
            {/* Reject Button */}
            <button
              type="button"
              onClick={() => onReject(request.id)}
              className="py-2 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Reject</span>
            </button>

            {/* Suggest New Time Button */}
            <button
              type="button"
              onClick={() => onSuggestNewTime(request)}
              className="py-2 px-3.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Suggest New Time</span>
            </button>

            {/* Accept Button */}
            <button
              type="button"
              onClick={() => onAccept(request.id)}
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Accept</span>
            </button>
          </>
        ) : (
          <div className="w-full flex items-center justify-between text-xs text-[var(--text-muted)] pt-1">
            <span>Action completed for this appointment request.</span>
            <button
              type="button"
              onClick={() => onSuggestNewTime(request)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Reschedule Slot</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
