import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Clock, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  fee: string;
  nextSlot: string;
  avatarInitials: string;
  bio: string;
}

interface DoctorStepProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DoctorStep: React.FC<DoctorStepProps> = ({
  doctors,
  selectedDoctor,
  onSelectDoctor,
  onNext,
  onBack,
}) => {
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
          <span>Back to Departments</span>
        </button>

        <h2 className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Choose a Specialist Doctor
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Review physician credentials, experience, ratings, and next available consultation slots.
        </p>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map((doc) => {
          const isSelected = selectedDoctor?.id === doc.id;

          return (
            <motion.div
              key={doc.id}
              whileHover={{ y: -3 }}
              onClick={() => onSelectDoctor(doc)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/05 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-emerald-500/40 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                {/* Avatar & Selection Radio */}
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shadow-md">
                    {doc.avatarInitials}
                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-[var(--border-color)] bg-[var(--bg-card-bg)]'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                </div>

                {/* Name, Specialty & Bio */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{doc.name}</h3>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                    {doc.specialty}
                  </span>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">{doc.bio}</p>
                </div>

                {/* Rating & Experience */}
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{doc.rating}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-normal">({doc.reviewsCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-blue-500" />
                    <span>{doc.experience}</span>
                  </div>
                </div>
              </div>

              {/* Next Available Slot & Fee */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10.5px] text-[var(--text-muted)]">Consultation Fee</span>
                  <span className="font-bold text-[var(--text-primary)]">{doc.fee}</span>
                </div>

                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>Next Slot: {doc.nextSlot}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

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
          disabled={!selectedDoctor}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            selectedDoctor
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 hover:scale-[1.02]'
              : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Select Date & Time</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
