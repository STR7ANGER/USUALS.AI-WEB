import React, { useState } from 'react'
import { Segment } from '@/hooks/useSegments'
import { 
  exportAllVideos, 
  exportSegmentVideos, 
  hasExportableVideos, 
  getVideoCount, 
  getSegmentVideoCount 
} from '@/lib/export-utils'

interface ExportProps {
  segments: Segment[]
  projectName?: string
}

const Export = ({ segments, projectName }: ExportProps) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [currentFile, setCurrentFile] = useState('')
  const [error, setError] = useState<string | null>(null)

  const totalVideos = getVideoCount(segments)
  const hasVideos = hasExportableVideos(segments)

  const handleExportAll = async () => {
    if (!hasVideos) {
      setError('No videos available to export')
      return
    }

    try {
      setIsExporting(true)
      setError(null)
      setExportProgress(0)
      setCurrentFile('')

      await exportAllVideos(
        segments, 
        projectName,
        (progress, filename) => {
          setExportProgress(progress)
          setCurrentFile(filename)
        }
      )

      setExportProgress(100)
      setCurrentFile('Export completed!')
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress(0)
        setCurrentFile('')
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
      setIsExporting(false)
      setExportProgress(0)
      setCurrentFile('')
    }
  }

  const handleExportSegment = async (segment: Segment) => {
    const segmentVideoCount = getSegmentVideoCount(segment)
    
    if (segmentVideoCount === 0) {
      setError(`No videos available in ${segment.name}`)
      return
    }

    try {
      setIsExporting(true)
      setError(null)
      setExportProgress(0)
      setCurrentFile('')

      await exportSegmentVideos(
        segment, 
        projectName,
        (progress, filename) => {
          setExportProgress(progress)
          setCurrentFile(filename)
        }
      )

      setExportProgress(100)
      setCurrentFile('Export completed!')
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress(0)
        setCurrentFile('')
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
      setIsExporting(false)
      setExportProgress(0)
      setCurrentFile('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Export Progress */}
      {isExporting && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/90">Exporting...</span>
            <span className="text-sm text-white/90">{Math.round(exportProgress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${exportProgress}%` }}
            ></div>
          </div>
          {currentFile && (
            <p className="text-xs text-white/60 truncate">{currentFile}</p>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-red-300 hover:text-red-200 text-xs mt-1 underline transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Export All */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/90">Export All</h3>
        <button 
          onClick={handleExportAll}
          disabled={!hasVideos || isExporting}
          className="w-full py-3 px-4 bg-yellow-400/20 border border-yellow-400 rounded-lg text-yellow-400 hover:bg-yellow-400/30 disabled:bg-white/5 disabled:border-white/10 disabled:text-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          {isExporting ? 'Exporting...' : `Export All Videos (${totalVideos} videos as ZIP)`}
        </button>
      </div>

      {/* Export One (By Segment) */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/90">Export One</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {segments.map((segment) => {
            const segmentVideoCount = getSegmentVideoCount(segment)
            
            return (
              <button 
                key={segment.id}
                onClick={() => handleExportSegment(segment)}
                disabled={segmentVideoCount === 0 || isExporting}
                className="w-full py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 disabled:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${segmentVideoCount > 0 ? 'bg-yellow-400' : 'bg-white/60'}`}></div>
                    <span>{segment.name}</span>
                  </div>
                  <span className="text-white/60 text-xs">
                    {segmentVideoCount} video{segmentVideoCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </button>
            )
          })}
          
          {segments.length === 0 && (
            <div className="text-center py-8 text-white/40">
              <p className="text-sm">No segments available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Export
