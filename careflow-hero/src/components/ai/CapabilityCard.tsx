import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface CapabilityCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
  title,
  description,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
        isActive
          ? 'bg-purple-500/15 border-purple-500/40 shadow-lg shadow-purple-500/15 ring-1 ring-purple-500/30'
          : 'bg-[var(--bg-card-bg)] border-[var(--border-subtle)] hover:border-purple-500/30 hover:bg-[var(--bg-item-hover)]'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            isActive
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs font-bold text-[var(--text-primary)]">{title}</span>
      </div>
      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{description}</p>
    </motion.button>
  );
};
