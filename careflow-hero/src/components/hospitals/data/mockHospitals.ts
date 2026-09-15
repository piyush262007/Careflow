export interface HospitalData {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  distanceKm: number;
  travelTime: string;
  trafficStatus: string;
  openStatus: string;
  isOpen: boolean;
  emergencyAvailable: boolean;
  emergencyStatusText: string;
  availableDoctorsCount: number;
  address: string;
  phone: string;
  departments: string[];
  lat: number;
  lng: number;
}

export const MOCK_HOSPITALS: HospitalData[] = [
  {
    id: 'hosp-1',
    name: 'St. Jude Central Medical Center',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 428,
    distance: '1.9 km away',
    distanceKm: 1.9,
    travelTime: '6 mins drive',
    trafficStatus: 'Light Traffic',
    openStatus: 'Open 24/7',
    isOpen: true,
    emergencyAvailable: true,
    emergencyStatusText: '24/7 ER Ready • Trauma Level I',
    availableDoctorsCount: 18,
    address: '742 Evergreen Terrace, Downtown Medical District',
    phone: '+1 (555) 234-8901',
    departments: ['Cardiology', 'Neurology', 'Pediatrics', 'Emergency ER', 'Orthopedics'],
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 'hosp-2',
    name: 'Metro Care Health Pavilion',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 312,
    distance: '4.5 km away',
    distanceKm: 4.5,
    travelTime: '12 mins drive',
    trafficStatus: 'Moderate Traffic',
    openStatus: 'Open Today (8:00 AM - 10:00 PM)',
    isOpen: true,
    emergencyAvailable: false,
    emergencyStatusText: 'Urgent Care Available',
    availableDoctorsCount: 14,
    address: '1200 Grand Avenue, Westside Plaza',
    phone: '+1 (555) 876-5432',
    departments: ['Internal Medicine', 'Dermatology', 'Oncology', 'Urgent Care'],
    lat: 37.7833,
    lng: -122.4167,
  },
  {
    id: 'hosp-3',
    name: 'Northwest Specialty Surgical Clinic',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 215,
    distance: '6.6 km away',
    distanceKm: 6.6,
    travelTime: '15 mins drive',
    trafficStatus: 'Light Traffic',
    openStatus: 'Open 24/7',
    isOpen: true,
    emergencyAvailable: true,
    emergencyStatusText: 'Surgical Emergency Ready',
    availableDoctorsCount: 11,
    address: '450 University Blvd, North Campus Suite 300',
    phone: '+1 (555) 345-6789',
    departments: ['Orthopedics', 'Neurosurgery', 'Cardiovascular Surgery'],
    lat: 37.7651,
    lng: -122.4241,
  },
  {
    id: 'hosp-4',
    name: 'Valley Children & Family Hospital',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 512,
    distance: '8.5 km away',
    distanceKm: 8.5,
    travelTime: '18 mins drive',
    trafficStatus: 'Moderate Traffic',
    openStatus: 'Open 24/7',
    isOpen: true,
    emergencyAvailable: true,
    emergencyStatusText: 'Pediatric ER & Neonatal ICU',
    availableDoctorsCount: 22,
    address: '880 Valley Care Parkway, East District',
    phone: '+1 (555) 901-2345',
    departments: ['Pediatrics', 'Neonatology', 'Child Psychiatry', 'Pediatric ER'],
    lat: 37.7512,
    lng: -122.4089,
  },
];
