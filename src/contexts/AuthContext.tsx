import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface AuthUser {
  id: number;
  username: string;
  displayName: string;
  role: "admin" | "employee" | "warehouse";
  permissions: string[];
  isActive: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isAdmin: boolean;
  isEmployee: boolean;
  isWarehouse: boolean;
  can: (permission: string) => boolean;
  canViewFinancials: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 دخول تلقائي كـ Admin
    const fakeUser: AuthUser = {
      id: 1,
      username: "admin",
      displayName: "Admin User",
      role: "admin",
      permissions: ["*"],
      isActive: true,
    };

    setUser(fakeUser);
    setToken("fake-token");
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const can = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === "admin") return true;
    return true;
  };

  const canViewFinancials = true;

  return (
    <AuthContext.Provider value={{
      user, token,
      login, logout,
      isAdmin: true,
      isEmployee: false,
      isWarehouse: false,
      can,
      canViewFinancials,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
