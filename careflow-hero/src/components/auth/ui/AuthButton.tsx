import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  icon: Icon,
  fullWidth = true,
  children,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 border border-white/20 hover:shadow-emerald-500/40 hover:scale-[1.01]',
    secondary:
      'flow-glass text-[var(--text-primary)] hover:border-emerald-500/40 hover:bg-[var(--bg-item-hover)] hover:scale-[1.01]',
    outline:
      'border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:border-emerald-500/40 hover:bg-slate-500/5',
  };

  const widthStyle = fullWidth ? 'w-full py-3.5 px-5' : 'py-2.5 px-4';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${
        disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
    >
      {/* Specular Glare Overlays for Primary Variant */}
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
};
