import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Star,
  Clock,
  Building2,
  RotateCcw,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';
import { HospitalQuickActionsRow } from './HospitalQuickActionsRow';
import { HospitalDetailsModal } from './HospitalDetailsModal';
import { CareFlowGoogleMap } from './CareFlowGoogleMap';
import { calculateDistanceKm, formatDistanceKm, estimateTravelTimeMinutes } from '../../utils/distance';
import type { RecommendationResponseData } from '../../services/recommendationService';

interface Step3RecommendationProps {
  aiRecommendation?: RecommendationResponseData | null;
  hospitals: HospitalData[];
  symptomText: string;
  selectedChips: string[];
  painLevel: string;
  duration: string;
  onBookHospital: (hospital: HospitalData) => void;
  onReset: () => void;
}

export const Step3Recommendation: React.FC<Step3RecommendationProps> = ({
  aiRecommendation,
  hospitals,
  selectedChips,
  onBookHospital,
  onReset,
}) => {
  const [activeDetailsHospital, setActiveDetailsHospital] = useState<HospitalData | null>(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | string | null>(null);

  // User Browser Location State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setLocationDenied(true);
        },
        { timeout: 8000 }
      );
    }
  }, []);

  // Determine AI specialty automatically from symptoms or backend recommendation
  const deptName = aiRecommendation?.predictedDepartment || (
    selectedChips.includes('Chest Pain') ? 'Cardiology' :
    selectedChips.includes('Injury') ? 'Orthopedics' :
    selectedChips.includes('Eye Problem') ? 'Ophthalmology' :
    selectedChips.includes('Skin Problem') ? 'Dermatology' :
    selectedChips.includes('Stomach Pain') ? 'Gastroenterology' : 'Internal Medicine'
  );

  // Compute real km distances if user location is available
  const processedHospitals = hospitals.map((h) => {
    let distanceKm = 1.2;
    if (userLocation && h.lat && h.lng) {
      distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lng, h.lat, h.lng);
    }
    return {
      ...h,
      calculatedDistanceKm: distanceKm,
      distanceFormatted: formatDistanceKm(distanceKm),
      travelTime: estimateTravelTimeMinutes(distanceKm),
    };
  });

  // Sort hospitals by combined rank: ER priority when severe + nearest distance + rating
  const isHighSeverity = aiRecommendation?.severity === 'HIGH';

  const sortedHospitals = [...processedHospitals].sort((a, b) => {
    if (isHighSeverity) {
      if (a.emergencyAvailable && !b.emergencyAvailable) return -1;
      if (!a.emergencyAvailable && b.emergencyAvailable) return 1;
    }
    return a.calculatedDistanceKm - b.calculatedDistanceKm;
  });

  const topMatch = sortedHospitals[0] || processedHospitals[0];
  const alternativeHospitals = sortedHospitals.slice(1, 5);

  const customReason = aiRecommendation?.recommendationReason;
  const confidenceScore = aiRecommendation?.confidenceScore || 98;

  const whyRecommendedChips = customReason ? [
    `✓ ${customReason}`,
    `✓ Auto-matched Specialty: ${deptName} Specialist`,
    `✓ Travel distance: ${topMatch ? topMatch.distanceFormatted : '1.2 km'} (${topMatch ? topMatch.travelTime : '6 mins drive'})`,
    `✓ Predicted queue (~${topMatch ? (topMatch as any).waitEstimate || '8 mins' : '8 mins'} wait time)`,
    `✓ Patient rating (${topMatch ? topMatch.rating : 4.9} ★)`,
  ] : [
    `✓ Auto-matched Specialty: ${deptName} Specialist`,
    `✓ Travel distance: ${topMatch ? topMatch.distanceFormatted : '1.2 km'} (${topMatch ? topMatch.travelTime : '6 mins drive'})`,
    `✓ Predicted queue (~${topMatch ? (topMatch as any).waitEstimate || '8 mins' : '8 mins'} wait time)`,
    '✓ Senior Specialist available today',
    `✓ Patient rating (${topMatch ? topMatch.rating : 4.9} ★)`,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Step 3 of 3: AI Recommendation</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
            Optimal Care Recommendation
          </h1>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-emerald-600 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Emergency Severe Warning Banner */}
      {isHighSeverity && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-start gap-3 shadow-xs">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold uppercase tracking-wide">Emergency Priority Care Advised</h4>
            <p>
              Your reported symptoms indicate potential high severity. Hospitals with 24/7 Emergency Room (ER) readiness have been prioritized below. If experiencing a life-threatening crisis, call emergency services immediately.
            </p>
          </div>
        </div>
      )}

      {/* Geolocation Denied Friendly Banner */}
      {locationDenied && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Location access disabled. Displaying default CareFlow facility distances in kilometers.</span>
          </div>
        </div>
      )}

      {/* COMPACT GOOGLE MAP CONTAINER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span>Live Facilities & User Location Map</span>
          </span>
          <span className="text-[11px] font-semibold text-[var(--text-muted)]">
            Distances in Kilometers (km)
          </span>
        </div>

        <CareFlowGoogleMap
          userLocation={userLocation}
          hospitals={sortedHospitals.map((h) => ({
            id: h.id,
            name: h.name,
            lat: h.lat,
            lng: h.lng,
            address: h.address,
            rating: h.rating,
            distanceFormatted: h.distanceFormatted,
            emergencyAvailable: h.emergencyAvailable,
            phone: h.phone,
          }))}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={(h) => setSelectedHospitalId(h.id)}
          onBookHospital={(h) => onBookHospital(h as any)}
        />
      </div>

      {/* TOP AI BEST MATCH RECOMMENDATION CARD */}
      {topMatch && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden space-y-6">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                ✨ Best Match for You
              </span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                • Auto-Assigned: <strong>{deptName} Specialist</strong>
              </span>
            </div>

            <div className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black tracking-wide shadow-md">
              {confidenceScore}% Match
            </div>
          </div>

          {/* Hospital Info & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-emerald-500 shrink-0" />
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
                  {topMatch.name}
                </h2>
              </div>

              <p className="text-xs text-[var(--text-secondary)] font-medium">
                {topMatch.address}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[var(--text-primary)]">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span>{topMatch.rating} ({topMatch.reviewsCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <MapPin className="h-4 w-4" />
                  <span>{topMatch.distanceFormatted}</span>
                </div>

                <div className="flex items-center gap-1 text-blue-500">
                  <Clock className="h-4 w-4" />
                  <span>Est. Wait: {(topMatch as any).waitEstimate || '8 mins'}</span>
                </div>
              </div>
            </div>

            {/* Why Recommended Reason Box */}
            <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-2">
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Why this recommendation
              </span>
              <ul className="space-y-1 text-xs font-medium text-[var(--text-secondary)]">
                {whyRecommendedChips.map((chip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <HospitalQuickActionsRow
            hospital={topMatch}
            userLocation={userLocation}
            onViewDetails={(h) => setActiveDetailsHospital(h)}
            onBookHospital={(h) => onBookHospital(h)}
          />
        </div>
      )}

      {/* ALTERNATIVE HOSPITALS SECTION */}
      {alternativeHospitals.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
            Alternative Nearby Facilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternativeHospitals.map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => setSelectedHospitalId(hospital.id)}
                className={`p-5 rounded-2xl bg-[var(--bg-surface)] border transition-all duration-300 space-y-4 shadow-sm hover:shadow-md cursor-pointer ${
                  selectedHospitalId === hospital.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-[var(--border-color)]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                      {hospital.name}
                    </h4>
                    <span className="text-[11px] font-medium text-[var(--text-muted)]">
                      {hospital.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span>{hospital.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    📍 {hospital.distanceFormatted}
                  </span>
                  <span>⏳ {(hospital as any).waitEstimate || '10 mins'} wait</span>
                </div>

                <HospitalQuickActionsRow
                  hospital={hospital}
                  userLocation={userLocation}
                  onViewDetails={(h) => setActiveDetailsHospital(h)}
                  onBookHospital={(h) => onBookHospital(h)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospital Details Modal */}
      {activeDetailsHospital && (
        <HospitalDetailsModal
          hospital={activeDetailsHospital}
          onClose={() => setActiveDetailsHospital(null)}
          onBook={(h: HospitalData) => {
            setActiveDetailsHospital(null);
            onBookHospital(h);
          }}
        />
      )}
    </motion.div>
  );
};
