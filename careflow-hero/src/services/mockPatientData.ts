export interface PatientProfileData {
  name: string;
  email: string;
  healthId: string;
  age: number;
  bloodGroup: string;
  healthScore: number;
  healthScoreStatus: string;
}

export interface AppointmentData {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  hospital: string;
  room: string;
  date: string;
  time: string;
  type: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export interface LiveQueueData {
  position: number;
  totalInQueue: number;
  currentPatientSeen: number;
  estimatedWaitMinutes: number;
  progressPercent: number;
  statusText: string;
}

export interface PrescriptionSummary {
  activeCount: number;
  nextRefillDate: string;
  items: Array<{
    name: string;
    dosage: string;
    timing: string;
  }>;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'appointment' | 'prescription' | 'report' | 'message';
}

export interface WeeklyCareMetric {
  day: string;
  score: number;
  vitalsLogged: boolean;
}

export const getMockPatientData = (userName?: string, userEmail?: string) => {
  const patient: PatientProfileData = {
    name: userName || 'Sarah Jenkins',
    email: userEmail || 'patient@careflow.demo',
    healthId: 'CF-849201',
    age: 32,
    bloodGroup: 'O+ Positive',
    healthScore: 94,
    healthScoreStatus: 'Stable',
  };

  const nextAppointment: AppointmentData = {
    id: 'appt-101',
    doctorName: 'Dr. Sarah Chen',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    specialty: 'Cardiology Specialist',
    hospital: 'St. Jude Central Clinic',
    room: 'Suite 304 · Room 2',
    date: 'Today',
    time: '09:30 AM',
    type: 'Follow-up Consultation',
    status: 'Confirmed',
  };

  const liveQueue: LiveQueueData = {
    position: 2,
    totalInQueue: 8,
    currentPatientSeen: 1,
    estimatedWaitMinutes: 12,
    progressPercent: 75,
    statusText: "You're almost up",
  };

  const prescriptions: PrescriptionSummary = {
    activeCount: 2,
    nextRefillDate: '18 Sep',
    items: [
      { name: 'Metformin 500mg', dosage: '1 tablet after meals', timing: 'Daily 2:00 PM' },
      { name: 'Atorvastatin 20mg', dosage: '1 tablet at bedtime', timing: 'Daily 9:00 PM' },
    ],
  };

  const recentActivities: ActivityItem[] = [
    {
      id: 'act-1',
      title: 'Appointment Confirmed',
      description: 'Cardiology check-up with Dr. Sarah Chen confirmed for today at 09:30 AM.',
      timestamp: '10 mins ago',
      type: 'appointment',
    },
    {
      id: 'act-2',
      title: 'Prescription Refilled',
      description: 'Metformin 500mg (30-day supply) approved by Dr. Chen.',
      timestamp: '2 hours ago',
      type: 'prescription',
    },
    {
      id: 'act-3',
      title: 'Lab Report Uploaded',
      description: 'Comprehensive Blood Panel results added to your Health Records.',
      timestamp: 'Yesterday at 4:15 PM',
      type: 'report',
    },
    {
      id: 'act-4',
      title: 'Doctor Message Received',
      description: 'Dr. Sarah Chen sent care instructions regarding your upcoming visit.',
      timestamp: '2 days ago',
      type: 'message',
    },
  ];

  const weeklyCareActivity: WeeklyCareMetric[] = [
    { day: 'Mon', score: 88, vitalsLogged: true },
    { day: 'Tue', score: 92, vitalsLogged: true },
    { day: 'Wed', score: 90, vitalsLogged: true },
    { day: 'Thu', score: 95, vitalsLogged: true },
    { day: 'Fri', score: 94, vitalsLogged: true },
    { day: 'Sat', score: 91, vitalsLogged: true },
    { day: 'Sun', score: 94, vitalsLogged: true },
  ];

  return {
    patient,
    nextAppointment,
    liveQueue,
    prescriptions,
    recentActivities,
    weeklyCareActivity,
  };
};
