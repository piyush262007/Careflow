import React, { useState } from 'react';
import { UserCheck, Plus, Search, Eye, Edit3, Calendar } from 'lucide-react';
import type { DoctorAdminRecord } from '../../../services/mockAdminData';

interface DoctorManagementTableProps {
  doctors: DoctorAdminRecord[];
}

export const DoctorManagementTable: React.FC<DoctorManagementTableProps> = ({ doctors: initialDoctors }) => {
  const [doctors, setDoctors] = useState<DoctorAdminRecord[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [hospital, setHospital] = useState('CareFlow Medical Center');

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newDoc: DoctorAdminRecord = {
      id: `doc-${Date.now()}`,
      name: name.startsWith('Dr.') ? name : `Dr. ${name}`,
      specialty: specialty || 'General Medicine',
      hospital,
      availability: 'Available',
      todaysAppointments: 8,
      status: 'Available',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    };
    setDoctors([newDoc, ...doctors]);
    setName('');
    setSpecialty('');
    setShowAddModal(false);
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: DoctorAdminRecord['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'In Consultation':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'On Break':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Offline':
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            Doctor Roster & Availability
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Manage physician credentials, active schedules, and consultation status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <th className="py-3 px-3">Doctor</th>
              <th className="py-3 px-3">Specialty</th>
              <th className="py-3 px-3">Hospital</th>
              <th className="py-3 px-3 text-center">Today's Appts</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
            {filteredDoctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-[var(--bg-card-bg)]/50 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-9 h-9 rounded-xl object-cover border border-[var(--border-color)]"
                    />
                    <div>
                      <span className="font-bold text-[var(--text-primary)] block">{doc.name}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">ID: {doc.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-[var(--text-secondary)]">{doc.specialty}</td>
                <td className="py-3 px-3 text-[var(--text-secondary)]">{doc.hospital}</td>
                <td className="py-3 px-3 text-center font-bold text-[var(--text-primary)]">
                  {doc.todaysAppointments}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${getStatusBadge(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      title="View Details"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Edit Profile"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Manage Schedule"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">Register New Doctor</h3>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Amanda Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Specialty</label>
                <input
                  type="text"
                  placeholder="e.g. Pediatrics"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Assigned Hospital</label>
                <select
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                >
                  <option value="CareFlow Medical Center">CareFlow Medical Center</option>
                  <option value="City General Hospital">City General Hospital</option>
                  <option value="St. Jude Central Clinic">St. Jude Central Clinic</option>
                  <option value="Metro Emergency Care">Metro Emergency Care</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-bg)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  Register Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
