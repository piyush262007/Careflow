import React from 'react';
import { motion } from 'framer-motion';

export interface OverlayCardData {
  badge: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface JourneyMomentCardProps {
  stepNumber: string;
  timeLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayCard: OverlayCardData;
  index: number;
}

export const JourneyMomentCard: React.FC<JourneyMomentCardProps> = ({
  stepNumber,
  timeLabel,
  title,
  description,
  imageSrc,
  overlayCard,
  index,
}) => {
  const Icon = overlayCard.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full h-[460px] rounded-3xl overflow-hidden shadow-apple-lg border border-[var(--border-color)] flex flex-col justify-between p-6 cursor-pointer transform-gpu"
    >
      {/* Editorial Lifestyle Image with Lazy Loading & Hover Zoom */}
      <img
        src={imageSrc}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/20 z-10 pointer-events-none" />

      {/* Top Header Step Badge */}
      <div className="relative z-20 flex items-center justify-between">
        <span className="rounded-full bg-slate-900/80 border border-white/15 px-3.5 py-1 text-[10.5px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
          {stepNumber} · {timeLabel}
        </span>
      </div>

      {/* Floating CareFlow Flow Glass UI Overlay directly on top of image */}
      <div className="relative z-20 space-y-3">
        {/* Story Text */}
        <div>
          <h3 className="text-lg font-bold text-white mb-1 font-heading leading-tight">{title}</h3>
          <p className="text-xs text-slate-200 font-normal leading-relaxed">{description}</p>
        </div>

        {/* CareFlow Interface Floating Glass Card */}
        <div className="flow-glass p-3.5 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-md shadow-blue-500/30">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] font-bold text-white truncate">{overlayCard.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${overlayCard.badgeColor || 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                {overlayCard.badge}
              </span>
            </div>
            <span className="text-[10.5px] text-slate-200 block font-mono truncate">{overlayCard.subtitle}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
