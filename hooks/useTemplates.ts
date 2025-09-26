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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchTemplates = useCallback(async (page: number = 1, append: boolean = false) => {
    console.log('🔍 fetchTemplates called:', { hasToken: !!token, isAuthenticated, loading, page, append });

    if (!token || !isAuthenticated) {
      setError('Authentication required');
      return;
    }

    // Avoid concurrent calls only
    if (loading) return;

    try {
      console.log('🚀 Making API call for page:', page);
      setLoading(true);
      setError(null);

      const response = await TemplateService.fetchTemplates({ token, page, limit: 20 });
      
      if (append) {
        setTemplates(prev => [...prev, ...response.data]);
      } else {
        setTemplates(response.data);
      }
      
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
      setHasMore(response.page < response.totalPages);
      setHasFetched(true);
      
      console.log('📊 Templates updated:', { 
        currentCount: append ? templates.length + response.data.length : response.data.length,
        total: response.total,
        page: response.page,
        totalPages: response.totalPages,
        hasMore: response.page < response.totalPages
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch templates';
      setError(errorMessage);
      console.error('Error in fetchTemplates:', err);
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated, loading, templates.length]);

  const refresh = useCallback(async () => {
    setTemplates([]);
    setHasFetched(false);
    setError(null);
    setCurrentPage(1);
    setHasMore(true);
    setTotalPages(0);
    // Don't call fetchTemplates here - let useEffect handle it
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    const nextPage = currentPage + 1;
    await fetchTemplates(nextPage, true);
  }, [hasMore, loading, currentPage, fetchTemplates]);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      // Only fetch once on mount/auth change
      if (!hasFetched && !loading) fetchTemplates(1, false);
    } else {
      // Reset state when not authenticated
      setTemplates([]);
      setError(null);
      setHasFetched(false);
      setCurrentPage(1);
      setHasMore(false);
      setTotalPages(0);
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
