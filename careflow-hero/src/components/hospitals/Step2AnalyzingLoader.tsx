import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Building2, Stethoscope, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface Step2AnalyzingLoaderProps {
  onComplete: () => void;
}

export const Step2AnalyzingLoader: React.FC<Step2AnalyzingLoaderProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const stages = [
    { icon: Brain, label: 'Analyzing Symptoms', desc: 'Processing clinical symptom description & pain severity...' },
    { icon: Building2, label: 'Finding Nearby Hospitals', desc: 'Searching 5 km radius medical network...' },
    { icon: Stethoscope, label: 'Checking Doctor Availability', desc: 'Querying live specialist schedules & ER rosters...' },
    { icon: Clock, label: 'Estimating Queue', desc: 'Calculating live patient queue & wait times...' },
    { icon: Sparkles, label: 'Calculating Best Match', desc: 'Optimizing match score for lowest waiting time...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete, stages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-[var(--bg-surface)] border border-emerald-500/30 shadow-2xl space-y-8 text-center"
    >
      {/* Central Pulsing CareFlow Spinner */}
      <div className="relative flex items-center justify-center mx-auto">
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-pulse">
          <Activity className="h-12 w-12 text-white" />
        </div>
        <div className="absolute inset-0 rounded-3xl border-2 border-emerald-400/40 animate-ping pointer-events-none" />
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h2 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
          CareFlow AI Triage Engine
        </h2>
        <p className="text-xs text-[var(--text-secondary)] font-medium">
          Matching your symptoms with the best medical facility in real-time...
        </p>
      </div>

      {/* 5-Stage Animated Progress Steps */}
      <div className="space-y-3 text-left">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: idx <= currentStepIndex ? 1 : 0.4, x: 0 }}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                isCurrent
                  ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/30'
                  : isDone
                  ? 'bg-[var(--bg-card-bg)] border-emerald-500/20'
                  : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] opacity-40'
              }`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-500 text-white animate-bounce'
                    : 'bg-slate-100 dark:bg-white/10 text-[var(--text-muted)]'
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {stage.label}
                </h4>
                {isCurrent && (
                  <p className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-medium truncate mt-0.5">
                    {stage.desc}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
