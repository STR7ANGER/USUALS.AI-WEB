"use client"

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSegments } from '@/hooks/useSegments'
import { useExistingProject } from '@/hooks/useExistingProject'
import { VideoTemplate, TemplateService } from '@/services/template'
import { getVideoUrl } from '@/lib/video-utils'
import { SIDEBAR_WIDTH, SIDEBAR_RAIL_WIDTH } from '@/lib/constants'
import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'
import Segement from '@/components/Video/Segement'

const VideoPageContent = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { isAuthenticated, loading, token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get project data from search parameters
  const projectId = searchParams?.get('projectId')
  const projectName = searchParams?.get('projectName')
  const isExisting = searchParams?.get('isExisting') === 'true'
  const videoUrl = searchParams?.get('videoUrl')
  const templateDescription = searchParams?.get('templateDescription')
  const templateId = searchParams?.get('templateId')
  
  // Use different hooks based on whether this is an existing project or new project
  const existingProjectData = useExistingProject(
    isExisting ? (projectId || null) : null,
    isExisting ? (projectName || null) : null
  );

  // Initialize segments hook with initial template data (for new projects)
  const newProjectData = useSegments(
    !isExisting ? (projectId || undefined) : undefined, 
    {
      templateId: templateId || undefined,
      videoUrl: videoUrl || undefined,
      description: templateDescription || undefined
    }
  );

  // Choose which data to use based on project type
  const {
    segments,
    loading: segmentLoading,
    error: segmentError,
    canCreateSegment = false,
  } = isExisting ? {
    segments: existingProjectData.segments.map((seg, index) => ({
      id: seg.id,
      name: `Segment ${index + 1}`, // Fix: Use proper segment names
      isActive: false, // We'll handle active state differently for existing projects
      template: null, // Existing projects don't use templates in the same way
      videos: seg.videos.map(video => ({
        id: video.id,
        s3Key: video.s3Key,
        description: video.description,
        optimizedPrompt: video.jsonPrompt?.prompt || '',
        segmentId: seg.id,
        createdAt: video.createdAt
      })),
      currentVideoIndex: 0,
      backendSegment: seg // Use the existing segment as backendSegment
    })),
    loading: existingProjectData.loading,
    error: existingProjectData.error,
    canCreateSegment: false, // Never show + segment button for existing projects
  } : {
    segments: newProjectData.segments,
    loading: newProjectData.loading,
    error: newProjectData.error,
    canCreateSegment: newProjectData.canCreateSegment,
  };

  // For existing projects, we'll use the first segment as active, or create a simple active state
  const [activeSegmentIndex, setActiveSegmentIndex] = React.useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);

  // Prepare preview data based on project type - moved to top to maintain hook order
  const previewData = React.useMemo(() => {
    let templateVideo: { s3Key: string; description: string; isTemplate: boolean } | null = null;
    let generatedVideos: { s3Key: string; description: string; isTemplate: boolean }[] = [];
    let videoIndex = 0;
    let previewVideoUrl: string | null = null;

    const activeSegment = isExisting 
      ? (segments.length > 0 ? segments[activeSegmentIndex] : null)
      : newProjectData.activeSegment;

    if (isExisting && activeSegment) {
      // For existing projects, show the videos directly
      generatedVideos = activeSegment.videos.map(video => ({
        s3Key: video.s3Key,
        description: video.description,
        isTemplate: false
      }));
      videoIndex = currentVideoIndex;
      previewVideoUrl = activeSegment.videos.length > 0 ? activeSegment.videos[videoIndex]?.s3Key : null;
    } else if (!isExisting && activeSegment) {
      // For new projects, include template video as first item if it exists
      templateVideo = activeSegment.template ? {
        s3Key: activeSegment.template.s3Key,
        description: `Template: ${activeSegment.template.description}`,
        isTemplate: true
      } : null;

      generatedVideos = activeSegment.videos.map(video => ({
        s3Key: video.s3Key,
        description: video.description,
        isTemplate: false
      }));
      
      videoIndex = activeSegment.currentVideoIndex || 0;
      previewVideoUrl = activeSegment.template?.s3Key || null;
    }

    // Combine template video with generated videos (for new projects)
    const allVideos = templateVideo ? [templateVideo, ...generatedVideos] : generatedVideos;
    
    return {
      templateVideo,
      generatedVideos,
      currentVideoIndex: videoIndex,
      previewVideoUrl,
      allVideos
    };
  }, [isExisting, segments, activeSegmentIndex, currentVideoIndex, newProjectData.activeSegment]);

  const { templateVideo, generatedVideos, currentVideoIndex: previewVideoIndex, previewVideoUrl, allVideos } = previewData;
  
  
  // activeSegment is now calculated inside useMemo above
  


  // Ensure component is mounted on client side
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Handle initial template data from URL parameters - only for new projects
  React.useEffect(() => {
    const applyInitialTemplate = async () => {
      // Only apply if this is a new project and we have template data from URL and the first segment exists without a template
      if (!isExisting && mounted && isAuthenticated && segments.length > 0 && !segments[0].template && (templateId || (videoUrl && templateDescription))) {
        const firstSegment = segments[0]
        
        
        try {
          if (templateId && token) {
            // Try to find template in paginated results
            const response = await TemplateService.fetchTemplates({ token, page: 1, limit: 20 })
            const template = response.data.find(t => t.id === templateId)
            
            if (template) {
              newProjectData.setSegmentTemplate(firstSegment.id, template)
              return
            } else {
              console.warn('Template not found in first page, trying additional pages...')
              // Try a few more pages to find the template
              for (let page = 2; page <= 5; page++) {
                try {
                  const nextResponse = await TemplateService.fetchTemplates({ token, page, limit: 20 })
                  const foundTemplate = nextResponse.data.find(t => t.id === templateId)
                  if (foundTemplate) {
                    newProjectData.setSegmentTemplate(firstSegment.id, foundTemplate)
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
            
            newProjectData.setSegmentTemplate(firstSegment.id, templateFromUrl)
          }
        } catch (error) {
          console.error('❌ Failed to apply initial template:', error)
        }
      }
    }

    // Only run once when conditions are met for new projects
    if (!isExisting && segments.length > 0 && !segments[0].template) {
      applyInitialTemplate()
    }
  }, [isExisting, mounted, isAuthenticated, token, segments.length, templateId, videoUrl, templateDescription, newProjectData])

  // Handle template selection from sidebar (only for new projects)
  const handleTemplateSelect = React.useCallback((template: { id: string; description: string; jsonPrompt: string; s3Key: string }) => {
    const currentActiveSegment = isExisting 
      ? (segments.length > 0 ? segments[activeSegmentIndex] : null)
      : newProjectData.activeSegment;
      
    
    if (!isExisting && currentActiveSegment) {
      // Convert to VideoTemplate format
      const videoTemplate: VideoTemplate = {
        ...template,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      newProjectData.setSegmentTemplate(currentActiveSegment.id, videoTemplate);
    } else {
    }
  }, [isExisting, segments, activeSegmentIndex, newProjectData])

  // Handle chat message submission (only for new projects)
  const handleChatMessage = React.useCallback(async (message: string) => {
    const currentActiveSegment = isExisting 
      ? (segments.length > 0 ? segments[activeSegmentIndex] : null)
      : newProjectData.activeSegment;
      
    if (!isExisting && currentActiveSegment && newProjectData.isChatEnabled(currentActiveSegment.id)) {
      await newProjectData.generateVideo(currentActiveSegment.id, message)
    }
  }, [isExisting, segments, activeSegmentIndex, newProjectData])

  // Handle video navigation
  const handleVideoNavigation = React.useCallback((direction: 'next' | 'prev') => {
    const currentActiveSegment = isExisting 
      ? (segments.length > 0 ? segments[activeSegmentIndex] : null)
      : newProjectData.activeSegment;
      
    if (currentActiveSegment) {
      if (isExisting) {
        // For existing projects, navigate through the videos in the current segment
        const currentIndex = currentActiveSegment.currentVideoIndex || 0;
        const maxIndex = currentActiveSegment.videos.length - 1;
        
        let newIndex = currentIndex;
        if (direction === 'next' && currentIndex < maxIndex) {
          newIndex = currentIndex + 1;
        } else if (direction === 'prev' && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
        
        // Update the current video index for existing projects
        setCurrentVideoIndex(newIndex);
        
      } else {
        newProjectData.navigateVideo(currentActiveSegment.id, direction)
      }
    }
  }, [isExisting, segments, activeSegmentIndex, newProjectData])

  // Handle segment selection
  const handleSelectSegment = React.useCallback((segmentId: string) => {
    if (isExisting) {
      const segmentIndex = segments.findIndex(seg => seg.id === segmentId);
      if (segmentIndex !== -1) {
        setActiveSegmentIndex(segmentIndex);
        setCurrentVideoIndex(0); // Reset to first video when switching segments
      }
    } else {
      newProjectData.selectSegment(segmentId);
    }
  }, [isExisting, segments, newProjectData])

  // Handle segment creation (only for new projects or existing projects with less than 5 segments)
  const handleCreateSegment = React.useCallback(async () => {
    if (!isExisting) {
      await newProjectData.createSegment();
    }
    // For existing projects, we don't create segments in this flow
  }, [isExisting, newProjectData])

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
  const segmentData = segments.map((segment, index) => ({
    id: segment.id,
    name: segment.name,
    isActive: isExisting ? (index === activeSegmentIndex) : segment.isActive,
    hasTemplate: isExisting ? segment.videos.length > 0 : !!segment.template,
    videoCount: segment.videos.length,
    templateVideoUrl: isExisting 
      ? (segment.videos.length > 0 ? getVideoUrl(segment.videos[0].s3Key) : undefined)
      : (segment.template ? getVideoUrl(segment.template.s3Key) : undefined)
  }))



  return (
    <div className="min-h-screen bg-[#111215] text-white">
      <Header projectName={isExisting ? (projectName || 'Untitled Project') : undefined} />
      <div className={`flex h-[calc(100vh-64px)] transition-all duration-300 ${sidebarOpen ? 'ml-96' : 'ml-20'}`}>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 min-h-0">
            <Preview 
              videoUrl={isExisting ? undefined : (previewVideoUrl || undefined)}
              templateDescription={isExisting ? undefined : newProjectData.activeSegment?.template?.description}
              templateJsonPrompt={isExisting ? undefined : newProjectData.activeSegment?.template?.jsonPrompt}
              generatedVideos={allVideos}
              currentVideoIndex={previewVideoIndex}
              onNavigateVideo={handleVideoNavigation}
            />
          </div>
          <Segement 
            segments={segmentData}
            onSelectSegment={handleSelectSegment}
            onCreateSegment={handleCreateSegment}
            canCreateSegment={canCreateSegment}
            loading={segmentLoading}
          />
          <Chat 
            isEnabled={!isExisting && newProjectData.activeSegment ? newProjectData.isChatEnabled(newProjectData.activeSegment.id) : false}
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
        projectName={projectName || 'Untitled Project'}
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

const VideoPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#111215] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F9D312] mx-auto mb-4"></div>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    }>
      <VideoPageContent />
    </Suspense>
  )
}

export default VideoPage

