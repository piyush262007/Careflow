import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Lock, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const RecentHealthRecordsCard: React.FC = () => {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const reports = [
    { id: '1', title: 'Comprehensive Blood Test Panel', date: 'July 18, 2026', size: '2.4 MB PDF' },
    { id: '2', title: 'ECG Cardiology Scan Report', date: 'June 24, 2026', size: '1.8 MB PDF' },
    { id: '3', title: 'Clinical Visit Care Plan Summary', date: 'May 12, 2026', size: '850 KB PDF' },
  ];

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Recent Health Records</h3>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Latest Reports List */}
      <div className="space-y-2.5">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{rep.title}</h4>
                <span className="text-[10.5px] text-[var(--text-muted)] block">
                  {rep.date} • {rep.size}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-emerald-600 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                title="Preview Document"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDownload(rep.id)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-blue-600 hover:bg-blue-500/10 transition-colors cursor-pointer"
                title="Download Encrypted Report"
              >
                {downloadedId === rep.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Download className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Footer Banner */}
      <div className="p-2.5 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>All reports AES-256 encrypted for your privacy</span>
        </div>
        <Lock className="h-3 w-3 text-[var(--text-muted)] shrink-0" />
      </div>
    </motion.div>
  );
};
