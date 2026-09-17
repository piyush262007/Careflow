import React from 'react';
import { Calendar, Clock, Pill, Activity } from 'lucide-react';
import type { AppointmentData, LiveQueueData, PrescriptionSummary } from '../../../services/mockPatientData';

interface HealthSummaryRowProps {
  appointment: AppointmentData;
  queue: LiveQueueData;
  prescriptions: PrescriptionSummary;
  healthScore: number;
  healthStatus: string;
}

export const HealthSummaryRow: React.FC<HealthSummaryRowProps> = ({
  appointment,
  queue,
  prescriptions,
  healthScore,
  healthStatus,
}) => {
  const cards = [
    {
      title: 'Next Appointment',
      mainText: appointment.doctorName,
      subText: `${appointment.specialty.split(' ')[0]} · ${appointment.date} · ${appointment.time}`,
      icon: Calendar,
      iconBg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
      tag: appointment.status,
      tagBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Live Queue Position',
      mainText: `#0${queue.position}`,
      subText: `Estimated wait: ${queue.estimatedWaitMinutes} min`,
      icon: Clock,
      iconBg: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
      tag: queue.statusText,
      tagBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Prescriptions',
      mainText: `${prescriptions.activeCount} Active`,
      subText: `Next refill: ${prescriptions.nextRefillDate}`,
      icon: Pill,
      iconBg: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
      tag: 'On Track',
      tagBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Health Score',
      mainText: `${healthScore}/100`,
      subText: healthStatus,
      icon: Activity,
      iconBg: 'bg-purple-500/15 text-purple-500 border-purple-500/30',
      tag: 'Optimal',
      tagBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-muted)]">{card.title}</span>
              <div className={`p-2 rounded-xl border ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[var(--text-primary)] font-heading tracking-tight">
                {card.mainText}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">{card.subText}</p>
            </div>

            <div className="pt-1">
              <span className={`inline-block px-2.5 py-0.5 text-[10.5px] font-bold rounded-full ${card.tagBg}`}>
                {card.tag}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
