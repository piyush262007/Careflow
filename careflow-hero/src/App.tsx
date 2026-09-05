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
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { FloatingDockNav } from './components/navigation/FloatingDockNav';
import { SessionExpiredModal } from './components/ui/SessionExpiredModal';
import { PageLoader } from './components/ui/PageLoader';
import { AppointmentBookingFlow } from './components/booking/AppointmentBookingFlow';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy Loaded Workspace Components for Performance
const PatientDashboard = lazy(() => import('./components/dashboard/PatientDashboard').then((m) => ({ default: m.PatientDashboard })));
const TodayCarePage = lazy(() => import('./components/dashboard/TodayCarePage').then((m) => ({ default: m.TodayCarePage })));
const NearbyHospitalsPage = lazy(() => import('./components/hospitals/NearbyHospitalsPage').then((m) => ({ default: m.NearbyHospitalsPage })));
const AppointmentsPage = lazy(() => import('./components/appointments/AppointmentsPage').then((m) => ({ default: m.AppointmentsPage })));
const PatientProfilePage = lazy(() => import('./components/profile/PatientProfilePage').then((m) => ({ default: m.PatientProfilePage })));
const DoctorDashboard = lazy(() => import('./components/doctor/DoctorDashboard').then((m) => ({ default: m.DoctorDashboard })));
const LiveQueueModule = lazy(() => import('./components/queue/LiveQueueModule').then((m) => ({ default: m.LiveQueueModule })));
const CompanionPage = lazy(() => import('./components/companion/CompanionPage').then((m) => ({ default: m.CompanionPage })));

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

const PatientDashboardRouteWrapper: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (isBookingOpen) {
    return (
      <AppointmentBookingFlow
        onClose={() => setIsBookingOpen(false)}
        onFinishBooking={() => setIsBookingOpen(false)}
      />
    );
  }

  return <PatientDashboard onOpenBooking={() => setIsBookingOpen(true)} />;
};

const TodayCareRouteWrapper: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (isBookingOpen) {
    return (
      <AppointmentBookingFlow
        onClose={() => setIsBookingOpen(false)}
        onFinishBooking={() => setIsBookingOpen(false)}
      />
    );
  }

  return <TodayCarePage onOpenBooking={() => setIsBookingOpen(true)} />;
};

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  const getRouteKey = (pathname: string) => {
    const authPaths = ['/welcome', '/role-selection', '/login', '/register', '/forgot-password'];
    if (authPaths.includes(pathname)) {
      return '/auth';
    }
    const workspacePaths = ['/patient', '/today-care', '/hospitals', '/appointments', '/profile', '/doctor', '/queue', '/companion'];
    if (workspacePaths.some((p) => pathname.startsWith(p))) {
      return '/app';
    }
    return pathname;
  };

  return (
    <>
      <AnimatePresence>
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
              <Route path="/" element={<LandingPage />} />
              <Route path="/welcome" element={<AuthLayout viewOverride="welcome" />} />
              <Route path="/role-selection" element={<AuthLayout viewOverride="role-selection" />} />
              <Route path="/login" element={<AuthLayout viewOverride="login" />} />
              <Route path="/register" element={<AuthLayout viewOverride="register" />} />
              <Route path="/forgot-password" element={<AuthLayout viewOverride="forgot-password" />} />

              <Route element={<AppLayout />}>
                <Route
                  path="/patient"
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboardRouteWrapper />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/today-care"
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <TodayCareRouteWrapper />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hospitals"
                  element={
                    <ProtectedRoute>
                      <NearbyHospitalsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <AppointmentsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor"
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/queue"
                  element={
                    <ProtectedRoute>
                      <LiveQueueModule />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/companion"
                  element={
                    <ProtectedRoute>
                      <CompanionPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="*" element={<LandingPage />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <FloatingDockNav />
      <SessionExpiredModal />
    </>
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
