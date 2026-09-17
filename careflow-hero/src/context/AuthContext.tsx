import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { mockAuthService } from '../services/mockAuthService';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type AuthView = 'welcome' | 'role-selection' | 'login' | 'register' | 'forgot-password';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
}

export type UserProfile = User;

interface AuthContextType {
  activeView: AuthView;
  setActiveView: (view: AuthView) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (fullName: string, email: string, password: string, role?: UserRole) => Promise<User>;
  logout: () => void;
  loginDemoUser: (role: UserRole) => Promise<User>;
  logoutUser: () => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

const STORAGE_KEY = 'careflow_auth_user';
const ACCESS_TOKEN_KEY = 'careflow_access_token';
const REFRESH_TOKEN_KEY = 'careflow_refresh_token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AuthView>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore authenticated session on initial mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUserJson = localStorage.getItem(STORAGE_KEY);
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (storedUserJson) {
          const parsedUser: User = JSON.parse(storedUserJson);
          if (parsedUser && parsedUser.email && parsedUser.role) {
            setUser(parsedUser);
            setSelectedRole(parsedUser.role);
          }
        }

        // Verify session with Spring Boot backend /auth/me if token exists
        if (token) {
          try {
            const meRes = await authService.getCurrentUser();
            if (meRes?.success && meRes?.data) {
              const verifiedUser: User = {
                id: String(meRes.data.id),
                name: meRes.data.fullName,
                email: meRes.data.email,
                role: meRes.data.role,
              };
              setUser(verifiedUser);
              setSelectedRole(verifiedUser.role);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedUser));
            }
          } catch {
            // Token might be expired or backend unreachable; keep cached session for offline UX
          }
        }
      } catch (e) {
        console.error('Failed to restore CareFlow session:', e);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      // Attempt real Spring Boot authentication API
      const apiRes = await authService.login(email, password);

      if (apiRes && apiRes.success && apiRes.data) {
        const loginData = apiRes.data;
        const jwtToken = loginData.token || loginData.accessToken;
        if (jwtToken) {
          localStorage.setItem(ACCESS_TOKEN_KEY, jwtToken);
        }
        if (loginData.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, loginData.refreshToken);
        }

        const authenticatedUser: User = {
          id: String(loginData.userId || loginData.user?.id || '1'),
          name: loginData.fullName || loginData.user?.fullName || email.split('@')[0],
          email: loginData.email || loginData.user?.email || email,
          role: (loginData.role || loginData.user?.role || 'PATIENT') as UserRole,
        };

        setUser(authenticatedUser);
        setSelectedRole(authenticatedUser.role);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
        return authenticatedUser;
      } else {
        throw new Error(apiRes.message || 'Authentication failed');
      }
    } catch (err: any) {
      console.warn('Real Spring Boot login failed/unreachable. Attempting demo fallback:', err);
      
      // Fallback for offline/demo evaluation
      try {
        const mockRes = await mockAuthService.login(email, password);
        setUser(mockRes.user);
        setSelectedRole(mockRes.user.role);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRes.user));
        return mockRes.user;
      } catch (mockErr: any) {
        const formattedMsg =
          err?.response?.data?.message ||
          err?.message ||
          'Unable to connect to CareFlow backend server. Please verify backend is running.';
        setError(formattedMsg);
        throw new Error(formattedMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    role: UserRole = 'PATIENT'
  ): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const apiRes = await authService.register({ fullName, email, password, role });
      if (apiRes && apiRes.success) {
        // Automatically log in after registration
        return await login(email, password);
      } else {
        throw new Error(apiRes.message || 'Registration failed');
      }
    } catch (err: any) {
      console.warn('Real Spring Boot registration failed/unreachable. Falling back to mock registration:', err);
      try {
        const mockRes = await mockAuthService.register(fullName, email, password, role === 'ADMIN' ? 'PATIENT' : role);
        setUser(mockRes.user);
        setSelectedRole(mockRes.user.role);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRes.user));
        return mockRes.user;
      } catch (mockErr: any) {
        const msg = err?.response?.data?.message || err?.message || 'Registration failed';
        setError(msg);
        throw new Error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    await authService.logout(refreshToken || undefined);

    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }, []);

  const loginDemoUser = async (role: UserRole): Promise<User> => {
    const demoCredentials: Record<UserRole, { email: string; pass: string }> = {
      ADMIN: { email: 'admin@careflow.com', pass: 'password' },
      DOCTOR: { email: 'doctor@careflow.com', pass: 'password' },
      PATIENT: { email: 'patient@careflow.com', pass: 'password' },
    };

    const target = demoCredentials[role];
    return login(target.email, target.pass);
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
        isAuthenticated: !!user,
        isLoading,
        user,
        currentUser: user,
        login,
        register,
        logout,
        loginDemoUser,
        logoutUser: logout,
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
