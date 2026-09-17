import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMockDoctorData } from '../../services/mockDoctorData';
import type { DoctorAppointmentItem } from '../../services/mockDoctorData';
import { DoctorSidebar } from '../dashboard/doctor/DoctorSidebar';
import { DoctorHeader } from '../dashboard/doctor/DoctorHeader';
import { DailySummaryRow } from '../dashboard/doctor/DailySummaryRow';
import { DoctorUpcomingAppointments } from '../dashboard/doctor/DoctorUpcomingAppointments';
import { DoctorLiveQueueTracker } from '../dashboard/doctor/DoctorLiveQueueTracker';
import { NextPatientCard } from '../dashboard/doctor/NextPatientCard';
import { DoctorPatientOverview } from '../dashboard/doctor/DoctorPatientOverview';
import { DoctorQuickActions } from '../dashboard/doctor/DoctorQuickActions';
import { DoctorScheduleTimeline } from '../dashboard/doctor/DoctorScheduleTimeline';
import { ClinicalInsightsChart } from '../dashboard/doctor/ClinicalInsightsChart';
import { DoctorAICareWidget } from '../dashboard/doctor/DoctorAICareWidget';
import { DoctorProfileWidget } from '../dashboard/doctor/DoctorProfileWidget';
import { appointmentService } from '../../services/appointmentService';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [realAppointments, setRealAppointments] = useState<DoctorAppointmentItem[]>([]);

  const mockData = getMockDoctorData();

  const fetchDoctorAppointments = async () => {
    try {
      const res = await appointmentService.getMyDoctorAppointments();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped: DoctorAppointmentItem[] = res.data.map((appt, idx) => ({
          id: String(appt.id),
          patientName: appt.patientName || 'Sarah Jenkins',
          patientAge: 34,
          time: appt.appointmentTime,
          specialtyType: appt.symptoms || appt.specializationName || 'General Consultation',
          status: appt.status === 'CONFIRMED' ? 'Confirmed' : appt.status === 'COMPLETED' ? 'Completed' : 'Upcoming',
          queueNumber: idx + 1,
          symptoms: appt.symptoms || 'General Checkup',
          patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        }));
        setRealAppointments(mapped);
      } else {
        setRealAppointments(mockData.appointments);
      }
    } catch (err) {
      console.warn('Real doctor appointment fetch warning:', err);
      setRealAppointments(mockData.appointments);
    }
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const handleStartConsultation = (appointmentId?: string) => {
    if (appointmentId) {
      navigate(`/doctor/appointments/${appointmentId}`);
    } else if (realAppointments.length > 0) {
      navigate(`/doctor/appointments/${realAppointments[0].id}`);
    } else {
      navigate('/doctor/appointments/1');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex">
      {/* 1. Doctor Left Sidebar Navigation */}
      <DoctorSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* 2. Doctor Header */}
        <DoctorHeader onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* 3. Daily Summary Row */}
          <DailySummaryRow metrics={mockData.summaryMetrics} />

          {/* 4. Quick Actions */}
          <DoctorQuickActions
            onStartConsultation={handleStartConsultation}
            onAddPrescription={() => setActiveTab('prescriptions')}
            onUploadRecord={() => setActiveTab('records')}
            onSendMessage={() => setActiveTab('messages')}
          />

          {/* 5. Main Content Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Appointments List */}
              <DoctorUpcomingAppointments
                appointments={realAppointments}
                onStartConsultation={handleStartConsultation}
              />

              {/* Live Patient Queue */}
              <DoctorLiveQueueTracker appointments={realAppointments} />

              {/* Patient Overview */}
              <DoctorPatientOverview patients={mockData.patientOverviewList} />

              {/* Clinical Insights Chart */}
              <ClinicalInsightsChart insights={mockData.clinicalInsights} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Next Patient Prominent Card */}
              <NextPatientCard
                patient={mockData.nextPatient}
                onStartConsultation={handleStartConsultation}
              />

              {/* Doctor Profile Widget */}
              <DoctorProfileWidget
                doctor={mockData.doctor}
                onManageAvailability={() => alert('Manage availability settings opened.')}
              />

              {/* CareFlow AI Intelligence Panel */}
              <DoctorAICareWidget
                insightMessage={mockData.aiInsightMessage}
                onViewInsights={() => setActiveTab('overview')}
                onAskAI={() => alert('CareFlow Clinical AI consultation window opened.')}
              />

              {/* Daily Schedule Timeline */}
              <DoctorScheduleTimeline slots={mockData.scheduleSlots} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
