import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, UserCheck, Building2 } from 'lucide-react';
import { PatientWorkspace } from './showcase/PatientWorkspace';
import { DoctorWorkspace } from './showcase/DoctorWorkspace';
import { HospitalWorkspace } from './showcase/HospitalWorkspace';
import { useShowcase } from '../context/ShowcaseContext';

export const ProductShowcaseSection: React.FC = () => {
  const { activeTab, setActiveTab } = useShowcase();

  const tabs = [
    { id: 'patient', label: 'Patient Portal', icon: User },
    { id: 'doctor', label: 'Doctor Clinical Suite', icon: UserCheck },
    { id: 'hospital', label: 'Hospital Operations', icon: Building2 },
  ] as const;

  return (
    <section id="enterprise" className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 py-32 border-t border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 tracking-widest uppercase">
            PRODUCT SHOWCASE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--text-primary)] mb-6"
        >
          One platform.{' '}
          <span className="gradient-text block mt-1">
            Every healthcare experience.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-8"
        >
          From patients to doctors and hospitals, CareFlow adapts to every role while maintaining one connected experience.
        </motion.p>

        {/* 3-Role Workspace Switcher Pills */}
        <div className="relative inline-flex items-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-1.5 backdrop-blur-xl shadow-apple-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex items-center gap-2 px-5 py-2.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWorkspaceTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 shadow-md shadow-blue-500/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Workspace Container */}
      <div className="relative w-full min-h-[420px]">
        <AnimatePresence mode="wait">
          {activeTab === 'patient' && (
            <motion.div
              key="patient"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <PatientWorkspace />
            </motion.div>
          )}

          {activeTab === 'doctor' && (
            <motion.div
              key="doctor"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <DoctorWorkspace />
            </motion.div>
          )}

          {activeTab === 'hospital' && (
            <motion.div
              key="hospital"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <HospitalWorkspace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
