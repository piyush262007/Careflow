import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Building2,
  Stethoscope,
  Clock,
  QrCode,
  Plus,
  X,
  Search,
  Phone,
  MapPin,
  Download,
} from 'lucide-react';
import { useAppointments } from '../../context/AppointmentContext';
import type { AppointmentItem } from '../../context/AppointmentContext';
import { AppointmentBookingFlow } from '../booking/AppointmentBookingFlow';
import { appointmentService } from '../../services/appointmentService';

export const AppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment } = useAppointments();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassAppt, setSelectedPassAppt] = useState<AppointmentItem | null>(null);
  const [qrBlobUrl, setQrBlobUrl] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenQR = async (appt: AppointmentItem) => {
    setSelectedPassAppt(appt);
    setQrBlobUrl(null);
    if (appt.rawId) {
      try {
        const blob = await appointmentService.getQRCodeBlob(appt.rawId);
        const url = URL.createObjectURL(blob);
        setQrBlobUrl(url);
      } catch (err) {
        console.error('Failed to load QR PNG blob', err);
      }
    }
  };

  const handleDownloadQR = () => {
    if (!qrBlobUrl || !selectedPassAppt) return;
    const a = document.createElement('a');
    a.href = qrBlobUrl;
    a.download = `CareFlow-QR-Pass-${selectedPassAppt.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredAppointments = appointments
    .filter((a) => {
      if (filterStatus !== 'All' && a.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          a.doctorName.toLowerCase().includes(query) ||
          a.hospitalName.toLowerCase().includes(query) ||
          a.specialty.toLowerCase().includes(query) ||
          a.id.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  const mockAddress = '742 Evergreen Terrace, Downtown Medical District';
  const mockPhone = '+1 (555) 234-8901';

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-8">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
            My Appointments
          </span>
        </div>
      </header>

      {/* Page Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Live Appointments Directory</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              My Scheduled Appointments
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Every appointment requested or confirmed appears here automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition-all shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Book New Appointment</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor, hospital, specialty, or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Confirmed', 'Pending', 'Cancelled'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === st
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="p-12 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
              No Appointments Found
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              You haven't scheduled any medical appointments under this filter. Click below to book your first consultation.
            </p>
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="py-2.5 px-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Book Appointment Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appt) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      ID: {appt.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        appt.status === 'Confirmed'
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : appt.status === 'Pending'
                          ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                    Fee: {appt.consultationFee}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[var(--text-primary)]">{appt.hospitalName}</h3>
                        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-emerald-500 shrink-0" />
                          <span>{mockAddress}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 text-xs text-[var(--text-secondary)]">
                      <Stethoscope className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>
                        <strong className="text-[var(--text-primary)]">{appt.doctorName}</strong> • {appt.specialty}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] flex flex-col justify-center space-y-1">
                    <span className="text-[10.5px] uppercase font-semibold text-[var(--text-muted)] flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald-500" />
                      <span>Scheduled Time</span>
                    </span>
                    <p className="text-xs font-bold text-[var(--text-primary)]">{appt.date}</p>
                    <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{appt.time}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenQR(appt)}
                      className="py-2 px-3.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      <span>View QR Pass</span>
                    </button>

                    <a
                      href={`tel:${mockPhone}`}
                      className="py-2 px-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-bg)] hover:bg-emerald-500/10 hover:border-emerald-500/30 text-xs font-bold text-[var(--text-primary)] hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>Call Hospital</span>
                    </a>
                  </div>

                  {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                    <button
                      type="button"
                      onClick={() => cancelAppointment(appt.id)}
                      className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* QR Pass Modal */}
      <AnimatePresence>
        {selectedPassAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] max-w-sm w-full p-6 shadow-2xl space-y-5 text-center relative"
            >
              <button
                type="button"
                onClick={() => setSelectedPassAppt(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-1 pt-2">
                <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Pass Token #{selectedPassAppt.qrPassToken || 'A-042'}
                </span>
                <h3 className="font-heading font-extrabold text-base text-[var(--text-primary)] pt-1">
                  Digital Priority Pass
                </h3>
              </div>

              {/* Real QR PNG Image */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 w-48 h-48 mx-auto shadow-inner flex items-center justify-center">
                {qrBlobUrl ? (
                  <img src={qrBlobUrl} alt="Appointment QR Code" className="w-full h-full object-contain" />
                ) : (
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <QrCode className="w-12 h-12 text-emerald-600 animate-spin" />
                    <span className="text-[10px] text-slate-500 font-bold">Generating Live QR PNG...</span>
                  </div>
                )}
              </div>

              <div className="space-y-1 text-xs text-[var(--text-secondary)]">
                <h4 className="font-extrabold text-[var(--text-primary)]">{selectedPassAppt.hospitalName}</h4>
                <p>{selectedPassAppt.doctorName} • {selectedPassAppt.specialty}</p>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
                  {selectedPassAppt.date} at {selectedPassAppt.time}
                </span>
              </div>

              <div className="flex gap-2">
                {qrBlobUrl && (
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPassAppt(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                >
                  Close Pass
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      {isBookingOpen && (
        <AppointmentBookingFlow
          onClose={() => setIsBookingOpen(false)}
          onFinishBooking={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
};
