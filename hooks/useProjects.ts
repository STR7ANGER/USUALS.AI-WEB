"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { ProjectService, Project } from '../services/project';
import { useAuth } from './useAuth';

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useProjects = (): UseProjectsReturn => {
  const { token, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  
  // Use ref to prevent React Strict Mode double calls
  const fetchCalled = useRef<boolean>(false);

  const fetchProjects = useCallback(async () => {
    console.log('🔍 fetchProjects called:', { 
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

      const projectsData = await ProjectService.fetchProjects({ token });
      setProjects(projectsData);
      setHasFetched(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error in fetchProjects:', err);
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated, loading, hasFetched]);

  const refresh = useCallback(async () => {
    setProjects([]);
    setHasFetched(false);
    setError(null);
    fetchCalled.current = false; // Reset the ref
    // Don't call fetchProjects here - let useEffect handle it
  }, []);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProjects();
    } else {
      // Reset state when not authenticated
      setProjects([]);
      setError(null);
      setHasFetched(false);
      fetchCalled.current = false; // Reset the ref
    }
  }, [isAuthenticated, token, fetchProjects]);

  return {
    projects,
    loading,
    error,
    refresh,
  };
};
