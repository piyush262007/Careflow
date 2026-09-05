import React from 'react';
import { Heart, Calendar, Pill, FileText, Settings } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'today', label: "Today's Care", icon: Heart },
    { id: 'appointments', label: 'Appts', icon: Calendar },
    { id: 'prescriptions', label: 'Meds', icon: Pill },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-surface)] border-t border-[var(--border-color)] p-2 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
