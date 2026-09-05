import React from 'react';
import { Phone, Navigation, Info, Calendar } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';
import { buildGoogleMapsDirectionsUrl } from '../../utils/distance';

interface HospitalQuickActionsRowProps {
  hospital: HospitalData;
  userLocation?: { lat: number; lng: number } | null;
  isEmergency?: boolean;
  onViewDetails: (hospital: HospitalData) => void;
  onBookHospital: (hospital: HospitalData) => void;
}

export const HospitalQuickActionsRow: React.FC<HospitalQuickActionsRowProps> = ({
  hospital,
  userLocation,
  isEmergency = false,
  onViewDetails,
  onBookHospital,
}) => {
  const directionsUrl = buildGoogleMapsDirectionsUrl(hospital.lat, hospital.lng, userLocation);
  const phoneUrl = `tel:${hospital.phone}`;

  return (
    <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
      {/* 1. Call Button */}
      <a
        href={phoneUrl}
        className="py-2 px-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] hover:bg-emerald-500/10 hover:border-emerald-500/30 text-[11px] font-bold text-[var(--text-primary)] hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        title="Call Hospital"
      >
        <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
        <span>Call</span>
      </a>

      {/* 2. Directions Button */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="py-2 px-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] hover:bg-blue-500/10 hover:border-blue-500/30 text-[11px] font-bold text-[var(--text-primary)] hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        title="Get Google Maps Directions"
      >
        <Navigation className="h-3.5 w-3.5 text-blue-500 shrink-0" />
        <span>Map</span>
      </a>

      {/* 3. View Details Button */}
      <button
        type="button"
        onClick={() => onViewDetails(hospital)}
        className="py-2 px-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] hover:bg-[var(--bg-item-hover)] text-[11px] font-bold text-[var(--text-primary)] flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
      >
        <Info className="h-3.5 w-3.5 text-purple-500 shrink-0" />
        <span>Details</span>
      </button>

      {/* 4. Book Appointment */}
      <button
        type="button"
        onClick={() => onBookHospital(hospital)}
        className={`py-2 px-2 rounded-xl text-white text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-md cursor-pointer transition-all shrink-0 active:scale-[0.98] ${
          isEmergency || hospital.emergencyAvailable
            ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
            : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
        }`}
      >
        <Calendar className="h-3.5 w-3.5" />
        <span>Book</span>
      </button>
    </div>
  );
};
