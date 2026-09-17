import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, CheckCircle2, QrCode } from 'lucide-react';
import { AppointmentSummaryStep } from './AppointmentSummaryStep';
import { DateTimeSelectionStep } from './DateTimeSelectionStep';
import { ReviewAppointmentStep } from './ReviewAppointmentStep';
import { useAppointments } from '../../context/AppointmentContext';
import { useNavigate } from 'react-router-dom';

interface AppointmentBookingFlowProps {
  onClose: () => void;
  onFinishBooking: () => void;
}

export const AppointmentBookingFlow: React.FC<AppointmentBookingFlowProps> = ({
  onClose,
  onFinishBooking,
}) => {
  const navigate = useNavigate();
  const { addAppointmentApi } = useAppointments();

  const getTodayISO = () => new Date().toISOString().split('T')[0];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayISO());
  const [selectedTime, setSelectedTime] = useState<string>('09:00:00');
  const [confirmedAppt, setConfirmedAppt] = useState<{
    id: string;
    doctorName: string;
    hospitalName: string;
    date: string;
    time: string;
    token: string;
  } | null>(null);

  const [bookingError, setBookingError] = useState<string | null>(null);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setConflictError(null);
    setCurrentStep(3);
  };

  const handleConfirmReview = async () => {
    setBookingError(null);
    setConflictError(null);
    setIsSubmitting(true);

    const formattedTime = selectedTime.includes(':')
      ? selectedTime.length === 5
        ? `${selectedTime}:00`
        : selectedTime
      : '09:00:00';

    try {
      const newAppt = await addAppointmentApi({
        doctorId: 1,
        hospitalId: 1,
        appointmentDate: selectedDate,
        appointmentTime: formattedTime,
        symptoms: 'Cardiology Consultation Request',
      });

      setConfirmedAppt({
        id: newAppt.id,
        doctorName: newAppt.doctorName,
        hospitalName: newAppt.hospitalName,
        date: newAppt.date,
        time: newAppt.time,
        token: newAppt.qrPassToken,
      });

      setCurrentStep(4);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      const isConflict =
        err.response?.status === 409 ||
        (err.message && err.message.toLowerCase().includes('no longer available'));

      if (isConflict) {
        setConflictError('This appointment slot was just taken. Please choose another time.');
        setCurrentStep(2); // Redirect back to slot selection to refresh slots
      } else {
        setBookingError(err.message || 'Failed to complete booking. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
                CareFlow Appointment Booking
              </h1>
              <span className="text-[11px] text-[var(--text-muted)] font-medium">
                Step {currentStep} of 4: {currentStep === 4 ? 'Appointment Confirmed' : 'Booking Setup'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {bookingError && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold">
            {bookingError}
          </div>
        )}

        {/* Wizard Steps */}
        {currentStep === 1 && (
          <AppointmentSummaryStep onNext={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && (
          <DateTimeSelectionStep
            doctorId={1}
            onNext={handleDateTimeSelect}
            onBack={() => setCurrentStep(1)}
            conflictErrorMessage={conflictError}
          />
        )}

        {currentStep === 3 && (
          <ReviewAppointmentStep
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onConfirm={handleConfirmReview}
            onBack={() => setCurrentStep(2)}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Appointment Confirmed Success Step */}
        {currentStep === 4 && confirmedAppt && (
          <div className="py-6 text-center space-y-5">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Pass Token #{confirmedAppt.token}
              </span>
              <h2 className="font-heading font-extrabold text-xl text-[var(--text-primary)] pt-2">
                Appointment Confirmed
              </h2>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                Your consultation request has been successfully recorded on the CareFlow backend.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Appointment ID</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">{confirmedAppt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Doctor</span>
                <span className="font-bold text-[var(--text-primary)]">{confirmedAppt.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Hospital</span>
                <span className="font-bold text-[var(--text-primary)]">{confirmedAppt.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Date & Time</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {confirmedAppt.date} at {confirmedAppt.time}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onFinishBooking();
                  navigate('/appointments');
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                <span>View Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onFinishBooking();
                  navigate('/patient/dashboard');
                }}
                className="flex-1 py-3 px-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold text-xs hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AppointmentBookingFlow;
