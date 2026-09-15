import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  ShieldCheck,
  Edit3,
  Activity,
  Heart,
  AlertCircle,
  CreditCard,
  CheckCircle2,
  Upload,
  Save,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePatient } from '../../hooks/usePatient';
import { useNavigate } from 'react-router-dom';
import { CardSkeleton } from '../ui/SkeletonLoader';

export const PatientProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { profile: backendProfile, healthSummary, isLoading, updateProfile, uploadAvatar } = usePatient();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    if (backendProfile) {
      setPhone(backendProfile.phone || '+1 (555) 234-5678');
      setAllergies(backendProfile.allergies || 'Penicillin, Peanuts');
      setMedicalHistory(backendProfile.medicalHistory || 'Mild Asthma');
      setEmergencyContactName(backendProfile.emergencyContactName || 'David Jenkins');
      setEmergencyContactPhone(backendProfile.emergencyContactPhone || '+1 (555) 987-6543');
    }
  }, [backendProfile]);

  const profile = {
    name: backendProfile?.fullName || user?.name || 'Sarah Jenkins',
    patientId: backendProfile?.id ? `CF-${100000 + backendProfile.id}` : 'CF-849201',
    avatar: backendProfile?.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    age: healthSummary?.age ? `${healthSummary.age} Yrs` : '34 Yrs',
    gender: backendProfile?.gender || 'Female',
    bloodGroup: healthSummary?.bloodGroup || backendProfile?.bloodGroup || 'O+ Positive',
    phone: phone,
    email: backendProfile?.email || user?.email || 'sarah.jenkins@careflow.health',
    emergencyContactName: emergencyContactName,
    emergencyContactPhone: emergencyContactPhone,
    allergies: allergies.split(',').map((s) => s.trim()).filter(Boolean),
    chronicConditions: [medicalHistory || 'Mild Asthma'],
    currentMedications: ['Metoprolol 50mg', 'Atorvastatin 20mg'],
    organDonor: true,
    medicalNotes: 'Carries rescue asthma inhaler. No known latex allergy.',
  };

  const insurance = {
    provider: 'Blue Cross Blue Shield Health',
    policyNumber: 'POL-948201-X',
    groupNumber: 'GRP-4820',
    status: 'Active • Full Coverage',
    expiry: 'Dec 31, 2026',
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        phone,
        allergies,
        medicalHistory,
        emergencyContactName,
        emergencyContactPhone,
      });
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        await uploadAvatar(e.target.files[0]);
      } catch (err) {
        console.error('Failed to upload profile photo:', err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading && !backendProfile) {
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-8">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <User className="h-5 w-5" />
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
            Digital Health Profile
          </span>
        </div>
      </header>

      {/* Page Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Patient Profile Updated Successfully!</span>
          </div>
        )}

        {/* 1. PROFILE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-20 w-20 rounded-3xl object-cover border-2 border-emerald-500/30 shadow-md"
              />
              <label className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-[var(--bg-surface)] flex items-center justify-center text-white" title="Verified">
                <CheckCircle2 className="h-3 w-3" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Verified Patient</span>
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                CareFlow ID: {profile.patientId}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleSaveProfile();
              } else {
                setIsEditing(true);
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
          </button>
        </motion.div>

        {/* 2. PERSONAL INFORMATION */}
        <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
            <User className="h-4 w-4 text-emerald-500" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-0.5">
              <span className="text-[10.5px] uppercase font-semibold text-[var(--text-muted)]">Age & Gender</span>
              <p className="text-xs font-bold text-[var(--text-primary)]">{profile.age} • {profile.gender}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-0.5">
              <span className="text-[10.5px] uppercase font-semibold text-[var(--text-muted)]">Blood Group</span>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{profile.bloodGroup}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-0.5">
              <span className="text-[10.5px] uppercase font-semibold text-[var(--text-muted)]">Contact Phone</span>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-bold bg-[var(--bg-surface)] border border-emerald-500/30 rounded-lg p-1 text-[var(--text-primary)]"
                />
              ) : (
                <p className="text-xs font-bold text-[var(--text-primary)]">{profile.phone}</p>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-0.5">
              <span className="text-[10.5px] uppercase font-semibold text-[var(--text-muted)]">Email Address</span>
              <p className="text-xs font-bold text-[var(--text-primary)]">{profile.email}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-0.5 sm:col-span-2">
              <span className="text-[10.5px] uppercase font-semibold text-[var(--text-muted)]">Emergency Contact</span>
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    className="flex-1 text-xs font-bold bg-[var(--bg-surface)] border border-emerald-500/30 rounded-lg p-1 text-[var(--text-primary)]"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    className="flex-1 text-xs font-bold bg-[var(--bg-surface)] border border-emerald-500/30 rounded-lg p-1 text-[var(--text-primary)]"
                    placeholder="Phone"
                  />
                </div>
              ) : (
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  {profile.emergencyContactName} ({profile.emergencyContactPhone})
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 3. MEDICAL INFORMATION */}
        <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span>Medical Record & Conditions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-2">
              <span className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Known Allergies</span>
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full text-xs font-bold bg-[var(--bg-surface)] border border-emerald-500/30 rounded-lg p-1 text-[var(--text-primary)]"
                  placeholder="Penicillin, Peanuts"
                />
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.allergies.map((a, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-bold text-rose-400">
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] space-y-2">
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" />
                <span>Chronic Conditions</span>
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  className="w-full text-xs font-bold bg-[var(--bg-surface)] border border-emerald-500/30 rounded-lg p-1 text-[var(--text-primary)]"
                  placeholder="Mild Asthma"
                />
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.chronicConditions.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-500">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. HEALTH INSURANCE */}
        <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-500" />
            <span>Health Insurance Coverage</span>
          </h2>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[var(--bg-card-bg)] to-[var(--bg-surface)] border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{insurance.provider}</h3>
              <p className="text-xs text-[var(--text-secondary)]">Policy: {insurance.policyNumber} • Group: {insurance.groupNumber}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[10.5px] font-bold text-emerald-500 mt-1">
                {insurance.status}
              </span>
            </div>
            <span className="text-xs font-bold text-[var(--text-muted)]">Expires: {insurance.expiry}</span>
          </div>
        </section>

        {/* 5. LOG OUT */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-500 font-bold text-xs hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out of CareFlow Account</span>
          </button>
        </div>
      </main>
    </div>
  );
};
