import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { HealthRecordData } from '../../services/healthRecordService';
import { healthRecordService } from '../../services/healthRecordService';
import {
  FileText,
  Upload,
  Calendar,
  Pill,
  Download,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldAlert,
  Activity,
  FileCheck,
} from 'lucide-react';

export const PatientRecordsPage: React.FC = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const navigate = useNavigate();

  const [records, setRecords] = useState<HealthRecordData[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecordData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [forbiddenError, setForbiddenError] = useState<boolean>(false);

  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadDescription, setUploadDescription] = useState<string>('');
  const [uploadType, setUploadType] = useState<string>('LAB_REPORT');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchRecords = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await healthRecordService.getPatientHealthRecords();
      if (res.success && Array.isArray(res.data)) {
        setRecords(res.data);
      } else {
        setRecords([]);
      }
    } catch (err: any) {
      console.error('Fetch health records error:', err);
      setErrorMsg(err?.response?.data?.message || err.message || 'Failed to fetch health records.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleRecord = async (id: number) => {
    setLoading(true);
    setErrorMsg(null);
    setForbiddenError(false);
    try {
      const res = await healthRecordService.getHealthRecordById(id);
      if (res.success && res.data) {
        setSelectedRecord(res.data);
      } else {
        setErrorMsg(res.message || 'Health record not found');
      }
    } catch (err: any) {
      console.error('Fetch single record error:', err);
      if (err?.response?.status === 403) {
        setForbiddenError(true);
      } else {
        setErrorMsg(err?.response?.data?.message || err.message || 'Failed to access health record.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recordId) {
      fetchSingleRecord(Number(recordId));
    } else {
      fetchRecords();
    }
  }, [recordId]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadFile) {
      setErrorMsg('Please provide a title and select a valid document file (JPEG, PNG, WEBP).');
      return;
    }

    setUploading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('title', uploadTitle.trim());
      formData.append('description', uploadDescription.trim());
      formData.append('recordType', uploadType);

      const res = await healthRecordService.uploadHealthRecord(formData);
      if (res.success) {
        setSuccessMsg('Medical document uploaded successfully!');
        setIsUploadOpen(false);
        setUploadTitle('');
        setUploadDescription('');
        setUploadFile(null);
        fetchRecords();
      } else {
        setErrorMsg(res.message || 'Upload failed.');
      }
    } catch (err: any) {
      console.error('Record upload error:', err);
      setErrorMsg(err?.response?.data?.message || err.message || 'Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  if (forbiddenError) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[var(--bg-surface)] border border-rose-500/30 text-center space-y-4 shadow-xl">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-heading font-bold text-rose-600 dark:text-rose-400">403 Forbidden Access</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            You don't have permission to view this medical record. Backend authorization policies strictly prevent cross-patient record access.
          </p>
          <button
            onClick={() => navigate('/patient/records')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all cursor-pointer"
          >
            Return to My Health Records
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">Personal Health Records (EHR)</h1>
            <p className="text-xs text-[var(--text-muted)] font-medium">Verified medical history, consultation summaries, prescriptions & lab reports</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/15 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload Medical Report
          </button>

          <button
            onClick={fetchRecords}
            className="p-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-bg)] text-[var(--text-secondary)] transition-colors cursor-pointer"
            title="Refresh Records"
          >
            <Activity className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      </div>

      {/* Notifications */}
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

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-xs font-bold text-[var(--text-muted)]">Loading health records...</p>
        </div>
      ) : records.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
          <FileCheck className="w-12 h-12 text-[var(--text-muted)] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">No Health Records Found</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            Your completed consultations, digital prescriptions, and uploaded medical reports will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {rec.recordType || 'MEDICAL_RECORD'}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {rec.uploadedAt ? new Date(rec.uploadedAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-[var(--text-primary)] line-clamp-1">{rec.title}</h3>
                  {rec.description && (
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1">{rec.description}</p>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)] text-xs">
                  {rec.doctorName && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Attending Doctor</span>
                      <span className="font-bold text-[var(--text-primary)]">{rec.doctorName}</span>
                    </div>
                  )}
                  {rec.hospitalName && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Hospital</span>
                      <span className="font-bold text-[var(--text-primary)]">{rec.hospitalName}</span>
                    </div>
                  )}
                  {rec.fileName && (
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-[var(--text-muted)]">Attachment</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 truncate max-w-[140px]">{rec.fileName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setSelectedRecord(rec)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/15 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Full Record Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-3xl border border-[var(--border-color)] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
                <FileText className="w-4 h-4" />
                <span>EHR Medical Record #{selectedRecord.id}</span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {selectedRecord.recordType}
                </span>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)] mt-1.5">{selectedRecord.title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs">
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Doctor</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedRecord.doctorName || 'General Practitioner'}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Hospital</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedRecord.hospitalName || 'CareFlow Medical Center'}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Date</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedRecord.uploadedAt ? new Date(selectedRecord.uploadedAt).toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Patient</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedRecord.patientName}</span>
                </div>
              </div>

              {selectedRecord.description && (
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-[var(--text-muted)] block">Summary / Description:</span>
                  <p className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium">
                    {selectedRecord.description}
                  </p>
                </div>
              )}

              {/* Linked Prescription Details if available */}
              {selectedRecord.prescription && (
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-extrabold text-emerald-600 dark:text-emerald-400">
                    <Pill className="w-4 h-4" />
                    <span>Prescription Details</span>
                  </div>

                  <div>
                    <span className="font-bold text-[var(--text-muted)] block">Diagnosis:</span>
                    <p className="font-extrabold text-[var(--text-primary)] mt-0.5">{selectedRecord.prescription.diagnosis}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-[var(--text-muted)] block">Prescribed Medicines:</span>
                    <div className="space-y-1">
                      {selectedRecord.prescription.items?.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
                          <span className="font-bold text-[var(--text-primary)]">{item.medicineName} ({item.dosage})</span>
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{item.frequency} for {item.durationDays} days</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedRecord.prescription.followUpInstructions && (
                    <div>
                      <span className="font-bold text-[var(--text-muted)] block">Follow-up:</span>
                      <p className="text-[var(--text-primary)] mt-0.5">{selectedRecord.prescription.followUpInstructions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Attachment Download */}
              {selectedRecord.fileUrl && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-bold text-[var(--text-primary)] truncate">{selectedRecord.fileName}</span>
                  </div>

                  <a
                    href={`http://localhost:8080/api/v1${selectedRecord.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Document Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-3xl border border-[var(--border-color)] shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
                <Upload className="w-4 h-4" />
                <span>Upload Medical Report</span>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Document Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Blood Test Results - Sept 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">Record Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                >
                  <option value="LAB_REPORT">Lab Report</option>
                  <option value="X_RAY_SCAN">X-Ray / MRI Scan</option>
                  <option value="DISCHARGE_SUMMARY">Discharge Summary</option>
                  <option value="VACCINATION_RECORD">Vaccination Record</option>
                  <option value="OTHER">Other Medical Document</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="e.g. Fasting blood glucose and lipid panel results"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Select File (JPEG, PNG, WEBP, max 5MB) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="file"
                  required
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] font-bold hover:bg-[var(--bg-card-bg)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold shadow-md cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecordsPage;
