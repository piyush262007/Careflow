import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Smile, Shield, Sparkles, Stethoscope, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export interface Department {
  id: string;
  name: string;
  specialistsCount: number;
  description: string;
  iconName: string;
}

interface DepartmentStepProps {
  departments: Department[];
  selectedDepartment: Department | null;
  onSelectDepartment: (dept: Department) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DepartmentStep: React.FC<DepartmentStepProps> = ({
  departments,
  selectedDepartment,
  onSelectDepartment,
  onNext,
  onBack,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'heart':
        return Heart;
      case 'activity':
        return Activity;
      case 'smile':
        return Smile;
      case 'shield':
        return Shield;
      case 'sparkles':
        return Sparkles;
      case 'stethoscope':
      default:
        return Stethoscope;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Copy & Back Link */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Hospitals</span>
        </button>

        <h2 className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Select Medical Department
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Choose the specialized department for your consultation.
        </p>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((d) => {
          const Icon = getIcon(d.iconName);
          const isSelected = selectedDepartment?.id === d.id;

          return (
            <motion.div
              key={d.id}
              whileHover={{ y: -3 }}
              onClick={() => onSelectDepartment(d)}
              className={`p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/05 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-emerald-500/40 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
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

              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{d.name}</h3>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{d.description}</p>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                {d.specialistsCount} Doctors Available Today
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
          disabled={!selectedDepartment}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            selectedDepartment
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 hover:scale-[1.02]'
              : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Doctors</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
