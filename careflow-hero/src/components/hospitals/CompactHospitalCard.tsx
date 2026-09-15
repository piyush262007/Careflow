import React from 'react';
import { Star, Calendar } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface CompactHospitalCardProps {
  hospital: HospitalData;
  isSelected: boolean;
  onSelect: () => void;
  onBook: () => void;
}

export const CompactHospitalCard: React.FC<CompactHospitalCardProps> = ({
  hospital,
  isSelected,
  onSelect,
  onBook,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
        isSelected
          ? 'bg-[var(--bg-surface)] border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
          : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-emerald-500/30 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="h-11 w-11 rounded-xl object-cover border border-[var(--border-subtle)] shrink-0"
        />
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
            {hospital.name}
          </h4>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] mt-0.5">
            <span className="flex items-center font-bold text-amber-500">
              <Star className="h-3 w-3 fill-current mr-0.5" />
              {hospital.rating}
            </span>
            <span>•</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{hospital.distance}</span>
            <span>•</span>
            <span className="font-semibold">{hospital.openStatus}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {hospital.emergencyAvailable && (
          <span className="hidden sm:inline-block text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            24/7 ER
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer transition-all"
        >
          <Calendar className="h-3 w-3" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};
