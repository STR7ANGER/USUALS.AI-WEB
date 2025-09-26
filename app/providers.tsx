"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface AuthUser {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  picture?: string | null;
  image?: string | null;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void> | void;
  logout: () => Promise<void> | void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function isRunningInBrowser() {
  return typeof window !== "undefined";
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (!isRunningInBrowser()) return null;
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => (isRunningInBrowser() ? localStorage.getItem("authToken") : null));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle OAuth callback in browser mode
  useEffect(() => {
    if (!isRunningInBrowser()) return;
    if (window.location.pathname === "/auth/google-redirect") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const accessToken = params.get("access_token") || params.get("token");

      const finalizeWebLogin = async () => {
        try {
          setLoading(true);
          let tokenData: any = null;
          if (code && !accessToken) {
            const res = await fetch(`${API_BASE_URL}/auth/google-redirect?code=${encodeURIComponent(code)}`);
            if (!res.ok) throw new Error("Token exchange failed");
            tokenData = await res.json();
          } else {
            tokenData = { success: true, access_token: accessToken, user: null };
          }

          if (tokenData && tokenData.success && tokenData.access_token) {
            handleAuthSuccess({ access_token: tokenData.access_token, user: tokenData.user });
          }
        } catch (err) {
          console.error("OAuth callback handling failed", err);
          setError("Failed to complete login. Please try again.");
        } finally {
          window.history.replaceState({}, document.title, "/");
          setLoading(false);
        }
      };

      finalizeWebLogin();
    }
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (!isRunningInBrowser()) return;
    if (user) {
      try {
        localStorage.setItem("authUser", JSON.stringify(user));
      } catch (e) {
        console.error("Failed to persist authUser", e);
      }
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  // Persist token to localStorage
  useEffect(() => {
    if (!isRunningInBrowser()) return;
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const handleAuthSuccess = useCallback((authData: { access_token?: string | null; user?: AuthUser | null }) => {
    if (authData.access_token) {
      setToken(authData.access_token);
      setUser(authData.user ?? null);
      setError(null);
    }
  }, []);

  const login = useCallback(async () => {
    if (!isRunningInBrowser()) return;
    try {
      setError(null);
      setLoading(true);
      const redirectUri = `${window.location.origin}/auth/google-redirect`;
      window.location.href = `${API_BASE_URL}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
    } catch (e: any) {
      console.error("Login failed:", e);
      setError(e?.message || "Login failed");
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      setToken(null);
      if (isRunningInBrowser()) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }
      setError(null);
      if (isRunningInBrowser()) {
        window.location.assign('/');
      }
    } catch (e) {
      console.error("Logout error:", e);
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  }), [user, token, loading, error, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}


