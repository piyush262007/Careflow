import React, { useState, useEffect } from 'react';
import { DoctorSidebarNav } from './DoctorSidebarNav';
import { AppointmentRequestCard } from './AppointmentRequestCard';
import { SuggestTimeModal } from './SuggestTimeModal';
import type { AppointmentRequest } from './data/mockDoctorData';
import { useAuth } from '../../context/AuthContext';
import { appointmentService } from '../../services/appointmentService';
import type { AppointmentData } from '../../services/appointmentService';
import { PageLoader } from '../ui/PageLoader';
import {
  Stethoscope,
  Clock,
  CheckCircle2,
  TrendingUp,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorDashboard: React.FC = () => {
  const { setIsAuthOpen, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('schedule');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Confirmed' | 'Declined'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [suggestModalRequest, setSuggestModalRequest] = useState<AppointmentRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const mapStatusToUi = (status: string): 'Pending' | 'Confirmed' | 'Declined' | 'Time Suggested' => {
    if (status === 'CONFIRMED') return 'Confirmed';
    if (status === 'REJECTED' || status === 'CANCELLED') return 'Declined';
    if (status === 'TIME_CHANGE_REQUESTED') return 'Time Suggested';
    return 'Pending';
  };

  const mapBackendAppointments = (list: AppointmentData[]): AppointmentRequest[] => {
    return list.map((a) => ({
      id: `APT-${a.id}`,
      patientName: a.patientName || `Patient #${a.patientId}`,
      patientId: `PAT-${a.patientId}`,
      department: a.specializationName || 'General Care',
      hospitalName: a.hospitalName || 'CareFlow Clinic',
      date: a.appointmentDate,
      time: a.appointmentTime,
      requestedTime: a.appointmentTime,
      status: mapStatusToUi(a.status),
      symptoms: a.symptoms || 'General consultation request',
      consultationFee: `$${a.consultationFee || 75}`,
    }));
  };

  const fetchDoctorAppointments = async () => {
    try {
      const res = await appointmentService.getMyDoctorAppointments();
      if (res.success && res.data) {
        setRequests(mapBackendAppointments(res.data));
      }
    } catch (err) {
      console.warn('Failed to load doctor appointments from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const handleExit = () => {
    logout();
    setIsAuthOpen(false);
    navigate('/login');
  };

  const handleAcceptRequest = async (id: string) => {
    const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Confirmed' } : r))
    );

    if (!isNaN(numericId)) {
      try {
        await appointmentService.confirmAppointment(numericId);
      } catch (err: any) {
        console.error('Failed to confirm appointment on backend:', err);
      }
    }
    const target = requests.find((r) => r.id === id);
    showToast(`Appointment for ${target?.patientName || 'patient'} has been ACCEPTED & CONFIRMED.`);
  };

  const handleRejectRequest = async (id: string) => {
    const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Declined' } : r))
    );

    if (!isNaN(numericId)) {
      try {
        await appointmentService.rejectAppointment(numericId, 'Doctor unavailable at selected time');
      } catch (err: any) {
        console.error('Failed to reject appointment on backend:', err);
      }
    }
    const target = requests.find((r) => r.id === id);
    showToast(`Appointment for ${target?.patientName || 'patient'} has been DECLINED.`);
  };

  const handleConfirmTimeSuggestion = async (id: string, newTime: string) => {
    const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'Time Suggested', suggestedTime: newTime } : r
      )
    );

    if (!isNaN(numericId)) {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        await appointmentService.suggestTime(numericId, {
          date: todayStr,
          time: newTime,
          reason: 'Doctor proposed new slot',
        });
      } catch (err: any) {
        console.error('Failed to suggest time on backend:', err);
      }
    }

    const target = requests.find((r) => r.id === id);
    setSuggestModalRequest(null);
    showToast(`Alternative slot (${newTime}) suggested to ${target?.patientName || 'patient'}.`);
  };

  const filteredRequests = requests.filter((r) => {
    if (filterStatus !== 'All' && r.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.patientName.toLowerCase().includes(q);
      const matchSymptom = r.symptoms.toLowerCase().includes(q);
      const matchDept = r.department.toLowerCase().includes(q);
      if (!matchName && !matchSymptom && !matchDept) return false;
    }
    return true;
  });

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const confirmedCount = requests.filter((r) => r.status === 'Confirmed').length;
  const totalConsultationValue = requests
    .filter((r) => r.status === 'Confirmed')
    .reduce((sum, r) => sum + parseInt(r.consultationFee.replace(/[^0-9]/g, '') || '0', 10), 0);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col lg:flex-row theme-transition">
      <DoctorSidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExit={handleExit}
      />

      <div className="flex-1 flex flex-col min-h-screen pb-24 lg:pb-8">
        <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
              Doctor Console
            </span>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Clinical Specialist Operations</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
                Patient Consultations Console
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Review appointment requests, approve schedules, and manage clinical consultations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-1">
              <span className="text-[11px] uppercase font-semibold text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Pending Approvals</span>
              </span>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] font-heading">{pendingCount}</p>
            </div>

            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-1">
              <span className="text-[11px] uppercase font-semibold text-[var(--text-muted)] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Confirmed Today</span>
              </span>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] font-heading">{confirmedCount}</p>
            </div>

            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-1">
              <span className="text-[11px] uppercase font-semibold text-[var(--text-muted)] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
                <span>Consultation Value</span>
              </span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">${totalConsultationValue}</p>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by patient name, symptom, or department..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Pending', 'Confirmed', 'Declined'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterStatus === st
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <AppointmentRequestCard
                  key={req.id}
                  request={req}
                  onAccept={handleAcceptRequest}
                  onReject={handleRejectRequest}
                  onSuggestNewTime={(r) => setSuggestModalRequest(r)}
                />
              ))
            ) : (
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm text-center space-y-2">
                <Stethoscope className="h-8 w-8 text-emerald-500 mx-auto opacity-70" />
                <h3 className="text-sm font-extrabold text-[var(--text-primary)]">No Consultation Requests</h3>
                <p className="text-xs text-[var(--text-secondary)]">There are no consultation requests matching your selected status filter.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {suggestModalRequest && (
        <SuggestTimeModal
          request={suggestModalRequest}
          onClose={() => setSuggestModalRequest(null)}
          onConfirmSuggestion={(requestId, newTime) => handleConfirmTimeSuggestion(requestId, newTime)}
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
