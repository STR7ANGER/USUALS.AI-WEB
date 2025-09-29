"use client"

import { useState, useCallback, useRef, useEffect } from 'react';
import { VideoTemplate } from '@/services/template';
import { GeneratedVideo, VideoGenerationService, GenerateVideoRequest, ImageToVideoRequest } from '@/services/video-generation';
import { SegmentService, Segment as BackendSegment } from '@/services/segment';
import { useAuth } from './useAuth';
import { MAX_SEGMENTS } from '../lib/constants';

export interface SegmentTemplate {
  id: string;
  description: string;
  jsonPrompt: string;
  s3Key: string;
}

export interface Segment {
  id: string; // This will be the real backend segment ID
  name: string;
  template: SegmentTemplate | null;
  videos: GeneratedVideo[];
  currentVideoIndex: number;
  isActive: boolean;
  backendSegment: BackendSegment; // Store the full backend segment data
}

export interface UseSegmentsReturn {
  segments: Segment[];
  activeSegment: Segment | null;
  loading: boolean;
  error: string | null;
  createSegment: () => void;
  selectSegment: (segmentId: string) => void;
  setSegmentTemplate: (segmentId: string, template: VideoTemplate) => void;
  generateVideo: (segmentId: string, description: string) => Promise<void>;
  generateSolanaVideo: (segmentId: string, description: string, imageS3Key: string) => Promise<void>;
  navigateVideo: (segmentId: string, direction: 'next' | 'prev') => void;
  canCreateSegment: boolean;
  isChatEnabled: (segmentId: string) => boolean;
}

