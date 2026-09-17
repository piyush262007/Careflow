import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { AppointmentData } from '../../services/appointmentService';
import { appointmentService } from '../../services/appointmentService';
import type { PrescriptionItem } from '../../services/prescriptionService';
import { prescriptionService } from '../../services/prescriptionService';
import type { PatientResponseData } from '../../services/patientService';
import { patientService } from '../../services/patientService';
import {
  Stethoscope,
  User,
  Calendar,
  Clock,
  FileText,
  Pill,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Activity,
  ShieldAlert,
} from 'lucide-react';

export const DoctorConsultationPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [patient, setPatient] = useState<PatientResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [forbiddenError, setForbiddenError] = useState<boolean>(false);

  // Consultation Notes State
  const [symptoms, setSymptoms] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string>('');
  const [followUpInstructions, setFollowUpInstructions] = useState<string>('');

  // Prescription Medicines State
  const [medicines, setMedicines] = useState<PrescriptionItem[]>([
    { medicineName: '', dosage: '', frequency: '2 times/day', timing: 'After food', durationDays: 5, instructions: '' },
  ]);

  const loadConsultationData = async () => {
    if (!appointmentId) return;
    setLoading(true);
    setErrorMsg(null);
    setForbiddenError(false);

    try {
      const apptRes = await appointmentService.getAppointmentById(Number(appointmentId));
      if (apptRes.success && apptRes.data) {
        setAppointment(apptRes.data);
        setSymptoms(apptRes.data.symptoms || '');

        // Fetch patient details if patientId is present
        if (apptRes.data.patientId) {
          try {
            const ptRes = await patientService.getPatientById(apptRes.data.patientId);
            if (ptRes.success && ptRes.data) {
              setPatient(ptRes.data);
            }
          } catch (ptErr) {
            console.warn('Patient detail fetch info:', ptErr);
          }
        }
      } else {
        setErrorMsg(apptRes.message || 'Failed to load appointment details');
      }
    } catch (err: any) {
      console.error('Consultation load error:', err);
      if (err?.response?.status === 403) {
        setForbiddenError(true);
      } else {
        setErrorMsg(err?.response?.data?.message || err.message || 'Access denied or appointment not found');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultationData();
  }, [appointmentId]);

  const handleStartConsultation = async () => {
    if (!appointmentId) return;
    try {
      const res = await appointmentService.startConsultation(Number(appointmentId));
      if (res.success && res.data) {
        setAppointment(res.data);
        setSuccessMsg('Consultation started. Status updated to In Consultation.');
      }
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || 'Failed to start consultation.');
    }
  };

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      { medicineName: '', dosage: '', frequency: '2 times/day', timing: 'After food', durationDays: 5, instructions: '' },
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    if (medicines.length === 1) {
      setErrorMsg('Prescription must contain at least one medicine item.');
      return;
    }
    setMedicines(medicines.filter((_: PrescriptionItem, i: number) => i !== index));
  };

  const handleMedicineChange = (index: number, field: keyof PrescriptionItem, value: any) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const validatePrescriptionForm = (): boolean => {
    if (!diagnosis.trim()) {
      setErrorMsg('Clinical Diagnosis is required before completing the consultation.');
      return false;
    }

    if (medicines.length === 0) {
      setErrorMsg('At least one medicine is required in the prescription.');
      return false;
    }

    for (let i = 0; i < medicines.length; i++) {
      const item = medicines[i];
      if (!item.medicineName.trim()) {
        setErrorMsg(`Medicine Name is required for item #${i + 1}.`);
        return false;
      }
      if (!item.dosage.trim()) {
        setErrorMsg(`Dosage is required for ${item.medicineName || `item #${i + 1}`}.`);
        return false;
      }
      if (!item.frequency.trim()) {
        setErrorMsg(`Frequency is required for ${item.medicineName}.`);
        return false;
      }
      if (!item.durationDays || item.durationDays < 1) {
        setErrorMsg(`Valid duration (at least 1 day) is required for ${item.medicineName}.`);
        return false;
      }
    }

    return true;
  };

  const handleCompleteConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentId) return;
    setErrorMsg(null);

    if (!validatePrescriptionForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        appointmentId: Number(appointmentId),
        symptoms,
        diagnosis,
        notes,
        recommendations,
        followUpInstructions,
        items: medicines.map((m: PrescriptionItem) => ({
          medicineName: m.medicineName.trim(),
          dosage: m.dosage.trim(),
          frequency: m.frequency.trim(),
          timing: m.timing || 'After food',
          durationDays: Number(m.durationDays),
          instructions: m.instructions?.trim(),
        })),
      };

      const res = await prescriptionService.createPrescription(payload);
      if (res.success) {
        setSuccessMsg('Consultation completed and digital prescription saved to database!');
        setTimeout(() => {
          navigate('/doctor/dashboard');
        }, 1500);
      } else {
        setErrorMsg(res.message || 'Failed to save prescription.');
      }
    } catch (err: any) {
      console.error('Prescription save error:', err);
      if (err?.response?.status === 403) {
        setErrorMsg('Forbidden: You are not authorized to complete a consultation for this appointment.');
      } else {
        setErrorMsg(err?.response?.data?.message || err.message || 'Failed to complete consultation');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 text-[var(--text-primary)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-[var(--text-muted)]">Loading clinical consultation workspace...</p>
        </div>
      </div>
    );
  }

  if (forbiddenError) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 text-[var(--text-primary)]">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[var(--bg-surface)] border border-rose-500/30 text-center space-y-4 shadow-xl">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-heading font-bold text-rose-600 dark:text-rose-400">403 Forbidden Access</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            You are not authorized to access or manage this appointment consultation. Backend security policies restrict consultation access exclusively to the assigned doctor.
          </p>
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Doctor Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (errorMsg && !appointment) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 text-[var(--text-primary)]">
        <div className="max-w-md w-full p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <p className="text-sm font-bold text-[var(--text-primary)]">{errorMsg}</p>
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="p-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-bg)] text-[var(--text-secondary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">Clinical Consultation Workspace</h1>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Appointment #{appointment?.id} • {appointment?.patientName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {appointment?.status !== 'COMPLETED' && appointment?.status !== 'IN_CONSULTATION' && (
            <button
              onClick={handleStartConsultation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              Start Consultation
            </button>
          )}

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              appointment?.status === 'COMPLETED'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : appointment?.status === 'IN_CONSULTATION'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
            }`}
          >
            {appointment?.status}
          </span>
        </div>
      </div>

      {/* Notifications / Feedback Banners */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Clinical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient & Appointment Dossier */}
        <div className="space-y-6">
          {/* Patient Card */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
              <User className="w-4 h-4" />
              <span>Patient Information</span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <p className="text-base font-extrabold text-[var(--text-primary)]">{patient?.fullName || appointment?.patientName}</p>
                <p className="text-xs text-[var(--text-muted)]">{patient?.email || 'Email registered in CareFlow'}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[var(--border-subtle)]">
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Gender</span>
                  <span className="font-bold text-[var(--text-primary)]">{patient?.gender || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Blood Group</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{patient?.bloodGroup || 'O+'}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Height / Weight</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {patient?.height ? `${patient.height} cm` : '172 cm'} / {patient?.weight ? `${patient.weight} kg` : '68 kg'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Phone</span>
                  <span className="font-bold text-[var(--text-primary)]">{patient?.phone || '+1 (555) 234-5678'}</span>
                </div>
              </div>

              {patient?.allergies && (
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] font-bold text-rose-500 block">Allergies & Contraindications:</span>
                  <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">{patient.allergies}</p>
                </div>
              )}

              {patient?.medicalHistory && (
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] font-bold text-[var(--text-muted)] block">Relevant Medical History:</span>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{patient.medicalHistory}</p>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Metadata Card */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Appointment Info</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Date & Time</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {appointment?.appointmentDate} at {appointment?.appointmentTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Hospital</span>
                <span className="font-bold text-[var(--text-primary)]">{appointment?.hospitalName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Consultation Fee</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">${appointment?.consultationFee}</span>
              </div>
              {appointment?.symptoms && (
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] text-[var(--text-muted)] block">Reported Symptoms:</span>
                  <p className="text-xs text-[var(--text-primary)] font-semibold mt-0.5">{appointment.symptoms}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Structured Clinical Notes & Prescription Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleCompleteConsultation} className="space-y-6">
            {/* Consultation Notes Section */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Clinical Notes & Diagnosis</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                    Symptoms <span className="text-[var(--text-muted)] font-normal">(Confirmed by doctor)</span>
                  </label>
                  <input
                    type="text"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g. Mild fever, persistent dry cough for 3 days, fatigue"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                    Clinical Diagnosis <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="e.g. Acute Viral Bronchitis / Seasonal Respiratory Infection"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">Clinical Observations & Notes</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Throat slightly inflamed. Chest clear on auscultation."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">Recommendations & Advice</label>
                    <textarea
                      rows={3}
                      value={recommendations}
                      onChange={(e) => setRecommendations(e.target.value)}
                      placeholder="e.g. Increased fluid intake, steam inhalation 2x daily, complete bed rest."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">Follow-up Instructions</label>
                  <input
                    type="text"
                    value={followUpInstructions}
                    onChange={(e) => setFollowUpInstructions(e.target.value)}
                    placeholder="e.g. Follow-up in 5 days if fever persists or symptoms worsen."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Digital Prescription Section */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                  <Pill className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Digital Rx Prescription</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Medicine
                </button>
              </div>

              <div className="space-y-4">
                {medicines.map((med: PrescriptionItem, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">Medicine #{idx + 1}</span>
                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(idx)}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Remove Medicine"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[var(--text-secondary)] mb-1">
                          Medicine Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={med.medicineName}
                          onChange={(e) => handleMedicineChange(idx, 'medicineName', e.target.value)}
                          placeholder="e.g. Paracetamol"
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--text-secondary)] mb-1">
                          Dosage <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={med.dosage}
                          onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                          placeholder="e.g. 500 mg"
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--text-secondary)] mb-1">
                          Frequency <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={med.frequency}
                          onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                        >
                          <option value="1 time/day">1 time/day (Once daily)</option>
                          <option value="2 times/day">2 times/day (Twice daily)</option>
                          <option value="3 times/day">3 times/day (Three times daily)</option>
                          <option value="As needed">As needed (SOS)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--text-secondary)] mb-1">Timing</label>
                        <select
                          value={med.timing || 'After food'}
                          onChange={(e) => handleMedicineChange(idx, 'timing', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                        >
                          <option value="After food">After food</option>
                          <option value="Before food">Before food</option>
                          <option value="With food">With food</option>
                          <option value="At bedtime">At bedtime</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--text-secondary)] mb-1">
                          Duration (Days) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          min={1}
                          required
                          value={med.durationDays}
                          onChange={(e) => handleMedicineChange(idx, 'durationDays', Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[var(--text-secondary)] mb-1">Instructions / Notes</label>
                        <input
                          type="text"
                          value={med.instructions || ''}
                          onChange={(e) => handleMedicineChange(idx, 'instructions', e.target.value)}
                          placeholder="e.g. Drink plenty of water"
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
              <button
                type="button"
                onClick={() => navigate('/doctor/dashboard')}
                className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-card-bg)] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Prescription...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Prescription & Complete Consultation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultationPage;
