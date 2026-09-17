export interface DoctorProfile {
  name: string;
  title: string;
  specialty: string;
  facility: string;
  status: 'Available' | 'In Consultation' | 'On Break' | 'Offline';
  avatar: string;
}

export interface DoctorSummaryMetrics {
  todaysAppointmentsCount: number;
  appointmentsTrend: string;
  waitingPatientsCount: number;
  completedAppointmentsCount: number;
  completedPercentage: number;
  nextPatientTime: string;
  nextPatientInMinutes: number;
}

export interface DoctorAppointmentItem {
  id: string;
  patientName: string;
  patientAvatar: string;
  patientAge: number;
  time: string;
  specialtyType: string;
  status: 'Confirmed' | 'Waiting' | 'Upcoming' | 'Completed';
  queuePosition?: number;
}

export interface NextPatientDetails {
  id: string;
  patientName: string;
  patientAvatar: string;
  patientAge: number;
  appointmentType: string;
  time: string;
  reason: string;
  medicalHistorySummary: string;
}

export interface DoctorPatientRecord {
  id: string;
  patientName: string;
  patientAvatar: string;
  lastVisit: string;
  condition: string;
  status: 'Stable' | 'Follow-up required' | 'Under control' | 'Critical';
}

export interface ScheduleSlot {
  time: string;
  patientName: string;
  type: string;
  status: 'Completed' | 'Current' | 'Upcoming' | 'Break';
}

export interface ClinicalInsightMetrics {
  completed: number;
  avgConsultationMinutes: number;
  totalServed: number;
  queueEfficiencyPercent: number;
  weeklyPerformance: Array<{ day: string; patientsCount: number }>;
}

export const getMockDoctorData = () => {
  const doctor: DoctorProfile = {
    name: 'Dr. Sarah Chen',
    title: 'Senior Consultant',
    specialty: 'Cardiologist',
    facility: 'CareFlow Medical Center',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  };

  const summaryMetrics: DoctorSummaryMetrics = {
    todaysAppointmentsCount: 12,
    appointmentsTrend: '+3 from yesterday',
    waitingPatientsCount: 4,
    completedAppointmentsCount: 7,
    completedPercentage: 58,
    nextPatientTime: '09:30 AM',
    nextPatientInMinutes: 12,
  };

  const appointments: DoctorAppointmentItem[] = [
    {
      id: 'd-appt-1',
      patientName: 'John Carter',
      patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      patientAge: 32,
      time: '09:30 AM',
      specialtyType: 'Cardiology Follow-up',
      status: 'Confirmed',
      queuePosition: 1,
    },
    {
      id: 'd-appt-2',
      patientName: 'Emma Wilson',
      patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      patientAge: 27,
      time: '10:00 AM',
      specialtyType: 'General Consultation',
      status: 'Waiting',
      queuePosition: 2,
    },
    {
      id: 'd-appt-3',
      patientName: 'Michael Brown',
      patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      patientAge: 45,
      time: '10:30 AM',
      specialtyType: 'Cardiology',
      status: 'Upcoming',
      queuePosition: 3,
    },
    {
      id: 'd-appt-4',
      patientName: 'Sarah Miller',
      patientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      patientAge: 38,
      time: '11:00 AM',
      specialtyType: 'Routine Checkup',
      status: 'Upcoming',
      queuePosition: 4,
    },
    {
      id: 'd-appt-5',
      patientName: 'Robert Davis',
      patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      patientAge: 52,
      time: '12:00 PM',
      specialtyType: 'ECG Review',
      status: 'Upcoming',
      queuePosition: 5,
    },
  ];

  const nextPatient: NextPatientDetails = {
    id: 'p-101',
    patientName: 'John Carter',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    patientAge: 32,
    appointmentType: 'Cardiology Follow-up',
    time: '09:30 AM',
    reason: 'Follow-up consultation after recent ECG test & medication review.',
    medicalHistorySummary: 'Hypertension (Controlled), No known drug allergies.',
  };

  const patientOverviewList: DoctorPatientRecord[] = [
    {
      id: 'rec-1',
      patientName: 'John Carter',
      patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      lastVisit: '12 Sep',
      condition: 'Cardiology follow-up',
      status: 'Stable',
    },
    {
      id: 'rec-2',
      patientName: 'Emma Wilson',
      patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      lastVisit: '10 Sep',
      condition: 'General consultation',
      status: 'Follow-up required',
    },
    {
      id: 'rec-3',
      patientName: 'Michael Brown',
      patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      lastVisit: '05 Sep',
      condition: 'Hypertension review',
      status: 'Under control',
    },
  ];

  const scheduleSlots: ScheduleSlot[] = [
    { time: '09:30 AM', patientName: 'John Carter', type: 'Cardiology', status: 'Current' },
    { time: '10:00 AM', patientName: 'Emma Wilson', type: 'General Consultation', status: 'Upcoming' },
    { time: '10:30 AM', patientName: 'Michael Brown', type: 'Cardiology', status: 'Upcoming' },
    { time: '11:00 AM', patientName: 'Sarah Miller', type: 'Routine Checkup', status: 'Upcoming' },
    { time: '11:30 AM', patientName: 'Lunch & Clinical Break', type: 'Break', status: 'Break' },
    { time: '12:00 PM', patientName: 'Robert Davis', type: 'ECG Review', status: 'Upcoming' },
  ];

  const clinicalInsights: ClinicalInsightMetrics = {
    completed: 7,
    avgConsultationMinutes: 14,
    totalServed: 7,
    queueEfficiencyPercent: 94,
    weeklyPerformance: [
      { day: 'Mon', patientsCount: 14 },
      { day: 'Tue', patientsCount: 16 },
      { day: 'Wed', patientsCount: 12 },
      { day: 'Thu', patientsCount: 18 },
      { day: 'Fri', patientsCount: 15 },
      { day: 'Sat', patientsCount: 10 },
      { day: 'Sun', patientsCount: 8 },
    ],
  };

  const aiInsightMessage = 'Your afternoon queue volume is currently 18% above normal.';

  return {
    doctor,
    summaryMetrics,
    appointments,
    nextPatient,
    patientOverviewList,
    scheduleSlots,
    clinicalInsights,
    aiInsightMessage,
  };
};
