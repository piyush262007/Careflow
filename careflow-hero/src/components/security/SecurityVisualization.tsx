import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, UserCheck, Building2, Cloud } from 'lucide-react';

export const SecurityVisualization: React.FC = () => {
  const nodes = [
    { id: 'patient', label: 'Patient Vault', sub: 'End-to-End Encrypted', icon: User, pos: 'top-4 left-4 sm:top-8 sm:left-12' },
    { id: 'doctor', label: 'Doctor Suite', sub: 'Role-Isolated Access', icon: UserCheck, pos: 'top-4 right-4 sm:top-8 sm:right-12' },
    { id: 'hospital', label: 'Hospital Ops', sub: 'HIPAA & SOC2 Vault', icon: Building2, pos: 'bottom-4 left-4 sm:bottom-8 sm:left-12' },
    { id: 'cloud', label: 'Cloud Storage', sub: 'AES-256 Multi-Region', icon: Cloud, pos: 'bottom-4 right-4 sm:bottom-8 sm:right-12' },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[420px] rounded-3xl flow-glass p-8 flex items-center justify-center overflow-hidden border border-blue-500/30 shadow-apple-lg">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_300px_at_50%_50%,rgba(37,99,235,0.15),transparent_70%)]" />

      {/* SVG Encrypted Traveling Lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full z-10 overflow-visible opacity-60">
        <defs>
          <linearGradient id="secGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Lines to 4 Satellite Nodes */}
        <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#secGradBlue)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#secGradBlue)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#secGradBlue)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#secGradBlue)" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>

      {/* Central Glowing Shield Node */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 flex flex-col items-center justify-center"
      >
        {/* Pulse Ring */}
        <span className="absolute h-32 w-32 rounded-full bg-blue-500/20 animate-ping" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-teal-400 text-white shadow-2xl shadow-blue-500/50 border border-white/20">
          <ShieldCheck className="h-12 w-12 text-white" />
        </div>
        <span className="mt-3 text-xs font-bold text-[var(--text-primary)] tracking-wide uppercase">
          CareFlow Security Shield
        </span>
        <span className="text-[10px] text-emerald-500 font-mono font-semibold">AES-256 ACTIVE</span>
      </motion.div>

      {/* 4 Satellite Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.05 }}
            className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] p-3 backdrop-blur-xl shadow-md ${node.pos}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--text-primary)] block">{node.label}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">{node.sub}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
