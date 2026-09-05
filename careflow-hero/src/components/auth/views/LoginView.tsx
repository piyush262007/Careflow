import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthInput } from '../ui/AuthInput';
import { AuthButton } from '../ui/AuthButton';
import { AuthGoogleButton } from '../ui/AuthGoogleButton';

export const LoginView: React.FC = () => {
  const { setActiveView, loginApi } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('patient@careflow.com');
  const [password, setPassword] = useState('password');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await loginApi('patient@careflow.com', 'password');
      setIsSuccess(true);
      setTimeout(() => navigate('/patient'), 600);
    } catch (err: any) {
      setErrorMessage(err.message || 'Google SSO login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await loginApi(email, password);
      setIsSuccess(true);
      setTimeout(() => {
        if (email.includes('doctor')) navigate('/doctor');
        else if (email.includes('admin') || email.includes('hospital')) navigate('/hospitals');
        else navigate('/patient');
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Header & Back Button */}
      <div>
        <button
          onClick={() => {
            setActiveView('welcome');
            navigate('/welcome');
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)] mb-1">
          Sign In
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Welcome back! Access your CareFlow healthcare workspace.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-[var(--bg-surface)] text-center space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Signed In Successfully</h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Opening your <strong className="capitalize text-emerald-600 dark:text-emerald-400">CareFlow Dashboard</strong>...
          </p>
          <AuthButton
            variant="secondary"
            onClick={() => navigate('/patient')}
          >
            Go to Dashboard
          </AuthButton>
        </div>
      ) : (
        <div className="space-y-3.5">
          <AuthGoogleButton onClick={handleGoogleSignIn} label="Continue with Demo Patient" />

          <div className="relative flex items-center justify-center my-2">
            <div className="w-full border-t border-[var(--border-color)]" />
            <span className="absolute bg-[var(--bg-surface)] px-2.5 text-[10.5px] text-[var(--text-muted)] uppercase tracking-wider">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <AuthInput
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="patient@careflow.com"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border-color)] text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setActiveView('forgot-password');
                  navigate('/forgot-password');
                }}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <AuthButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
              icon={LogIn}
            >
              Sign In
            </AuthButton>
          </form>
        </div>
      )}

      <div className="text-center pt-2 border-t border-[var(--border-subtle)]">
        <span className="text-xs text-[var(--text-muted)]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => {
              setActiveView('register');
              navigate('/register');
            }}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Create Account
          </button>
        </span>
      </div>
    </div>
  );
};
