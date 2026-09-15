import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Sparkles,
  ArrowRight,
  Flame,
  Navigation,
} from 'lucide-react';

interface Step1SymptomAssessmentProps {
  onAnalyze: (data: {
    symptomText: string;
    selectedChips: string[];
    painLevel: 'Mild' | 'Moderate' | 'Severe';
  }) => void;
}

export const Step1SymptomAssessment: React.FC<Step1SymptomAssessmentProps> = ({ onAnalyze }) => {
  const [symptomText, setSymptomText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>(['Chest Pain']);
  const [painLevel, setPainLevel] = useState<'Mild' | 'Moderate' | 'Severe'>('Moderate');

  const symptomChips = [
    'Headache',
    'Fever',
    'Chest Pain',
    'Injury',
    'Skin Problem',
    'Stomach Pain',
    'Eye Problem',
    'More...',
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
          <span>Step 1 of 3: AI Triage & Care Finder</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
          Find the Right Care
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
          Tell us what symptoms you are experiencing. CareFlow AI will calculate the optimal hospital match.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Large Symptom Text Area */}
        <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
          <label htmlFor="symptoms-input" className="block text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
            Describe Your Symptoms
          </label>
          <textarea
            id="symptoms-input"
            rows={4}
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="Describe what you are feeling, e.g. severe headache with mild fever since morning, or dull pressure in chest..."
            className="w-full p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
          />

          {/* Quick Symptom Chips */}
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

        {/* Pain Level Selector */}
        <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-amber-500" />
              Select Pain / Discomfort Level
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Current: {painLevel}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(['Mild', 'Moderate', 'Severe'] as const).map((level) => {
              const isSelected = painLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPainLevel(level)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? level === 'Severe'
                        ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold ring-1 ring-rose-500/30'
                        : level === 'Moderate'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold ring-1 ring-amber-500/30'
                        : 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold ring-1 ring-emerald-500/30'
                      : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="text-xs font-extrabold block">{level}</span>
                  <span className="text-[10px] text-[var(--text-muted)] block">
                    {level === 'Mild' ? 'Manageable' : level === 'Moderate' ? 'Noticeable Pain' : 'Urgent Relief'}
                  </span>
                </button>
              );
            })}
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
