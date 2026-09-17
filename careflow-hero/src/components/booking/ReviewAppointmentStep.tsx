import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Stethoscope, Building2, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ReviewAppointmentStepProps {
  selectedDate: string;
  selectedTime: string;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export const ReviewAppointmentStep: React.FC<ReviewAppointmentStepProps> = ({
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
  isSubmitting = false,
}) => {
  const { user } = useAuth();

  const review = {
    patientName: user?.name || 'Sarah Jenkins',
    healthId: 'CF-849201',
    hospital: 'Metro Care Health Center',
    doctorName: 'Dr. Sarah Chen',
    specialty: 'Cardiology Specialist Consultation',
    fee: '₹1,500',
    date: selectedDate,
    time: selectedTime,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-1 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Step 3 of 4: Review Appointment</span>
        </div>
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
          Confirm Your Booking Request
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Please verify your appointment details below before submitting to Dr. Sarah Chen.
        </p>
      </div>

      {/* Review Card */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-md space-y-4 text-xs">
        {/* Patient Details Row */}
        <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              <User className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">Patient</span>
              <h4 className="font-bold text-[var(--text-primary)]">{review.patientName}</h4>
            </div>
          </div>
          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{review.healthId}</span>
        </div>

        {/* Consultation Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <span className="text-[var(--text-muted)] font-medium">Facility:</span>
            <span className="font-extrabold text-[var(--text-primary)] flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-emerald-500" />
              {review.hospital}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <span className="text-[var(--text-muted)] font-medium">Practitioner:</span>
            <span className="font-extrabold text-[var(--text-primary)] flex items-center gap-1">
              <Stethoscope className="h-3.5 w-3.5 text-emerald-500" />
              {review.doctorName}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <span className="text-[var(--text-muted)] font-medium">Consultation Type:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{review.specialty}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <span className="text-[var(--text-muted)] font-medium">Scheduled Time:</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 font-mono">
              <Calendar className="h-3.5 w-3.5" /> {review.date} at {review.time}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-extrabold text-[var(--text-primary)]">Total Consultation Fee:</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{review.fee}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="py-3.5 px-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onConfirm}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? 'Sending Request...' : 'Confirm & Request Appointment'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};
