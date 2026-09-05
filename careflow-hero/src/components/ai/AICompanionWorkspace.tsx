import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Navigation, Clock, Calendar, ShieldCheck, HeartPulse } from 'lucide-react';

interface AICompanionWorkspaceProps {
  selectedCapability: string;
}

export const AICompanionWorkspace: React.FC<AICompanionWorkspaceProps> = ({ selectedCapability }) => {
  const capabilityData: Record<string, { greeting: string; highlights: { icon: any; label: string; value: string }[]; suggestion: string }> = {
    overview: {
      greeting: "Good Morning, John. Your appointment with Dr. Sarah Chen starts in 45 minutes.",
      highlights: [
        { icon: Clock, label: 'Current ER / Clinic Wait', value: '12 minutes' },
        { icon: Navigation, label: 'Traffic Conditions', value: 'Light (10 min drive)' },
        { icon: Calendar, label: 'Recommended Departure', value: 'Leave in 15 mins' },
      ],
      suggestion: "I have already pre-filled your clinical intake forms and prepared your cardiology report summary.",
    },
    booking: {
      greeting: "Checking schedule for Cardiology Specialist Dr. Sarah Chen...",
      highlights: [
        { icon: Calendar, label: 'Next Available Slot', value: 'Today at 09:30 AM' },
        { icon: HeartPulse, label: 'Doctor Rating', value: '4.9 ★ (1,240 visits)' },
        { icon: ShieldCheck, label: 'Insurance Sync', value: '100% Covered' },
      ],
      suggestion: "I can lock in the 09:30 AM appointment and add it to your Google & Apple Calendars automatically.",
    },
    queue: {
      greeting: "Tracking your live position in Cardiology Suite 4B queue...",
      highlights: [
        { icon: Clock, label: 'Current Queue Priority', value: '#03 (2 patients ahead)' },
        { icon: Navigation, label: 'Estimated Consult Time', value: '09:42 AM' },
        { icon: Sparkles, label: 'Queue Velocity', value: 'Fast (4.2 min/patient)' },
      ],
      suggestion: "You're next up! I will send an emergency SMS alert to your phone when you reach position #01.",
    },
    medicine: {
      greeting: "Medication adherence check for your active prescriptions...",
      highlights: [
        { icon: Clock, label: 'Metformin 500mg', value: 'Due 2:00 PM (After lunch)' },
        { icon: HeartPulse, label: 'Adherence Streak', value: '14 Days Perfect ✓' },
        { icon: ShieldCheck, label: 'Refill Status', value: 'Auto-refilled at Pharmacy' },
      ],
      suggestion: "Your pharmacy has dispatched your next 30-day Metformin supply. Delivery expected tomorrow.",
    },
    report: {
      greeting: "Analyzing your latest ECG and Blood Panel diagnostic report...",
      highlights: [
        { icon: HeartPulse, label: 'Heart Rhythm', value: 'Sinus Rhythm (Normal)' },
        { icon: Sparkles, label: 'Cholesterol Ratio', value: 'Optimal (165 mg/dL)' },
        { icon: ShieldCheck, label: 'Summary Status', value: 'Translated to Plain English' },
      ],
      suggestion: "No critical abnormalities detected. Overall cardiac vitals have improved by 12% since May.",
    },
    doctor: {
      greeting: "Matching your reported symptoms with top-rated network specialists...",
      highlights: [
        { icon: HeartPulse, label: 'Best Match', value: 'Dr. Sarah Chen (Cardiology)' },
        { icon: Navigation, label: 'Distance', value: '1.2 miles away' },
        { icon: Clock, label: 'Next Availability', value: 'Today' },
      ],
      suggestion: "Dr. Chen specializes in preventative cardiology and has 15+ years of clinical experience.",
    },
    emergency: {
      greeting: "High-priority emergency triage alert activated...",
      highlights: [
        { icon: Navigation, label: 'Nearest ER', value: 'St. Jude Emergency Center' },
        { icon: Clock, label: 'ER Capacity Wait', value: '4 minutes' },
        { icon: ShieldCheck, label: 'Priority Dispatch', value: 'Ready for 1-Tap Call' },
      ],
      suggestion: "If you are experiencing severe chest pain or shortness of breath, tap Dispatch immediately.",
    },
  };

  const data = capabilityData[selectedCapability] || capabilityData.overview;

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (index < data.greeting.length) {
        setDisplayedText(data.greeting.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [selectedCapability, data.greeting]);

  return (
    <div className="relative w-full rounded-2xl flow-glass p-6 sm:p-8 shadow-apple-lg border border-purple-500/30 overflow-hidden">
      {/* Background Floating Sparkles */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Header bar with Voice Waveform Visualizer */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6 gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[var(--text-primary)]">CareFlow AI Companion</span>
              <span className="rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 px-2 py-0.5 text-[9px] font-bold border border-purple-500/20">
                PROACTIVE 3.0
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">Context: John Doe · Cardiology Care Plan</span>
          </div>
        </div>

        {/* Animated Voice Waveform Visualizer */}
        <div className="flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5">
          <span className="text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-300 mr-1">VOICE AI</span>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-purple-500"
              animate={{ height: ['8px', '18px', '8px'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Dialogue Box with Character Typing */}
      <div className="relative z-10 mb-6 bg-[var(--bg-card-bg)] rounded-xl p-4 border border-[var(--border-subtle)]">
        <p className="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-relaxed font-sans min-h-[48px]">
          {displayedText}
          <span className="inline-block w-1.5 h-4 bg-purple-500 ml-1 animate-pulse" />
        </p>
      </div>

      {/* Proactive Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 relative z-10">
        {data.highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h.label}</span>
              </div>
              <span className="font-stat text-sm font-bold text-[var(--text-primary)]">{h.value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Suggestion Bar */}
      <div className="relative z-10 flex items-center gap-2.5 rounded-xl border border-purple-500/20 bg-purple-500/08 p-3 text-xs text-purple-600 dark:text-purple-300 font-medium">
        <Sparkles className="h-4 w-4 text-purple-500 shrink-0 animate-pulse" />
        <span>{data.suggestion}</span>
      </div>
    </div>
  );
};
