import React from 'react';
import { motion } from 'framer-motion';
import { Star, Navigation, Clock, UserCheck, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface AIHospitalRecommendationCardProps {
  hospital: HospitalData;
  onBookAppointment: (hospital: HospitalData) => void;
}

export const AIHospitalRecommendationCard: React.FC<AIHospitalRecommendationCardProps> = ({
  hospital,
  onBookAppointment,
}) => {
  const chips = [
    '✓ Shortest travel time',
    '✓ Lowest waiting time',
    '✓ Specialist available today',
    '✓ Excellent patient rating',
    '✓ Emergency services available',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-[var(--bg-surface)] to-teal-500/10 border-2 border-emerald-500/40 shadow-xl space-y-5 relative overflow-hidden"
    >
      {/* Top Background Ambient Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />

      {/* Header Title & Match Score Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-heading font-extrabold text-[var(--text-primary)] flex items-center gap-1.5">
              ✨ AI Recommendation
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
              98% Match
            </span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
            Best Match For You
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] shrink-0 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Real-time Triage Verified</span>
        </div>
      </div>

      {/* Hospital Identity & Key Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Hospital Image & Identity */}
        <div className="md:col-span-5 flex items-center gap-3.5">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md shrink-0"
          />
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-0.5 font-bold text-amber-500">
                <Star className="h-3.5 w-3.5 fill-current" />
                {hospital.rating}
              </span>
              <span>•</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{hospital.distance}</span>
              <span>•</span>
              <span className="font-semibold">{hospital.openStatus}</span>
            </div>
          </div>
        </div>

        {/* Right: Detailed Metric Chips */}
        <div className="md:col-span-7 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold flex items-center gap-1">
              <Navigation className="h-3 w-3 text-blue-500" />
              Est. Travel Time
            </span>
            <span className="font-extrabold text-[var(--text-primary)] text-xs">6 mins drive</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-500" />
              Est. Queue Time
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs">~8 mins wait</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold flex items-center gap-1">
              <UserCheck className="h-3 w-3 text-emerald-500" />
              Available Doctor
            </span>
            <span className="font-extrabold text-[var(--text-primary)] text-xs truncate block">
              Dr. Sarah Chen
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold flex items-center gap-1">
              <Calendar className="h-3 w-3 text-purple-500" />
              Next Slot
            </span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-xs block truncate">
              Today at 2:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* "Why we recommend this hospital" Explanation Chips */}
      <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
          Why we recommend this hospital
        </span>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Primary CTA: Book Appointment */}
      <button
        type="button"
        onClick={() => onBookAppointment(hospital)}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer transition-all duration-300"
      >
        <Calendar className="h-4 w-4" />
        <span>Book Appointment</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
};
