import React from 'react';
import { motion } from 'framer-motion';
import { Lock, EyeOff, KeyRound, FileCheck, Server } from 'lucide-react';

export const SecurityModuleCard: React.FC = () => {
  const modules = [
    {
      title: 'End-to-End Encryption',
      description: 'All patient vitals, clinical notes, and health records are encrypted at rest with AES-256 and in transit via TLS 1.3.',
      icon: Lock,
    },
    {
      title: 'Private AI Conversations',
      description: 'CareFlow AI operates with zero data retention. Your medical conversations are never used to train public AI models.',
      icon: EyeOff,
    },
    {
      title: 'Role-Based Access Control',
      description: 'Strict, isolated permissions ensure patients, doctors, and hospital admins only access authorized clinical data.',
      icon: KeyRound,
    },
    {
      title: 'Secure Medical Records',
      description: 'Immutable clinical audit logs track every document access, edit, and prescription update in real time.',
      icon: FileCheck,
    },
    {
      title: 'Protected Cloud Storage',
      description: 'Multi-region HIPAA & SOC2 Type II compliant cloud infrastructure with continuous automated vulnerability scanning.',
      icon: Server,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((mod, index) => {
        const Icon = mod.icon;
        return (
          <motion.div
            key={mod.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-5 transition-all hover:border-blue-500/30 hover:bg-[var(--bg-item-hover)] shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500 border border-blue-500/20">
                <Icon className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">{mod.title}</h4>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{mod.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
