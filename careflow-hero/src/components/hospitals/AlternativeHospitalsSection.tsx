import React from 'react';
import { Star, Calendar } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface AlternativeHospitalsSectionProps {
  hospitals: HospitalData[];
  onSelectHospital: (id: string) => void;
  onBookAppointment: (hospital: HospitalData) => void;
}

export const AlternativeHospitalsSection: React.FC<AlternativeHospitalsSectionProps> = ({
  hospitals,
  onSelectHospital,
  onBookAppointment,
}) => {
  // Select next 3 alternative recommended hospitals
  const alternatives = hospitals.slice(1, 4);

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
          Alternative Hospitals (Next 3 Matches)
        </h3>
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          Ranked by distance & availability
        </span>
      </div>

      <div className="space-y-3">
        {alternatives.map((hosp, idx) => (
          <div
            key={hosp.id}
            onClick={() => onSelectHospital(hosp.id)}
            className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-xs font-extrabold text-[var(--text-muted)] w-5 shrink-0">
                #{idx + 2}
              </span>
              <img
                src={hosp.image}
                alt={hosp.name}
                className="h-12 w-12 rounded-xl object-cover border border-[var(--border-subtle)] shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-600 transition-colors truncate">
                  {hosp.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-0.5 font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {hosp.rating}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{hosp.distance}</span>
                  <span>•</span>
                  <span className="font-semibold">{hosp.openStatus}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {85 - idx * 4}% Match
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookAppointment(hosp);
                }}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
