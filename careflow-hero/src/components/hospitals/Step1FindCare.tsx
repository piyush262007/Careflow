import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Navigation,
} from 'lucide-react';

interface Step1FindCareProps {
  onAnalyze: (data: {
    symptomText: string;
    selectedChips: string[];
    painLevel: 'Mild' | 'Moderate' | 'Severe';
    duration: '< 24 Hours' | '1-3 Days' | '1+ Week';
  }) => void;
}

export const Step1FindCare: React.FC<Step1FindCareProps> = ({ onAnalyze }) => {
  const [symptomText, setSymptomText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>(['Chest Pain']);
  const [painLevel, setPainLevel] = useState<'Mild' | 'Moderate' | 'Severe'>('Moderate');
  const [duration, setDuration] = useState<'< 24 Hours' | '1-3 Days' | '1+ Week'>('1-3 Days');

  const symptomChips = [
    'Headache',
    'Fever',
    'Cold',
    'Chest Pain',
    'Injury',
    'Skin Problem',
    'Stomach Pain',
    'Eye Problem',
    'More',
  ];

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      symptomText,
      selectedChips,
      painLevel,
      duration,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Top Greeting Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Stethoscope className="h-3.5 w-3.5" />
          <span>Step 1 of 3: Symptom Assessment</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
          Find Care
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
          Describe your health concern. CareFlow AI will automatically identify the right medical specialty and match you with the best facility.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Large Symptom Textarea */}
        <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
          <label htmlFor="symptoms-input" className="block text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
            Describe Your Symptoms
          </label>
          <textarea
            id="symptoms-input"
            rows={4}
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="Describe what you are feeling, e.g. severe pressure in chest with mild shortness of breath..."
            className="w-full p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
          />

          {/* Quick Symptom Chips (9 Chips) */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-[var(--text-muted)] block uppercase">
              Or Select Quick Symptom Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {symptomChips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40 hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pain Level & Duration Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pain Level Selector */}
          <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500" />
                Pain Level
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {painLevel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['Mild', 'Moderate', 'Severe'] as const).map((level) => {
                const isSelected = painLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPainLevel(level)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? level === 'Severe'
                          ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                          : level === 'Moderate'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                          : 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/30'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">{level}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-500" />
                Symptom Duration
              </span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {duration}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['< 24 Hours', '1-3 Days', '1+ Week'] as const).map((dur) => {
                const isSelected = duration === dur;
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                        : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-blue-500/30'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">{dur}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Location Card */}
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 shrink-0">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">
                Current Location
              </span>
              <h4 className="text-xs font-bold text-[var(--text-primary)]">
                San Francisco Medical District, CA
              </h4>
            </div>
          </div>

          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
            GPS Active (1.2 km radius)
          </span>
        </div>

        {/* Primary Action Button: Find Best Care */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-base font-extrabold flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 cursor-pointer transition-all hover:shadow-emerald-500/40"
        >
          <Sparkles className="h-5 w-5 text-emerald-100 animate-pulse" />
          <span>Find Best Care</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </motion.div>
  );
};
