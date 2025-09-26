"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSegments } from '@/hooks/useSegments'
import { VideoTemplate, TemplateService } from '@/services/template'
import { VideoGenerationService } from '@/services/video-generation'
import { getVideoUrl } from '@/lib/video-utils'
import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'
import Segement from '@/components/Video/Segement'

const VideoPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { isAuthenticated, loading, token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get project data from search parameters
  const projectId = searchParams.get('projectId')
  const videoUrl = searchParams.get('videoUrl')
  const templateDescription = searchParams.get('templateDescription')
  const templateId = searchParams.get('templateId')
  
  // Initialize segments hook with initial template data
  const {
    segments,
    activeSegment,
    loading: segmentLoading,
    error: segmentError,
    createSegment,
    selectSegment,
    setSegmentTemplate,
    generateVideo,
    navigateVideo,
    canCreateSegment,
    isChatEnabled
  } = useSegments(projectId || undefined, {
    templateId: templateId || undefined,
    videoUrl: videoUrl || undefined,
    description: templateDescription || undefined
  })
  
  // Debug logging
  React.useEffect(() => {
    console.log('🎬 Video Page: Received search params:', {
      projectId,
      videoUrl,
      templateDescription,
      templateId
    })
    console.log('🎬 Video Page: Segments state:', {
      segmentCount: segments.length,
      activeSegmentId: activeSegment?.id,
      activeSegmentTemplate: activeSegment?.template,
      segmentError
    })
    
    // Debug logging for preview data
    console.log('🎬 Video Page: Preview data:', {
      hasTemplate: !!activeSegment?.template,
      templateVideo: activeSegment?.template ? { 
        s3Key: activeSegment.template.s3Key, 
        description: activeSegment.template.description 
      } : null,
      generatedVideosCount: activeSegment?.videos.length || 0,
      currentVideoIndex: activeSegment?.currentVideoIndex || 0,
      previewVideoUrl: activeSegment?.template?.s3Key
    })
  }, [projectId, videoUrl, templateDescription, templateId, segments, activeSegment, segmentError])

  // Ensure component is mounted on client side
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Handle initial template data from URL parameters - only once when first segment is ready
  React.useEffect(() => {
    const applyInitialTemplate = async () => {
      // Only apply if we have template data from URL and the first segment exists without a template
      if (mounted && isAuthenticated && segments.length > 0 && !segments[0].template && (templateId || (videoUrl && templateDescription))) {
        const firstSegment = segments[0]
        
        console.log('🎬 Video Page: Applying initial template to first segment:', {
          templateId,
          videoUrl,
          templateDescription,
          firstSegmentId: firstSegment.id
        })
        
        try {
          if (templateId && token) {
            // Try to find template in paginated results
            const response = await TemplateService.fetchTemplates({ token, page: 1, limit: 20 })
            const template = response.data.find(t => t.id === templateId)
            
            if (template) {
              setSegmentTemplate(firstSegment.id, template)
              console.log('✅ Applied template from paginated results:', template)
              return
            } else {
              console.warn('Template not found in first page, trying additional pages...')
              // Try a few more pages to find the template
              for (let page = 2; page <= 5; page++) {
                try {
                  const nextResponse = await TemplateService.fetchTemplates({ token, page, limit: 20 })
                  const foundTemplate = nextResponse.data.find(t => t.id === templateId)
                  if (foundTemplate) {
                    setSegmentTemplate(firstSegment.id, foundTemplate)
                    console.log(`✅ Applied template from page ${page}:`, foundTemplate)
                    return
                  }
                } catch (error) {
                  console.warn(`Failed to fetch page ${page}:`, error)
                  break
                }
              }
            }
          }
          
          // Fallback: create template object from URL parameters
          if (videoUrl && templateDescription) {
            const templateFromUrl: VideoTemplate = {
              id: templateId || 'url-template',
              description: templateDescription,
              jsonPrompt: '{}', // Default empty JSON prompt
              s3Key: videoUrl,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
            
            setSegmentTemplate(firstSegment.id, templateFromUrl)
            console.log('✅ Applied template from URL parameters:', templateFromUrl)
          }
        } catch (error) {
          console.error('❌ Failed to apply initial template:', error)
        }
      }
    }

    // Only run once when conditions are met
    if (segments.length > 0 && !segments[0].template) {
      applyInitialTemplate()
    }
  }, [mounted, isAuthenticated, token, segments.length, templateId, videoUrl, templateDescription, setSegmentTemplate])

  // Handle template selection from sidebar
  const handleTemplateSelect = React.useCallback((template: VideoTemplate) => {
    if (activeSegment) {
      console.log('🎬 Video Page: Template selected for segment:', activeSegment.id, template)
      setSegmentTemplate(activeSegment.id, template)
    }
  }, [activeSegment, setSegmentTemplate])

  // Handle chat message submission
  const handleChatMessage = React.useCallback(async (message: string) => {
    if (activeSegment && isChatEnabled(activeSegment.id)) {
      console.log('🎬 Video Page: Generating video for segment:', activeSegment.id, message)
      await generateVideo(activeSegment.id, message)
    }
  }, [activeSegment, isChatEnabled, generateVideo])

  // Handle video navigation
  const handleVideoNavigation = React.useCallback((direction: 'next' | 'prev') => {
    if (activeSegment) {
      navigateVideo(activeSegment.id, direction)
    }
  }, [activeSegment, navigateVideo])

  // Redirect to home if not authenticated
  React.useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push('/')
    }
  }, [mounted, isAuthenticated, loading, router])

  // Show loading while mounting or checking auth
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#111215] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F9D312] mx-auto mb-4"></div>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated after mount, show nothing (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  // Prepare segment data for the Segment component
  const segmentData = segments.map(segment => ({
    id: segment.id,
    name: segment.name,
    isActive: segment.isActive,
    hasTemplate: !!segment.template,
    videoCount: segment.videos.length,
    templateVideoUrl: segment.template ? getVideoUrl(segment.template.s3Key) : undefined
  }))

  // Prepare preview data - include template video as first item if it exists
  const templateVideo = activeSegment?.template ? {
    s3Key: activeSegment.template.s3Key,
    description: `Template: ${activeSegment.template.description}`,
    isTemplate: true
  } : null

  const generatedVideos = activeSegment?.videos.map(video => ({
    s3Key: video.s3Key,
    description: video.description,
    isTemplate: false
  })) || []

  // Combine template video with generated videos
  const allVideos = templateVideo ? [templateVideo, ...generatedVideos] : generatedVideos
  const currentVideoIndex = activeSegment?.currentVideoIndex || 0
  
  // Adjust index to account for template video being first
  const adjustedIndex = templateVideo ? currentVideoIndex : Math.max(0, currentVideoIndex - 1)
  const previewVideoUrl = activeSegment?.template?.s3Key


  return (
    <div className="min-h-screen bg-[#111215] text-white">
      <Header />
      <div className={`flex h-[calc(100vh-64px)] transition-all duration-300 ${sidebarOpen ? 'ml-[29rem]' : 'ml-20'}`}>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 min-h-0">
            <Preview 
              videoUrl={previewVideoUrl}
              templateDescription={activeSegment?.template?.description}
              templateJsonPrompt={activeSegment?.template?.jsonPrompt}
              generatedVideos={allVideos}
              currentVideoIndex={currentVideoIndex}
              onNavigateVideo={handleVideoNavigation}
            />
          </div>
          <Segement 
            segments={segmentData}
            onSelectSegment={selectSegment}
            onCreateSegment={createSegment}
            canCreateSegment={canCreateSegment}
            loading={segmentLoading}
          />
          <Chat 
            isEnabled={activeSegment ? isChatEnabled(activeSegment.id) : false}
            onSendMessage={handleChatMessage}
            loading={segmentLoading}
          />
        </div>
      </div>
      <Sidebar 
        isOpen={sidebarOpen} 
        setOpen={setSidebarOpen}
        onTemplateSelect={handleTemplateSelect}
        segments={segments}
      />
      
      {/* Error Display */}
      {segmentError && (
        <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm">{segmentError}</p>
        </div>
      )}
    </div>
  )
}

export default VideoPage

