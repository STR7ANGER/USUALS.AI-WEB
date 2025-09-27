"use client"

import { useState, useEffect, useCallback } from 'react';
import { SegmentService, Segment, SegmentVideo, SegmentVideosResponse } from '@/services/segment';
import { useAuth } from './useAuth';
import { MAX_SEGMENTS } from '../lib/constants';
import { handleApiError } from '../lib/error-handler';

export interface ExistingSegment extends Segment {
  videos: SegmentVideo[];
  hasVideos: boolean;
}

export interface UseExistingProjectReturn {
  segments: ExistingSegment[];
  loading: boolean;
  error: string | null;
  projectName: string;
  canShowMoreSegments: boolean;
  refresh: () => Promise<void>;
}

export const useExistingProject = (
  projectId: string | null, 
  projectName: string | null
): UseExistingProjectReturn => {
  const { token, isAuthenticated } = useAuth();
  const [segments, setSegments] = useState<ExistingSegment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectData = useCallback(async () => {
    if (!projectId || !token || !isAuthenticated) {
      return;
    }

    
    try {
      setLoading(true);
      setError(null);

      // Step 1: Fetch segments for the project
      const segmentsResponse = await SegmentService.getProjectSegments(token, projectId);
      
      if (!segmentsResponse.segments || segmentsResponse.segments.length === 0) {
        setSegments([]);
        return;
      }

      // Step 2: Fetch videos for all segments in parallel
      const segmentIds = segmentsResponse.segments.map(segment => segment.id);
      const videosResponses = await SegmentService.getAllSegmentVideos(token, segmentIds);

      // Step 3: Combine segments with their videos
      const segmentsWithVideos: ExistingSegment[] = segmentsResponse.segments.map(segment => {
        const videoResponse = videosResponses.find(vr => vr.segmentId === segment.id);
        const videos = videoResponse?.videos || [];
        
        return {
          ...segment,
          videos,
          hasVideos: videos.length > 0
        };
      });

      setSegments(segmentsWithVideos);

    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [projectId, token, isAuthenticated]);

  const refresh = useCallback(async () => {
    await fetchProjectData();
  }, [fetchProjectData]);

  // Load data when component mounts or dependencies change
  useEffect(() => {
    if (projectId && token && isAuthenticated) {
      fetchProjectData();
    } else {
      // Reset state when not authenticated or no project ID
      setSegments([]);
      setError(null);
    }
  }, [projectId, token, isAuthenticated, fetchProjectData]);

  // Calculate if we can show more segments (max segments from constants)
  const canShowMoreSegments = segments.length < MAX_SEGMENTS;

  return {
    segments,
    loading,
    error,
    projectName: projectName || 'Untitled Project',
    canShowMoreSegments,
    refresh,
  };
};
