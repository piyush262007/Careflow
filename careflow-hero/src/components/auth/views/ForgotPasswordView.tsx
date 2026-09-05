import React, { useState } from 'react';
import { Mail, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthInput } from '../ui/AuthInput';
import { AuthButton } from '../ui/AuthButton';

export const ForgotPasswordView: React.FC = () => {
  const { setActiveView } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleBack = () => {
    setActiveView('login');
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Header */}
      <div>
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Forgot Password
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Enter your registered email address and we'll send you a password reset link.
        </p>
      </div>

      {isSent ? (
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-[var(--bg-surface)] text-center space-y-4 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Reset Link Sent</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              We sent password recovery instructions to <strong className="text-emerald-600 dark:text-emerald-400">{email}</strong>. Please check your inbox.
            </p>
          </div>

          <AuthButton variant="primary" onClick={handleBack}>
            Return to Sign In
          </AuthButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Registered Email Address"
            icon={Mail}
            type="email"
            placeholder="sarah.jenkins@careflow.health"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AuthButton type="submit" variant="primary" isLoading={isLoading} icon={KeyRound}>
            Send Reset Link
          </AuthButton>
        </form>
      )}

      {/* Back to Login Footer */}
      <div className="text-center pt-2 border-t border-[var(--border-subtle)]">
        <span className="text-xs text-[var(--text-muted)]">
          Remembered your password?{' '}
          <button
            type="button"
            onClick={handleBack}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
};
