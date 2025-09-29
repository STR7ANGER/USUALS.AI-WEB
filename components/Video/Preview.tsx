"use client"

import React from "react";
import Image from "next/image";
import { getVideoUrl } from "@/lib/video-utils";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import VideoControls from "./VideoControls";

interface PreviewProps {
  videoUrl?: string;
  templateDescription?: string;
  templateJsonPrompt?: string;
  generatedVideos?: Array<{
    s3Key: string;
    description: string;
    isTemplate?: boolean;
  }>;
  currentVideoIndex?: number;
  onNavigateVideo?: (direction: 'next' | 'prev') => void;
  isSolanaTemplate?: boolean;
}

const Preview = ({
  videoUrl,
  templateDescription,
  templateJsonPrompt,
  generatedVideos = [],
  currentVideoIndex = 0,
  onNavigateVideo,
  isSolanaTemplate = false,
}: PreviewProps) => {
  const { videoRef, state, controls, formatTime } = useVideoPlayer();

  // Determine which video to display
  const currentVideo = generatedVideos.length > 0 ? generatedVideos[currentVideoIndex] : null;
  const displayVideoUrl = currentVideo 
    ? getVideoUrl(currentVideo.s3Key) 
    : videoUrl 
      ? getVideoUrl(videoUrl)
      : undefined;
  const hasMultipleVideos = generatedVideos.length > 1;

  // For Solana templates, check if we're showing the template (image) or generated video
  const isShowingTemplate = currentVideo?.isTemplate || (!currentVideo && videoUrl);
  const shouldShowImage = isSolanaTemplate && isShowingTemplate;

  return (
    <div className="flex flex-col bg-[#111215] h-[20vh]">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl aspect-video">
          {/* Segmented Pagination Bar - Above preview */}
          {generatedVideos.length > 1 && (
            <div className="absolute top-[-13px] left-0 right-0">
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="w-full h-full flex">
                  {generatedVideos.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-full ${idx === currentVideoIndex ? 'bg-[#F9D312] opacity-100' : 'bg-[#F9D312] opacity-15'} ${idx !== generatedVideos.length - 1 ? 'mr-1' : ''}`}
                      style={{ width: `${100 / generatedVideos.length}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Side Navigation Arrows - Only show if there are multiple videos */}
          {hasMultipleVideos && onNavigateVideo && (
            <>
              <button 
                onClick={() => onNavigateVideo('prev')}
                className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-colors hover:bg-white/10 rounded-full"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9356 19.9999C13.155 18.7036 11.5557 17.1892 10.1772 15.4951C10.0589 15.3498 9.99982 15.1748 9.99982 14.9999M14.9356 9.99988C13.155 11.2962 11.5557 12.8105 10.1772 14.5046C10.0589 14.6499 9.99982 14.8249 9.99982 14.9999M9.99982 14.9999L19.9998 14.9999M3.56238 15C3.56238 21.3168 8.68312 26.4375 14.9999 26.4375C21.3166 26.4375 26.4374 21.3168 26.4374 15C26.4374 8.68324 21.3166 3.5625 14.9999 3.5625C8.68312 3.5625 3.56238 8.68324 3.56238 15Z"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button 
                onClick={() => onNavigateVideo('next')}
                className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-colors hover:bg-white/10 rounded-full"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0643 10.0001C16.8449 11.2964 18.4442 12.8108 19.8227 14.5049C19.9409 14.6502 20.0001 14.8252 20.0001 15.0001M15.0643 20.0001C16.8449 18.7038 18.4442 17.1895 19.8227 15.4954C19.9409 15.3501 20.0001 15.1751 20.0001 15.0001M20.0001 15.0001L10.0001 15.0001M26.4375 15C26.4375 8.68324 21.3168 3.5625 15 3.5625C8.68324 3.5625 3.5625 8.68324 3.5625 15C3.5625 21.3168 8.68324 26.4375 15 26.4375C21.3168 26.4375 26.4375 21.3168 26.4375 15Z"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Video Player Container */}
          <div 
            className="relative w-full h-full bg-white/5 rounded-lg border border-white/10 overflow-hidden"
            onMouseEnter={() => controls.setHovered(true)}
            onMouseLeave={() => controls.setHovered(false)}
          >
            {/* Video Element or Image for Solana templates */}
            {shouldShowImage ? (
              <Image
                src={displayVideoUrl || videoUrl || ''}
                alt={templateDescription || 'Solana template'}
                fill
                className="object-cover"
                onError={(e) => {
                  console.error("🖼️ Preview: Image load error:", e);
                  console.error("🖼️ Preview: Image URL that failed:", displayVideoUrl || videoUrl);
                }}
              />
            ) : displayVideoUrl ? (
              <video
                ref={videoRef}
                src={displayVideoUrl}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("🎬 Preview: Video load error:", e);
                  console.error("🎬 Preview: Video URL that failed:", displayVideoUrl);
                }}
                muted={state.isMuted}
                loop
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">
                <div className="text-center">
                  <p className="text-lg mb-2">No video available</p>
                  <p className="text-sm">
                    {generatedVideos.length > 0 
                      ? "Generated video loading..." 
                      : "Select a template to view its video"
                    }
                  </p>
                  {currentVideo && (
                    <p className="text-xs mt-2 text-white/40">
                      {currentVideo.isTemplate ? '📋 ' : '🎬 '}
                      Video {currentVideoIndex + 1} of {generatedVideos.length}: {currentVideo.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Video Counter - Show if there are multiple videos */}
            {hasMultipleVideos && (
              <div className="absolute top-4 left-4 bg-black/50 rounded-lg px-3 py-1 backdrop-blur-sm">
                <span className="text-white text-sm">
                  {currentVideoIndex + 1} / {generatedVideos.length}
                </span>
              </div>
            )}

            {/* Video Controls - Only show for videos, not images */}
            {!shouldShowImage && (
              <VideoControls
                state={state}
                controls={controls}
                formatTime={formatTime}
                hasVideo={!!displayVideoUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
