import React from 'react';
import { VideoPlayerState, VideoPlayerControls } from '@/hooks/useVideoPlayer';
import PlayIcon from '@/components/Icons/PlayIcon';
import PauseIcon from '@/components/Icons/PauseIcon';
import MuteIcon from '@/components/Icons/MuteIcon';
import UnmuteIcon from '@/components/Icons/UnmuteIcon';

interface VideoControlsProps {
  state: VideoPlayerState;
  controls: VideoPlayerControls;
  formatTime: (time: number) => string;
  hasVideo: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  state,
  controls,
  formatTime,
  hasVideo,
}) => {
  const { isPlaying, currentTime, duration, isLoading, isFullscreen, isMuted, isHovered } = state;
  const { togglePlayPause, rewind, fastForward, toggleFullscreen, toggleMute, setHovered } = controls;

  if (!hasVideo) return null;

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F9D312]"></div>
        </div>
      )}

      {/* Top Right - Audio Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      {/* Central Controls */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-6 transition-opacity duration-300 ${
          !isPlaying || isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Rewind 10s */}
        <button
          onClick={rewind}
          className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9497 12.7688H14.6997C14.6997 12.5385 14.5939 12.3209 14.4126 12.1787C14.2314 12.0365 13.9949 11.9855 13.7712 12.0404L13.9497 12.7688ZM13.1997 18.7688C13.1997 19.183 13.5355 19.5188 13.9497 19.5188C14.3639 19.5188 14.6997 19.183 14.6997 18.7688H13.9497H13.1997ZM11.2788 14.0951C11.0937 14.4656 11.244 14.9161 11.6146 15.1012C11.9851 15.2863 12.4356 15.1359 12.6207 14.7654L11.9497 14.4302L11.2788 14.0951ZM19.9497 14.2688H19.1997V17.2688H19.9497H20.6997V14.2688H19.9497ZM16.9497 17.2688H17.6997V14.2688H16.9497H16.1997V17.2688H16.9497ZM18.4497 18.7688V18.0188C18.0355 18.0188 17.6997 17.683 17.6997 17.2688H16.9497H16.1997C16.1997 18.5114 17.2071 19.5188 18.4497 19.5188V18.7688ZM19.9497 17.2688H19.1997C19.1997 17.683 18.8639 18.0188 18.4497 18.0188V18.7688V19.5188C19.6923 19.5188 20.6997 18.5114 20.6997 17.2688H19.9497ZM18.4497 12.7688V13.5188C18.8639 13.5188 19.1997 13.8546 19.1997 14.2688H19.9497H20.6997C20.6997 13.0262 19.6923 12.0188 18.4497 12.0188V12.7688ZM18.4497 12.7688V12.0188C17.2071 12.0188 16.1997 13.0262 16.1997 14.2688H16.9497H17.6997C17.6997 13.8546 18.0355 13.5188 18.4497 13.5188V12.7688ZM13.9497 12.7688H13.1997V18.7688H13.9497H14.6997V12.7688H13.9497ZM11.9497 14.4302L12.6207 14.7654C12.9464 14.1132 13.4713 13.6583 14.1283 13.4972L13.9497 12.7688L13.7712 12.0404C12.6244 12.3215 11.7709 13.1098 11.2788 14.0951L11.9497 14.4302Z"
              fill="white"
            />
            <path
              d="M16.9497 4.7688C16.2282 5.28732 15.5801 5.89306 15.0216 6.57069C14.9257 6.68695 14.9257 6.85065 15.0216 6.9669C15.5801 7.64454 16.2282 8.25028 16.9497 8.7688"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.4497 8.45528C8.23297 10.1251 6.79973 12.7794 6.79973 15.7684C6.79973 20.8218 10.8963 24.9184 15.9497 24.9184C21.0031 24.9184 25.0997 20.8218 25.0997 15.7684C25.0997 10.715 21.0031 6.61841 15.9497 6.61841C15.6756 6.61841 15.4044 6.63046 15.1364 6.65406"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-16 h-16 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Fast Forward 10s */}
        <button
          onClick={fastForward}
          className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0502 9.7688H10.8002C10.8002 9.53845 10.6944 9.32088 10.5132 9.17871C10.3319 9.03653 10.0954 8.98552 9.87168 9.04036L10.0502 9.7688ZM9.30023 15.7688C9.30023 16.183 9.63602 16.5188 10.0502 16.5188C10.4644 16.5188 10.8002 16.183 10.8002 15.7688H10.0502H9.30023ZM7.37928 11.0951C7.19418 11.4656 7.34453 11.9161 7.71508 12.1012C8.08564 12.2863 8.53608 12.1359 8.72118 11.7654L8.05023 11.4302L7.37928 11.0951ZM16.0502 11.2688H15.3002V14.2688H16.0502H16.8002V11.2688H16.0502ZM13.0502 14.2688H13.8002V11.2688H13.0502H12.3002V14.2688H13.0502ZM14.5502 15.7688V15.0188C14.136 15.0188 13.8002 14.683 13.8002 14.2688H13.0502H12.3002C12.3002 15.5114 13.3076 16.5188 14.5502 16.5188V15.7688ZM16.0502 14.2688H15.3002C15.3002 14.683 14.9644 15.0188 14.5502 15.0188V15.7688V16.5188C15.7929 16.5188 16.8002 15.5114 16.8002 14.2688H16.0502ZM14.5502 9.7688V10.5188C14.9644 10.5188 15.3002 10.8546 15.3002 11.2688H16.0502H16.8002C16.8002 10.0262 15.7929 9.0188 14.5502 9.0188V9.7688ZM14.5502 9.7688V9.0188C13.3076 9.0188 12.3002 10.0262 12.3002 11.2688H13.0502H13.8002C13.8002 10.8546 14.136 10.5188 14.5502 10.5188V9.7688ZM10.0502 9.7688H9.30023V15.7688H10.0502H10.8002V9.7688H10.0502ZM8.05023 11.4302L8.72118 11.7654C9.04697 11.1132 9.57185 10.6583 10.2288 10.4972L10.0502 9.7688L9.87168 9.04036C8.72488 9.32146 7.87146 10.1098 7.37928 11.0951L8.05023 11.4302Z"
              fill="white"
            />
            <path
              d="M11.05 1.7688C11.7716 2.28732 12.4196 2.89306 12.9782 3.57069C13.074 3.68695 13.074 3.85065 12.9782 3.9669C12.4196 4.64454 11.7716 5.25028 11.05 5.7688"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5507 5.45455C19.7675 7.12434 21.2007 9.77863 21.2007 12.7677C21.2007 17.8211 17.1041 21.9177 12.0507 21.9177C6.99729 21.9177 2.9007 17.8211 2.9007 12.7677C2.9007 7.71427 6.99729 3.61768 12.0507 3.61768C12.3248 3.61768 12.5961 3.62973 12.864 3.65333"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Left - Time Display */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white text-sm bg-black/50 rounded-lg px-3 py-1 backdrop-blur-sm">
        <span>{formatTime(currentTime)}</span>
        <span className="text-white/40">|</span>
        <span className="text-white/70">{formatTime(duration)}</span>
      </div>

      {/* Bottom Right - Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        {isFullscreen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3V5M16 3V5M3 8H5M3 16H5M8 21V19M16 21V19M19 8H21M19 16H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 9L15 15M15 9L9 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.65948 17.5301C8.54373 17.7169 7.4162 17.7593 6.30503 17.6565C6.20971 17.6477 6.1254 17.6066 6.06271 17.5439C6.00002 17.4812 5.95895 17.3969 5.95013 17.3016C5.84734 16.1904 5.88971 15.0629 6.07654 13.9471M13.4234 17.5301C14.5392 17.7169 15.6667 17.7593 16.7779 17.6565C16.8732 17.6477 16.9575 17.6066 17.0202 17.5439C17.0829 17.4812 17.124 17.3969 17.1328 17.3016C17.2356 16.1904 17.1932 15.0629 17.0064 13.9471M6.07654 10.1832C5.88971 9.06741 5.84734 7.93988 5.95013 6.82871C5.95895 6.73339 6.00002 6.64908 6.06271 6.58639C6.1254 6.5237 6.20971 6.48263 6.30503 6.47381C7.4162 6.37102 8.54373 6.41339 9.65948 6.60022M13.4234 6.60022C14.5392 6.41339 15.6667 6.37102 16.7779 6.47381C16.8732 6.48263 16.9575 6.5237 17.0202 6.58639C17.0829 6.64908 17.124 6.73339 17.1328 6.82871C17.2356 7.93988 17.1932 9.06741 17.0064 10.1832"
              stroke="white"
              strokeWidth="1.34091"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default VideoControls;
