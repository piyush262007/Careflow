import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface DateTimeSelectionStepProps {
  onBack: () => void;
  onNext: (selectedDate: string, selectedTime: string) => void;
}

export const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({ onBack, onNext }) => {
  const dates = [
    { label: 'Today', date: 'Jul 27', fullDate: 'Today, July 27' },
    { label: 'Tomorrow', date: 'Jul 28', fullDate: 'Tomorrow, July 28' },
    { label: 'Wednesday', date: 'Jul 29', fullDate: 'Wednesday, July 29' },
  ];

  const timeSlots = [
    { time: '09:30 AM', available: true },
    { time: '10:15 AM', available: true },
    { time: '11:00 AM', available: false, reason: 'Booked' },
    { time: '01:30 PM', available: false, reason: 'In Surgery' },
    { time: '02:30 PM', available: true },
    { time: '04:00 PM', available: true },
  ];

  const [selectedDateObj, setSelectedDateObj] = useState(dates[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('02:30 PM');

  const handleProceed = () => {
    onNext(selectedDateObj.fullDate, selectedTimeSlot);
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
          Choose an available consultation slot with Dr. Sarah Chen.
        </p>
      </div>

      {/* Date Picker Row */}
      <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
        <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider block">
          Select Date
        </span>
        <div className="grid grid-cols-3 gap-3">
          {dates.map((d) => {
            const isSelected = selectedDateObj.fullDate === d.fullDate;
            return (
              <button
                key={d.fullDate}
                type="button"
                onClick={() => setSelectedDateObj(d)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer space-y-0.5 ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-md'
                    : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/30 hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold block opacity-80">{d.label}</span>
                <span className="text-sm font-extrabold block">{d.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Grid (Available vs Disabled) */}
      <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-emerald-500" />
            Select Consultation Time
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {selectedTimeSlot ? `Selected: ${selectedTimeSlot}` : 'Choose slot'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  !slot.available
                    ? 'bg-slate-100 dark:bg-white/5 border-[var(--border-subtle)] text-[var(--text-muted)] opacity-50 cursor-not-allowed line-through'
                    : isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold shadow-sm ring-1 ring-emerald-500/30 cursor-pointer'
                    : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] font-bold hover:border-emerald-500/30 cursor-pointer'
                }`}
              >
                <span className="text-xs block">{slot.time}</span>
                {!slot.available && (
                  <span className="text-[9px] block text-rose-500 no-underline font-semibold mt-0.5">
                    {slot.reason}
                  </span>
                )}
              </button>
            );
          })}
        </div>
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
