"use client"

import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import { useAuth } from "./useAuth";

export function useCredits() {
  const { user, token } = useAuth();
  const [credits, setCredits] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = useCallback(async () => {
    if (!user?.id || !token || !API_BASE_URL) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/credits/balance/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch credits: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const balance = (data?.balance ?? data?.credits ?? data?.data?.balance);
      if (balance !== undefined && balance !== null) {
        setCredits(String(balance));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  }, [user?.id, token]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return { credits, loading, error, refresh: fetchCredits };
}


