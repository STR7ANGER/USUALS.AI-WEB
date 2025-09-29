"use client"

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTemplates } from '../../hooks/useTemplates'
import { useAuth } from '../../hooks/useAuth'
import { ProjectService } from '@/services/project'

const Template = () => {
  const router = useRouter()
  const { templates, loading, error, loadMore, hasMore } = useTemplates()
  const { isAuthenticated, token, login } = useAuth()
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({})
  const [mounted, setMounted] = useState(false)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Ensure component is mounted on client side to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Removed static templates; always show real templates


  const handleVideoHover = (templateId: string, isHovering: boolean) => {
    const video = videoRefs.current[templateId]
    if (video) {
      if (isHovering) {
        setHoveredVideo(templateId)
        video.play().catch(console.error)
      } else {
        setHoveredVideo(null)
        video.pause()
        video.currentTime = 0
      }
    }
  }

  const handleTemplateClick = async (template: { id?: string; s3Key?: string; description?: string }) => {
    try {
      const now = new Date()
      const name = `Web Project: ${now.toLocaleString()}`
      const description = 'web project'
      if (!isAuthenticated || !token) {
        await Promise.resolve(login())
        return
      }
      const project = await ProjectService.createProject(token, {
        name,
        description,
      })
      const projectId = project.id
      
      // Build URL parameters for template data
      const params = new URLSearchParams({
        projectId: projectId,
        name: name
      })
      
      // Include video URL if available
      if (template.s3Key) {
        params.append('videoUrl', template.s3Key)
      }
      
      // Include template description if available
      if (template.description) {
        params.append('templateDescription', template.description)
      }
      
      // Include template ID if available (for fetching jsonPrompt)
      if (template.id) {
        params.append('templateId', template.id)
      }
      
      const finalUrl = `/video?${params.toString()}`
      router.push(finalUrl)
    } catch (e) {
      console.error('Failed to create project from template click', e)
    }
  }


  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="w-full px-4 pb-16 pt-8 md:px-6">
        <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-yellow-400">TEMPLATES</h2>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative aspect-[16/9] w-full">
                <div className="h-full w-full bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-4 pb-16 pt-8 md:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-yellow-400">TEMPLATES</h2>

      {loading && templates.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-white">Loading templates...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-400">Error loading templates: {error}</div>
        </div>
      ) : templates.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-white">No templates found</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleTemplateClick(template)}
                onMouseEnter={() => handleVideoHover(template.id, true)}
                onMouseLeave={() => handleVideoHover(template.id, false)}
              >
                <div className="relative aspect-[16/9] w-full">
                  <video
                    ref={(el) => {
                      videoRefs.current[template.id] = el
                    }}
                    src={template.s3Key}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    poster=""
                    onLoadedData={() => setVideoLoaded(prev => ({ ...prev, [template.id]: true }))}
                  />
                  {!videoLoaded[template.id] && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-3 rounded-lg border border-yellow-400 bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 disabled:opacity-50 transition-all duration-200 font-medium"
              >
                {loading ? 'Loading More...' : 'Load More Templates'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Template
