"use client"

import { useRef, useState, useEffect, useCallback } from 'react';
import { VIDEO_SEEK_TIME } from '../lib/constants';

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  isHovered: boolean;
}

export interface VideoPlayerControls {
  togglePlayPause: () => void;
  rewind: () => void;
  fastForward: () => void;
  toggleFullscreen: () => void;
  toggleMute: () => void;
  setHovered: (hovered: boolean) => void;
}

export interface UseVideoPlayerReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  state: VideoPlayerState;
  controls: VideoPlayerControls;
  formatTime: (time: number) => string;
}

export const useVideoPlayer = (): UseVideoPlayerReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Always start muted
  const [isHovered, setIsHovered] = useState(false);

  // Video control functions
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const rewind = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - VIDEO_SEEK_TIME
      );
    }
  }, []);

  const fastForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        duration,
        videoRef.current.currentTime + VIDEO_SEEK_TIME
      );
    }
  }, [duration]);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, [isFullscreen]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const setHovered = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const formatTime = useCallback((time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleLoadStart]);

  const state: VideoPlayerState = {
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isFullscreen,
    isMuted,
    isHovered,
  };

  const controls: VideoPlayerControls = {
    togglePlayPause,
    rewind,
    fastForward,
    toggleFullscreen,
    toggleMute,
    setHovered,
  };

  return {
    videoRef,
    state,
    controls,
    formatTime,
  };
};
