import React from 'react';

export const CalendarMiniCard: React.FC = () => {
  return (
    <div className="glass-card-bg rounded-xl p-3 shadow-[var(--shadow-card)]">
      <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2 text-center">July 2026</div>
      <div className="grid grid-cols-5 gap-1 text-center font-mono text-[9.5px]">
        <span className="font-bold text-[var(--text-muted)]">Mo</span>
        <span className="font-bold text-[var(--text-muted)]">Tu</span>
        <span className="font-bold text-[var(--text-muted)]">We</span>
        <span className="font-bold text-[var(--text-muted)]">Th</span>
        <span className="font-bold text-[var(--text-muted)]">Fr</span>

        <span className="text-[var(--text-muted)] p-1">14</span>
        <span className="text-[var(--text-muted)] p-1">15</span>
        <span className="text-[var(--text-muted)] p-1">16</span>
        <span className="text-[var(--text-muted)] p-1">17</span>
        <span className="text-[var(--text-muted)] p-1">18</span>

        <span className="rounded bg-blue-600 text-white font-bold p-1">19</span>
        <span className="text-[var(--text-secondary)] p-1">20</span>
        <span className="text-[var(--text-secondary)] p-1">21</span>
        <span className="rounded bg-blue-500/20 text-blue-600 dark:text-blue-300 font-semibold p-1">22</span>
        <span className="text-[var(--text-secondary)] p-1">23</span>
      </div>
    </div>
  );
};
