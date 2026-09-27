import { useState, useEffect } from "react";

export type UserRole =
  "Super Admin" | "Content Admin" | "Innovation Manager" | "Event Manager" | "Reviewer" | "Viewer";

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
  id: "usr-admin-01",
  name: "KiranKumar Parmar",
  email: "admin@guiitar.org",
  role: "Super Admin",
  avatar: "KP",
  department: "Incubation Management",
  lastLogin: new Date().toISOString(),
};

const AUTH_KEY = "guiitar_admin_session";

export function getStoredSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setStoredSession(user: AdminUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(() => getStoredSession());

  useEffect(() => {
    const syncSession = () => {
      setUser(getStoredSession());
    };
    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener("guiitar_auth_update", syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("guiitar_auth_update", syncSession);
    };
  }, []);

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    // Valid administrative credentials
    if (
      (cleanEmail === "admin@guiitar.org" && pass === "guiitar2026") ||
      (cleanEmail === "provost@gsfcuniversity.ac.in" && pass === "admin123") ||
      (cleanEmail === "demo@guiitar.org" && pass === "demo123") ||
      (cleanEmail === "kirankumar.parmar@gsfcuni.edu.in" && pass === "guiitar2026") ||
      (cleanEmail === "mihir.trivedi@gsfcuni.edu.in" && pass === "guiitar2026")
    ) {
      const activeUser: AdminUser = {
        ...DEFAULT_ADMIN,
        email: cleanEmail,
        name: cleanEmail.includes("provost")
          ? "Prof. G. R. Sinha"
          : cleanEmail.includes("trivedi")
          ? "Dr. Mihir Trivedi"
          : "KiranKumar Parmar",
        role: cleanEmail.includes("provost") || cleanEmail.includes("admin@")
          ? "Super Admin"
          : "Innovation Manager",
        lastLogin: new Date().toISOString(),
      };
      setUser(activeUser);
      setStoredSession(activeUser);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("guiitar_auth_update"));
      }
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Please check your credentials." };
  };

  const logout = () => {
    setUser(null);
    setStoredSession(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("guiitar_auth_update"));
    }
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
