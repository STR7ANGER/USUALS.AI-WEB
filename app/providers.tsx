"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE_URL, BASE_URL } from '../lib/constants';

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

  // Handle token in query string on any route (e.g., /home?token=...)
  useEffect(() => {
    if (!isRunningInBrowser()) return;
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("token") || params.get("access_token");
    if (!accessToken) return;

    try {
      setLoading(true);

      // Best-effort decode of JWT payload to populate basic user info if present
      const decodeJwtPayload = (jwt: string): AuthUser | null => {
        try {
          const parts = jwt.split(".");
          if (parts.length < 2) return null;
          const base64Url = parts[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const payload = JSON.parse(jsonPayload) as Record<string, unknown>;
          const name = (payload["name"] as string) || undefined;
          const email = (payload["email"] as string) || undefined;
          return name || email ? { name, email } : null;
        } catch {
          return null;
        }
      };

      const decodedUser = decodeJwtPayload(accessToken);
      handleAuthSuccess({ access_token: accessToken, user: decodedUser });
    } catch (e) {
      console.error("Token handling failed:", e);
      setError("Failed to complete login. Please try again.");
    } finally {
      // Redirect to the current domain root after successful token capture
      window.location.href = window.location.origin;
      setLoading(false);
    }
  }, []);

  // Handle OAuth callback in browser mode
  useEffect(() => {
    if (!isRunningInBrowser()) return;
    if (window.location.pathname === "/auth/web/google") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const accessToken = params.get("access_token") || params.get("token");

      const finalizeWebLogin = async () => {
        try {
          setLoading(true);
          let tokenData: { success?: boolean; access_token?: string; user?: AuthUser } | null = null;
          if (code && !accessToken) {
            const res = await fetch(`${API_BASE_URL}/auth/web/google?code=${encodeURIComponent(code)}`);
            if (!res.ok) throw new Error("Token exchange failed");
            tokenData = await res.json();
          } else {
            tokenData = { success: true, access_token: accessToken || undefined, user: undefined };
          }

          if (tokenData && tokenData.success && tokenData.access_token) {
            handleAuthSuccess({ access_token: tokenData.access_token, user: tokenData.user });
          }
        } catch (err) {
          console.error("OAuth callback handling failed", err);
          setError("Failed to complete login. Please try again.");
        } finally {
          // Redirect to the current domain root after successful login
          window.location.href = window.location.origin;
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
      const redirectUri = `${BASE_URL}/auth/web/google`;
      window.location.href = `${API_BASE_URL}/auth/web/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
    } catch (e: unknown) {
      console.error("Login failed:", e);
      setError(e instanceof Error ? e.message : "Login failed");
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