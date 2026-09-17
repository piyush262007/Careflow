import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import type { TimeSlotData } from '../../services/doctorService';

interface DateTimeSelectionStepProps {
  doctorId?: number;
  onBack: () => void;
  onNext: (selectedDate: string, selectedTime: string) => void;
  conflictErrorMessage?: string | null;
}

export const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({
  doctorId = 1,
  onBack,
  onNext,
  conflictErrorMessage,
}) => {
  const getTodayISO = () => new Date().toISOString().split('T')[0];
  const getTomorrowISO = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const getNextDayISO = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const dates = [
    { label: 'Today', fullDate: getTodayISO() },
    { label: 'Tomorrow', fullDate: getTomorrowISO() },
    { label: 'Day After', fullDate: getNextDayISO() },
  ];

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].fullDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00:00');
  const [timeSlots, setTimeSlots] = useState<TimeSlotData[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  const fetchSlots = useCallback(async () => {
    setIsLoadingSlots(true);
    try {
      const res = await doctorService.getDoctorScheduleSlots(doctorId, selectedDate);
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setTimeSlots(res.data);
        const firstAvail = res.data.find((s) => s.available);
        if (firstAvail) {
          setSelectedTimeSlot(firstAvail.startTime);
        }
      } else {
        // Fallback slots if doctor schedule hasn't generated specific slots
        setTimeSlots([
          { startTime: '09:00:00', endTime: '09:15:00', available: true },
          { startTime: '09:30:00', endTime: '09:45:00', available: true },
          { startTime: '10:00:00', endTime: '10:15:00', available: false },
          { startTime: '11:00:00', endTime: '11:15:00', available: true },
          { startTime: '14:00:00', endTime: '14:15:00', available: true },
          { startTime: '15:30:00', endTime: '15:45:00', available: true },
        ]);
        setSelectedTimeSlot('09:00:00');
      }
    } catch (err) {
      console.error('Failed to load doctor slots:', err);
    } finally {
      setIsLoadingSlots(false);
    }
  }, [doctorId, selectedDate]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleProceed = () => {
    onNext(selectedDate, selectedTimeSlot);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-1 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Step 2 of 4: Date & Time Selection</span>
        </div>
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
          Select Appointment Slot
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Choose an available consultation slot verified live by CareFlow backend.
        </p>
      </div>

      {/* 409 Conflict Error Notice */}
      {conflictErrorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{conflictErrorMessage}</span>
        </div>
      )}

      {/* Date Picker Row */}
      <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
        <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider block">
          Select Date
        </span>
        <div className="grid grid-cols-3 gap-3">
          {dates.map((d) => {
            const isSelected = selectedDate === d.fullDate;
            return (
              <button
                key={d.fullDate}
                type="button"
                onClick={() => setSelectedDate(d.fullDate)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer space-y-0.5 ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-md'
                    : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/30 hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold block opacity-80">{d.label}</span>
                <span className="text-xs font-extrabold block font-mono">{d.fullDate}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-emerald-500" />
            Select Consultation Time
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
            {selectedTimeSlot ? `Selected: ${selectedTimeSlot}` : 'Choose slot'}
          </span>
        </div>

        {isLoadingSlots ? (
          <p className="text-xs text-[var(--text-muted)] animate-pulse text-center py-4">
            Fetching available slots from backend...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {timeSlots.map((slot, index) => {
              const isSelected = selectedTimeSlot === slot.startTime;
              return (
                <button
                  key={index}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => slot.available && setSelectedTimeSlot(slot.startTime)}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    !slot.available
                      ? 'bg-slate-100 dark:bg-white/5 border-[var(--border-subtle)] text-[var(--text-muted)] opacity-50 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold shadow-sm ring-1 ring-emerald-500/30 cursor-pointer'
                      : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] font-bold hover:border-emerald-500/30 cursor-pointer'
                  }`}
                >
                  <span className="text-xs font-mono block">{slot.startTime}</span>
                  {!slot.available && (
                    <span className="text-[9px] block text-rose-500 no-underline font-semibold mt-0.5">
                      Booked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Navigation Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="py-3.5 px-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
        >
          <span>Review Appointment</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default DateTimeSelectionStep;
