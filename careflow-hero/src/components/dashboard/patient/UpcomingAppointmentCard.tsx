import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { AuthButton } from '../../auth/ui/AuthButton';

export const UpcomingAppointmentCard: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Calendar className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Upcoming Appointment</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Confirmed
        </span>
      </div>

      {/* Doctor, Time & Hospital */}
      <div className="space-y-3 p-3.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
            SC
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider block">Doctor</span>
            <h4 className="text-xs font-bold text-[var(--text-primary)]">Dr. Sarah Chen</h4>
            <span className="text-[11px] text-[var(--text-secondary)]">Cardiology & Internal Medicine</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-[var(--text-secondary)] pt-2.5 border-t border-[var(--border-subtle)]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-0.5">Time</span>
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <Clock className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span>10:30 AM Today</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-0.5">Hospital</span>
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">St. Jude, Suite 402</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="space-y-2">
        {isCheckedIn ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 justify-center">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Checked In! You're ready.</span>
          </div>
        ) : (
          <AuthButton
            variant="primary"
            icon={CheckCircle2}
            onClick={() => setIsCheckedIn(true)}
          >
            Digital Check-in
          </AuthButton>
        )}

        <button
          type="button"
          onClick={() => setShowDetailsModal(!showDetailsModal)}
          className="w-full py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>{showDetailsModal ? 'Hide Details' : 'View Details'}</span>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
        </button>

        {showDetailsModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] space-y-1.5"
          >
            <p><strong>Preparation:</strong> Fasting not required for blood pressure check.</p>
            <p><strong>Parking:</strong> Visitor Deck B, Level 2.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
