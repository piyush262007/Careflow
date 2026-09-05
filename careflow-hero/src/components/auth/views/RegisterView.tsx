import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import type { UserRole } from '../../../context/AuthContext';
import { AuthInput } from '../ui/AuthInput';
import { AuthButton } from '../ui/AuthButton';
import { AuthGoogleButton } from '../ui/AuthGoogleButton';

export const RegisterView: React.FC = () => {
  const { selectedRole, setSelectedRole, setActiveView, registerApi } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await registerApi('Demo Patient', `patient-${Date.now()}@careflow.com`, 'password');
      setIsSuccess(true);
      setTimeout(() => navigate('/patient'), 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google SSO Sign Up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!agreedTerms) {
      setErrorMsg('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);

    try {
      await registerApi(fullName, email, password);
      setIsSuccess(true);
      setTimeout(() => navigate('/patient'), 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Header */}
      <div>
        <button
          onClick={() => {
            setActiveView('role-selection');
            navigate('/role-selection');
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Change Role</span>
        </button>

        <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Create Account
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Join CareFlow and experience calm, connected healthcare.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-[var(--bg-surface)] text-center space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Account Successfully Created</h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Welcome to CareFlow, <strong className="text-[var(--text-primary)]">{fullName || 'Healthcare Leader'}</strong>!
          </p>
          <AuthButton variant="primary" onClick={() => navigate('/patient')}>
            Proceed to Dashboard
          </AuthButton>
        </div>
      ) : (
        <div className="space-y-3">
          <AuthGoogleButton onClick={handleGoogleSignUp} label="Sign up with Demo Account" />

          <div className="relative flex items-center justify-center my-1.5">
            <div className="w-full border-t border-[var(--border-color)]" />
            <span className="absolute bg-[var(--bg-surface)] px-2.5 text-[10.5px] text-[var(--text-muted)] uppercase tracking-wider">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[11px] font-semibold text-[var(--text-secondary)]">Role</label>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-color)]">
                {(['patient', 'doctor', 'hospital'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`flex-1 py-1 px-2 text-[10.5px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                      selectedRole === r
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
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
              placeholder="sarah.jenkins@careflow.health"
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

            <div className="flex items-start gap-2 pt-1 text-xs text-[var(--text-secondary)]">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[var(--border-color)] text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="terms" className="leading-snug cursor-pointer text-[11px]">
                I agree to CareFlow's{' '}
                <a href="#terms" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <AuthButton type="submit" variant="primary" isLoading={isLoading} icon={ArrowRight}>
              Create Account
            </AuthButton>
          </form>
        </div>
      )}

      <div className="text-center pt-2 border-t border-[var(--border-subtle)]">
        <span className="text-xs text-[var(--text-muted)]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => {
              setActiveView('login');
              navigate('/login');
            }}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
};
