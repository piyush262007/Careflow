import React, { useState, useEffect } from 'react';
import type { PrescriptionResponse } from '../../services/prescriptionService';
import { prescriptionService } from '../../services/prescriptionService';
import {
  Pill,
  Stethoscope,
  Printer,
  X,
  Eye,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Activity,
} from 'lucide-react';

export const PatientPrescriptionsPage: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionResponse | null>(null);

  const fetchPatientPrescriptions = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await prescriptionService.getPatientPrescriptions();
      if (res.success && Array.isArray(res.data)) {
        setPrescriptions(res.data);
      } else {
        setPrescriptions([]);
      }
    } catch (err: any) {
      console.error('Fetch prescriptions error:', err);
      setErrorMsg(err?.response?.data?.message || err.message || 'Failed to fetch prescriptions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientPrescriptions();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">My Digital Prescriptions</h1>
            <p className="text-xs text-[var(--text-muted)] font-medium">Access your verified clinical prescriptions and dosage instructions</p>
          </div>
        </div>

        <button
          onClick={fetchPatientPrescriptions}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-bg)] text-xs font-bold text-[var(--text-secondary)] transition-all cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          Refresh Prescriptions
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-xs font-bold text-[var(--text-muted)]">Fetching your prescriptions...</p>
        </div>
      ) : prescriptions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
          <Pill className="w-12 h-12 text-[var(--text-muted)] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">No Digital Prescriptions Found</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            When your doctor completes a consultation and issues a prescription, it will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-extrabold text-[var(--text-primary)]">{rx.doctorName}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] px-2 py-0.5 rounded-full bg-[var(--bg-card-bg)] border border-[var(--border-color)]">
                    {rx.appointmentDate}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider">Diagnosis</span>
                  <p className="text-sm font-extrabold text-[var(--text-primary)] line-clamp-2 mt-0.5">{rx.diagnosis}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] font-bold text-[var(--text-muted)] block">Prescribed Medicines ({rx.items?.length || 0}):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rx.items?.map((item, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-500/20"
                      >
                        {item.medicineName} ({item.dosage})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setSelectedPrescription(rx)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/15 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Prescription Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Detail & Printable Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto print:max-h-none print:p-0 print:border-none print:shadow-none">
            {/* Modal Header (Hidden on Print) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
                <Pill className="w-4 h-4" />
                <span>CareFlow Verified Digital Prescription</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Download
                </button>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Prescription Body */}
            <div className="space-y-6">
              {/* Header Letterhead */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-emerald-500">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                    Rx
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-black tracking-tight text-emerald-600 dark:text-emerald-400">CareFlow Health System</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{selectedPrescription.hospitalName || 'CareFlow Medical Center'}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <p className="font-extrabold text-slate-900 dark:text-slate-100">Date: {selectedPrescription.appointmentDate || 'Today'}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Time: {selectedPrescription.appointmentTime || '10:00 AM'}</p>
                </div>
              </div>

              {/* Doctor & Patient Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">Prescribing Doctor</span>
                  <p className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">{selectedPrescription.doctorName}</p>
                  <p className="text-slate-500 dark:text-slate-400">{selectedPrescription.doctorSpecialization}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">Patient Details</span>
                  <p className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">{selectedPrescription.patientName}</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Gender: {selectedPrescription.patientGender || 'N/A'} • Contact: {selectedPrescription.patientPhone || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Diagnosis & Symptoms */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400">Clinical Diagnosis:</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    {selectedPrescription.diagnosis}
                  </p>
                </div>
                {selectedPrescription.symptoms && (
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400">Symptoms:</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{selectedPrescription.symptoms}</p>
                  </div>
                )}
              </div>

              {/* Medicines Table */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">Prescribed Medicines</span>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                        <th className="p-3">Medicine</th>
                        <th className="p-3">Dosage</th>
                        <th className="p-3">Frequency</th>
                        <th className="p-3">Timing</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {selectedPrescription.items?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{item.medicineName}</td>
                          <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{item.dosage}</td>
                          <td className="p-3 text-slate-700 dark:text-slate-300">{item.frequency}</td>
                          <td className="p-3 text-slate-700 dark:text-slate-300">{item.timing || 'After food'}</td>
                          <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{item.durationDays} Days</td>
                          <td className="p-3 text-slate-500 dark:text-slate-400">{item.instructions || 'Take as directed'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations & Notes */}
              {(selectedPrescription.notes || selectedPrescription.recommendations || selectedPrescription.followUpInstructions) && (
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  {selectedPrescription.recommendations && (
                    <div>
                      <span className="font-bold text-slate-500 dark:text-slate-400">Doctor Advice & Recommendations:</span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">{selectedPrescription.recommendations}</p>
                    </div>
                  )}
                  {selectedPrescription.followUpInstructions && (
                    <div>
                      <span className="font-bold text-slate-500 dark:text-slate-400">Follow-up Instructions:</span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">{selectedPrescription.followUpInstructions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Digital Signature & Footer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Digital Signature • CareFlow EHR System</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-slate-100">Dr. {selectedPrescription.doctorName}</p>
                  <p className="text-[10px]">Licensed Practitioner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptionsPage;
