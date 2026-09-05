import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ToggleSwitch } from './transformation/ToggleSwitch';
import { BeforeCard } from './transformation/BeforeCard';
import { AfterCard } from './transformation/AfterCard';
import { RippleButton } from './RippleButton';

export const TransformationSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'before' | 'after'>('after');

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 py-24 border-t border-[var(--border-subtle)]">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
        {/* Left Column — Strategic Copy & Narrative */}
        <div className="flex flex-col justify-center max-w-xl">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300 tracking-wider uppercase">
              THE TRANSFORMATION
            </span>
          </motion.div>

          {/* Large Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--text-primary)] mb-6"
          >
            Healthcare shouldn't feel{' '}
            <span className="gradient-text block mt-1">
              uncertain.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6"
          >
            CareFlow transforms long waits, manual processes, and fragmented healthcare into one intelligent, connected experience.
          </motion.p>

          {/* Supporting bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mb-8"
          >
            <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Real-time queue tracking & automated patient check-in</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>AES-256 encrypted digital health vault accessible 24/7</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>AI-powered medication reminders & automated booking</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <RippleButton
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:shadow-emerald-500/40 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                See How CareFlow Works
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </RippleButton>
          </motion.div>
        </div>

        {/* Right Column — Interactive Before vs After Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Segmented Mode Selector */}
          <ToggleSwitch activeMode={activeMode} onChange={setActiveMode} />

          {/* Morphing Interactive Card Container */}
          <div className="relative w-full max-w-lg min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeMode === 'before' ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <BeforeCard />
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <AfterCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
