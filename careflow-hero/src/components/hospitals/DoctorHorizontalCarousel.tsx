import React from 'react';
import { Star, Calendar, Clock, ChevronRight } from 'lucide-react';
import type { HospitalData } from './data/mockHospitals';

interface DoctorHorizontalCarouselProps {
  hospital: HospitalData;
  onBookDoctor: (doctorName: string, specialty: string) => void;
}

export const DoctorHorizontalCarousel: React.FC<DoctorHorizontalCarouselProps> = ({
  hospital,
  onBookDoctor,
}) => {
  const doctors = [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Chen',
      specialty: 'Senior Cardiologist',
      rating: '4.9',
      reviews: 142,
      nextSlot: 'Today, 2:30 PM',
      fee: '₹1,500',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'doc-2',
      name: 'Dr. Marcus Vance',
      specialty: 'Emergency Physician',
      rating: '4.8',
      reviews: 98,
      nextSlot: 'Today, 3:15 PM',
      fee: '₹1,200',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'doc-3',
      name: 'Dr. Elena Rostova',
      specialty: 'Pediatric Specialist',
      rating: '4.9',
      reviews: 184,
      nextSlot: 'Tomorrow, 10:00 AM',
      fee: '₹1,800',
      avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'doc-4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgeon',
      rating: '4.7',
      reviews: 86,
      nextSlot: 'Tomorrow, 11:30 AM',
      fee: '₹2,000',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
          <span>Available Doctors at {hospital.name.split(' ')[0]}</span>
        </h4>
        <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
          <span>Scroll</span>
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x snap-mandatory">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="w-56 shrink-0 snap-start p-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] space-y-2.5 hover:border-emerald-500/30 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={doc.avatar}
                alt={doc.name}
                className="h-10 w-10 rounded-xl object-cover border border-emerald-500/30 shrink-0"
              />
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {doc.name}
                </h5>
                <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold block truncate">
                  {doc.specialty}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mt-0.5">
                  <span className="flex items-center font-bold text-amber-500">
                    <Star className="h-2.5 w-2.5 fill-current mr-0.5" />
                    {doc.rating}
                  </span>
                  <span>({doc.reviews})</span>
                  <span>•</span>
                  <span className="font-bold text-[var(--text-primary)]">{doc.fee}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)] font-medium">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-emerald-500" />
                {doc.nextSlot}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onBookDoctor(doc.name, doc.specialty)}
              className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm cursor-pointer transition-all"
            >
              <Calendar className="h-3 w-3" />
              <span>Book Appointment</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
