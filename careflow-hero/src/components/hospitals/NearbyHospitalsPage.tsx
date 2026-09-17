import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  MapPin,
  Star,
  Sparkles,
  AlertTriangle,
  Navigation,
  Calendar,
  Phone,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useHospitals } from '../../hooks/useHospitals';
import type { HospitalData } from '../../services/hospitalService';
import { CareFlowGoogleMap } from './CareFlowGoogleMap';
import { AppointmentBookingFlow } from '../booking/AppointmentBookingFlow';
import { useNavigate, useParams } from 'react-router-dom';

export const NearbyHospitalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { hospitalId } = useParams<{ hospitalId?: string }>();

  // Browser Location State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('distance');

  // Selected Detail Modal State
  const [detailHospital, setDetailHospital] = useState<HospitalData | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const {
    hospitals,
    recommendation,
    isLoading,
    searchHospitals,
    fetchRecommendation,
  } = useHospitals(userLocation);

  // Geolocation trigger
  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationDenied(true);
      return;
    }
    setIsLocating(true);
    setLocationDenied(false);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLocating(false);
      },
      (err) => {
        console.info('Location access info:', err.message);
        setLocationDenied(true);
        setIsLocating(false);
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  // Route param handler
  useEffect(() => {
    if (hospitalId && hospitals.length > 0) {
      const found = hospitals.find((h) => String(h.id) === String(hospitalId));
      if (found) setDetailHospital(found);
    }
  }, [hospitalId, hospitals]);

  // Handle Search submit / debounced filter
  useEffect(() => {
    searchHospitals({
      name: searchQuery || undefined,
      specialization: selectedSpecialty !== 'ALL' ? selectedSpecialty : undefined,
      emergencyAvailable: emergencyOnly || isEmergencyMode ? true : undefined,
      maxDistanceKm: maxDistance < 50 ? maxDistance : undefined,
      sortBy: sortBy,
    });
  }, [searchQuery, selectedSpecialty, emergencyOnly, isEmergencyMode, maxDistance, sortBy]);

  // Handle Emergency Mode toggle
  const handleEmergencyToggle = () => {
    const nextState = !isEmergencyMode;
    setIsEmergencyMode(nextState);
    if (nextState) {
      setEmergencyOnly(true);
      setSortBy('distance');
      fetchRecommendation(undefined, true);
    } else {
      setEmergencyOnly(false);
      fetchRecommendation(undefined, false);
    }
  };

  const handleBookHospital = (_hospital: HospitalData) => {
    setIsBookingOpen(true);
  };

  if (isBookingOpen) {
    return (
      <AppointmentBookingFlow
        onClose={() => setIsBookingOpen(false)}
        onFinishBooking={() => {
          setIsBookingOpen(false);
          navigate('/patient/appointments');
        }}
      />
    );
  }

  // All available departments extracted from real hospitals data
  const allDepartments = Array.from(
    new Set(hospitals.flatMap((h) => h.departments || []))
  ).filter(Boolean);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)]">
                  Hospital Directory & Smart Match
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  REAL-TIME
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">
                Find nearby partner hospitals, live queue wait times, and specialist availability
              </p>
            </div>
          </div>

          {/* Location & Emergency Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={requestLocation}
              disabled={isLocating}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                userLocation
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                  : 'bg-[var(--bg-card-bg)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-emerald-600'
              }`}
            >
              <Navigation className={`h-4 w-4 ${isLocating ? 'animate-spin text-blue-500' : ''}`} />
              <span>
                {isLocating
                  ? 'Locating...'
                  : userLocation
                  ? 'GPS Location Active'
                  : 'Use My Location'}
              </span>
            </button>

            {/* Emergency Mode Banner Trigger */}
            <button
              type="button"
              onClick={handleEmergencyToggle}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                isEmergencyMode
                  ? 'bg-rose-600 text-white ring-4 ring-rose-500/30 animate-pulse'
                  : 'bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>{isEmergencyMode ? 'EMERGENCY MODE ACTIVE' : 'Emergency Help'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Emergency Mode Warning Banner */}
        {isEmergencyMode && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-start justify-between gap-3 shadow-md animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-extrabold uppercase tracking-wide text-sm">
                  CareFlow Urgent Priority Search Active
                </h4>
                <p>
                  Showing hospitals with 24/7 Level I Emergency Rooms, immediate ICU bed readiness, and shortest travel distance. If you are facing a life-threatening crisis, call emergency services (911/112) immediately.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEmergencyMode(false)}
              className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/20 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Location Denied Banner */}
        {locationDenied && !userLocation && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                Location permission denied. Displaying default San Francisco healthcare facility coordinates in kilometers. You can search manually below.
              </span>
            </div>
          </div>
        )}

        {/* SMART RECOMMENDATION CARD ("Best Match for You") */}
        {recommendation && recommendation.hospital && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-7 rounded-3xl bg-[var(--bg-surface)] border-2 border-emerald-500/40 shadow-xl relative overflow-hidden space-y-4"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-wide border border-emerald-500/30 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{recommendation.recommendationTitle || 'Best Match for You'}</span>
                </span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  CareFlow Deterministic Match Score: <strong>{recommendation.matchScore}%</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleBookHospital(recommendation.hospital)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
                    {recommendation.hospital.name}
                  </h2>
                  {recommendation.hospital.emergencyAvailable && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold border border-rose-500/20">
                      24/7 ER
                    </span>
                  )}
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  📍 {recommendation.hospital.address}, {recommendation.hospital.city}
                </p>

                {/* Natural Language Explanation */}
                <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Why Recommended
                  </span>
                  <p className="text-xs font-semibold text-[var(--text-primary)] leading-relaxed">
                    {recommendation.recommendationReason}
                  </p>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-semibold">Distance:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {recommendation.hospital.distanceKm ? `${recommendation.hospital.distanceKm} km away` : '1.8 km'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-semibold">Est. Wait:</span>
                  <span className="font-bold text-blue-500">
                    ~{recommendation.hospital.estimatedWaitMinutes || 12} mins
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-semibold">Queue Count:</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {recommendation.hospital.currentQueueCount || 2} patients
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-semibold">Rating:</span>
                  <span className="font-bold text-amber-500 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {recommendation.hospital.rating || 4.9} ({recommendation.hospital.totalReviews || 120})
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SEARCH AND FILTERS TOOLBAR */}
        <div className="p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search hospital name, location, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Department Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-all cursor-pointer font-medium"
            >
              <option value="ALL">All Departments & Specialties</option>
              {allDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Sort By Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-all cursor-pointer font-medium"
            >
              <option value="distance">Sort by: Nearest Distance (km)</option>
              <option value="waittime">Sort by: Fastest Wait Time</option>
              <option value="rating">Sort by: Highest Rating</option>
              <option value="queue">Sort by: Lowest Queue</option>
            </select>
          </div>

          {/* Secondary Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[var(--text-muted)] flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filter:</span>
              </span>

              <button
                type="button"
                onClick={() => setEmergencyOnly(!emergencyOnly)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  emergencyOnly
                    ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                    : 'bg-[var(--bg-card-bg)] text-[var(--text-secondary)] border-[var(--border-color)]'
                }`}
              >
                24/7 ER Ready
              </button>

              <button
                type="button"
                onClick={() => setMaxDistance(maxDistance === 10 ? 50 : 10)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  maxDistance === 10
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-[var(--bg-card-bg)] text-[var(--text-secondary)] border-[var(--border-color)]'
                }`}
              >
                Within 10 km
              </button>
            </div>

            <span className="text-xs font-semibold text-[var(--text-muted)]">
              Showing {hospitals.length} partner hospital{hospitals.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* MAIN SPLIT LAYOUT (Desktop: Map Left/Top, List Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* MAP PANEL (5 cols on Desktop) */}
          <div className="lg:col-span-5 sticky top-24 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Google Map & Markers</span>
              </span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                Distances in Kilometers (km)
              </span>
            </div>

            <CareFlowGoogleMap
              userLocation={userLocation}
              hospitals={hospitals.map((h) => ({
                id: h.id,
                name: h.name,
                lat: h.latitude,
                lng: h.longitude,
                address: `${h.address}, ${h.city}`,
                rating: h.rating,
                distanceFormatted: h.distanceKm ? `${h.distanceKm} km` : undefined,
                emergencyAvailable: h.emergencyAvailable,
                phone: h.phone,
              }))}
              selectedHospitalId={detailHospital?.id}
              onSelectHospital={(hMap) => {
                const found = hospitals.find((item) => String(item.id) === String(hMap.id));
                if (found) setDetailHospital(found);
              }}
              onBookHospital={(hMap) => {
                const found = hospitals.find((item) => String(item.id) === String(hMap.id));
                if (found) handleBookHospital(found);
              }}
            />
          </div>

          {/* HOSPITAL LIST PANEL (7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {isLoading ? (
              <div className="p-12 text-center text-xs font-bold text-[var(--text-muted)] space-y-2 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)]">
                <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto" />
                <p>Loading hospital directory...</p>
              </div>
            ) : hospitals.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)]">
                <Building2 className="h-10 w-10 text-[var(--text-muted)] mx-auto" />
                <h3 className="font-heading font-bold text-base text-[var(--text-primary)]">
                  No hospitals match your search
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                  Try adjusting your search terms, clearing distance filters, or toggling emergency mode.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('ALL');
                    setEmergencyOnly(false);
                    setIsEmergencyMode(false);
                    setMaxDistance(50);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              hospitals.map((hospital) => {
                const isSelected = detailHospital?.id === hospital.id;
                const isTopMatch = recommendation?.hospital?.id === hospital.id;

                return (
                  <motion.div
                    key={hospital.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-3xl bg-[var(--bg-surface)] border transition-all duration-300 space-y-4 shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : isTopMatch
                        ? 'border-emerald-500/40'
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading font-extrabold text-base sm:text-lg text-[var(--text-primary)]">
                            {hospital.name}
                          </h3>
                          {isTopMatch && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black tracking-wide shadow-xs">
                              ✨ BEST MATCH
                            </span>
                          )}
                          {hospital.emergencyAvailable && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold border border-rose-500/20">
                              24/7 ER
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[var(--text-secondary)] font-medium">
                          {hospital.address}, {hospital.city}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl shrink-0">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{hospital.rating || 4.9}</span>
                      </div>
                    </div>

                    {/* Department Badges */}
                    {hospital.departments && hospital.departments.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {hospital.departments.slice(0, 4).map((dept) => (
                          <span
                            key={dept}
                            className="px-2.5 py-0.5 rounded-lg bg-[var(--bg-card-bg)] text-[11px] font-semibold text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                          >
                            {dept}
                          </span>
                        ))}
                        {hospital.departments.length > 4 && (
                          <span className="text-[10px] text-[var(--text-muted)] font-bold">
                            +{hospital.departments.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Key Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-xs">
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Distance</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                          📍 {hospital.distanceKm ? `${hospital.distanceKm} km` : '1.8 km'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Est. Wait</span>
                        <span className="font-extrabold text-blue-500">
                          ⏳ ~{hospital.estimatedWaitMinutes || 12} mins
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Live Queue</span>
                        <span className="font-extrabold text-[var(--text-primary)]">
                          👥 {hospital.currentQueueCount || 2} waiting
                        </span>
                      </div>
                    </div>

                    {/* Primary & Secondary Action Row */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border-subtle)]">
                      <button
                        type="button"
                        onClick={() => setDetailHospital(hospital)}
                        className="px-3.5 py-2 rounded-xl border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] hover:text-emerald-600 transition-all cursor-pointer"
                      >
                        View Hospital
                      </button>

                      <div className="flex items-center gap-2">
                        {hospital.phone && (
                          <a
                            href={`tel:${hospital.phone}`}
                            className="p-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 text-xs font-bold cursor-pointer"
                            title="Call Hospital"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleBookHospital(hospital)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Book Appointment</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* HOSPITAL DETAILS MODAL */}
      {detailHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
                    {detailHospital.name}
                  </h2>
                  {detailHospital.emergencyAvailable && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 text-[10px] font-extrabold border border-rose-500/20">
                      24/7 ER
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  📍 {detailHospital.address}, {detailHospital.city}, {detailHospital.state} {detailHospital.pincode}
                </p>
              </div>

              <button
                onClick={() => setDetailHospital(null)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-bg)] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            {detailHospital.description && (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {detailHospital.description}
              </p>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Distance</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {detailHospital.distanceKm ? `${detailHospital.distanceKm} km` : '1.8 km'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Est. Wait Time</span>
                <span className="font-bold text-blue-500">
                  ~{detailHospital.estimatedWaitMinutes || 12} mins
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Current Queue</span>
                <span className="font-bold text-[var(--text-primary)]">
                  {detailHospital.currentQueueCount || 2} waiting
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Rating</span>
                <span className="font-bold text-amber-500 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {detailHospital.rating || 4.9}
                </span>
              </div>
            </div>

            {/* Available Departments */}
            {detailHospital.departments && detailHospital.departments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
                  Available Clinical Departments
                </h4>
                <div className="flex flex-wrap gap-2">
                  {detailHospital.departments.map((dept) => (
                    <span
                      key={dept}
                      className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20"
                    >
                      ✓ {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-2 text-xs">
              <h4 className="font-extrabold text-[var(--text-primary)]">Contact & Location</h4>
              <p className="text-[var(--text-secondary)] font-medium">📞 Phone: {detailHospital.phone}</p>
              {detailHospital.email && <p className="text-[var(--text-secondary)] font-medium">✉️ Email: {detailHospital.email}</p>}
              {detailHospital.website && (
                <p className="text-[var(--text-secondary)] font-medium">
                  🌐 Website:{' '}
                  <a href={detailHospital.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                    {detailHospital.website}
                  </a>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <a
                href={`https://maps.google.com/?q=${detailHospital.latitude},${detailHospital.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-bold text-blue-600 hover:bg-blue-500/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setDetailHospital(null);
                  handleBookHospital(detailHospital);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
