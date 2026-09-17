import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, ArrowRight, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthInput } from '../ui/AuthInput';
import { AuthButton } from '../ui/AuthButton';

export const RegisterView: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password entry.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const newUser = await register(fullName, email, password, selectedRole);
      if (newUser.role === 'DOCTOR') {
        navigate('/doctor/dashboard', { replace: true });
      } else {
        navigate('/patient/dashboard', { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Email may already be registered.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Top Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-3 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </button>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] mb-1">
          Create Account
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Join CareFlow for calm, intelligent, connected healthcare navigation.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs flex items-center gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}

      {/* Role Selection Tabs */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[11.5px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            Select Account Role
          </label>

          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => setSelectedRole('PATIENT')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedRole === 'PATIENT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>Patient</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('DOCTOR')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedRole === 'DOCTOR'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>Doctor</span>
            </button>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] italic">
            * Note: System Admin accounts are restricted and managed internally.
          </p>
        </div>

        <AuthInput
          label="Full Name"
          icon={UserIcon}
          type="text"
          placeholder="Sarah Jenkins"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="sarah.jenkins@careflow.demo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          label="Password"
          icon={Lock}
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <AuthInput
          label="Confirm Password"
          icon={Lock}
          type="password"
          placeholder="••••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <AuthButton type="submit" variant="primary" isLoading={isLoading} icon={ArrowRight}>
          Complete Registration
        </AuthButton>
      </form>

      {/* Bottom Switcher */}
      <div className="text-center pt-3 border-t border-[var(--border-subtle)]">
        <span className="text-xs text-[var(--text-muted)]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer ml-1"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
};
