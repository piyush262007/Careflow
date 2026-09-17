export interface SystemMetrics {
  totalPatientsCount: number;
  activeDoctorsCount: number;
  hospitalsCount: number;
  appointmentsTodayCount: number;
  waitingPatientsCount: number;
  systemStatus: 'Operational' | 'Degraded' | 'Maintenance';
}

export interface AppointmentOperationStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  completed: number;
  weeklyTrend: Array<{ day: string; volume: number }>;
}

export interface HospitalRecord {
  id: string;
  name: string;
  location: string;
  departmentsCount: number;
  doctorsCount: number;
  todaysAppointments: number;
  currentQueue: number;
  status: 'Operational' | 'Busy' | 'Limited' | 'Offline';
}

export interface DoctorAdminRecord {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  availability: 'Available' | 'In Consultation' | 'On Break' | 'Offline';
  todaysAppointments: number;
  status: 'Available' | 'In Consultation' | 'On Break' | 'Offline';
  avatar: string;
}

export interface PatientAdminRecord {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  upcomingAppointment: string;
  assignedDoctor: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
}

export interface QueueMonitorItem {
  id: string;
  hospitalName: string;
  department: string;
  currentQueueCount: number;
  avgWaitMinutes: number;
  status: 'Normal' | 'Busy' | 'Limited' | 'Critical';
}

export interface SystemActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'doctor' | 'hospital' | 'appointment' | 'system';
}

export interface AdminAlert {
  id: string;
  title: string;
  message: string;
  priority: 'Info' | 'Warning' | 'Critical';
  timestamp: string;
}

