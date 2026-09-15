import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle2, User, Clock } from 'lucide-react';
import { RippleButton } from '../RippleButton';

export const BookingExperience: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(19);
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [isBooked, setIsBooked] = useState(false);

  const slots = ['09:30 AM', '11:00 AM', '02:15 PM', '04:30 PM'];

  const handleBook = (slot: string) => {
    setSelectedSlot(slot);
    setIsBooked(true);
  };

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 my-24">
      {/* Narrative Side */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center"
      >
        <span className="text-xs font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase mb-3 flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5 text-teal-500" />
          EXPERIENCE 03 · SMART BOOKING
        </span>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight mb-4">
          Intelligent Schedule & Booking
        </h3>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          Seamless calendar integration with instant slot matching, real-time doctor schedule syncing, and automated reminders.
        </p>

        {isBooked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Appointment confirmed for July {selectedDay}, 2026 at {selectedSlot}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Interactive Calendar Demo Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="relative w-full rounded-2xl border border-teal-500/30 bg-[var(--bg-surface)] p-5 backdrop-blur-2xl shadow-apple-lg shadow-teal-500/10">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-500 border border-teal-500/30">
                <User className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)] block">Dr. Sarah Chen</span>
                <span className="text-[10px] text-[var(--text-muted)]">Cardiology Specialist</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">July 2026</span>
          </div>

          {/* Calendar Day Picker */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] mb-4">
            <span className="font-bold text-[var(--text-muted)]">Su</span>
            <span className="font-bold text-[var(--text-muted)]">Mo</span>
            <span className="font-bold text-[var(--text-muted)]">Tu</span>
            <span className="font-bold text-[var(--text-muted)]">We</span>
            <span className="font-bold text-[var(--text-muted)]">Th</span>
            <span className="font-bold text-[var(--text-muted)]">Fr</span>
            <span className="font-bold text-[var(--text-muted)]">Sa</span>

            {[17, 18, 19, 20, 21, 22, 23].map((day) => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setIsBooked(false);
                }}
                className={`rounded-lg p-2 font-bold cursor-pointer transition-colors ${
                  selectedDay === day
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-[var(--bg-card-bg)] text-[var(--text-primary)] hover:bg-teal-500/20'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Slots Selector */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Available Slots for July {selectedDay}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((slot) => (
                <RippleButton
                  key={slot}
                  onClick={() => handleBook(slot)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedSlot === slot && isBooked
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-teal-500/40'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-teal-500" />
                    {slot}
                  </span>
                  {selectedSlot === slot && isBooked ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <span className="text-[9.5px] text-teal-500 font-normal">Select</span>
                  )}
                </RippleButton>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
