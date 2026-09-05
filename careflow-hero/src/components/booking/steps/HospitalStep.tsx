import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Star, ArrowRight, Check } from 'lucide-react';

export interface Hospital {
  id: string;
  name: string;
  location: string;
  distance: string;
  departmentsCount: number;
  rating: number;
  badge: string;
  address: string;
}

interface HospitalStepProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onSelectHospital: (hospital: Hospital) => void;
  onNext: () => void;
}

export const HospitalStep: React.FC<HospitalStepProps> = ({
  hospitals,
  selectedHospital,
  onSelectHospital,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Copy */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Select a Healthcare Facility
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Choose your preferred hospital or medical clinic location.
        </p>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hospitals.map((h) => {
          const isSelected = selectedHospital?.id === h.id;
          return (
            <motion.div
              key={h.id}
              whileHover={{ y: -3 }}
              onClick={() => onSelectHospital(h)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/05 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-emerald-500/40 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge & Radio */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {h.badge}
                  </span>
                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-[var(--border-color)] bg-[var(--bg-card-bg)]'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                </div>

                {/* Hospital Icon & Name */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug">{h.name}</h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{h.address}</p>
                  </div>
                </div>
              </div>

              {/* Metrics Footer */}
              <div className="pt-3 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-2 text-[11px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{h.distance}</span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold">{h.rating}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Step Action */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          disabled={!selectedHospital}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            selectedHospital
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 hover:scale-[1.02]'
              : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Departments</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
