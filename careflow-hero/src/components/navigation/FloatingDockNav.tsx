import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Bot, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const FloatingDockNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isHospitalsActive = path === '/hospitals';
  const isTodayCareActive = path === '/today-care' || path === '/patient';
  const isCompanionActive = path === '/companion';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* 1. "Book Appointment" Button -> /hospitals */}
      <motion.button
        onClick={() => navigate('/hospitals')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flow-glass px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-2 text-xs font-bold transition-all backdrop-blur-2xl cursor-pointer ${
          isHospitalsActive
            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 ring-2 ring-emerald-500/40 shadow-emerald-500/20'
            : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50'
        }`}
        title="Go to Nearby Hospitals (/hospitals)"
      >
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-xl text-white shadow-md transition-transform ${
            isHospitalsActive
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 scale-105'
              : 'bg-gradient-to-tr from-emerald-600 to-teal-400'
          }`}
        >
          <Calendar className="h-4 w-4" />
        </div>
        <span>Book Appointment</span>
        {isHospitalsActive && (
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        )}
      </motion.button>

      {/* 2. "Today's Care" Button -> /today-care */}
      <motion.button
        onClick={() => navigate('/today-care')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flow-glass px-3.5 py-3 rounded-2xl border shadow-2xl flex items-center gap-2 text-xs font-bold transition-all backdrop-blur-2xl cursor-pointer ${
          isTodayCareActive
            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 ring-2 ring-emerald-500/40 shadow-emerald-500/20'
            : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50'
        }`}
        title="Go to Today's Care Companion (/today-care)"
      >
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-xl text-white shadow-md transition-transform ${
            isTodayCareActive
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 scale-105'
              : 'bg-gradient-to-tr from-emerald-600 to-teal-400'
          }`}
        >
          <Heart className="h-4 w-4" />
        </div>
        <span className="hidden sm:inline">Today's Care</span>
        {isTodayCareActive && (
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        )}
      </motion.button>

      {/* 3. AI / Companion Button -> /companion */}
      <motion.button
        onClick={() => navigate('/companion')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flow-glass px-3 py-3 rounded-2xl border shadow-2xl flex items-center gap-2 text-xs font-bold transition-all backdrop-blur-2xl cursor-pointer ${
          isCompanionActive
            ? 'bg-teal-500/20 border-teal-500 text-teal-600 dark:text-teal-300 ring-2 ring-teal-500/40 shadow-teal-500/20'
            : 'border-blue-500/30 text-blue-600 dark:text-blue-400 hover:border-teal-500/50'
        }`}
        title="Go to CareFlow AI Companion (/companion)"
      >
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-xl text-white shadow-md transition-transform ${
            isCompanionActive
              ? 'bg-gradient-to-tr from-teal-600 to-emerald-500 scale-105'
              : 'bg-gradient-to-tr from-blue-600 to-teal-400'
          }`}
        >
          <Bot className="h-4 w-4" />
        </div>
        <Sparkles className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
        {isCompanionActive && (
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};
