import React from 'react';
import { Calendar as CalendarIcon, Clock, Sun, Sunset, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export interface TimeSlotOption {
  id: string;
  time: string;
  period: 'morning' | 'afternoon';
  available: boolean;
}

export interface DateOption {
  id: string;
  dayName: string;
  dateNumber: number;
  monthName: string;
  fullDate: string;
}

interface TimeStepProps {
  dates: DateOption[];
  selectedDate: DateOption;
  onSelectDate: (date: DateOption) => void;
  timeSlots: TimeSlotOption[];
  selectedTimeSlot: TimeSlotOption | null;
  onSelectTimeSlot: (slot: TimeSlotOption) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TimeStep: React.FC<TimeStepProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  timeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
  onNext,
  onBack,
}) => {
  const morningSlots = timeSlots.filter((s) => s.period === 'morning');
  const afternoonSlots = timeSlots.filter((s) => s.period === 'afternoon');

  return (
    <div className="space-y-6">
      {/* Header & Back Link */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Doctors</span>
        </button>

        <h2 className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Choose Appointment Date & Time
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Select your preferred calendar date and available consultation time slot.
        </p>
      </div>

      {/* Date Picker Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4 text-emerald-500" />
          <span>Select Date</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {dates.map((d) => {
            const isSelected = selectedDate.id === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onSelectDate(d)}
                className={`p-3 rounded-2xl border transition-all duration-200 text-center cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-600 text-white shadow-md'
                    : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-emerald-500/40 text-[var(--text-primary)]'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-100' : 'text-[var(--text-muted)]'}`}>
                  {d.dayName}
                </span>
                <span className="text-xl font-extrabold font-heading my-0.5">{d.dateNumber}</span>
                <span className={`text-[10.5px] font-medium ${isSelected ? 'text-emerald-100' : 'text-[var(--text-secondary)]'}`}>
                  {d.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Picker */}
      <div className="space-y-4 pt-2">
        {/* Morning Slots */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Sun className="h-4 w-4 text-amber-500" />
            <span>Morning Slots</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {morningSlots.map((slot) => {
              const isSelected = selectedTimeSlot?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-600 text-white shadow-md'
                      : slot.available
                      ? 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-emerald-500/40 hover:bg-emerald-500/05'
                      : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>{slot.time}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Afternoon Slots */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Sunset className="h-4 w-4 text-blue-500" />
            <span>Afternoon Slots</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {afternoonSlots.map((slot) => {
              const isSelected = selectedTimeSlot?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-600 text-white shadow-md'
                      : slot.available
                      ? 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-emerald-500/40 hover:bg-emerald-500/05'
                      : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>{slot.time}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Slot Summary Banner */}
      {selectedTimeSlot && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Selected: <strong>{selectedDate.fullDate}</strong> at <strong>{selectedTimeSlot.time}</strong></span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          disabled={!selectedTimeSlot}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            selectedTimeSlot
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 hover:scale-[1.02]'
              : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Confirm Booking</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
