export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'In Progress';
  avatarInitials: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  isAvailable: boolean;
  avatar: string;
}

export interface ToastAlert {
  id: string;
  title: string;
  subtitle: string;
  type: 'success' | 'info' | 'warning';
  time: string;
}

export interface HealthMetric {
  score: number;
  label: string;
  status: string;
  visitsThisWeek: number;
  satisfactionRate: number;
}
