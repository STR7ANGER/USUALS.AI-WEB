import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { SegmentService, Segment } from '@/services/segment'

interface SegmentCard {
  id: string
  type: 'blank' | 'template'
  videoUrl?: string
  description?: string
  templateId?: string
}

interface SegementProps {
  projectId?: string
  initialTemplateData?: {
    videoUrl?: string
    description?: string
    templateId?: string
  }
}

const Segement = ({ projectId, initialTemplateData }: SegementProps) => {
  const { token } = useAuth()
  const [segments, setSegments] = useState<SegmentCard[]>([])
  const [loading, setLoading] = useState(false)
  const hasCreatedInitialSegmentRef = useRef(false)
  const maxCards = 5

  // Initialize segments - run only once when we have all required data
  useEffect(() => {
    // Prevent multiple initializations using ref (doesn't trigger re-renders)
    if (hasCreatedInitialSegmentRef.current) {
      console.log('🎬 Segment: Already created initial segment, skipping')
      return
    }

    // Wait for required data to be available
    if (!projectId || !token) {
      console.log('🎬 Segment: Waiting for projectId and token...', { projectId: !!projectId, token: !!token })
      return
    }

    console.log('🎬 Segment: Creating SINGLE segment...', { projectId, hasTemplate: !!initialTemplateData })
    
    const initializeSegments = async () => {
      try {
        setLoading(true)
        hasCreatedInitialSegmentRef.current = true // Set immediately to prevent race conditions
        
        // Create ONE segment - either template or blank
        const newSegment = await SegmentService.createSegment(token, {
          type: 'web',
          description: 'web',
          projectId: projectId
        })

        if (initialTemplateData) {
          setSegments([{
            id: newSegment.id,
            type: 'template',
            videoUrl: initialTemplateData.videoUrl,
            description: initialTemplateData.description,
            templateId: initialTemplateData.templateId
          }])
          console.log('🎬 Segment: Template segment created successfully', newSegment.id)
        } else {
          setSegments([{
            id: newSegment.id,
            type: 'blank'
          }])
          console.log('🎬 Segment: Blank segment created successfully', newSegment.id)
        }
        
      } catch (error) {
        console.error('Failed to create initial segment:', error)
        // Fallback to local segments without backend
        if (initialTemplateData) {
          setSegments([{
            id: '1',
            type: 'template',
            videoUrl: initialTemplateData.videoUrl,
            description: initialTemplateData.description,
            templateId: initialTemplateData.templateId
          }])
        } else {
          setSegments([{ id: '1', type: 'blank' }])
        }
      } finally {
        setLoading(false)
      }
    }

    initializeSegments()
  }, [projectId, token, initialTemplateData]) // Removed hasCreatedInitialSegment from dependencies!


  const addVideoCard = async () => {
    if (segments.length >= maxCards || !projectId || !token) return

    try {
      setLoading(true)
      const newSegment = await SegmentService.createSegment(token, {
        type: 'web',
        description: 'web',
        projectId: projectId
      })

      setSegments(prev => [...prev, {
        id: newSegment.id,
        type: 'blank'
      }])
    } catch (error) {
      console.error('Failed to create segment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center justify-center flex-wrap">
        {/* Existing Video Cards */}
        {segments.map((segment) => (
          <div key={segment.id} className="bg-white/5 rounded-lg w-32 h-20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative overflow-hidden">
            {segment.type === 'template' && segment.videoUrl ? (
              // Template preview with video thumbnail
              <video
                src={segment.videoUrl}
                className="w-full h-full object-cover rounded-lg"
                muted
                loop
                playsInline
              />
            ) : (
              // Blank segment with play icon
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white" fillOpacity="0.7"/>
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Add New Segment Card - only show if under max limit */}
        {segments.length < maxCards && (
          <div 
            className="bg-white/5 rounded-lg w-32 h-20 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-colors"
            onClick={addVideoCard}
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
