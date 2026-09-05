import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Navigation, CheckCircle2, UserCheck, Calendar, Pill } from 'lucide-react';
import { JourneyMomentCard } from './moments/JourneyMomentCard';

export const RealMomentsSection: React.FC = () => {
  const scenes = [
    {
      stepNumber: 'MOMENT 01',
      timeLabel: '08:15 AM · AT HOME',
      title: 'Morning CareFlow Check',
      description: 'John checks CareFlow over morning coffee. His appointment and live queue priority are already synced.',
      imageSrc: '/scene_1.png',
      overlayCard: {
        badge: 'Priority #03',
        title: 'Cardiology Appointment in 45m',
        subtitle: 'Live Queue Wait: 12 min · Sync Active',
        icon: Clock,
      },
    },
    {
      stepNumber: 'MOMENT 02',
      timeLabel: '08:45 AM · EN ROUTE',
      title: 'Seamless Arrival Timing',
      description: 'CareFlow monitors live traffic and alerts John to depart, avoiding any waiting room delays.',
      imageSrc: '/scene_2.png',
      overlayCard: {
        badge: 'Leave Now',
        badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
        title: 'Smart Departure Alert',
        subtitle: 'Traffic Light (10m drive) · ETA 08:55 AM',
        icon: Navigation,
      },
    },
    {
      stepNumber: 'MOMENT 03',
      timeLabel: '08:55 AM · RECEPTION',
      title: '1-Tap Automatic Check-in',
      description: 'Upon entering the clinic lobby, CareFlow automatically confirms John’s arrival without paper clipboards.',
      imageSrc: '/scene_3.png',
      overlayCard: {
        badge: 'Checked In ✓',
        title: 'Instant Arrival Verification',
        subtitle: 'Cardiology Suite 4B · Ticket #03 Issued',
        icon: CheckCircle2,
      },
    },
    {
      stepNumber: 'MOMENT 04',
      timeLabel: '09:05 AM · CONSULTATION',
      title: 'Doctor Welcomes John',
      description: 'Dr. Sarah Chen greets John on time. AI visit notes and vitals history are pre-filled on her tablet.',
      imageSrc: '/scene_4.png',
      overlayCard: {
        badge: 'On Time',
        title: 'Dr. Sarah Chen Consultation',
        subtitle: 'Clinical AI Visit Summary Pre-filled',
        icon: UserCheck,
      },
    },
    {
      stepNumber: 'MOMENT 05',
      timeLabel: '09:35 AM · DEPARTURE',
      title: 'Reassured & On Your Way',
      description: 'John leaves the clinic relaxed and confident. His digital prescription and follow-up are instantly saved.',
      imageSrc: '/scene_5.png',
      overlayCard: {
        badge: 'Complete ✓',
        title: 'Consultation Complete',
        subtitle: 'Digital Vault Saved · Follow-up Synced',
        icon: Calendar,
      },
    },
    {
      stepNumber: 'MOMENT 06',
      timeLabel: '08:00 PM · EVENING',
      title: 'Evening Health Reminder',
      description: 'Back home, CareFlow sends a gentle reminder for John’s evening Metformin dose and pharmacy refill.',
      imageSrc: '/scene_6.png',
      overlayCard: {
        badge: 'Dose Taken ✓',
        badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        title: 'Smart Dosage Reminder',
        subtitle: 'Metformin 500mg · Refill Synced',
        icon: Pill,
      },
    },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 py-32 border-t border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6"
        >
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" />
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 tracking-widest uppercase">
            REAL MOMENTS · THE JOURNEY
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--text-primary)] mb-6"
        >
          Healthcare is about people,{' '}
          <span className="gradient-text block mt-1">
            not paperwork.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed"
        >
          Every appointment kept. Every minute saved. Every patient reassured.
        </motion.p>
      </div>

      {/* 6 Editorial Journey Moments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenes.map((s, i) => (
          <JourneyMomentCard
            key={s.stepNumber}
            stepNumber={s.stepNumber}
            timeLabel={s.timeLabel}
            title={s.title}
            description={s.description}
            imageSrc={s.imageSrc}
            overlayCard={s.overlayCard}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};
