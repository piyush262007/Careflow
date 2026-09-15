import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { LiveQueueExperience } from './experiences/LiveQueueExperience';
import { AIChatExperience } from './experiences/AIChatExperience';
import { BookingExperience } from './experiences/BookingExperience';
import { MedicineCenterExperience } from './experiences/MedicineCenterExperience';
import { HealthTimelineExperience } from './experiences/HealthTimelineExperience';
import { EmergencyAccessExperience } from './experiences/EmergencyAccessExperience';

export const CoreExperiencesSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 py-32 border-t border-[var(--border-subtle)]">
      {/* Spacious Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 tracking-widest uppercase">
            CORE EXPERIENCES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--text-primary)] mb-6"
        >
          Experience CareFlow{' '}
          <span className="gradient-text block mt-1">
            in Action.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed"
        >
          Explore the six core capabilities that transform complex clinical workflows into one seamless, intelligent healthcare operating system.
        </motion.p>
      </div>

      {/* Sequence of 6 Product Demonstration Sections */}
      <div className="space-y-32">
        <LiveQueueExperience />
        <AIChatExperience />
        <BookingExperience />
        <MedicineCenterExperience />
        <HealthTimelineExperience />
        <EmergencyAccessExperience />
      </div>
    </section>
  );
};
