import React, { useState } from 'react';
import { Building2, Plus, MapPin, Eye, Edit3, Settings2 } from 'lucide-react';
import type { HospitalRecord } from '../../../services/mockAdminData';

interface HospitalManagementProps {
  hospitals: HospitalRecord[];
}

export const HospitalManagement: React.FC<HospitalManagementProps> = ({ hospitals: initialHospitals }) => {
  const [hospitals, setHospitals] = useState<HospitalRecord[]>(initialHospitals);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHospitalName, setNewHospitalName] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospitalName.trim()) return;
    const newRecord: HospitalRecord = {
      id: `hosp-${Date.now()}`,
      name: newHospitalName,
      location: newLocation || 'Central District',
      departmentsCount: 5,
      doctorsCount: 15,
      todaysAppointments: 45,
      currentQueue: 4,
      status: 'Operational',
    };
    setHospitals([newRecord, ...hospitals]);
    setNewHospitalName('');
    setNewLocation('');
    setShowAddModal(false);
  };

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: HospitalRecord['status']) => {
    switch (status) {
      case 'Operational':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Busy':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Limited':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'Offline':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
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
            <Building2 className="w-5 h-5 text-purple-600" />
            Hospital Network Management
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Monitor and configure care centers across the CareFlow system
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500 transition-colors"
          />

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Hospital
          </button>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((hosp) => (
          <div
            key={hosp.id}
            className="p-4 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] hover:border-purple-500/30 transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] font-heading">{hosp.name}</h3>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-purple-500" />
                  {hosp.location}
                </p>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${getStatusBadge(hosp.status)}`}>
                {hosp.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[var(--border-subtle)] text-center">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">Depts</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">{hosp.departmentsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">Doctors</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">{hosp.doctorsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">Appts Today</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">{hosp.todaysAppointments}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">Queue</span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">#{hosp.currentQueue}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
              <button
                title="View Facility"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </button>
              <button
                title="Edit Facility"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                title="Manage Operations"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Hospital Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">Add New Hospital Center</h3>
            <form onSubmit={handleAddHospital} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Hospital Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CareFlow Metro Clinic"
                  value={newHospitalName}
                  onChange={(e) => setNewHospitalName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Location / District</label>
                <input
                  type="text"
                  placeholder="e.g. Eastside Medical Hub"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                />
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
                  Save Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
