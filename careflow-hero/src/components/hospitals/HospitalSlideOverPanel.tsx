import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Star, MapPin, Phone, Calendar } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';
import { DoctorHorizontalCarousel } from './DoctorHorizontalCarousel';

interface HospitalSlideOverPanelProps {
  hospital: HospitalData | null;
  onClose: () => void;
  onBookAppointment: (hospital: HospitalData) => void;
}

export const HospitalSlideOverPanel: React.FC<HospitalSlideOverPanelProps> = ({
  hospital,
  onClose,
  onBookAppointment,
}) => {
  if (!hospital) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md h-full bg-[var(--bg-surface)] border-l border-[var(--border-color)] p-6 shadow-2xl overflow-y-auto space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Header & Close Button */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-[var(--text-primary)]">
                  Hospital Details
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Hospital Identity & Cover */}
            <div className="space-y-3">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="h-44 w-full rounded-2xl object-cover border border-[var(--border-subtle)] shadow-sm"
              />

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                  {hospital.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] flex items-start gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{hospital.address} ({hospital.distance})</span>
                </p>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap gap-2 text-xs pt-1">
                <span className="flex items-center gap-1 font-bold text-amber-500 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {hospital.rating} Rating
                </span>

                <span className="font-semibold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {hospital.openStatus}
                </span>

                {hospital.emergencyAvailable && (
                  <span className="font-bold px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    24/7 ER Ready
                  </span>
                )}
              </div>
            </div>

            {/* Specialized Departments */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Specialized Departments
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {hospital.departments.map((dept) => (
                  <span
                    key={dept}
                    className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/10 text-[var(--text-secondary)] font-semibold border border-[var(--border-subtle)]"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            {/* Horizontal Doctor Carousel */}
            <DoctorHorizontalCarousel
              hospital={hospital}
              onBookDoctor={() => onBookAppointment(hospital)}
            />
          </div>

          {/* Action Row CTA */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3 shrink-0">
            <a
              href={`tel:${hospital.phone}`}
              className="px-4 py-3 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-emerald-600 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="h-4 w-4 text-blue-500" />
              <span>Call</span>
            </a>

            <button
              type="button"
              onClick={() => onBookAppointment(hospital)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
