import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
import { CardSkeleton } from '../ui/SkeletonLoader';
import {
  Activity,
  Heart,
  Calendar,
  Stethoscope,
  Star,
  Pill,
  ShieldCheck,
  Droplet,
  Flame,
  Check,
  PhoneCall,
  UserCheck,
} from 'lucide-react';

interface PatientDashboardProps {
  onOpenBooking: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onOpenBooking }) => {
  const { user } = useAuth();
  const { data: dashboardData, isLoading } = useDashboard();
  const [medsTaken, setMedsTaken] = useState<{ [key: string]: boolean }>({});

  const toggleMed = (medId: string) => {
    setMedsTaken((prev) => ({ ...prev, [medId]: !prev[medId] }));
  };

  const healthSummary = dashboardData?.healthSummary;
  const upcoming = dashboardData?.upcomingAppointment;

  const patientSummary = {
    name: user?.name || 'CareFlow Patient',
    age: healthSummary?.age ? `${healthSummary.age} Yrs` : '34 Yrs',
    gender: 'Patient',
    bloodGroup: healthSummary?.bloodGroup || 'O+ Positive',
    healthId: user?.id ? `CF-${100000 + user.id}` : 'CF-849201',
    bmi: healthSummary?.bmi || 24.2,
    bmiCategory: healthSummary?.bmiCategory || 'Normal weight',
    emergencyContact: healthSummary?.emergencyContact?.name || 'Emergency Contact',
    emergencyPhone: healthSummary?.emergencyContact?.phone || '+1 (555) 987-6543',
  };

  const primaryDoctor = {
    name: upcoming?.doctorName || 'Dr. Sarah Chen',
    specialty: upcoming?.specializationName || 'Senior Cardiologist',
    rating: '4.9',
    nextAppointment: upcoming ? `${upcoming.appointmentDate} at ${upcoming.appointmentTime}` : 'Available Today',
  };

  const upcomingAppointmentData = upcoming
    ? {
        doctorName: upcoming.doctorName,
        specialty: upcoming.specializationName || 'Specialist Consultation',
        hospital: upcoming.hospitalName,
        room: 'Suite 304 • Room 2',
        date: upcoming.appointmentDate,
        time: upcoming.appointmentTime,
        status: `Status: ${upcoming.status}`,
      }
    : {
        doctorName: 'Dr. Sarah Chen',
        specialty: 'Cardiology Specialist Consultation',
        hospital: 'St. Jude Central Medical Center',
        room: 'Suite 304 • Room 2',
        date: 'Today',
        time: '02:30 PM',
        status: 'Confirmed by Hospital',
      };

  const medicineReminders = [
    {
      id: 'm1',
      name: 'Metoprolol 50mg',
      dosage: '1 Tablet with water after lunch',
      time: '1:00 PM',
    },
    {
      id: 'm2',
      name: 'Atorvastatin 20mg',
      dosage: '1 Tablet before bed',
      time: '9:00 PM',
    },
  ];

  const healthVitals = [
    { label: 'BMI Index', value: `${patientSummary.bmi}`, unit: patientSummary.bmiCategory, icon: Activity, color: 'text-emerald-500', status: 'Optimal' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'text-rose-500', status: 'Normal' },
    { label: 'Blood Oxygen', value: '98', unit: '% SpO2', icon: Droplet, color: 'text-blue-500', status: 'Healthy' },
    { label: 'Daily Activity', value: 'Active', unit: 'steps', icon: Flame, color: 'text-amber-500', status: 'Active' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-8">
      {/* Mobile Top Header */}
      <div className="lg:hidden p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
            {patientSummary.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)] leading-tight">{patientSummary.name}</h2>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{patientSummary.healthId}</p>
          </div>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          Book Appt
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-[var(--bg-card-bg)] to-[var(--bg-surface)] p-6 lg:p-8 backdrop-blur-xl shadow-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CareFlow Digital Patient Workspace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-heading">
                Welcome back, {patientSummary.name}
              </h1>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                Your medical vitals are optimal. You have{' '}
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {dashboardData?.totalAppointmentsCount || 1} appointment
                </strong>{' '}
                scheduled and {dashboardData?.unreadNotificationsCount || 0} new notifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
                  {patientSummary.bloodGroup}
                </div>
                <div className="text-left">
                  <p className="text-[10.5px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">Blood Group</p>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{patientSummary.bloodGroup}</p>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book New Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointment Card */}
              <div className="rounded-3xl border border-emerald-500/20 bg-[var(--bg-card-bg)] p-6 backdrop-blur-xl shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Upcoming Appointment</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                    {upcomingAppointmentData.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">{upcomingAppointmentData.doctorName}</h3>
                      <p className="text-xs text-[var(--text-secondary)]">{upcomingAppointmentData.specialty}</p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{upcomingAppointmentData.hospital}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-[var(--text-secondary)] space-y-1">
                    <span className="font-bold text-[var(--text-primary)]">{upcomingAppointmentData.date}</span>
                    <span className="text-emerald-500 font-semibold">{upcomingAppointmentData.time}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{upcomingAppointmentData.room}</span>
                  </div>
                </div>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {healthVitals.map((vital, idx) => {
                  const Icon = vital.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] backdrop-blur-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[var(--text-muted)]">{vital.label}</span>
                        <Icon className={`w-4 h-4 ${vital.color}`} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-[var(--text-primary)] font-heading">{vital.value}</span>
                        <span className="text-[10px] text-[var(--text-secondary)]">{vital.unit}</span>
                      </div>
                      <span className="inline-block text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {vital.status}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Medicine Reminders Card */}
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-6 backdrop-blur-xl shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Pill className="w-4 h-4" />
                    <span>Daily Prescription Reminders</span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-semibold">2 Remaining Today</span>
                </div>

                <div className="space-y-3">
                  {medicineReminders.map((med) => (
                    <div
                      key={med.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] transition-all hover:border-emerald-500/30"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleMed(med.id)}
                          className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            medsTaken[med.id]
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-[var(--border-color)] text-transparent hover:border-emerald-500'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <div>
                          <p className={`text-xs font-bold ${medsTaken[med.id] ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                            {med.name}
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)]">{med.dosage}</p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                        {med.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Primary Care Doctor */}
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-6 backdrop-blur-xl shadow-lg space-y-4">
                <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <span>Primary Healthcare Specialist</span>
                </h3>

                <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md shadow-emerald-500/20">
                    {primaryDoctor.name.charAt(4) || 'D'}
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{primaryDoctor.name}</h4>
                    <p className="text-xs text-[var(--text-secondary)]">{primaryDoctor.specialty}</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{primaryDoctor.rating} Rating</span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-500/25 transition-all cursor-pointer"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div className="rounded-3xl border border-rose-500/20 bg-rose-950/20 p-6 backdrop-blur-xl shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <PhoneCall className="w-4 h-4" />
                  <span>Emergency Health Contact</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <p className="text-xs font-bold text-[var(--text-primary)]">{patientSummary.emergencyContact}</p>
                  <p className="text-xs text-rose-400 font-semibold mt-0.5">{patientSummary.emergencyPhone}</p>
                </div>

                <a
                  href={`tel:${patientSummary.emergencyPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:bg-rose-600 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Emergency Contact</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
