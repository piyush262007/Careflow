import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, Pill, FileText, Search, ShieldAlert } from 'lucide-react';
import { AICompanionWorkspace } from './ai/AICompanionWorkspace';
import { CapabilityCard } from './ai/CapabilityCard';

export const CareFlowAISection: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<string>('overview');

  const capabilities = [
    {
      id: 'booking',
      title: 'Book Appointment',
      description: 'Auto-matches available doctor slots and calendar sync.',
      icon: Calendar,
    },
    {
      id: 'queue',
      title: 'Live Queue Tracking',
      description: 'Monitors real-time queue priority and sends leave alerts.',
      icon: Clock,
    },
    {
      id: 'medicine',
      title: 'Medicine Reminder',
      description: 'Tracks prescription schedules and automatic pharmacy refills.',
      icon: Pill,
    },
    {
      id: 'report',
      title: 'Explain Medical Report',
      description: 'Translates complex diagnostic reports into plain language.',
      icon: FileText,
    },
    {
      id: 'doctor',
      title: 'Find Doctor',
      description: 'Matches symptoms with top-rated network specialists.',
      icon: Search,
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      description: 'Triages urgent symptoms and dispatches nearest ER capacity.',
      icon: ShieldAlert,
    },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 py-32 border-t border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-300 tracking-widest uppercase">
            CAREFLOW AI INTELLIGENCE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--text-primary)] mb-6"
        >
          Healthcare guidance that{' '}
          <span className="gradient-text block mt-1">
            understands your day.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-8"
        >
          CareFlow AI proactively helps you stay on top of appointments, queues, medicines, and healthcare information.
        </motion.p>
      </div>

      {/* Proactive AI Companion Workspace */}
      <div className="mb-12">
        <AICompanionWorkspace selectedCapability={selectedCapability} />
      </div>

      {/* 6 Interactive Capability Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {capabilities.map((cap) => (
          <CapabilityCard
            key={cap.id}
            id={cap.id}
            title={cap.title}
            description={cap.description}
            icon={cap.icon}
            isActive={selectedCapability === cap.id}
            onClick={() => setSelectedCapability(cap.id)}
          />
        ))}
      </div>
    </section>
  );
};
