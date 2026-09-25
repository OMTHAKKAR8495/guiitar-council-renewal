import { useState, useEffect } from 'react';

export type UserRole =
  | 'Super Admin'
  | 'Content Admin'
  | 'Innovation Manager'
  | 'Event Manager'
  | 'Reviewer'
  | 'Viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  lastLogin: string;
}

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr-admin-01',
  name: 'KiranKumar Parmar',
  email: 'admin@guiitar.org',
  role: 'Super Admin',
  avatar: 'KP',
  department: 'Incubation Management',
  lastLogin: new Date().toISOString(),
};

const AUTH_KEY = 'guiitar_admin_session';

export function getStoredSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setStoredSession(user: AdminUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(getStoredSession());

  useEffect(() => {
    const handleStorage = () => {
      setUser(getStoredSession());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    // Valid administrative demo credentials
    if (
      (email === 'admin@guiitar.org' && pass === 'guiitar2026') ||
      (email === 'provost@gsfcuniversity.ac.in' && pass === 'admin123') ||
      (email === 'demo@guiitar.org' && pass === 'demo123')
    ) {
      const activeUser: AdminUser = {
        ...DEFAULT_ADMIN,
        email,
        name: email.includes('provost') ? 'Prof. G. R. Sinha' : 'KiranKumar Parmar',
        role: email.includes('provost') ? 'Super Admin' : 'Innovation Manager',
        lastLogin: new Date().toISOString(),
      };
      setUser(activeUser);
      setStoredSession(activeUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Please check your credentials.' };
  };

  const logout = () => {
    setUser(null);
    setStoredSession(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

export const useAdminAuth = useAuth;
export type AdminRole = UserRole;
