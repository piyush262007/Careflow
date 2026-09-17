import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope,
  Search,
  Filter,
  Building2,
  Clock,
  AlertCircle,
  X,
  Award,
  Plus,
} from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import type { DoctorData, SpecializationData, TimeSlotData } from '../../services/doctorService';
import { AppointmentBookingFlow } from '../booking/AppointmentBookingFlow';

export const PatientDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [specializations, setSpecializations] = useState<SpecializationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filters
  const [searchName, setSearchName] = useState<string>('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | ''>('');
  const [availableTodayOnly, setAvailableTodayOnly] = useState<boolean>(false);

  // Selected Doctor Profile Modal
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);
  const [doctorSlots, setDoctorSlots] = useState<TimeSlotData[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Booking Flow modal state
  const [bookingDoctor, setBookingDoctor] = useState<DoctorData | null>(null);

  const fetchDoctorsAndSpecialties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [docRes, specRes] = await Promise.all([
        doctorService.searchDoctors({
          name: searchName || undefined,
          specializationId: selectedSpecialtyId ? Number(selectedSpecialtyId) : undefined,
          availableToday: availableTodayOnly || undefined,
        }),
        doctorService.getAllSpecializations(),
      ]);

      if (docRes.success && Array.isArray(docRes.data)) {
        setDoctors(docRes.data);
      }
      if (specRes.success && Array.isArray(specRes.data)) {
        setSpecializations(specRes.data);
      }
    } catch (err: any) {
      console.error('Failed to load doctors from backend:', err);
      setError(err.response?.data?.message || err.message || 'Unable to connect to CareFlow doctor directory.');
    } finally {
      setIsLoading(false);
    }
  }, [searchName, selectedSpecialtyId, availableTodayOnly]);

  useEffect(() => {
    fetchDoctorsAndSpecialties();
  }, [fetchDoctorsAndSpecialties]);

  const handleOpenProfile = async (doc: DoctorData) => {
    setSelectedDoctor(doc);
    setIsLoadingSlots(true);
    try {
      const res = await doctorService.getDoctorScheduleSlots(doc.id);
      if (res.success && Array.isArray(res.data)) {
        setDoctorSlots(res.data);
      }
    } catch (err) {
      console.error('Failed to load doctor slots:', err);
      setDoctorSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-8">
      {/* Top Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
            Find a Doctor
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              <Stethoscope className="h-3.5 w-3.5" />
              <span>Verified CareFlow Specialists</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              Find Your Specialist
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Browse top hospital doctors, check live availability, and book appointments directly.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search doctor by name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Specialty Filter Dropdown */}
            <div className="sm:col-span-4 relative">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
              <select
                value={selectedSpecialtyId}
                onChange={(e) => setSelectedSpecialtyId(e.target.value ? Number(e.target.value) : '')}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Checkbox */}
            <div className="sm:col-span-3 flex items-center justify-start sm:justify-center">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--text-primary)] select-none">
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="rounded border-[var(--border-color)] text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Available Today</span>
              </label>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-white/10" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md" />
                    <div className="h-3 w-1/2 bg-slate-200 dark:bg-white/10 rounded-md" />
                  </div>
                </div>
                <div className="h-10 w-full bg-slate-200 dark:bg-white/10 rounded-xl" />
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          /* Empty State */
          <div className="p-12 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
              No Doctors Matching Search Criteria
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              Try adjusting your specialty or search term to discover available medical specialists.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchName('');
                setSelectedSpecialtyId('');
                setAvailableTodayOnly(false);
              }}
              className="py-2.5 px-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Doctor Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.profileImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'}
                        alt={doc.fullName}
                        className="h-12 w-12 rounded-2xl object-cover border border-emerald-500/20 shadow-xs"
                      />
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--text-primary)] leading-snug">
                          {doc.fullName}
                        </h3>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                          {doc.specializationName}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        doc.status === 'AVAILABLE'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                      }`}
                    >
                      {doc.status || 'ACTIVE'}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-[var(--text-primary)] truncate">{doc.hospitalName}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>{doc.experienceYears} Years Experience • {doc.qualification}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] block">Fee</span>
                    <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      ₹{doc.consultationFee}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenProfile(doc)}
                      className="py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-primary)] font-bold text-xs hover:border-emerald-500/40 transition-all cursor-pointer"
                    >
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingDoctor(doc)}
                      className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Doctor Profile Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] max-w-lg w-full p-6 shadow-2xl space-y-5 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedDoctor.profileImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'}
                  alt={selectedDoctor.fullName}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-500/30"
                />
                <div>
                  <h2 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
                    {selectedDoctor.fullName}
                  </h2>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedDoctor.specializationName}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{selectedDoctor.qualification}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Hospital</span>
                  <span className="font-extrabold text-[var(--text-primary)]">{selectedDoctor.hospitalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Experience</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedDoctor.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Consultation Mode</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedDoctor.consultationMode || 'IN_PERSON'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Consultation Fee</span>
                  <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                    ₹{selectedDoctor.consultationFee}
                  </span>
                </div>
              </div>

              {selectedDoctor.bio && (
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold uppercase text-[var(--text-muted)]">About Doctor</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{selectedDoctor.bio}</p>
                </div>
              )}

              {/* Available Slots */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Available Time Slots Today</span>
                </h4>

                {isLoadingSlots ? (
                  <p className="text-xs text-[var(--text-muted)] animate-pulse">Loading schedule slots...</p>
                ) : doctorSlots.length === 0 ? (
                  <p className="text-xs text-[var(--text-muted)]">No generated schedule slots for today.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {doctorSlots.map((slot, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-xl text-center text-xs font-bold border ${
                          slot.available
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-white/5 border-[var(--border-subtle)] text-[var(--text-muted)] line-through'
                        }`}
                      >
                        {slot.startTime}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBookingDoctor(selectedDoctor);
                    setSelectedDoctor(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-md"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Flow Modal */}
      {bookingDoctor && (
        <AppointmentBookingFlow
          onClose={() => setBookingDoctor(null)}
          onFinishBooking={() => setBookingDoctor(null)}
        />
      )}
    </div>
  );
};

export default PatientDoctorsPage;
