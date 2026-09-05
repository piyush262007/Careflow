export type NotificationType =
  | 'Appointment Accepted'
  | 'Appointment Rejected'
  | 'Doctor Suggested New Time'
  | 'Queue Position Updated'
  | 'Doctor Running Late'
  | 'Prescription Uploaded'
  | 'Medicine Reminder';

export interface CareFlowNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
  actionText: string;
  actionPayload?: string;
  doctorName?: string;
  category: 'Appointments' | 'Queue' | 'Medications' | 'Records';
}

export const INITIAL_NOTIFICATIONS: CareFlowNotification[] = [
  {
    id: 'notif-1',
    type: 'Appointment Accepted',
    title: 'Appointment Request Accepted',
    description: 'Dr. Sarah Chen accepted your consultation request for Today at 2:30 PM.',
    timeAgo: '10m ago',
    isRead: false,
    actionText: 'View Appointment Pass',
    doctorName: 'Dr. Sarah Chen',
    category: 'Appointments',
  },
  {
    id: 'notif-2',
    type: 'Queue Position Updated',
    title: 'Queue Position Update: #2 in Line',
    description: 'You are now position #2 in line at Suite 304. Estimated wait time is ~8 minutes.',
    timeAgo: '15m ago',
    isRead: false,
    actionText: 'Track Live Queue',
    category: 'Queue',
  },
  {
    id: 'notif-3',
    type: 'Doctor Suggested New Time',
    title: 'Alternative Slot Suggested',
    description: 'Dr. Sarah Chen suggested an alternative slot: Tomorrow at 9:30 AM.',
    timeAgo: '25m ago',
    isRead: false,
    actionText: 'Accept New Time',
    doctorName: 'Dr. Sarah Chen',
    category: 'Appointments',
  },
  {
    id: 'notif-4',
    type: 'Doctor Running Late',
    title: 'Clinic Schedule Delay',
    description: 'Dr. Sarah Chen is running 10 minutes late due to an emergency procedure.',
    timeAgo: '35m ago',
    isRead: false,
    actionText: 'Acknowledge Delay',
    doctorName: 'Dr. Sarah Chen',
    category: 'Queue',
  },
  {
    id: 'notif-5',
    type: 'Medicine Reminder',
    title: 'Evening Medicine Reminder',
    description: 'Time for evening dosage: Metoprolol 50mg (1 Tablet with water after dinner).',
    timeAgo: '1h ago',
    isRead: true,
    actionText: 'Mark as Taken',
    category: 'Medications',
  },
  {
    id: 'notif-6',
    type: 'Prescription Uploaded',
    title: 'New E-Prescription Issued',
    description: 'Dr. Sarah Chen uploaded your verified E-Prescription (Atorvastatin 20mg).',
    timeAgo: '2h ago',
    isRead: true,
    actionText: 'Download PDF Pass',
    doctorName: 'Dr. Sarah Chen',
    category: 'Records',
  },
  {
    id: 'notif-7',
    type: 'Appointment Rejected',
    title: 'Consultation Unavailable',
    description: 'The requested slot for General Surgery Clinic could not be accommodated today.',
    timeAgo: '3h ago',
    isRead: true,
    actionText: 'Book New Slot',
    category: 'Appointments',
  },
];
