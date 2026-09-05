import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Building2, Download, Heart, ShieldCheck } from 'lucide-react';
import type { Hospital } from './HospitalStep';
import type { Department } from './DepartmentStep';
import type { Doctor } from './DoctorStep';
import type { DateOption, TimeSlotOption } from './TimeStep';
import { AuthButton } from '../../auth/ui/AuthButton';

interface ConfirmationStepProps {
  hospital: Hospital;
  department: Department;
  doctor: Doctor;
  date: DateOption;
  timeSlot: TimeSlotOption;
  onFinish: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  hospital,
  department,
  doctor,
  date,
  timeSlot,
  onFinish,
}) => {
  const [isAddedToCalendar, setIsAddedToCalendar] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const appointmentId = 'CF-849201';
  const patientName = 'Sarah Jenkins';
  const consultationFee = '₹2,000';
  const bookingStatus = 'Confirmed by Hospital';
  const emergencyContact = '1-800-CAREFLOW / (555) 911-CARE';

  // Function to handle generating and downloading printable PDF appointment pass
  const handleDownloadPass = () => {
    setIsDownloading(true);

    const passData = {
      appointmentId,
      patientName,
      hospital: hospital.name,
      doctor: doctor.name,
      department: department.name,
      date: date.fullDate,
      time: timeSlot.time,
      fee: consultationFee,
      status: bookingStatus,
      emergencyContact,
    };

    // Construct printable HTML document with embedded styling & printable pass layout
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popup windows to download your Appointment Pass.');
      setIsDownloading(false);
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CareFlow Appointment Pass — ${appointmentId}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f8fafc;
              color: #0f172a;
              margin: 0;
              padding: 40px 20px;
              display: flex;
              justify-content: center;
            }
            .pass-card {
              max-width: 600px;
              width: 100%;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 20px;
              padding: 32px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 20px;
              margin-bottom: 24px;
            }
            .logo {
              font-size: 22px;
              font-weight: 800;
              color: #22c55e;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .status-badge {
              background: #dcfce7;
              color: #15803d;
              font-size: 11px;
              font-weight: 700;
              padding: 6px 14px;
              border-radius: 20px;
              border: 1px solid #bbf7d0;
              text-transform: uppercase;
            }
            .verified-tag {
              background: #eff6ff;
              color: #1d4ed8;
              font-size: 10px;
              font-weight: 700;
              padding: 4px 10px;
              border-radius: 12px;
              display: inline-block;
              margin-bottom: 12px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 24px;
            }
            .field {
              background: #f8fafc;
              padding: 14px;
              border-radius: 12px;
              border: 1px solid #f1f5f9;
            }
            .label {
              font-size: 10px;
              text-transform: uppercase;
              color: #64748b;
              font-weight: 700;
              margin-bottom: 4px;
            }
            .value {
              font-size: 13px;
              font-weight: 700;
              color: #0f172a;
            }
            .sub-value {
              font-size: 11px;
              color: #64748b;
            }
            .qr-section {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 20px;
              border-radius: 16px;
              margin-top: 20px;
            }
            .qr-box {
              background: white;
              padding: 10px;
              border-radius: 12px;
              border: 1px solid #cbd5e1;
            }
            .footer {
              margin-top: 28px;
              padding-top: 16px;
              border-top: 1px solid #e2e8f0;
              font-size: 11px;
              color: #64748b;
              display: flex;
              justify-content: space-between;
            }
            @media print {
              body { background: white; padding: 0; }
              .pass-card { box-shadow: none; border: 1px solid #ccc; }
            }
          </style>
        </head>
        <body>
          <div class="pass-card">
            <div class="header">
              <div class="logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                CareFlow
              </div>
              <div class="status-badge">${bookingStatus}</div>
            </div>

            <div class="verified-tag">VERIFIED APPOINTMENT</div>

            <div class="grid">
              <div class="field">
                <div class="label">Patient Name</div>
                <div class="value">${passData.patientName}</div>
                <div class="sub-value">Booking ID: ${passData.appointmentId}</div>
              </div>
              <div class="field">
                <div class="label">Consultation Fee</div>
                <div class="value" style="color:#16a34a">${passData.fee}</div>
                <div class="sub-value">Payment at Hospital Counter</div>
              </div>
              <div class="field">
                <div class="label">Healthcare Facility</div>
                <div class="value">${passData.hospital}</div>
                <div class="sub-value">${passData.department}</div>
              </div>
              <div class="field">
                <div class="label">Attending Doctor</div>
                <div class="value">${passData.doctor}</div>
                <div class="sub-value">${date.fullDate} at ${timeSlot.time}</div>
              </div>
            </div>

            <div class="qr-section">
              <div>
                <div style="font-weight:700; font-size:13px; color:#14532d">Digital Reception Check-In Pass</div>
                <div style="font-size:11px; color:#166534; margin-top:2px">Present QR code at automated hospital kiosk for instant queue entry.</div>
              </div>
              <div class="qr-box">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#0f172a">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h4v2h-4v-2zm-4 4h2v4h-2v-4zm4 2h4v2h-4v-2z"/>
                </svg>
              </div>
            </div>

            <div class="footer">
              <div><strong>Emergency Support:</strong> ${emergencyContact}</div>
              <div>© 2026 CareFlow Healthcare Technologies</div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setIsDownloading(false);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto text-center">
      {/* Success Badge Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2"
      >
        <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10 ring-4 ring-emerald-500/10">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
          Appointment Confirmed!
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Your doctor's appointment has been reserved. Booking reference pass Code: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{appointmentId}</strong>
        </p>
      </motion.div>

      {/* Movie-Ticket Style Digital Pass Card */}
      <div className="flow-glass rounded-3xl border border-emerald-500/30 p-6 text-left shadow-xl relative overflow-hidden space-y-4">
        {/* Top Rim Specular Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

        {/* Verified Appointment Pass Header & Hospital Confirmation Badge */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shadow-md">
              {doctor.avatarInitials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{doctor.name}</h3>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{doctor.specialty}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Verified Appointment
            </span>
            <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Confirmed by Hospital</span>
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs pt-1">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Facility & Dept</span>
            <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
              <Building2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{hospital.name}</span>
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] block pl-5">{department.name}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Date & Time</span>
            <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
              <Calendar className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span>{date.fullDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold pl-5">
              <Clock className="h-3 w-3" />
              <span>{timeSlot.time}</span>
            </div>
          </div>
        </div>

        {/* QR Code & Consultation Fee Bar */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Encoded QR Code Box */}
            <div className="p-1.5 rounded-lg bg-white text-slate-900 border shadow-sm">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h4v2h-4v-2zm-4 4h2v4h-2v-4zm4 2h4v2h-4v-2z" />
              </svg>
            </div>
            <div className="text-[10.5px] text-[var(--text-secondary)]">
              <span className="block font-bold text-[var(--text-primary)]">Scan at Hospital Reception</span>
              <span>Automated Queue Entry Pass</span>
            </div>
          </div>

          {/* Replaced Consultation Fee Label */}
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold">Consultation Fee</span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">₹2,000</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddedToCalendar(true)}
            className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAddedToCalendar
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-emerald-500/40'
            }`}
          >
            <Calendar className="h-4 w-4 text-emerald-500" />
            <span>{isAddedToCalendar ? 'Added to Calendar' : 'Add to Calendar'}</span>
          </button>

          {/* Download Pass Action Button */}
          <button
            type="button"
            onClick={handleDownloadPass}
            disabled={isDownloading}
            className="py-3 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            <span>{isDownloading ? 'Generating PDF...' : 'Download Pass'}</span>
          </button>
        </div>

        <AuthButton variant="primary" icon={Heart} onClick={onFinish}>
          View in Today's Care Companion
        </AuthButton>
      </div>
    </div>
  );
};
