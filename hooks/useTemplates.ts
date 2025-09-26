"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { TemplateService, VideoTemplate, TemplatesResponse } from '../services/template';
import { useAuth } from './useAuth';

export interface UseTemplatesReturn {
  templates: VideoTemplate[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export const useTemplates = (): UseTemplatesReturn => {
  const { token, isAuthenticated } = useAuth();
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [allTemplates, setAllTemplates] = useState<VideoTemplate[]>([]);
  
  // Removed previous duplicate-call guard to allow pagination fetches

  const fetchTemplates = useCallback(async () => {
    console.log('🔍 fetchTemplates called:', { hasToken: !!token, isAuthenticated, loading, hasFetched, page });

    if (!token || !isAuthenticated) {
      setError('Authentication required');
      return;
    }

    // Avoid concurrent calls only
    if (loading) return;

    try {
      console.log('🚀 Making API call');
      setLoading(true);
      setError(null);

      const { templates: fullTemplates } = await TemplateService.fetchTemplates({ token });
      setAllTemplates(fullTemplates);
      // Initialize first 12
      setTemplates(fullTemplates.slice(0, 12));
      setHasMore(fullTemplates.length > 12);
      setPage(1);
      setHasFetched(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch templates';
      setError(errorMessage);
      console.error('Error in fetchTemplates:', err);
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated, loading, hasFetched, page]);

  const refresh = useCallback(async () => {
    setTemplates([]);
    setHasFetched(false);
    setError(null);
    setPage(1);
    setHasMore(true);
    // Don't call fetchTemplates here - let useEffect handle it
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    const nextCount = nextPage * 12;
    const nextSlice = allTemplates.slice(0, nextCount);
    setTemplates(nextSlice);
    setPage(nextPage);
    setHasMore(allTemplates.length > nextSlice.length);
  }, [hasMore, loading, page, allTemplates]);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      // Only fetch once on mount/auth change
      if (!hasFetched && !loading) fetchTemplates();
    } else {
      // Reset state when not authenticated
      setTemplates([]);
      setError(null);
      setHasFetched(false);
      setPage(1);
      setHasMore(false);
      setAllTemplates([]);
    }
  }, [isAuthenticated, token, fetchTemplates, hasFetched, loading]);

  return {
    templates,
    loading,
    error,
    refresh,
    loadMore,
    hasMore,
  };
};
