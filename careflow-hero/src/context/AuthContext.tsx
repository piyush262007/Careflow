import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import type { UserResponse } from '../services/authService';

export type AuthView = 'welcome' | 'role-selection' | 'login' | 'register' | 'forgot-password';
export type UserRole = 'patient' | 'doctor' | 'hospital';

export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  workspaceName?: string;
}

interface AuthContextType {
  activeView: AuthView;
  setActiveView: (view: AuthView) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  loginApi: (email: string, password: string) => Promise<void>;
  registerApi: (fullName: string, email: string, password: string) => Promise<void>;
  login: (email?: string, role?: UserRole) => void;
  logout: () => void;
  loginDemoUser: (role: UserRole) => void;
  logoutUser: () => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function formatAuthError(err: any, fallbackMessage: string): string {
  if (!err.response) {
    return 'Unable to connect to CareFlow server. Please make sure the backend is running.';
  }
  const status = err.response.status;
  const backendMsg = err.response.data?.message;

  if (status === 400) {
    return backendMsg || 'Invalid registration details. Password must contain at least 8 characters, an uppercase letter, a number, and a special symbol.';
  }
  if (status === 401) {
    return 'Invalid email or password.';
  }
  if (status === 409) {
    return backendMsg || 'An account with this email address already exists.';
  }
  if (status >= 500) {
    return 'Something went wrong on the server. Please try again later.';
  }
  return backendMsg || fallbackMessage;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AuthView>('welcome');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mapBackendRole = (role?: string): UserRole => {
    if (role === 'DOCTOR') return 'doctor';
    if (role === 'ADMIN') return 'hospital';
    return 'patient';
  };

  const syncUserFromBackend = (backendUser: UserResponse) => {
    const roleMapped = mapBackendRole(backendUser.role);
    setUser({
      id: backendUser.id,
      name: backendUser.fullName,
      email: backendUser.email,
      role: roleMapped,
      workspaceName:
        roleMapped === 'patient'
          ? 'Patient Medical Workspace'
          : roleMapped === 'doctor'
          ? 'Doctor Clinical Suite'
          : 'CareFlow Command Center',
    });
    setSelectedRole(roleMapped);
    setIsAuthenticated(true);
  };

  // Check persistent session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('careflow_access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await authService.getCurrentUser();
        if (res.success && res.data) {
          syncUserFromBackend(res.data);
        } else {
          localStorage.removeItem('careflow_access_token');
          localStorage.removeItem('careflow_refresh_token');
        }
      } catch {
        if (token.startsWith('mock_jwt_token_')) {
          setUser({
            id: 1,
            name: 'Sarah Jenkins',
            email: 'patient@careflow.com',
            role: 'patient',
            workspaceName: 'Patient Medical Workspace',
          });
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('careflow_access_token');
          localStorage.removeItem('careflow_refresh_token');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginApi = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(email, password);
      if (res.success && res.data) {
        localStorage.setItem('careflow_access_token', res.data.accessToken);
        localStorage.setItem('careflow_refresh_token', res.data.refreshToken);
        syncUserFromBackend(res.data.user);
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } catch (err: any) {
      if (!err.response) {
        console.warn('CareFlow Backend at http://localhost:8080 is offline. Proceeding in offline dev mode.');
        const offlineUser: UserResponse = {
          id: Date.now(),
          fullName: email.split('@')[0] || 'CareFlow Patient',
          email: email,
          role: 'PATIENT',
          enabled: true,
          createdAt: new Date().toISOString(),
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('careflow_access_token', mockToken);
        localStorage.setItem('careflow_refresh_token', 'mock_refresh_token');
        syncUserFromBackend(offlineUser);
        return;
      }
      const formatted = formatAuthError(err, 'Invalid email or password.');
      setError(formatted);
      throw new Error(formatted);
    } finally {
      setIsLoading(false);
    }
  };

  const registerApi = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.register({ fullName, email, password, role: 'PATIENT' });
      if (res.success) {
        await loginApi(email, password);
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } catch (err: any) {
      if (!err.response) {
        console.warn('CareFlow Backend at http://localhost:8080 is offline. Proceeding in offline dev mode.');
        const offlineUser: UserResponse = {
          id: Date.now(),
          fullName: fullName || 'CareFlow Patient',
          email: email,
          role: 'PATIENT',
          enabled: true,
          createdAt: new Date().toISOString(),
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('careflow_access_token', mockToken);
        localStorage.setItem('careflow_refresh_token', 'mock_refresh_token');
        syncUserFromBackend(offlineUser);
        return;
      }
      const formatted = formatAuthError(err, 'Registration failed.');
      setError(formatted);
      throw new Error(formatted);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutApi = useCallback(async () => {
    const refreshToken = localStorage.getItem('careflow_refresh_token');
    if (refreshToken) {
      await authService.logout(refreshToken);
    }
    localStorage.removeItem('careflow_access_token');
    localStorage.removeItem('careflow_refresh_token');
    localStorage.removeItem('careflow_user');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const login = (email?: string, role?: UserRole) => {
    loginApi(email || 'patient@careflow.com', 'CareFlow123!').catch(() => {
      const activeRole = role || selectedRole || 'patient';
      setUser({
        name: 'Sarah Jenkins',
        email: email || 'patient@careflow.com',
        role: activeRole,
        workspaceName: 'Cardiology Patient Portal',
      });
      setIsAuthenticated(true);
    });
  };

  const loginDemoUser = (role: UserRole) => {
    const emailMap: Record<UserRole, string> = {
      patient: 'patient@careflow.com',
      doctor: 'doctor@careflow.com',
      hospital: 'admin@careflow.com',
    };
    loginApi(emailMap[role], 'CareFlow123!').catch(() => {
      const demoProfiles: Record<UserRole, UserProfile> = {
        patient: {
          name: 'Sarah Jenkins',
          email: 'patient@careflow.com',
          role: 'patient',
          workspaceName: 'Cardiology Patient Portal',
        },
        doctor: {
          name: 'Dr. Sarah Chen',
          email: 'doctor@careflow.com',
          role: 'doctor',
          workspaceName: 'Chief of Cardiology Suite',
        },
        hospital: {
          name: 'System Admin',
          email: 'admin@careflow.com',
          role: 'hospital',
          workspaceName: 'Hospital Command Center',
        },
      };
      setUser(demoProfiles[role]);
      setIsAuthenticated(true);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedRole,
        setSelectedRole,
        isAuthOpen,
        setIsAuthOpen,
        isAuthenticated,
        isLoading,
        user,
        loginApi,
        registerApi,
        login,
        logout: logoutApi,
        loginDemoUser,
        logoutUser: logoutApi,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
