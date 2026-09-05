import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200';
      case 'error':
        return 'border-rose-500/30 bg-rose-950/80 text-rose-200';
      case 'info':
      default:
        return 'border-cyan-500/30 bg-cyan-950/80 text-cyan-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${getBorder()}`}
    >
      {getIcon()}
      <span className="text-sm font-medium pr-2">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors shrink-0"
      >
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>
    </motion.div>
  );
};
