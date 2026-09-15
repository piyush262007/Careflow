import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Star, Navigation, Clock, Calendar, ArrowRight } from 'lucide-react';

interface AppointmentSummaryStepProps {
  onNext: () => void;
}

export const AppointmentSummaryStep: React.FC<AppointmentSummaryStepProps> = ({ onNext }) => {
  const summary = {
    hospital: 'Metro Care Health Center',
    hospitalImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400',
    doctorName: 'Dr. Sarah Chen',
    specialty: 'Senior Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    distance: '1.2 km',
    rating: '4.9',
    reviews: 142,
    consultationFee: '₹1,500',
    estimatedQueueTime: '~8 mins',
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
          <Building2 className="h-3.5 w-3.5" />
          <span>Step 1 of 4: Appointment Summary</span>
        </div>
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
          Recommended Consultation Details
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Review your recommended healthcare facility & doctor before selecting a date and time slot.
        </p>
      </div>

      {/* Main Summary Card */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-md space-y-6">
        {/* Hospital Row */}
        <div className="flex items-start gap-4 border-b border-[var(--border-subtle)] pb-5">
          <img
            src={summary.hospitalImage}
            alt={summary.hospital}
            className="h-16 w-16 rounded-2xl object-cover border border-emerald-500/30 shadow-sm shrink-0"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">
              Matched Facility
            </span>
            <h3 className="text-base font-extrabold text-[var(--text-primary)] truncate">
              {summary.hospital}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center font-bold text-amber-500">
                <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                {summary.rating} ({summary.reviews} reviews)
              </span>
              <span>•</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{summary.distance} away</span>
            </div>
          </div>
        </div>

        {/* Doctor Row */}
        <div className="flex items-center gap-4 border-b border-[var(--border-subtle)] pb-5">
          <img
            src={summary.doctorAvatar}
            alt={summary.doctorName}
            className="h-14 w-14 rounded-2xl object-cover border border-emerald-500/30 shadow-sm shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider block">
              Recommended Doctor
            </span>
            <h4 className="text-sm font-extrabold text-[var(--text-primary)]">
              {summary.doctorName}
            </h4>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">
              {summary.specialty}
            </span>
          </div>
        </div>

        {/* Core Metrics Grid (Consultation Fee ₹ & Queue Time) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5 text-center">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Consultation Fee</span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block">
              {summary.consultationFee}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5 text-center">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Est. Queue Time</span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {summary.estimatedQueueTime}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5 text-center">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Distance</span>
            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
              <Navigation className="h-3.5 w-3.5" /> {summary.distance}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 cursor-pointer transition-all"
      >
        <Calendar className="h-4 w-4" />
        <span>Select Date & Time Slot</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
};
