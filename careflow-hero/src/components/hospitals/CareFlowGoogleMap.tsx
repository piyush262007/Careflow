import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Navigation, Calendar } from 'lucide-react';
import { buildGoogleMapsDirectionsUrl } from '../../utils/distance';

interface HospitalMapMarker {
  id: number | string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
  distanceFormatted?: string;
  emergencyAvailable?: boolean;
  phone?: string;
}

interface CareFlowGoogleMapProps {
  userLocation: { lat: number; lng: number } | null;
  hospitals: HospitalMapMarker[];
  selectedHospitalId?: number | string | null;
  onSelectHospital?: (hospital: HospitalMapMarker) => void;
  onBookHospital?: (hospital: HospitalMapMarker) => void;
}

export const CareFlowGoogleMap: React.FC<CareFlowGoogleMapProps> = ({
  userLocation,
  hospitals,
  selectedHospitalId,
  onSelectHospital,
  onBookHospital,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstance = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [activeInfoHospital, setActiveInfoHospital] = useState<HospitalMapMarker | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // 1. Load Google Maps Script safely
  useEffect(() => {
    if (!apiKey) {
      setMapError(true);
      return;
    }

    if ((window as any).google && (window as any).google.maps) {
      setMapLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => setMapError(true);
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => setMapLoaded(true));
      existingScript.addEventListener('error', () => setMapError(true));
    }
  }, [apiKey]);

  // 2. Initialize Map & Render Markers
  useEffect(() => {
    if (!mapLoaded || mapError || !mapRef.current || !(window as any).google) {
      return;
    }

    const google = (window as any).google;
    const defaultCenter = userLocation || { lat: 37.7749, lng: -122.4194 };

    if (!googleMapInstance.current) {
      googleMapInstance.current = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
          {
            featureType: 'poi.medical',
            elementType: 'geometry',
            stylers: [{ color: '#d1fae5' }],
          },
        ],
      });
    } else {
      googleMapInstance.current.setCenter(defaultCenter);
    }

    const map = googleMapInstance.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m: any) => m.setMap(null));
    markersRef.current = {};

    // User Location Marker
    if (userLocation) {
      new google.maps.Marker({
        position: userLocation,
        map,
        title: 'Your Current Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
      });
    }

    // Bounds auto-fitting
    const bounds = new google.maps.LatLngBounds();
    if (userLocation) bounds.extend(userLocation);

    // Hospital Markers
    hospitals.forEach((h) => {
      const pos = { lat: h.lat, lng: h.lng };
      bounds.extend(pos);

      const isSelected = selectedHospitalId === h.id;

      const marker = new google.maps.Marker({
        position: pos,
        map,
        title: h.name,
        animation: isSelected ? google.maps.Animation.BOUNCE : null,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: isSelected ? 7 : 5.5,
          fillColor: isSelected ? '#10b981' : h.emergencyAvailable ? '#ef4444' : '#059669',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      marker.addListener('click', () => {
        setActiveInfoHospital(h);
        if (onSelectHospital) onSelectHospital(h);
      });

      markersRef.current[h.id] = marker;
    });

    if (hospitals.length > 0 && !selectedHospitalId) {
      map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
    }
  }, [mapLoaded, mapError, hospitals, userLocation, selectedHospitalId, onSelectHospital]);

  // Fallback View if Google Maps API is unavailable or missing API Key
  if (mapError || !apiKey) {
    return (
      <div className="w-full h-48 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-4 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden shadow-xs">
        <div className="p-3 rounded-full bg-slate-500/10 text-slate-500">
          <AlertCircle className="h-6 w-6" />
        </div>
        <p className="text-xs font-bold text-[var(--text-primary)]">
          Interactive Map Unavailable
        </p>
        <span className="text-[11px] text-[var(--text-muted)] max-w-sm">
          CareFlow directory is actively listing nearby hospitals with real-time wait times & booking availability.
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-md">
      {/* Map Element */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Selected Marker Active Info Window Popover */}
      {activeInfoHospital && (
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                {activeInfoHospital.name}
              </span>
              {activeInfoHospital.emergencyAvailable && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500/10 text-[9px] font-extrabold text-rose-600 dark:text-rose-400">
                  24/7 ER
                </span>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] truncate">
              {activeInfoHospital.address} {activeInfoHospital.distanceFormatted && `• ${activeInfoHospital.distanceFormatted}`}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={buildGoogleMapsDirectionsUrl(activeInfoHospital.lat, activeInfoHospital.lng, userLocation)}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              title="Open Google Maps Directions"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Directions</span>
            </a>

            {onBookHospital && (
              <button
                type="button"
                onClick={() => onBookHospital(activeInfoHospital)}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
