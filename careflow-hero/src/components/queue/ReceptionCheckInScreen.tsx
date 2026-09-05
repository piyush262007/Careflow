import React, { useState } from 'react';
import { QrCode, Scan, CheckCircle2, UserCheck, Search, ShieldCheck } from 'lucide-react';
import type { QueuePatient } from './data/mockQueueData';

interface ReceptionCheckInScreenProps {
  patients: QueuePatient[];
  onCheckInPatient: (patientId: string) => void;
}

export const ReceptionCheckInScreen: React.FC<ReceptionCheckInScreenProps> = ({
  patients,
  onCheckInPatient,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const handleSimulateScan = () => {
    setScannedCode('CF-849201 (Sarah Jenkins)');
    setTimeout(() => {
      onCheckInPatient('q-3');
      setScannedCode(null);
    }, 1200);
  };

  const filteredPatients = patients.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.patientName.toLowerCase().includes(q) ||
        p.tokenNumber.toLowerCase().includes(q) ||
        p.doctorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Reception Desk & Check-In Portal</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
            Patient Reception & QR Check-In
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Scan digital appointment passes or manually verify arriving patients for clinic queue entry.
          </p>
        </div>
      </div>

      {/* QR Scanner Placeholder Card */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden text-center space-y-3">
          {/* Scanner Beam Animation */}
          <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_#22c55e] animate-pulse top-1/2 -translate-y-1/2 opacity-75" />

          <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-emerald-400 shadow-inner">
            <QrCode className="h-10 w-10" />
          </div>

          <div>
            <h4 className="text-sm font-bold">Interactive QR Pass Scanner</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Align digital appointment pass QR code within camera frame.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSimulateScan}
            className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Scan className="h-3.5 w-3.5" />
            <span>{scannedCode ? `Scanning: ${scannedCode}...` : 'Simulate QR Pass Scan'}</span>
          </button>
        </div>

        <div className="md:col-span-7 space-y-3">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            Automated Check-In Instructions
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Patients presenting QR passes on their smartphones or printed appointment tickets can be checked in instantly. Upon scanning, their status transitions to <strong>"Waiting"</strong> and an automated queue token is issued.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold">Arriving Today</span>
              <span className="font-extrabold text-[var(--text-primary)] text-sm">{patients.length} Patients</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-0.5">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold">Checked In</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                {patients.filter((p) => p.status === 'Waiting' || p.status === 'In Consultation').length} Checked In
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Check-In Patient List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Today's Check-In List ({filteredPatients.length})
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient or token..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredPatients.map((patient) => {
            const isCheckedIn = patient.status === 'Waiting' || patient.status === 'In Consultation';
            return (
              <div
                key={patient.id}
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                    {patient.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{patient.patientName}</h4>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {patient.tokenNumber}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] block">
                      {patient.doctorName} • {patient.department} ({patient.appointmentTime})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10.5px] font-extrabold px-2.5 py-1 rounded-full border ${
                      isCheckedIn
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {isCheckedIn ? 'Checked In' : 'Arriving / Pending'}
                  </span>

                  {!isCheckedIn ? (
                    <button
                      type="button"
                      onClick={() => onCheckInPatient(patient.id)}
                      className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Mark Checked In</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>In Queue</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
