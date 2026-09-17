import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { mockAuthService } from '../../../services/mockAuthService';
import type { UserRole } from '../../../services/mockAuthService';
import { AuthInput } from '../ui/AuthInput';
import { AuthButton } from '../ui/AuthButton';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('patient@careflow.demo');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const demoAccounts = mockAuthService.getDemoAccounts();

  const handleSelectDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  const handleLoginSuccessRedirect = (role: UserRole) => {
    // Check if user was redirected from a protected route
    const fromPath = (location.state as any)?.from?.pathname;
    if (fromPath) {
      navigate(fromPath, { replace: true });
      return;
    }

    switch (role) {
      case 'PATIENT':
        navigate('/patient/dashboard', { replace: true });
        break;
      case 'DOCTOR':
        navigate('/doctor/dashboard', { replace: true });
        break;
      case 'ADMIN':
        navigate('/admin/dashboard', { replace: true });
        break;
      default:
        navigate('/patient/dashboard', { replace: true });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const loggedUser = await login(email, password);
      handleLoginSuccessRedirect(loggedUser.role);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between space-y-5">
      {/* Top Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-3 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to CareFlow</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
            Sign In
          </h1>
          <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            CareFlow OS
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Welcome back! Access your healthcare workspace portal.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs flex items-center gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}

      {/* Demo Account Quick Selector */}
      <div className="p-3.5 rounded-2xl bg-[var(--bg-card-bg)] border border-emerald-500/25 space-y-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-extrabold uppercase tracking-wider text-emerald-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Demo Accounts
          </span>
          <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
            DEV MODE
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {demoAccounts.map((acc) => {
            const isSelected = email === acc.email;
            return (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleSelectDemoAccount(acc.email, acc.password)}
                className={`py-2 px-2 rounded-xl text-[10.5px] font-bold transition-all cursor-pointer border flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-emerald-500/40'
                }`}
              >
                <span>{acc.label}</span>
                <span className="text-[9px] opacity-75 font-mono">({acc.role})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="email@careflow.demo"
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

        <AuthButton type="submit" variant="primary" isLoading={isLoading} icon={LogIn}>
          Sign In to Workspace
        </AuthButton>
      </form>

      {/* Bottom Switcher */}
      <div className="text-center pt-3 border-t border-[var(--border-subtle)]">
        <span className="text-xs text-[var(--text-muted)]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer ml-1"
          >
            Create Account
          </button>
        </span>
      </div>
    </div>
  );
};
