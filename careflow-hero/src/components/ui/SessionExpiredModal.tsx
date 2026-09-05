import React, { useEffect, useState } from 'react';
import { ShieldAlert, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const SessionExpiredModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleExpired = () => {
      setIsOpen(true);
    };

    window.addEventListener('careflow:session-expired', handleExpired);
    return () => {
      window.removeEventListener('careflow:session-expired', handleExpired);
    };
  }, []);

  const handleLoginRedirect = () => {
    setIsOpen(false);
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-emerald-950/90 p-6 shadow-2xl text-center space-y-4"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-bold text-white">Session Expired</h3>

          <p className="text-sm text-emerald-200/70">
            Your security session has expired. Please sign in again to access your digital health portal.
          </p>

          <button
            onClick={handleLoginRedirect}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-110 transition-all"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In to CareFlow</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
