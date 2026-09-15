export interface QueuePatient {
  id: string;
  tokenNumber: string;
  patientName: string;
  avatarInitials: string;
  doctorName: string;
  department: string;
  roomNumber: string;
  queuePosition: number;
  estimatedWaitMins: number;
  status: 'Arriving' | 'Waiting' | 'In Consultation' | 'Completed';
  checkInTime: string;
  appointmentTime: string;
}

export const INITIAL_QUEUE_PATIENTS: QueuePatient[] = [
  {
    id: 'q-1',
    tokenNumber: 'A-040',
    patientName: 'Robert Vance',
    avatarInitials: 'RV',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology & Heart Care',
    roomNumber: 'Suite 304 • Room 2',
    queuePosition: 0,
    estimatedWaitMins: 0,
    status: 'In Consultation',
    checkInTime: '10:05 AM',
    appointmentTime: '10:15 AM',
  },
  {
    id: 'q-2',
    tokenNumber: 'A-041',
    patientName: 'Elena Rostova',
    avatarInitials: 'ER',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology & Heart Care',
    roomNumber: 'Suite 304 • Room 2',
    queuePosition: 1,
    estimatedWaitMins: 4,
    status: 'Waiting',
    checkInTime: '10:12 AM',
    appointmentTime: '10:30 AM',
  },
  {
    id: 'q-3',
    tokenNumber: 'A-042',
    patientName: 'Sarah Jenkins',
    avatarInitials: 'SJ',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology & Heart Care',
    roomNumber: 'Suite 304 • Room 2',
    queuePosition: 2,
    estimatedWaitMins: 12,
    status: 'Waiting',
    checkInTime: '10:18 AM',
    appointmentTime: '10:45 AM',
  },
  {
    id: 'q-4',
    tokenNumber: 'A-043',
    patientName: 'Michael Chang',
    avatarInitials: 'MC',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology & Heart Care',
    roomNumber: 'Suite 304 • Room 2',
    queuePosition: 3,
    estimatedWaitMins: 20,
    status: 'Waiting',
    checkInTime: '10:22 AM',
    appointmentTime: '11:00 AM',
  },
  {
    id: 'q-5',
    tokenNumber: 'A-044',
    patientName: 'Priya Sharma',
    avatarInitials: 'PS',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology & Heart Care',
    roomNumber: 'Suite 304 • Room 2',
    queuePosition: 4,
    estimatedWaitMins: 28,
    status: 'Arriving',
    checkInTime: 'Pending Arrival',
    appointmentTime: '11:15 AM',
  },
  {
    id: 'q-0',
    tokenNumber: 'A-039',
    patientName: 'David Miller',
    avatarInitials: 'DM',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology & Heart Care',
    roomNumber: 'Suite 304 • Room 2',
    queuePosition: -1,
    estimatedWaitMins: 0,
    status: 'Completed',
    checkInTime: '9:45 AM',
    appointmentTime: '10:00 AM',
  },
];
