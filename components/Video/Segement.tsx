import React from 'react'

interface SegmentCardData {
  id: string
  name: string
  isActive: boolean
  hasTemplate: boolean
  videoCount: number
  templateVideoUrl?: string
}

interface SegementProps {
  segments: SegmentCardData[]
  onSelectSegment: (segmentId: string) => void
  onCreateSegment: () => Promise<void>
  canCreateSegment: boolean
  loading?: boolean
}

const Segement = ({ segments, onSelectSegment, onCreateSegment, canCreateSegment, loading = false }: SegementProps) => {

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center justify-center flex-wrap">
        {/* Existing Segment Cards */}
        {segments.map((segment) => (
          <div 
            key={segment.id} 
            onClick={() => onSelectSegment(segment.id)}
            className={`bg-white/5 rounded-lg w-32 h-20 border transition-all cursor-pointer relative overflow-hidden ${
              segment.isActive 
                ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20' 
                : 'border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {/* Segment Content */}
            <div className="w-full h-full flex flex-col items-center justify-center p-2 relative overflow-hidden">
              {segment.hasTemplate && segment.templateVideoUrl ? (
                // Template selected - show video thumbnail
                <div className="w-full h-full relative">
                  <video
                    src={segment.templateVideoUrl}
                    className="w-full h-full object-cover rounded"
                    muted
                    loop
                    playsInline
                    poster=""
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white" fillOpacity="0.9"/>
                    </svg>
                  </div>
                  {/* Video count badge */}
                  {segment.videoCount > 0 && (
                    <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1 py-0.5">
                      <span className="text-xs text-white font-medium">
                        {segment.videoCount}
                      </span>
                    </div>
                  )}
                </div>
              ) : segment.hasTemplate ? (
                // Template selected but no video URL - show play icon
                <div className="flex flex-col items-center justify-center h-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white" fillOpacity="0.8"/>
                  </svg>
                  {segment.videoCount > 0 && (
                    <span className="text-xs text-white/70 mt-1">
                      {segment.videoCount} video{segment.videoCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              ) : (
                // No template - show empty state
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-6 h-6 border-2 border-dashed border-white/40 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                  <span className="text-xs text-white/50 mt-1">Empty</span>
                </div>
              )}
            </div>

            {/* Segment Name */}
            <div className="absolute bottom-1 left-1 right-1">
              <span className="text-xs text-white/80 font-medium block text-center truncate">
                {segment.name}
              </span>
            </div>

            {/* Active Indicator */}
            {segment.isActive && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></div>
            )}
          </div>
        ))}

        {/* Add New Segment Card - only show if under max limit */}
        {canCreateSegment && (
          <div 
            className="bg-white/5 rounded-lg w-32 h-20 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-colors"
            onClick={() => onCreateSegment()}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/70"></div>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white/70 text-xs mt-1">New Segment</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Segement
