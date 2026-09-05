import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Navigation, Clock, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface FloatingAIMatchCardProps {
  hospital: HospitalData;
  onBookAppointment: (hospital: HospitalData) => void;
}

export const FloatingAIMatchCard: React.FC<FloatingAIMatchCardProps> = ({
  hospital,
  onBookAppointment,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const chips = [
    '✓ Shortest travel time',
    '✓ Lowest waiting time',
    '✓ Specialist available today',
    '✓ Emergency 24/7 ready',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute top-4 left-4 z-20 w-[calc(100%-2rem)] sm:w-80 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-500/30 shadow-2xl backdrop-blur-xl space-y-3 pointer-events-auto"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-heading font-extrabold text-[var(--text-primary)]">
            ✨ AI Best Match
          </span>
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
            98%
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>{showDetails ? 'Hide details' : 'Why this match?'}</span>
          {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Main Identity & Metrics */}
      <div className="flex items-start gap-3">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="h-11 w-11 rounded-xl object-cover border border-emerald-500/30 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-extrabold text-[var(--text-primary)] truncate">
            {hospital.name}
          </h4>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] mt-0.5">
            <span className="flex items-center font-bold text-amber-500">
              <Star className="h-3 w-3 fill-current mr-0.5" />
              {hospital.rating}
            </span>
            <span>•</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{hospital.distance}</span>
          </div>

          <div className="flex items-center gap-3 text-[10.5px] text-[var(--text-muted)] mt-1 font-medium">
            <span className="flex items-center gap-1">
              <Navigation className="h-3 w-3 text-blue-500" />
              6m drive
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-500" />
              ~8m wait
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Explanation Chips */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-1.5 pt-1"
          >
            <div className="flex flex-wrap gap-1">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary CTA: Book Appointment */}
      <button
        type="button"
        onClick={() => onBookAppointment(hospital)}
        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
      >
        <Calendar className="h-3.5 w-3.5" />
        <span>Book Appointment</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
};
