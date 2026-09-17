import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMockPatientData } from '../../services/mockPatientData';
import { PatientSidebar } from './patient/PatientSidebar';
import { DashboardHeader } from './patient/DashboardHeader';
import { HealthSummaryRow } from './patient/HealthSummaryRow';
import { UpcomingAppointmentCard } from './patient/UpcomingAppointmentCard';
import { LiveQueueTracker } from './patient/LiveQueueTracker';
import { QuickActions } from './patient/QuickActions';
import { RecentActivityTimeline } from './patient/RecentActivityTimeline';
import { CareActivityChart } from './patient/CareActivityChart';
import { AICareWidget } from './patient/AICareWidget';
import PatientDoctorsPage from '../doctor/PatientDoctorsPage';
import { AppointmentsPage } from '../appointments/AppointmentsPage';
import { LiveQueueModule } from '../queue/LiveQueueModule';
import { PatientPrescriptionsPage } from '../prescriptions/PatientPrescriptionsPage';
import { PatientRecordsPage } from '../records/PatientRecordsPage';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { NearbyHospitalsPage } from '../hospitals/NearbyHospitalsPage';

interface PatientDashboardProps {
  onOpenBooking?: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onOpenBooking }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Retrieve mock patient data matching logged-in user
  const mockData = getMockPatientData(currentUser?.name, currentUser?.email);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex">
      {/* 1. Left Sidebar Navigation */}
      <PatientSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* 2. Top Header */}
        <DashboardHeader
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenNotifications={() => setActiveTab('notifications')}
        />

        {/* Dashboard Body / Tab Content */}
        {activeTab === 'hospitals' ? (
          <NearbyHospitalsPage />
        ) : activeTab === 'doctors' ? (
          <PatientDoctorsPage />
        ) : activeTab === 'appointments' ? (
          <AppointmentsPage />
        ) : activeTab === 'prescriptions' ? (
          <PatientPrescriptionsPage />
        ) : activeTab === 'records' ? (
          <PatientRecordsPage />
        ) : activeTab === 'notifications' ? (
          <NotificationCenter />
        ) : activeTab === 'queue' ? (
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <LiveQueueModule />
          </div>
        ) : (
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            {/* 3. Health Summary Row */}
            <HealthSummaryRow
              appointment={mockData.nextAppointment}
              queue={mockData.liveQueue}
              prescriptions={mockData.prescriptions}
              healthScore={mockData.patient.healthScore}
              healthStatus={mockData.patient.healthScoreStatus}
            />

            {/* 4. Quick Actions Row */}
            <QuickActions
              onBookAppointment={onOpenBooking}
              onFindDoctor={() => setActiveTab('doctors')}
              onViewRecords={() => setActiveTab('records')}
              onViewPrescription={() => setActiveTab('prescriptions')}
            />

            {/* 5. Main Dashboard Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Columns: Appointment, Live Queue, Care Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming Appointment */}
                <UpcomingAppointmentCard appointment={mockData.nextAppointment} />

                {/* Live Queue Tracker */}
                <LiveQueueTracker queue={mockData.liveQueue} />

                {/* Care Activity Chart */}
                <CareActivityChart metrics={mockData.weeklyCareActivity} />
              </div>

              {/* Right Column: AI Care Assistant & Recent Activity */}
              <div className="space-y-6">
                {/* CareFlow AI Assistant */}
                <AICareWidget onAskAI={() => alert('CareFlow AI Consultation Window will open.')} />

                {/* Recent Activity Timeline */}
                <RecentActivityTimeline activities={mockData.recentActivities} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
