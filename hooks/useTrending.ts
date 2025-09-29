"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { TemplateService, VideoTemplate } from '../services/template';
import { ERROR_MESSAGES } from '../lib/constants';
import { handleApiError } from '../lib/error-handler';

export interface UseTrendingReturn {
  trendingTemplates: VideoTemplate[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  fetchByDescription: (description: string) => Promise<void>;
}

export const useTrending = (): UseTrendingReturn => {
  const [trendingTemplates, setTrendingTemplates] = useState<VideoTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  
  // Use ref to prevent React Strict Mode double calls only for the initial "Trending" call
  const initialFetchCalled = useRef<boolean>(false);

  const fetchTrendingTemplates = useCallback(async (description: string = "Trending") => {

    // Only prevent duplicate calls for the initial "Trending" call
    if (description === "Trending" && initialFetchCalled.current && hasFetched) {
      return;
    }

    // Prevent calls if already loading
    if (loading) {
      return;
    }

    try {
      
      // Mark initial fetch as called only for "Trending"
      if (description === "Trending") {
        initialFetchCalled.current = true;
      }
      
      setLoading(true);
      setError(null);

      const trendingData = await TemplateService.fetchTrendingTemplates(description);
      // Take all templates (up to 4)
      setTrendingTemplates(trendingData.templates.slice(0, 4));
      setHasFetched(true);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByDescription = useCallback(async (description: string) => {
    await fetchTrendingTemplates(description);
  }, [fetchTrendingTemplates]);

  const refresh = useCallback(async () => {
    setTrendingTemplates([]);
    setHasFetched(false);
    setError(null);
    initialFetchCalled.current = false; // Reset the ref
    // Don't call fetchTrendingTemplates here - let useEffect handle it
  }, []);

  // Nothing to do on auth changes anymore

  return {
    trendingTemplates,
    loading,
    error,
    refresh,
    fetchByDescription,
  };
};
