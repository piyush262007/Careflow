import React, { useState } from 'react';
import { Users, Search, Eye, Edit3, FileText, Filter } from 'lucide-react';
import type { PatientAdminRecord } from '../../../services/mockAdminData';

interface PatientManagementTableProps {
  patients: PatientAdminRecord[];
}

export const PatientManagementTable: React.FC<PatientManagementTableProps> = ({ patients: initialPatients }) => {
  const [patients] = useState<PatientAdminRecord[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Patient Registry
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Central database of registered CareFlow patients and visit histories
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Filter by name or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Filter Pill */}
          <div className="flex items-center gap-1 bg-[var(--bg-card-bg)] border border-[var(--border-color)] p-1 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-[var(--text-muted)] ml-1" />
            {(['All', 'Active', 'Inactive'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  statusFilter === filter
                    ? 'bg-purple-600 text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <th className="py-3 px-3">Patient</th>
              <th className="py-3 px-3 text-center">Age</th>
              <th className="py-3 px-3">Last Visit</th>
              <th className="py-3 px-3">Upcoming Appointment</th>
              <th className="py-3 px-3">Assigned Doctor</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-[var(--bg-card-bg)]/50 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-9 h-9 rounded-xl object-cover border border-[var(--border-color)]"
                    />
                    <div>
                      <span className="font-bold text-[var(--text-primary)] block">{patient.name}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">ID: {patient.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-center font-semibold text-[var(--text-secondary)]">
                  {patient.age}
                </td>
                <td className="py-3 px-3 text-[var(--text-secondary)]">{patient.lastVisit}</td>
                <td className="py-3 px-3 font-semibold text-purple-600 dark:text-purple-400">
                  {patient.upcomingAppointment}
                </td>
                <td className="py-3 px-3 text-[var(--text-secondary)]">{patient.assignedDoctor}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      patient.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      title="View Profile"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Edit Patient"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="View Health Records"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
