import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
  Star,
  Calendar,
  Phone,
  ArrowRight,
} from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface GoogleMapContainerProps {
  hospitals: HospitalData[];
  selectedHospitalId: string | null;
  onSelectHospital: (id: string) => void;
  onBookAppointment: (hospital: HospitalData) => void;
  children?: React.ReactNode;
}

export const GoogleMapContainer: React.FC<GoogleMapContainerProps> = ({
  hospitals,
  selectedHospitalId,
  onSelectHospital,
  onBookAppointment,
  children,
}) => {
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const [zoomLevel, setZoomLevel] = useState(13);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Request Browser Geolocation API on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        (error) => {
          console.log('Browser Geolocation info:', error.message);
          // Fallback default coordinates: San Francisco Medical District
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
    }
  }, []);

  const activeHospital = hospitals.find((h) => h.id === selectedHospitalId) || hospitals[0];

  const handleMarkerClick = (hospital: HospitalData) => {
    onSelectHospital(hospital.id);
  };

  const handleRecenterLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        () => {
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden shadow-lg h-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-between p-4">
      {/* Google Maps Realistic Styled Map Canvas Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 pointer-events-none opacity-90 ${
          mapType === 'satellite'
            ? 'bg-slate-900 text-slate-100'
            : mapType === 'terrain'
            ? 'bg-amber-950/20'
            : 'bg-slate-100 dark:bg-slate-900'
        }`}
        style={{
          backgroundImage:
            mapType === 'satellite'
              ? `radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.25) 1px, transparent 1px)`
              : `linear-gradient(to right, rgba(226, 232, 240, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 232, 240, 0.4) 1px, transparent 1px)`,
          backgroundSize: `${32 * (zoomLevel / 13)}px ${32 * (zoomLevel / 13)}px`,
        }}
      />

      {/* SVG Google Maps Roads & Topography Paths */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" stroke="currentColor">
        {/* Main Highway Veins */}
        <path d="M -50 150 Q 250 80 500 280 T 1100 200" fill="none" strokeWidth="6" className="text-amber-500/60" />
        <path d="M 120 0 Q 300 350 450 700" fill="none" strokeWidth="6" className="text-blue-500/60" />
        <path d="M 0 350 Q 400 300 800 500" fill="none" strokeWidth="4" strokeDasharray="6 6" className="text-emerald-500/80" />
        {/* Radius Radar Circle */}
        <circle cx="50%" cy="50%" r={180 * (zoomLevel / 13)} fill="rgba(34, 197, 94, 0.04)" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* Floating Children Overlay (e.g. FloatingAIMatchCard) */}
      {children}

      {/* Top Map Bar: Google Maps Logo, GPS Status, & Map Type Switcher */}
      <div className="relative z-10 flex items-center justify-end sm:justify-between gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] shadow-md backdrop-blur-md">
          {/* Google Maps Brand Icon */}
          <div className="h-5 w-5 rounded-md bg-white p-0.5 shadow-sm flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="#4285F4" d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
              <circle fill="#EA4335" cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="font-heading tracking-tight">Google Maps</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            GPS Active (Zoom: {zoomLevel}x)
          </span>
        </div>

        {/* Map View Controls Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] shadow-md backdrop-blur-md">
          {(['standard', 'satellite', 'terrain'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMapType(type)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold capitalize transition-all cursor-pointer ${
                mapType === type
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Center User Location Marker ("You Are Here") */}
      {userLocation && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-blue-500/30 animate-ping absolute" />
            <div className="h-4 w-4 rounded-full bg-blue-600 border-2 border-white shadow-lg" />
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-white text-[9px] font-extrabold shadow-md">
            You Are Here
          </span>
        </div>
      )}

      {/* Custom Hospital Pin Markers Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-8 my-auto px-4 pl-0 sm:pl-72">
        {hospitals.map((hospital, idx) => {
          const isSelected = hospital.id === selectedHospitalId;
          return (
            <div key={hospital.id} className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleMarkerClick(hospital)}
                className={`relative group transition-all duration-300 cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : 'scale-100 opacity-90 hover:opacity-100 hover:scale-110'
                }`}
              >
                {/* Marker Pin */}
                <div
                  className={`p-2.5 rounded-2xl border shadow-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-300 text-white ring-4 ring-emerald-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-emerald-600'
                  }`}
                >
                  <MapPin className="h-6 w-6 fill-current" />
                </div>

                {/* Marker Badge */}
                <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white text-[10px] font-bold shadow-md whitespace-nowrap block">
                  #{idx + 1} {hospital.name.split(' ')[0]} ({hospital.distance})
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Right Map Navigation Floating Tools (Recenter GPS & Zoom) */}
      <div className="absolute right-4 top-16 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleRecenterLocation}
          className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-[var(--text-primary)] hover:text-emerald-600 shadow-md backdrop-blur-md cursor-pointer"
          title="Recenter to My GPS Location"
        >
          <Navigation className={`h-4 w-4 ${isLocating ? 'animate-spin text-emerald-500' : ''}`} />
        </button>

        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
          className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-[var(--text-primary)] hover:text-emerald-600 shadow-md backdrop-blur-md cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 1, 8))}
          className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-[var(--border-color)] text-[var(--text-primary)] hover:text-emerald-600 shadow-md backdrop-blur-md cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom Floating Hospital Information Panel / Selected Callout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHospital.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="relative z-20 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-[var(--border-color)] shadow-xl backdrop-blur-md space-y-2.5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={activeHospital.image}
                alt={activeHospital.name}
                className="h-11 w-11 rounded-xl object-cover border border-[var(--border-subtle)] shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                  {activeHospital.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[var(--text-secondary)]">
                  <span className="flex items-center gap-0.5 font-bold text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    {activeHospital.rating}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeHospital.distance}</span>
                  <span>•</span>
                  <span className="font-semibold">{activeHospital.openStatus}</span>
                </div>
              </div>
            </div>

            <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
              {activeHospital.emergencyStatusText}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border-subtle)]">
            <a
              href={`tel:${activeHospital.phone}`}
              className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-emerald-600 flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 text-blue-500" />
              <span>Call</span>
            </a>

            {/* "Book Appointment" Trigger */}
            <button
              type="button"
              onClick={() => onBookAppointment(activeHospital)}
              className="flex-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Appointment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
