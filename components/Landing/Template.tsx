"use client"

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useAuth } from '../../hooks/useAuth'
import { useTemplates } from '../../hooks/useTemplates'

const Template = () => {
  const { isAuthenticated } = useAuth()
  const { templates, loading, error, loadMore, hasMore } = useTemplates()
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Static templates for non-authenticated users
  const staticTemplates = [
    'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop',
  ]


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


  return (
    <section className="w-full px-4 pb-16 pt-8 md:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-yellow-400">TEMPLATES</h2>
      
      {isAuthenticated ? (
        // Authenticated user - show templates from backend
        <>
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
                      {/* Loading skeleton while video loads */}
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
                    className="px-4 py-2 rounded-md border border-yellow-400 bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        // Non-authenticated user - show static templates
        <div className="grid grid-cols-4 gap-4">
          {staticTemplates.map((src) => (
            <div key={src} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative aspect-[16/9] w-full">
                <Image 
                  src={src} 
                  alt="Template" 
                  fill 
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" 
                  className="object-cover" 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Template
