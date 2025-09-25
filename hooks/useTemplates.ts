"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { TemplateService, VideoTemplate } from '../services/template';
import { useAuth } from './useAuth';

export interface UseTemplatesReturn {
  templates: VideoTemplate[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useTemplates = (): UseTemplatesReturn => {
  const { token, isAuthenticated } = useAuth();
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  
  // Use ref to prevent React Strict Mode double calls
  const fetchCalled = useRef<boolean>(false);

  const fetchTemplates = useCallback(async () => {
    console.log('🔍 fetchTemplates called:', { 
      hasToken: !!token, 
      isAuthenticated, 
      fetchCalled: fetchCalled.current, 
      loading, 
      hasFetched 
    });

    if (!token || !isAuthenticated) {
      setError('Authentication required');
      return;
    }

    // Prevent React Strict Mode double calls
    if (fetchCalled.current || loading || hasFetched) {
      console.log('🚫 Skipping duplicate call');
      return; // Prevent duplicate calls
    }

    try {
      console.log('🚀 Making API call');
      fetchCalled.current = true; // Mark as called
      setLoading(true);
      setError(null);

      const templatesData = await TemplateService.fetchTemplates({ token });
      setTemplates(templatesData);
      setHasFetched(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch templates';
      setError(errorMessage);
      console.error('Error in fetchTemplates:', err);
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated, loading, hasFetched]);

  const refresh = useCallback(async () => {
    setTemplates([]);
    setHasFetched(false);
    setError(null);
    fetchCalled.current = false; // Reset the ref
    // Don't call fetchTemplates here - let useEffect handle it
  }, []);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTemplates();
    } else {
      // Reset state when not authenticated
      setTemplates([]);
      setError(null);
      setHasFetched(false);
      fetchCalled.current = false; // Reset the ref
    }
  }, [isAuthenticated, token, fetchTemplates]);

  return {
    templates,
    loading,
    error,
    refresh,
  };
};
