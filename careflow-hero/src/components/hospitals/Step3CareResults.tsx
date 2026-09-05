import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Star,
  Navigation,
  Clock,
  Stethoscope,
  Calendar,
  ArrowRight,
  Building2,
  RotateCcw,
} from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface Step3CareResultsProps {
  hospitals: HospitalData[];
  selectedChips: string[];
  painLevel: string;
  onBookHospital: (hospital: HospitalData) => void;
  onReset: () => void;
}

export const Step3CareResults: React.FC<Step3CareResultsProps> = ({
  hospitals,
  onBookHospital,
  onReset,
}) => {
  const topMatch = hospitals[0] || hospitals[0];
  const alternativeHospitals = hospitals.slice(1, 4);

  const explanationChips = [
    '✓ Shortest travel time (6 mins drive)',
    '✓ Lowest waiting time (~8 mins)',
    '✓ Cardiology & ER Specialist available today',
    '✓ Excellent patient rating (4.9 ★)',
    '✓ Emergency 24/7 services active',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Top Header Bar & Reset Trigger */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Step 3 of 3: AI Care Recommendations</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
            Recommended Care Facilities
          </h1>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-emerald-600 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* TOP AI RECOMMENDATION CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        {/* Card Header Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-heading font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ✨ AI Recommendation
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-muted)]">• Best Match For You</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-md">
            <span>98% Match Score</span>
          </div>
        </div>

        {/* Hospital Identity & Cover */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={topMatch.image}
            alt={topMatch.name}
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md shrink-0"
          />

          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
              {topMatch.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center font-bold text-amber-500">
                <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                {topMatch.rating} Rating
              </span>
              <span>•</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{topMatch.distance}</span>
              <span>•</span>
              <span className="font-semibold">{topMatch.openStatus}</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] pt-0.5">
              {topMatch.address}
            </p>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
          <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Est. Drive Time</span>
            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5" /> 6 mins
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Est. Queue Time</span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> ~8 mins
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Available Doctor</span>
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1 truncate">
              <Stethoscope className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Dr. Sarah Chen
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Next Slot</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Today, 2:30 PM
            </span>
          </div>
        </div>

        {/* Why We Recommend This Hospital Section */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
          <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
            Why We Recommend This Hospital
          </h3>
          <div className="flex flex-wrap gap-2">
            {explanationChips.map((chip) => (
              <span
                key={chip}
                className="text-xs font-semibold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Primary CTA: Book Appointment */}
        <button
          type="button"
          onClick={() => onBookHospital(topMatch)}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 cursor-pointer transition-all hover:shadow-emerald-500/40"
        >
          <Calendar className="h-4 w-4" />
          <span>Book Appointment at {topMatch.name}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* ADDITIONAL NEARBY HOSPITALS SECTION */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-500" />
            <span>Alternative Nearby Hospitals</span>
          </h3>
          <span className="text-xs text-[var(--text-muted)]">3 Next Matches</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternativeHospitals.map((hosp, idx) => (
            <div
              key={hosp.id}
              className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
            >
              <div className="space-y-2">
                <img
                  src={hosp.image}
                  alt={hosp.name}
                  className="h-28 w-full rounded-xl object-cover border border-[var(--border-subtle)] shadow-xs"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[var(--text-primary)] truncate">{hosp.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    {94 - idx * 4}% Match
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <span className="flex items-center font-bold text-amber-500">
                    <Star className="h-3 w-3 fill-current mr-0.5" />
                    {hosp.rating}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{hosp.distance}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onBookHospital(hosp)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
