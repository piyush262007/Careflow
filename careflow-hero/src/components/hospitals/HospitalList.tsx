import React from 'react';
import { HospitalCard } from './HospitalCard';
import type { HospitalData } from './data/mockHospitals';
import { SearchX } from 'lucide-react';

interface HospitalListProps {
  hospitals: HospitalData[];
  selectedHospitalId: string | null;
  onSelectHospital: (id: string) => void;
  onViewDetails: (hospital: HospitalData) => void;
}

export const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  selectedHospitalId,
  onSelectHospital,
  onViewDetails,
}) => {
  if (hospitals.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-center space-y-3 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] flex items-center justify-center mx-auto">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-[var(--text-primary)]">No Nearby Hospitals Found</h3>
        <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
          Try resetting your filter parameters or entering a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hospitals.map((h) => (
        <HospitalCard
          key={h.id}
          hospital={h}
          isSelected={selectedHospitalId === h.id}
          onSelect={() => onSelectHospital(h.id)}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
