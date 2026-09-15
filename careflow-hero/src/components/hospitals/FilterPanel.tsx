import React from 'react';
import { SlidersHorizontal, ShieldAlert, Clock, MapPin, Star, RotateCcw } from 'lucide-react';

export interface FilterState {
  emergencyOnly: boolean;
  openNowOnly: boolean;
  nearOnly: boolean;
  highRatingOnly: boolean;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilter =
    filters.emergencyOnly || filters.openNowOnly || filters.nearOnly || filters.highRatingOnly;

  const toggleFilter = (key: keyof FilterState) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-[var(--text-secondary)] mr-1">
          <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-500" />
          <span>Filters:</span>
        </div>

        {/* Filter 1: 24/7 Emergency */}
        <button
          type="button"
          onClick={() => toggleFilter('emergencyOnly')}
          className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            filters.emergencyOnly
              ? 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
              : 'border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:border-emerald-500/30'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
          <span>24/7 ER Ready</span>
        </button>

        {/* Filter 2: Open Now */}
        <button
          type="button"
          onClick={() => toggleFilter('openNowOnly')}
          className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            filters.openNowOnly
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
              : 'border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:border-emerald-500/30'
          }`}
        >
          <Clock className="h-3.5 w-3.5 text-emerald-500" />
          <span>Open Now</span>
        </button>

        {/* Filter 3: Near (< 5 km) */}
        <button
          type="button"
          onClick={() => toggleFilter('nearOnly')}
          className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            filters.nearOnly
              ? 'bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold shadow-sm'
              : 'border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:border-emerald-500/30'
          }`}
        >
          <MapPin className="h-3.5 w-3.5 text-blue-500" />
          <span>Near (&lt; 5 km)</span>
        </button>

        {/* Filter 4: High Rating (4.8+) */}
        <button
          type="button"
          onClick={() => toggleFilter('highRatingOnly')}
          className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            filters.highRatingOnly
              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
              : 'border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:border-emerald-500/30'
          }`}
        >
          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span>Rating 4.8+</span>
        </button>
      </div>

      {/* Reset Action */}
      {hasActiveFilter && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
};
