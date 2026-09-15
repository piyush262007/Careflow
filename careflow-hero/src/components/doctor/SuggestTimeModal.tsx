import React, { useState } from 'react';
import { X, Clock, Calendar, Send, Check } from 'lucide-react';
import type { AppointmentRequest } from './data/mockDoctorData';

interface SuggestTimeModalProps {
  request: AppointmentRequest;
  onClose: () => void;
  onConfirmSuggestion: (requestId: string, newTime: string) => void;
}

export const SuggestTimeModal: React.FC<SuggestTimeModalProps> = ({
  request,
  onClose,
  onConfirmSuggestion,
}) => {
  const availableSlots = [
    'Tomorrow at 9:30 AM',
    'Tomorrow at 11:15 AM',
    'Tomorrow at 3:15 PM',
    'Tomorrow at 5:00 PM',
    'Friday at 10:00 AM',
  ];

  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0]);
  const [customNote, setCustomNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSuggestion(request.id, selectedSlot);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] max-w-md w-full p-6 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <Clock className="h-3.5 w-3.5" />
            <span>Suggest Alternative Schedule</span>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Reschedule Request for {request.patientName}
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Requested: <strong className="text-[var(--text-primary)]">{request.requestedTime}</strong>
          </p>
        </div>

        {/* Time Slot Selection Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider block">
              Select Available Alternative Slot
            </label>

            <div className="space-y-2">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                        : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className={`h-4 w-4 ${isSelected ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
                      <span>{slot}</span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Note */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              Optional Note for Patient
            </label>
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Earlier morning slot fits clinical review better..."
              className="w-full p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send New Time Suggestion</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
