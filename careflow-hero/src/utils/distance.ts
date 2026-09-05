/**
 * Distance & Geo Utilities for CareFlow Google Maps Integration
 * Calculates distances exclusively in Kilometers (km).
 */

export interface GeoLocation {
  lat: number;
  lng: number;
}

/**
 * Calculates the Haversine distance between two geographical points in Kilometers.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Formats a distance in kilometers as a clean string (e.g., "2.4 km").
 */
export function formatDistanceKm(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Estimates driving travel time based on distance in km (avg 30 km/h in urban area).
 */
export function estimateTravelTimeMinutes(distanceKm: number): string {
  const minutes = Math.max(3, Math.round((distanceKm / 30) * 60));
  return `${minutes} mins`;
}

/**
 * Generates an external Google Maps directions URL from origin to destination.
 */
export function buildGoogleMapsDirectionsUrl(
  destLat: number,
  destLng: number,
  userLocation?: GeoLocation | null
): string {
  if (userLocation && userLocation.lat && userLocation.lng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destLat},${destLng}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}`;
}
