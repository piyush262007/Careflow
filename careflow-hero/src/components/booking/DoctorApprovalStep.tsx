import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface DoctorApprovalStepProps {
  selectedDate: string;
  selectedTime: string;
  onAccepted: () => void;
  onRescheduled: (newTime: string) => void;
}

export const DoctorApprovalStep: React.FC<DoctorApprovalStepProps> = ({
  selectedDate,
  selectedTime,
  onAccepted,
  onRescheduled,
}) => {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [alternativeSlot, setAlternativeSlot] = useState('04:00 PM');

  const alternativeSlots = ['03:30 PM', '04:00 PM', '05:15 PM'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('accepted');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto space-y-6 text-center"
    >
      {/* Pending State */}
      {status === 'pending' && (
        <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-emerald-500/30 shadow-2xl space-y-5">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto animate-pulse">
            <Clock className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Status: Request Submitted
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
              Appointment Requested
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Dr. Sarah Chen is reviewing your consultation request for {selectedDate} at {selectedTime}...
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setStatus('accepted')}
              className="text-[10px] underline font-bold text-emerald-600 cursor-pointer"
            >
              Simulate Accept
            </button>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <button
              type="button"
              onClick={() => setStatus('rejected')}
              className="text-[10px] underline font-bold text-rose-500 cursor-pointer"
            >
              Simulate Reject
            </button>
          </div>
        </div>
      )}

      {/* Accepted State */}
      {status === 'accepted' && (
        <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border-2 border-emerald-500/40 shadow-2xl space-y-6">
          <div className="h-16 w-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Status: Confirmed by Doctor
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
              Appointment Approved!
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Dr. Sarah Chen accepted your request. Your digital QR Pass token has been generated.
            </p>
          </div>

          <button
            type="button"
            onClick={onAccepted}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 cursor-pointer transition-all"
          >
            <span>View Digital QR Pass</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Rejected State */}
      {status === 'rejected' && (
        <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border-2 border-rose-500/30 shadow-2xl space-y-6">
          <div className="h-16 w-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <XCircle className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider block">
              Status: Reschedule Needed
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
              Slot Unavailable
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Dr. Sarah Chen has an emergency surgery during {selectedTime}. Please pick an alternative time slot.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowRescheduleModal(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Select Alternative Time Slot</span>
          </button>
        </div>
      )}

      {/* Alternative Slot Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] max-w-sm w-full p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Doctor Suggested Alternative Slots</h3>
            <p className="text-xs text-[var(--text-secondary)]">Pick one of Dr. Chen's open slots today:</p>

            <div className="space-y-2">
              {alternativeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setAlternativeSlot(slot)}
                  className={`w-full p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                    alternativeSlot === slot
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <span>{slot}</span>
                  {alternativeSlot === slot && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowRescheduleModal(false);
                onRescheduled(alternativeSlot);
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
            >
              Confirm New Slot ({alternativeSlot})
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
