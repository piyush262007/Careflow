import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, CheckCircle2 } from 'lucide-react';

interface LocationPermissionBannerProps {
  onLocationGranted?: () => void;
}

export const LocationPermissionBanner: React.FC<LocationPermissionBannerProps> = ({
  onLocationGranted,
}) => {
  const [isGranted, setIsGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGrantLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGranted(true);
      if (onLocationGranted) onLocationGranted();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 shadow-sm ${
        isGranted
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
          : 'bg-[var(--bg-surface)] border-[var(--border-color)]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border shrink-0 ${
              isGranted
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
            }`}
          >
            {isGranted ? <CheckCircle2 className="h-5 w-5" /> : <Navigation className="h-5 w-5 animate-pulse" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {isGranted ? 'Current GPS Location Active' : 'Allow Location Access'}
              </h3>
              {isGranted && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                  GPS Live
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
              {isGranted
                ? 'Detected location: San Francisco Medical District, CA. Hospital distances calculated in kilometers (km).'
                : 'Grant location permission to view real-time distances (in km) to nearby emergency rooms and hospital suites.'}
            </p>
          </div>
        </div>

        {!isGranted ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGrantLocation}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
          >
            <MapPin className="h-4 w-4" />
            <span>{isLoading ? 'Detecting Location...' : 'Allow Location'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span>Sorted by Proximity (km)</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
