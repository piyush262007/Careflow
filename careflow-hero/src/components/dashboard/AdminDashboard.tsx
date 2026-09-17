import React, { useState } from 'react';
import { getMockAdminData } from '../../services/mockAdminData';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminHeader } from './admin/AdminHeader';
import { AdminSystemOverview } from './admin/AdminSystemOverview';
import { AppointmentOperations } from './admin/AppointmentOperations';
import { HospitalManagement } from './admin/HospitalManagement';
import { DoctorManagementTable } from './admin/DoctorManagementTable';
import { PatientManagementTable } from './admin/PatientManagementTable';
import { AdminLiveQueueMonitor } from './admin/AdminLiveQueueMonitor';
import { SystemActivityTimeline } from './admin/SystemActivityTimeline';
import { AdminAlertsPanel } from './admin/AdminAlertsPanel';
import { AdminAnalyticsOverview } from './admin/AdminAnalyticsOverview';
import { AdminAICareWidget } from './admin/AdminAICareWidget';
import { AdminQuickActions } from './admin/AdminQuickActions';
import { AdminProfileWidget } from './admin/AdminProfileWidget';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const data = getMockAdminData();

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'add-hospital' || actionId === 'hospitals') {
      setActiveTab('hospitals');
    } else if (actionId === 'add-doctor' || actionId === 'doctors') {
      setActiveTab('doctors');
    } else if (actionId === 'appointments') {
      setActiveTab('appointments');
    } else if (actionId === 'reports') {
      setActiveTab('reports');
    } else {
      setActiveTab('overview');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex">
      {/* Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          {/* Top CareFlow AI Operations Insight Widget */}
          <AdminAICareWidget insightMessage={data.aiOperationsMessage} />

          {/* Quick Actions Bar */}
          <AdminQuickActions onActionClick={handleQuickAction} />

          {/* Tab Specific Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 1. System Overview Metrics */}
              <AdminSystemOverview metrics={data.systemMetrics} />

              {/* 2. Live Queue Monitor */}
              <AdminLiveQueueMonitor queueItems={data.queueMonitors} />

              {/* 3. Appointment Operations & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AppointmentOperations stats={data.appointmentStats} />
                <AdminAnalyticsOverview />
              </div>

              {/* 4. Core Roster Views: Hospitals & Doctors */}
              <div className="space-y-6">
                <HospitalManagement hospitals={data.hospitals} />
                <DoctorManagementTable doctors={data.doctors} />
                <PatientManagementTable patients={data.patients} />
              </div>

              {/* 5. Operations Intelligence: Activity, Alerts & Profile */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SystemActivityTimeline activities={data.systemActivities} />
                <AdminAlertsPanel alerts={data.adminAlerts} />
                <AdminProfileWidget />
              </div>
            </div>
          )}

          {activeTab === 'hospitals' && (
            <div className="space-y-6">
              <HospitalManagement hospitals={data.hospitals} />
              <AdminLiveQueueMonitor queueItems={data.queueMonitors} />
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <DoctorManagementTable doctors={data.doctors} />
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-6">
              <PatientManagementTable patients={data.patients} />
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <AppointmentOperations stats={data.appointmentStats} />
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="space-y-6">
              <AdminLiveQueueMonitor queueItems={data.queueMonitors} />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <AdminAnalyticsOverview />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <AdminAlertsPanel alerts={data.adminAlerts} />
            </div>
          )}

          {(activeTab === 'departments' || activeTab === 'schedules' || activeTab === 'settings' || activeTab === 'help') && (
            <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-center space-y-4">
              <h2 className="text-lg font-bold font-heading text-[var(--text-primary)] capitalize">
                {activeTab} Operations Management
              </h2>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                CareFlow Operations center module for {activeTab} is configured and ready for Spring Boot backend integration.
              </p>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-md cursor-pointer"
              >
                Return to Overview
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