export const getMockAdminData = () => {
  const systemMetrics: SystemMetrics = {
    totalPatientsCount: 12840,
    activeDoctorsCount: 248,
    hospitalsCount: 34,
    appointmentsTodayCount: 1284,
    waitingPatientsCount: 186,
    systemStatus: 'Operational',
  };

  const appointmentStats: AppointmentOperationStats = {
    total: 1284,
    confirmed: 740,
    pending: 180,
    cancelled: 64,
    completed: 300,
    weeklyTrend: [
      { day: 'Mon', volume: 1150 },
      { day: 'Tue', volume: 1220 },
      { day: 'Wed', volume: 1284 },
      { day: 'Thu', volume: 1310 },
      { day: 'Fri', volume: 1260 },
      { day: 'Sat', volume: 940 },
      { day: 'Sun', volume: 720 },
    ],
  };

  const hospitals: HospitalRecord[] = [
    {
      id: 'hosp-1',
      name: 'CareFlow Medical Center',
      location: 'Downtown Core',
      departmentsCount: 12,
      doctorsCount: 45,
      todaysAppointments: 320,
      currentQueue: 18,
      status: 'Busy',
    },
    {
      id: 'hosp-2',
      name: 'City General Hospital',
      location: 'North Wing',
      departmentsCount: 8,
      doctorsCount: 28,
      todaysAppointments: 190,
      currentQueue: 6,
      status: 'Operational',
    },
    {
      id: 'hosp-3',
      name: 'St. Jude Central Clinic',
      location: 'East Bay District',
      departmentsCount: 10,
      doctorsCount: 36,
      todaysAppointments: 240,
      currentQueue: 12,
      status: 'Operational',
    },
    {
      id: 'hosp-4',
      name: 'Metro Emergency Care',
      location: 'West District',
      departmentsCount: 6,
      doctorsCount: 22,
      todaysAppointments: 110,
      currentQueue: 22,
      status: 'Limited',
    },
  ];

  const doctors: DoctorAdminRecord[] = [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiology',
      hospital: 'CareFlow Medical Center',
      availability: 'Available',
      todaysAppointments: 12,
      status: 'In Consultation',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'doc-2',
      name: 'Dr. Marcus Vance',
      specialty: 'Neurology',
      hospital: 'City General Hospital',
      availability: 'Available',
      todaysAppointments: 10,
      status: 'Available',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'doc-3',
      name: 'Dr. Elena Rostova',
      specialty: 'Orthopedics',
      hospital: 'St. Jude Central Clinic',
      availability: 'On Break',
      todaysAppointments: 14,
      status: 'On Break',
      avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78965?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'doc-4',
      name: 'Dr. James Wilson',
      specialty: 'Gastroenterology',
      hospital: 'Metro Emergency Care',
      availability: 'Offline',
      todaysAppointments: 8,
      status: 'Offline',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const patients: PatientAdminRecord[] = [
    {
      id: 'pat-1',
      name: 'John Carter',
      age: 32,
      lastVisit: '12 Sep',
      upcomingAppointment: 'Today 09:30 AM',
      assignedDoctor: 'Dr. Sarah Chen',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'pat-2',
      name: 'Emma Wilson',
      age: 27,
      lastVisit: '10 Sep',
      upcomingAppointment: 'Today 10:00 AM',
      assignedDoctor: 'Dr. Sarah Chen',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'pat-3',
      name: 'Michael Brown',
      age: 45,
      lastVisit: '05 Sep',
      upcomingAppointment: 'Today 10:30 AM',
      assignedDoctor: 'Dr. Marcus Vance',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    },
  ];

  const queueMonitors: QueueMonitorItem[] = [
    {
      id: 'qm-1',
      hospitalName: 'CareFlow Medical Center',
      department: 'Cardiology',
      currentQueueCount: 18,
      avgWaitMinutes: 18,
      status: 'Busy',
    },
    {
      id: 'qm-2',
      hospitalName: 'City General Hospital',
      department: 'General Medicine',
      currentQueueCount: 4,
      avgWaitMinutes: 8,
      status: 'Normal',
    },
    {
      id: 'qm-3',
      hospitalName: 'St. Jude Central Clinic',
      department: 'Orthopedics',
      currentQueueCount: 12,
      avgWaitMinutes: 14,
      status: 'Normal',
    },
    {
      id: 'qm-4',
      hospitalName: 'Metro Emergency Care',
      department: 'Emergency ER',
      currentQueueCount: 22,
      avgWaitMinutes: 24,
      status: 'Critical',
    },
  ];

  const systemActivities: SystemActivityLog[] = [
    {
      id: 'act-1',
      title: 'New Doctor Registered',
      description: 'Dr. Marcus Vance added to City General Hospital (Neurology).',
      timestamp: '15 mins ago',
      type: 'doctor',
    },
    {
      id: 'act-2',
      title: 'Hospital Schedule Updated',
      description: 'St. Jude Central Clinic updated weekend ER capacity.',
      timestamp: '45 mins ago',
      type: 'hospital',
    },
    {
      id: 'act-3',
      title: 'Appointment Volume Spike',
      description: 'CareFlow Medical Center crossed 300 appointments milestone today.',
      timestamp: '2 hours ago',
      type: 'appointment',
    },
    {
      id: 'act-4',
      title: 'Hospital Marked Operational',
      description: 'City General Hospital restored normal queue flow.',
      timestamp: '3 hours ago',
      type: 'system',
    },
  ];

  const adminAlerts: AdminAlert[] = [
    {
      id: 'alt-1',
      title: 'High Queue Capacity Warning',
      message: 'Cardiology queue at CareFlow Medical Center is 20% above normal threshold.',
      priority: 'Warning',
      timestamp: '10m ago',
    },
    {
      id: 'alt-2',
      title: 'Doctor Schedule Audit',
      message: '3 doctors have not updated today\'s availability status.',
      priority: 'Info',
      timestamp: '1h ago',
    },
    {
      id: 'alt-3',
      title: 'ER Queue Threshold Exceeded',
      message: 'Metro Emergency ER queue reached critical wait time (>24 mins).',
      priority: 'Critical',
      timestamp: '5m ago',
    },
  ];

  const aiOperationsMessage = "Today's appointment demand is 14% higher than the weekly average.";

  return {
    systemMetrics,
    appointmentStats,
    hospitals,
    doctors,
    patients,
    queueMonitors,
    systemActivities,
    adminAlerts,
    aiOperationsMessage,
  };
};
