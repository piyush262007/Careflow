import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldAlert, UserCheck, Phone, ArrowRight } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface HospitalCardProps {
  hospital: HospitalData;
  isSelected?: boolean;
  onSelect?: () => void;
  onViewDetails?: (hospital: HospitalData) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  isSelected,
  onSelect,
  onViewDetails,
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      onClick={onSelect}
      className={`rounded-2xl border transition-all duration-300 bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md cursor-pointer ${
        isSelected
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-[var(--border-color)] hover:border-emerald-500/40'
      }`}
    >
      <div className="space-y-3">
        {/* Hospital Image Header with Badges */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Open/Closed Badge */}
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border shadow-md ${
                hospital.isOpen
                  ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                  : 'bg-rose-500/90 text-white border-rose-400/30'
              }`}
            >
              {hospital.openStatus}
            </span>

            {/* Rating Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-400 text-xs font-bold shadow-md backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span>{hospital.rating}</span>
              <span className="text-[10px] text-slate-300 font-normal">({hospital.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-5 space-y-3">
          {/* Hospital Name & Address */}
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight mb-1">
              {hospital.name}
            </h3>
            <p className="text-xs text-[var(--text-muted)] flex items-start gap-1 leading-relaxed">
              <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{hospital.address}</span>
            </p>
          </div>

          {/* Key Metric Tags */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            {/* Distance */}
            <div className="p-2 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">Distance</span>
                <span className="font-bold text-[var(--text-primary)]">{hospital.distance}</span>
              </div>
            </div>

            {/* Available Doctors */}
            <div className="p-2 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-500 shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">Available Doctors</span>
                <span className="font-bold text-[var(--text-primary)]">{hospital.availableDoctorsCount} On Duty</span>
              </div>
            </div>
          </div>

          {/* Emergency Availability Status Badge */}
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Emergency Availability: <strong>{hospital.emergencyStatusText}</strong></span>
          </div>

          {/* Departments Tag Cloud */}
          <div className="flex flex-wrap gap-1 pt-1">
            {hospital.departments.map((dept) => (
              <span
                key={dept}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
        <a
          href={`tel:${hospital.phone}`}
          className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-emerald-600 hover:border-emerald-500/40 transition-colors cursor-pointer"
          title="Call Hospital"
        >
          <Phone className="h-4 w-4" />
        </a>

        {/* "View Details" Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onViewDetails) onViewDetails(hospital);
          }}
          className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
