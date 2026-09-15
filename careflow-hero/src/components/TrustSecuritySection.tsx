import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { SecurityVisualization } from './security/SecurityVisualization';
import { SecurityModuleCard } from './security/SecurityModuleCard';

export const TrustSecuritySection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 py-32 border-t border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 tracking-widest uppercase">
            PRIVACY & SECURITY
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--text-primary)] mb-6"
        >
          Your healthcare data{' '}
          <span className="gradient-text block mt-1">
            stays yours.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-8"
        >
          Every appointment, report, reminder, and AI conversation is protected through privacy-first design and modern security.
        </motion.p>
      </div>

      {/* Central Animated Security Network Visualization */}
      <div className="mb-16">
        <SecurityVisualization />
      </div>

      {/* 5 Security Pillar Modules Grid */}
      <SecurityModuleCard />
    </section>
  );
};
