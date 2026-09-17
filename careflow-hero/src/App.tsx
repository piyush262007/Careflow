import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroLeft } from './components/HeroLeft';
import { HeroRight } from './components/HeroRight';
import { TransformationSection } from './components/TransformationSection';
import { CoreExperiencesSection } from './components/CoreExperiencesSection';
import { ProductShowcaseSection } from './components/ProductShowcaseSection';
import { CareFlowAISection } from './components/CareFlowAISection';
import { TrustSecuritySection } from './components/TrustSecuritySection';
import { RealMomentsSection } from './components/RealMomentsSection';
import { FooterSection } from './components/FooterSection';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ThemeProvider } from './context/ThemeContext';
import { FlowPulseProvider } from './context/FlowPulseContext';
import { SmoothScrollProvider } from './context/SmoothScrollProvider';
import { ShowcaseProvider } from './context/ShowcaseContext';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { AuthLayout } from './components/auth/AuthLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PageLoader } from './components/ui/PageLoader';
import { AppointmentBookingFlow } from './components/booking/AppointmentBookingFlow';
import { motion, AnimatePresence } from 'framer-motion';

// Role-Based Workspaces
import PatientDashboard from './components/dashboard/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

import { NearbyHospitalsPage } from './components/hospitals/NearbyHospitalsPage';
import { AppointmentsPage } from './components/appointments/AppointmentsPage';
import { LiveQueueModule } from './components/queue/LiveQueueModule';
import PatientDoctorsPage from './components/doctor/PatientDoctorsPage';
import PatientPrescriptionsPage from './components/prescriptions/PatientPrescriptionsPage';
import PatientRecordsPage from './components/records/PatientRecordsPage';
import NotificationCenter from './components/notifications/NotificationCenter';

// Lazy Loaded Workspace Components
const TodayCarePage = lazy(() => import('./components/dashboard/TodayCarePage').then((m) => ({ default: m.TodayCarePage })));
const PatientProfilePage = lazy(() => import('./components/profile/PatientProfilePage').then((m) => ({ default: m.PatientProfilePage })));
const CompanionPage = lazy(() => import('./components/companion/CompanionPage').then((m) => ({ default: m.CompanionPage })));
const DoctorConsultationPage = lazy(() => import('./components/doctor/DoctorConsultationPage'));

// Landing Page View Component
export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (isBookingOpen) {
    return (
      <AppointmentBookingFlow
        onClose={() => setIsBookingOpen(false)}
        onFinishBooking={() => {
          setIsBookingOpen(false);
          navigate('/appointments');
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-primary)] theme-transition flex flex-col justify-between overflow-x-hidden selection:bg-emerald-600 selection:text-white">
      <BackgroundEffects />
      <CursorSpotlight />
      <Navbar />

      <section id="platform" className="relative z-10 mx-auto flex w-full max-w-7xl min-h-screen items-center px-4 sm:px-8 py-16 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <HeroLeft />
          <HeroRight />
        </div>
      </section>

      <TransformationSection />

      <div id="solutions">
        <CoreExperiencesSection />
      </div>

      <ProductShowcaseSection />

      <div id="ai">
        <CareFlowAISection />
      </div>

      <div id="security">
        <TrustSecuritySection />
      </div>

      <div id="moments">
        <RealMomentsSection />
      </div>

      <div id="pricing">
        <FooterSection />
      </div>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  const getRouteKey = (pathname: string) => {
    const authPaths = ['/welcome', '/role-selection', '/login', '/register', '/forgot-password'];
    if (authPaths.includes(pathname)) {
      return '/auth';
    }
    const workspacePaths = ['/patient', '/doctor', '/admin', '/today-care', '/hospitals', '/appointments', '/profile', '/queue', '/companion'];
    if (workspacePaths.some((p) => pathname.startsWith(p))) {
      return '/app';
    }
    return pathname;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={getRouteKey(location.pathname)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen w-full"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<AuthLayout viewOverride="login" />} />
            <Route path="/register" element={<AuthLayout viewOverride="register" />} />
            <Route path="/welcome" element={<AuthLayout viewOverride="welcome" />} />
            <Route path="/role-selection" element={<AuthLayout viewOverride="role-selection" />} />
            <Route path="/forgot-password" element={<AuthLayout viewOverride="forgot-password" />} />

            {/* Role-Protected Patient Routes */}
            <Route
              path="/patient"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/doctors"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientDoctorsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/doctors/:doctorId"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientDoctorsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <AppointmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments/book"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientDoctorsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments/:appointmentId"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <AppointmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/prescriptions"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientPrescriptionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/records"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientRecordsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/records/:recordId"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientRecordsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/hospitals"
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']}>
                  <NearbyHospitalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/hospitals/:hospitalId"
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']}>
                  <NearbyHospitalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']}>
                  <NotificationCenter />
                </ProtectedRoute>
              }
            />

            {/* Role-Protected Doctor Routes */}
            <Route
              path="/doctor"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments/:appointmentId"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <DoctorConsultationPage />
                </ProtectedRoute>
              }
            />

            {/* Role-Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Additional Protected App Routes */}
            <Route
              path="/today-care"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <TodayCarePage onOpenBooking={() => {}} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hospitals"
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']}>
                  <NearbyHospitalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <AppointmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/queue"
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']}>
                  <LiveQueueModule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companion"
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']}>
                  <CompanionPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback Catch-All */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FlowPulseProvider>
          <SmoothScrollProvider>
            <ShowcaseProvider>
              <AuthProvider>
                <AppointmentProvider>
                  <AppRoutes />
                </AppointmentProvider>
              </AuthProvider>
            </ShowcaseProvider>
          </SmoothScrollProvider>
        </FlowPulseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
