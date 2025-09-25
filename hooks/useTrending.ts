"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { TemplateService, VideoTemplate } from '../services/template';
import { useAuth } from './useAuth';

export interface UseTrendingReturn {
  trendingTemplates: VideoTemplate[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  fetchByDescription: (description: string) => Promise<void>;
}

export const useTrending = (): UseTrendingReturn => {
  const { token, isAuthenticated } = useAuth();
  const [trendingTemplates, setTrendingTemplates] = useState<VideoTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  
  // Use ref to prevent React Strict Mode double calls only for the initial "Trending" call
  const initialFetchCalled = useRef<boolean>(false);

  const fetchTrendingTemplates = useCallback(async (description: string = "Trending") => {
    console.log('🔍 fetchTrendingTemplates called:', { 
      hasToken: !!token, 
      isAuthenticated, 
      initialFetchCalled: initialFetchCalled.current, 
      loading, 
      hasFetched,
      description
    });

    if (!token || !isAuthenticated) {
      setError('Authentication required');
      return;
    }

    // Only prevent duplicate calls for the initial "Trending" call
    if (description === "Trending" && initialFetchCalled.current && hasFetched) {
      console.log('🚫 Skipping duplicate initial Trending call');
      return;
    }

    // Prevent calls if already loading
    if (loading) {
      console.log('🚫 Skipping call - already loading');
      return;
    }

    try {
      console.log('🚀 Making trending API call with description:', description);
      
      // Mark initial fetch as called only for "Trending"
      if (description === "Trending") {
        initialFetchCalled.current = true;
      }
      
      setLoading(true);
      setError(null);

      const trendingData = await TemplateService.fetchTrendingTemplates(token, description);
      // Take only the top 3 templates
      setTrendingTemplates(trendingData.templates.slice(0, 3));
      setHasFetched(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trending templates';
      setError(errorMessage);
      console.error('Error in fetchTrendingTemplates:', err);
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated, loading, hasFetched]);

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

  // Reset state when authentication changes
  useEffect(() => {
    if (!isAuthenticated || !token) {
      // Reset state when not authenticated
      setTrendingTemplates([]);
      setError(null);
      setHasFetched(false);
      initialFetchCalled.current = false; // Reset the ref
    }
  }, [isAuthenticated, token]);

  return {
    trendingTemplates,
    loading,
    error,
    refresh,
    fetchByDescription,
  };
};
