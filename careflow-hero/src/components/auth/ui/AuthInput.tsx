import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  helperText?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  icon: Icon,
  type = 'text',
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `auth-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label htmlFor={inputId} className="text-xs font-semibold text-[var(--text-secondary)] flex items-center justify-between">
        <span>{label}</span>
        {helperText && <span className="text-[10.5px] text-[var(--text-muted)] font-normal">{helperText}</span>}
      </label>

      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-[var(--text-muted)] flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
        )}

        <input
          id={inputId}
          type={effectiveType}
          className={`w-full rounded-xl border bg-[var(--bg-card-bg)] py-3 text-sm text-[var(--text-primary)] backdrop-blur-md placeholder:text-[var(--text-muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
            Icon ? 'pl-10' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} ${
            error
              ? 'border-rose-500/60 focus:border-rose-500'
              : 'border-[var(--border-color)] hover:border-blue-500/40 focus:border-blue-500'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 rounded-md cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error && <span className="text-[11px] font-medium text-rose-500 mt-0.5">{error}</span>}
    </div>
  );
};
