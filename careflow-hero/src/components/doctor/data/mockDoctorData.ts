export interface AppointmentRequest {
  id: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  avatarInitials?: string;
  symptoms: string;
  requestedTime: string;
  suggestedTime?: string | null;
  status: 'Pending' | 'Confirmed' | 'Declined' | 'Time Suggested';
  department: string;
  consultationFee: string;
  priority?: 'Routine' | 'Urgent' | 'Follow-up';
  historyNotes?: string;
}

export const INITIAL_APPOINTMENT_REQUESTS: AppointmentRequest[] = [
  {
    id: 'req-1',
    patientName: 'Sarah Jenkins',
    patientAge: 34,
    patientGender: 'Female',
    avatarInitials: 'SJ',
    symptoms: 'Mild chest tightness after exercise & shortness of breath',
    requestedTime: 'Today at 2:30 PM',
    suggestedTime: null,
    status: 'Pending',
    department: 'Cardiology & Heart Care',
    consultationFee: '₹1,500',
    priority: 'Urgent',
    historyNotes: 'Hypertension history, routine ECG 6 months ago.',
  },
  {
    id: 'req-2',
    patientName: 'Michael Chang',
    patientAge: 42,
    patientGender: 'Male',
    avatarInitials: 'MC',
    symptoms: 'Recurrent migraine headaches & light sensitivity for 3 days',
    requestedTime: 'Today at 4:15 PM',
    suggestedTime: null,
    status: 'Pending',
    department: 'Neurology & Brain Health',
    consultationFee: '₹2,000',
    priority: 'Routine',
    historyNotes: 'No previous neurological surgery.',
  },
  {
    id: 'req-3',
    patientName: 'Priya Sharma',
    patientAge: 29,
    patientGender: 'Female',
    avatarInitials: 'PS',
    symptoms: 'Routine 6-month cardiovascular follow-up & BP check',
    requestedTime: 'Tomorrow at 10:00 AM',
    suggestedTime: null,
    status: 'Confirmed',
    department: 'Cardiology & Heart Care',
    consultationFee: '₹1,500',
    priority: 'Follow-up',
    historyNotes: 'Stable lipid profile.',
  },
  {
    id: 'req-4',
    patientName: 'David Miller',
    patientAge: 56,
    patientGender: 'Male',
    avatarInitials: 'DM',
    symptoms: 'Joint stiffness & knee inflammation following physical activity',
    requestedTime: 'Tomorrow at 11:30 AM',
    suggestedTime: null,
    status: 'Pending',
    department: 'Orthopedics & Joint Care',
    consultationFee: '₹1,200',
    priority: 'Routine',
    historyNotes: 'Post-arthroscopy recovery consultation.',
  },
  {
    id: 'req-5',
    patientName: 'Ananya Patel',
    patientAge: 38,
    patientGender: 'Female',
    avatarInitials: 'AP',
    symptoms: 'Palpitations during sleep & fatigue',
    requestedTime: 'Tomorrow at 3:00 PM',
    suggestedTime: null,
    status: 'Pending',
    department: 'Cardiology & Heart Care',
    consultationFee: '₹1,500',
    priority: 'Urgent',
    historyNotes: 'Thyroid panel pending.',
  },
];
