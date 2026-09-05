import React, { useEffect, useState } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  Building2,
  User,
  Bell,
  ArrowRight,
  Stethoscope,
  QrCode,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';
import type { TodayCareData } from '../../services/dashboardService';
import { PageLoader } from '../ui/PageLoader';

interface TodayCarePageProps {
  onOpenBooking: () => void;
}

export const TodayCarePage: React.FC<TodayCarePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<TodayCareData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTodayCare = async () => {
      try {
        const res = await dashboardService.getTodayCare();
        if (isMounted && res.success && res.data) {
          setData(res.data);
        }
      } catch (err: any) {
        if (isMounted) {
          console.warn('Today Care API fetch failed:', err);
          setError('Unable to load Today Care data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTodayCare();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const todayAppointments = data?.todayAppointments || [];
  const hasToday = todayAppointments.length > 0;
  const nextAppt = data?.nextAppointment;
  const liveStatus = data?.liveHospitalStatus;
  const notifications = data?.importantNotifications || [];

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-8">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <Heart className="h-5 w-5" />
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
            Today's Care
          </span>
        </div>
      </header>

      {/* Page Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              <Heart className="h-3.5 w-3.5" />
              <span>Daily Healthcare Companion</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              Today's Care
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Real-time daily healthcare summary, appointment schedules, live queue status, and reminders.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition-all shrink-0 active:scale-[0.98]"
          >
            <Calendar className="h-4 w-4" />
            <span>Book New Appointment</span>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* 1. TODAY'S APPOINTMENTS OR EMPTY STATE */}
        {hasToday ? (
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              <span>Appointments Scheduled for Today</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {todayAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-emerald-500/30 shadow-md space-y-4 relative overflow-hidden"
                >
                  <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-2xl" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/20">
                        Today • {appt.appointmentTime || '10:00 AM'}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[var(--text-muted)]">
                        Ref: #{appt.id}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider w-fit">
                      {appt.status || 'CONFIRMED'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--text-primary)]">
                        <User className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{appt.doctorName || 'Senior Specialist Doctor'}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-medium pl-6">
                        {appt.specializationName || 'Clinical Care'}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] pt-1">
                        <Building2 className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>{appt.hospitalName || 'CareFlow Primary Center'}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-2 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-muted)] font-medium">Consultation Fee</span>
                        <span className="font-extrabold text-[var(--text-primary)]">
                          ${appt.consultationFee || 75}
                        </span>
                      </div>

                      {appt.qrCode && (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                          <QrCode className="h-4 w-4" />
                          <span>Digital QR Pass Available</span>
                        </div>
                      )}

                      <button
                        onClick={() => navigate('/appointments')}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        <span>View Pass & Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* EMPTY STATE WHEN NO APPOINTMENT TODAY */
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>

            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
                No Care Scheduled for Today
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                You have no active hospital appointments for today. You can find nearby care or book a new consultation anytime.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/hospitals')}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Find Care</span>
              </button>

              <button
                onClick={() => navigate('/appointments')}
                className="py-2.5 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] hover:bg-[var(--bg-item-hover)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-emerald-500" />
                <span>View Upcoming Appointments</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. NEAREST UPCOMING APPOINTMENT (IF NOT TODAY) */}
        {!hasToday && nextAppt && (
          <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Next Upcoming Appointment</span>
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {nextAppt.appointmentDate} • {nextAppt.appointmentTime}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  {nextAppt.doctorName}
                </h4>
                <p className="text-[var(--text-secondary)]">{nextAppt.hospitalName}</p>
              </div>

              <button
                onClick={() => navigate('/appointments')}
                className="py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] hover:bg-[var(--bg-item-hover)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-1 transition-all cursor-pointer shrink-0"
              >
                <span>View Details</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-500" />
              </button>
            </div>
          </div>
        )}

        {/* 3. LIVE HOSPITAL QUEUE STATUS */}
        {liveStatus && (
          <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-blue-500/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 font-bold">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-[var(--text-primary)]">
                    Live Queue at {liveStatus.hospitalName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-extrabold">
                    ER: {liveStatus.emergencyStatus || 'AVAILABLE'}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Current Queue: <strong>{liveStatus.currentQueue} patients waiting</strong> • Estimated Wait: <strong>~{liveStatus.estimatedWaitMinutes} mins</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/queue')}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all shrink-0 active:scale-[0.98]"
            >
              <span>Track Live Queue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* 4. IMPORTANT NOTIFICATIONS */}
        {notifications.length > 0 && (
          <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <Bell className="h-4 w-4 text-emerald-500" />
              <span>Recent Healthcare Notifications</span>
            </h3>

            <div className="space-y-2">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] flex items-start gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{n.title}</h4>
                    <p className="text-[11px] text-[var(--text-secondary)]">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
