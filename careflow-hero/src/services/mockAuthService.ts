export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Development Demo Accounts
const MOCK_DEMO_USERS: Record<string, User & { password: string }> = {
  'patient@careflow.demo': {
    id: 'demo-patient-1',
    name: 'Demo Patient',
    email: 'patient@careflow.demo',
    role: 'PATIENT',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
  'doctor@careflow.demo': {
    id: 'demo-doctor-1',
    name: 'Dr. Sarah Chen',
    email: 'doctor@careflow.demo',
    role: 'DOCTOR',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
  'admin@careflow.demo': {
    id: 'demo-admin-1',
    name: 'System Administrator',
    email: 'admin@careflow.demo',
    role: 'ADMIN',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
};

// In-memory registered user store initialized with demo users
const mockUserDb: Record<string, User & { password: string }> = { ...MOCK_DEMO_USERS };

export const mockAuthService = {
  /**
   * Mock login service with simulated network latency
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = mockUserDb[normalizedEmail];

    if (!existingUser || existingUser.password !== password) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const { password: _, ...user } = existingUser;
    const token = `mock_jwt_token_${user.id}_${Date.now()}`;

    return { user, token };
  },

  /**
   * Mock registration service. Restricts public registration to PATIENT or DOCTOR roles.
   */
  async register(
    fullName: string,
    email: string,
    password: string,
    role: 'PATIENT' | 'DOCTOR'
  ): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (role === ('ADMIN' as any)) {
      throw new Error('Public registration for Admin accounts is not permitted.');
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (mockUserDb[normalizedEmail]) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name: fullName.trim(),
      email: normalizedEmail,
      role,
      password,
      createdAt: new Date().toISOString(),
    };

    mockUserDb[normalizedEmail] = newUser;

    const { password: _, ...user } = newUser;
    const token = `mock_jwt_token_${user.id}_${Date.now()}`;

    return { user, token };
  },

  /**
   * Retrieve development demo accounts list
   */
  getDemoAccounts() {
    return [
      { email: 'patient@careflow.demo', password: 'password123', role: 'PATIENT' as const, label: 'Demo Patient' },
      { email: 'doctor@careflow.demo', password: 'password123', role: 'DOCTOR' as const, label: 'Demo Doctor' },
      { email: 'admin@careflow.demo', password: 'password123', role: 'ADMIN' as const, label: 'Demo Admin' },
    ];
  },
};
