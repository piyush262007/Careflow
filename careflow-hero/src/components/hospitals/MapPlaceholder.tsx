import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Compass, ExternalLink } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface MapPlaceholderProps {
  hospitals: HospitalData[];
  selectedHospitalId: string | null;
  onSelectHospital: (id: string) => void;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  hospitals,
  selectedHospitalId,
  onSelectHospital,
}) => {
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const activeHospital = hospitals.find((h) => h.id === selectedHospitalId) || hospitals[0];

  return (
    <div className="relative rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden shadow-sm h-64 sm:h-72 flex flex-col justify-between p-4">
      {/* Map Graphic Background Styling */}
      <div
        className={`absolute inset-0 transition-all duration-500 pointer-events-none opacity-40 ${
          mapType === 'satellite'
            ? 'bg-slate-900 text-slate-100'
            : 'bg-emerald-500/05 dark:bg-emerald-950/20'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* SVG Map Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" stroke="currentColor">
        <path d="M0 50 Q 150 120 300 80 T 600 180 T 900 100" fill="none" strokeWidth="2" strokeDasharray="4 4" className="text-emerald-500" />
        <path d="M100 0 Q 180 200 240 400" fill="none" strokeWidth="2" strokeDasharray="6 6" className="text-blue-500" />
      </svg>

      {/* Top Map Controls Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] shadow-sm backdrop-blur-md">
          <Navigation className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
          <span>San Francisco Healthcare Map Radius (5 mi)</span>
        </div>

        <button
          type="button"
          onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] hover:border-emerald-500/40 shadow-sm backdrop-blur-md cursor-pointer"
        >
          <Layers className="h-3.5 w-3.5 text-blue-500" />
          <span className="capitalize">{mapType}</span>
        </button>
      </div>

      {/* Interactive Pins on Map */}
      <div className="relative z-10 flex items-center justify-around my-auto px-6">
        {hospitals.map((h, index) => {
          const isSelected = h.id === selectedHospitalId;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => onSelectHospital(h.id)}
              className={`relative flex flex-col items-center group transition-all duration-300 cursor-pointer ${
                isSelected ? 'scale-125 z-20' : 'scale-100 opacity-80 hover:opacity-100 hover:scale-110'
              }`}
            >
              <div
                className={`p-2 rounded-2xl border shadow-lg flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-400 text-white ring-4 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-emerald-600'
                }`}
              >
                <MapPin className="h-5 w-5 fill-current" />
              </div>

              {/* Pin Callout Badge */}
              <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-white text-[9.5px] font-bold shadow-md whitespace-nowrap">
                #{index + 1} {h.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Selected Hospital Callout Bar */}
      {activeHospital && (
        <div className="relative z-10 flex items-center justify-between p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-xs shadow-md backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
              <Compass className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-[var(--text-primary)] block truncate">{activeHospital.name}</span>
              <span className="text-[10.5px] text-[var(--text-muted)] truncate block">
                {activeHospital.distance} • {activeHospital.emergencyStatusText}
              </span>
            </div>
          </div>

          {/* Directions Link (Temporarily Hidden) */}
          {false && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeHospital.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0 pl-2"
            >
              <span>Directions</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
