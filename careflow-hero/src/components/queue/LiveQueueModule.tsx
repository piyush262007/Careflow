import React, { useState } from 'react';
import { SidebarNav } from '../dashboard/patient/SidebarNav';
import { MobileNav } from '../dashboard/patient/MobileNav';
import { PatientQueueScreen } from './PatientQueueScreen';
import { ReceptionCheckInScreen } from './ReceptionCheckInScreen';
import { DoctorQueuePanel } from './DoctorQueuePanel';
import { INITIAL_QUEUE_PATIENTS } from './data/mockQueueData';
import type { QueuePatient } from './data/mockQueueData';
import { useAuth } from '../../context/AuthContext';
import { Ticket, QrCode, Stethoscope, Activity, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiveQueueModule: React.FC = () => {
  const { setIsAuthOpen, logout } = useAuth();
  const navigate = useNavigate();

  const [activeNavTab, setActiveNavTab] = useState('notifications');
  const [activeQueueView, setActiveQueueView] = useState<'patient' | 'reception' | 'doctor'>('patient');
  const [patients, setPatients] = useState<QueuePatient[]>(INITIAL_QUEUE_PATIENTS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExit = () => {
    setIsAuthOpen(false);
    logout();
    navigate('/login');
  };

  const handleNavChange = (tab: string) => {
    if (tab === 'today') {
      navigate('/patient');
    } else if (tab === 'hospitals') {
      navigate('/hospitals');
    } else {
      setActiveNavTab(tab);
    }
  };

  // Action: Check in patient from reception
  const handleCheckInPatient = (patientId: string) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, status: 'Waiting', checkInTime: 'Just Now' } : p
      )
    );
    const p = patients.find((item) => item.id === patientId);
    showToast(`Patient ${p?.patientName || ''} marked as CHECKED IN. Issued Token ${p?.tokenNumber}.`);
  };

  // Action: Call Next Patient from Doctor Console
  const handleCallNextPatient = () => {
    const nextWaiting = patients.find((p) => p.status === 'Waiting');
    if (!nextWaiting) return;

    setPatients((prev) =>
      prev.map((p) => {
        if (p.status === 'In Consultation') return { ...p, status: 'Completed' };
        if (p.id === nextWaiting.id) return { ...p, status: 'In Consultation', queuePosition: 0 };
        return p;
      })
    );
    showToast(`Token ${nextWaiting.tokenNumber} (${nextWaiting.patientName}) CALLED INTO SUITE 304.`);
  };

  // Action: Complete Current Consultation
  const handleCompleteConsultation = () => {
    const current = patients.find((p) => p.status === 'In Consultation');
    if (!current) return;

    setPatients((prev) =>
      prev.map((p) => (p.id === current.id ? { ...p, status: 'Completed' } : p))
    );

    // Call next if available
    const next = patients.find((p) => p.status === 'Waiting' && p.id !== current.id);
    if (next) {
      setPatients((prev) =>
        prev.map((p) => (p.id === next.id ? { ...p, status: 'In Consultation', queuePosition: 0 } : p))
      );
      showToast(`Consultation for ${current.patientName} COMPLETED. Next Token ${next.tokenNumber} called.`);
    } else {
      showToast(`Consultation for ${current.patientName} COMPLETED.`);
    }
  };

  // Get active patient info for Patient Queue Screen
  const currentPatient = patients.find((p) => p.id === 'q-3') || patients[0];
  const activeInConsultation = patients.find((p) => p.status === 'In Consultation');
  const activeDoctorToken = activeInConsultation ? activeInConsultation.tokenNumber : 'A-040';

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col lg:flex-row theme-transition">
      {/* Desktop Left Navigation Sidebar */}
      <SidebarNav
        activeTab={activeNavTab}
        setActiveTab={handleNavChange}
        onExit={handleExit}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-8">
        {/* Mobile Top Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
              Live Queue Center
            </span>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Module View Switcher Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
            <div className="flex items-center gap-2 pl-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-heading font-bold text-sm text-[var(--text-primary)]">
                Live Queue Module Views
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveQueueView('patient')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeQueueView === 'patient'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Ticket className="h-3.5 w-3.5" />
                <span>Patient Queue</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveQueueView('reception')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeQueueView === 'reception'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>Reception Check-In</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveQueueView('doctor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeQueueView === 'doctor'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Doctor Queue Panel</span>
              </button>
            </div>
          </div>

          {/* Render Active View */}
          {activeQueueView === 'patient' && (
            <PatientQueueScreen
              currentPatient={currentPatient}
              activeDoctorInSessionToken={activeDoctorToken}
            />
          )}

          {activeQueueView === 'reception' && (
            <ReceptionCheckInScreen
              patients={patients}
              onCheckInPatient={handleCheckInPatient}
            />
          )}

          {activeQueueView === 'doctor' && (
            <DoctorQueuePanel
              patients={patients}
              onCallNextPatient={handleCallNextPatient}
              onCompleteConsultation={handleCompleteConsultation}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav activeTab={activeNavTab} setActiveTab={handleNavChange} />

      {/* Notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
