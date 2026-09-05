import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface StoryCardProps {
  tag: string;
  quote: string;
  author: string;
  role: string;
  imageSrc?: string;
  gradientBg?: string;
  index: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  tag,
  quote,
  author,
  role,
  imageSrc,
  gradientBg,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full h-[450px] rounded-3xl overflow-hidden shadow-apple-lg border border-[var(--border-color)] flex flex-col justify-end p-6 sm:p-8 cursor-pointer"
    >
      {/* Background Image / Gradient with Hover Zoom */}
      {imageSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <div className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 ${gradientBg || 'bg-gradient-to-tr from-blue-900 via-slate-900 to-teal-900'}`} />
      )}

      {/* Dark Overlay Gradient for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent z-10" />

      {/* Content Container with Flow Glass Overlay */}
      <div className="relative z-20 flow-glass p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-300 uppercase">
            {tag}
          </span>
          <Quote className="h-5 w-5 text-blue-400/60" />
        </div>

        <blockquote className="text-base sm:text-lg font-medium text-white leading-relaxed mb-4 font-sans">
          "{quote}"
        </blockquote>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">{author}</span>
            <span className="text-[11px] text-slate-300">{role}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