export const useSegments = (projectId?: string, initialTemplateData?: { templateId?: string; videoUrl?: string; description?: string }): UseSegmentsReturn => {
  const { token } = useAuth();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasCreatedInitialSegmentRef = useRef(false);

  // Initialize with first segment - run only once when we have all required data
  useEffect(() => {
    // Prevent multiple initializations using ref (doesn't trigger re-renders)
    if (hasCreatedInitialSegmentRef.current) {
      return;
    }

    // Wait for required data to be available
    if (!projectId || !token) {
      return;
    }
    
    const initializeSegments = async () => {
      try {
        setLoading(true);
        hasCreatedInitialSegmentRef.current = true; // Set immediately to prevent race conditions
        
        // Create ONE segment - either template or blank
        const newSegment = await SegmentService.createSegment(token, {
          type: 'web',
          description: 'web',
          projectId: projectId
        });

        const firstSegment: Segment = {
          id: newSegment.id,
          name: 'Segment 1',
          template: null,
          videos: [],
          currentVideoIndex: 0,
          isActive: true,
          backendSegment: newSegment
        };

        setSegments([firstSegment]);
        
      } catch (error) {
        console.error('❌ useSegments: Failed to create initial segment:', error);
        setError(error instanceof Error ? error.message : 'Failed to create segment');
      } finally {
        setLoading(false);
      }
    };

    initializeSegments();
  }, [projectId, token]);

  const activeSegment = segments.find(segment => segment.isActive) || null;

  const createSegment = useCallback(async () => {
    if (segments.length >= MAX_SEGMENTS || !token || !projectId) return;

    try {
      setLoading(true);
      
      // Create segment in backend
      const newBackendSegment = await SegmentService.createSegment(token, {
        type: 'web',
        description: `Segment ${segments.length + 1}`,
        projectId: projectId
      });

      const newSegment: Segment = {
        id: newBackendSegment.id, // Use real backend ID
        name: `Segment ${segments.length + 1}`,
        template: null,
        videos: [],
        currentVideoIndex: 0,
        isActive: false,
        backendSegment: newBackendSegment
      };

      setSegments(prev => [
        ...prev.map(s => ({ ...s, isActive: false })), // Deactivate all segments
        { ...newSegment, isActive: true } // Make new segment active
      ]);
      
    } catch (err) {
      console.error('❌ useSegments: Failed to create segment:', err);
      setError(err instanceof Error ? err.message : 'Failed to create segment');
    } finally {
      setLoading(false);
    }
  }, [segments.length, token, projectId]);

  const selectSegment = useCallback((segmentId: string) => {
    setSegments(prev => prev.map(segment => ({
      ...segment,
      isActive: segment.id === segmentId
    })));
  }, []);

  const setSegmentTemplate = useCallback((segmentId: string, template: VideoTemplate) => {
    setSegments(prev => prev.map(segment => {
      if (segment.id === segmentId) {
        return {
          ...segment,
          template: {
            id: template.id,
            description: template.description,
            jsonPrompt: template.jsonPrompt,
            s3Key: template.s3Key
          }
        };
      }
      return segment;
    }));
  }, []);

  const generateVideo = useCallback(async (segmentId: string, description: string) => {
    if (!token || !projectId) {
      setError('Authentication or project ID required');
      return;
    }

    const segment = segments.find(s => s.id === segmentId);
    if (!segment || !segment.template) {
      setError('Segment template required for video generation');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const request: GenerateVideoRequest = {
        description,
        jsonPrompt: segment.template.jsonPrompt,
        projectId,
        segmentId,
        userPreferences: 'no_preferences_set'
      };

      const response = await VideoGenerationService.generateVideo(token, request);

      const newVideo: GeneratedVideo = {
        id: `${segmentId}-video-${Date.now()}`,
        s3Key: response.s3Key,
        description: response.description,
        optimizedPrompt: response.optimizedPrompt,
        segmentId: response.segmentId,
        createdAt: new Date().toISOString()
      };

      setSegments(prev => prev.map(s => {
        if (s.id === segmentId) {
          const hasTemplate = !!s.template;
          const newVideoIndex = s.videos.length + (hasTemplate ? 1 : 0); // Account for template being first
          
          return {
            ...s,
            videos: [...s.videos, newVideo],
            currentVideoIndex: newVideoIndex // Point to the new video
          };
        }
        return s;
      }));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate video';
      setError(errorMessage);
      console.error('Error generating video:', err);
    } finally {
      setLoading(false);
    }
  }, [token, projectId, segments]);

  const generateSolanaVideo = useCallback(async (segmentId: string, description: string, imageS3Key: string) => {
    if (!token || !projectId) {
      setError('Authentication or project ID required');
      return;
    }

    const segment = segments.find(s => s.id === segmentId);
    if (!segment || !segment.template) {
      setError('Segment template required for video generation');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Combine template subtitle with user description for Solana
      const combinedPrompt = `${segment.template.description} ${description}`;

      const request: ImageToVideoRequest = {
        imageS3Key: imageS3Key,
        segmentId,
        prompt: combinedPrompt,
        duration: '8s',
        projectId,
        // Defaults can be overridden by callers if needed
        aspect_ratio: '16:9',
        resolution: '720p',
        generate_audio: true,
      };

      const response = await VideoGenerationService.generateImageToVideo(token, request);

      const newVideo: GeneratedVideo = {
        id: `${segmentId}-video-${Date.now()}`,
        s3Key: response.s3Key,
        description: response.description,
        optimizedPrompt: combinedPrompt,
        segmentId: response.segmentId,
        createdAt: new Date().toISOString()
      };

      setSegments(prev => prev.map(s => {
        if (s.id === segmentId) {
          const hasTemplate = !!s.template;
          const newVideoIndex = s.videos.length + (hasTemplate ? 1 : 0); // Account for template being first
          
          return {
            ...s,
            videos: [...s.videos, newVideo],
            currentVideoIndex: newVideoIndex // Point to the new video
          };
        }
        return s;
      }));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate Solana video';
      setError(errorMessage);
      console.error('Error generating Solana video:', err);
    } finally {
      setLoading(false);
    }
  }, [token, projectId, segments]);

  const navigateVideo = useCallback((segmentId: string, direction: 'next' | 'prev') => {
    setSegments(prev => prev.map(segment => {
      if (segment.id === segmentId) {
        // Calculate total videos including template (if exists)
        const hasTemplate = !!segment.template;
        const totalVideos = segment.videos.length + (hasTemplate ? 1 : 0);
        
        if (totalVideos > 1) {
          const currentIndex = segment.currentVideoIndex;
          let newIndex: number;

          if (direction === 'next') {
            newIndex = currentIndex >= totalVideos - 1 ? 0 : currentIndex + 1;
          } else {
            newIndex = currentIndex <= 0 ? totalVideos - 1 : currentIndex - 1;
          }

          return {
            ...segment,
            currentVideoIndex: newIndex
          };
        }
      }
      return segment;
    }));
  }, []);

  const canCreateSegment = segments.length < MAX_SEGMENTS;

  const isChatEnabled = useCallback((segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    return !!(segment && segment.template);
  }, [segments]);

  return {
    segments,
    activeSegment,
    loading,
    error,
    createSegment,
    selectSegment,
    setSegmentTemplate,
    generateVideo,
    generateSolanaVideo,
    navigateVideo,
    canCreateSegment,
    isChatEnabled
  };
};
