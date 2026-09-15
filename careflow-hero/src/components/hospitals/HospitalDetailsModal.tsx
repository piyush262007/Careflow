import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Star, Stethoscope, Navigation, Calendar } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface HospitalDetailsModalProps {
  hospital: HospitalData | null;
  onClose: () => void;
  onBook: (hospital: HospitalData) => void;
}

export const HospitalDetailsModal: React.FC<HospitalDetailsModalProps> = ({
  hospital,
  onClose,
  onBook,
}) => {
  if (!hospital) return null;

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Hospital Header Image & Name */}
          <div className="space-y-3">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="h-36 w-full rounded-2xl object-cover border border-[var(--border-subtle)] shadow-sm"
            />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {hospital.openStatus}
                </span>
                {hospital.emergencyAvailable && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    24/7 ER Ready
                  </span>
                )}
              </div>

              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                {hospital.name}
              </h2>

              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="flex items-center font-bold text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                  {hospital.rating} ({hospital.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{hospital.distance}</span>
              </div>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" /> Address
              </span>
              <p className="font-medium text-[var(--text-primary)]">{hospital.address}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-blue-500" /> Contact Phone
              </span>
              <a href={`tel:${hospital.phone}`} className="font-bold text-blue-600 dark:text-blue-400 hover:underline block">
                {hospital.phone}
              </a>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-emerald-500" /> Active Roster
              </span>
              <p className="font-bold text-[var(--text-primary)]">{hospital.availableDoctorsCount} Specialists Available</p>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                <Navigation className="h-3.5 w-3.5 text-amber-500" /> Drive Time & Traffic
              </span>
              <p className="font-bold text-[var(--text-primary)]">{hospital.travelTime || '6 mins drive'} • {hospital.trafficStatus || 'Light Traffic'}</p>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Clinical Departments</span>
            <div className="flex flex-wrap gap-1.5">
              {hospital.departments.map((dept) => (
                <span key={dept} className="px-2.5 py-1 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] font-bold text-[var(--text-secondary)]">
                  {dept}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex items-center gap-3 pt-2">
            {/* Google Maps Button (Temporarily Hidden) */}
            {false && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] hover:bg-[var(--bg-item-hover)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer"
              >
                <Navigation className="h-4 w-4 text-emerald-500" />
                <span>Google Maps</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(hospital);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
