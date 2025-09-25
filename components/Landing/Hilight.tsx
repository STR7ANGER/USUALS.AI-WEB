"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from '../../hooks/useAuth'
import { useTrending } from '../../hooks/useTrending'

interface DisplayCard {
  id?: string
  title: string
  subtitle: string
  img?: string
  videoUrl?: string
}

const Hilight = () => {
  const { isAuthenticated } = useAuth()
  const { trendingTemplates, loading: trendingLoading, fetchByDescription } = useTrending()
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({})
  const [activeTag, setActiveTag] = useState<string>("")
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const initialFetchDone = useRef<boolean>(false)
  const [customTags, setCustomTags] = useState<string[]>([])
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const handleVideoHover = (cardId: string, isHovering: boolean) => {
    const video = videoRefs.current[cardId]
    if (video) {
      if (isHovering) {
        setHoveredVideo(cardId)
        video.play().catch(console.error)
      } else {
        setHoveredVideo(null)
        video.pause()
        video.currentTime = 0
      }
    }
  }

  const handleTagClick = async (tag: string) => {
    if (isAuthenticated) {
      setActiveTag(tag)
      try {
        await fetchByDescription(tag)
      } catch (error) {
        console.error('Error fetching templates for tag:', tag, error)
      }
    }
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim() && isAuthenticated) {
      const newTag = searchValue.trim()
      setActiveTag(newTag)
      // Replace the old custom tag with the new one (only keep one custom tag)
      setCustomTags([newTag])
      try {
        await fetchByDescription(newTag)
      } catch (error) {
        console.error('Error fetching templates for search:', newTag, error)
      }
      setSearchValue("")
      setShowSearchInput(false)
    }
  }

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput)
    if (showSearchInput) {
      setSearchValue("")
    }
  }

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated && !initialFetchDone.current && !activeTag && trendingTemplates.length === 0 && !trendingLoading) {
      initialFetchDone.current = true
      setActiveTag("Trending")
      fetchByDescription("Trending")
    }
    
    // Reset when not authenticated
    if (!isAuthenticated) {
      initialFetchDone.current = false
    }
  }, [isAuthenticated, activeTag, trendingTemplates.length, trendingLoading])

  // Default static content for logged out users
  const defaultCards: DisplayCard[] = [
    {
      title: 'CINEMATIC STORYTELLING',
      subtitle: 'Step Into a Mysterious World With a Futuristic Character',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'
    },
    {
      title: 'PRODUCT SHOWCASE',
      subtitle: 'Professional Video for Your Organic Food Business',
      img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop'
    },
    {
      title: 'CAMERA MOVEMENT',
      subtitle: 'Dance Class Recorded From Above With Motion',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
    }
  ]

  // Use trending templates if logged in and loaded, otherwise use default cards
  const displayCards: DisplayCard[] = isAuthenticated && trendingTemplates.length > 0 
    ? trendingTemplates.map(template => ({
        id: template.id,
        title: template.description.toUpperCase(),
        subtitle: template.description,
        videoUrl: template.s3Key
      }))
    : defaultCards

  return (
    <section className="w-full px-4 pb-10 pt-6 md:px-6">
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        {/* Trending tag (default) */}
        <span 
          className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
            activeTag === "Trending" || !activeTag
              ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' 
              : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
          }`}
          onClick={() => handleTagClick("Trending")}
        >
          Trending
        </span>
        
        {/* Default tags */}
        {['Beauty Products','Product Pitch','Tech Demo','Crypto Explainer'].map((chip)=> (
          <span 
            key={chip} 
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
              activeTag === chip 
                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' 
                : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
            }`}
            onClick={() => handleTagClick(chip)}
          >
            {chip}
          </span>
        ))}
        
        {/* Custom tags */}
        {customTags.map((tag) => (
          <span 
            key={tag} 
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
              activeTag === tag 
                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' 
                : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
        
        {/* Big Search Icon - right after the tags */}
        <div className="relative">
          <button 
            className="cursor-pointer p-2 text-white/80 hover:text-white transition-colors"
            onClick={handleSearchIconClick}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Search input - appears to the right with yellow bottom border */}
          {showSearchInput && (
            <form onSubmit={handleSearchSubmit} className="absolute top-0 left-full ml-2 z-10">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search templates..."
                className="bg-black border-0 border-b-2 border-yellow-400 px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:border-b-yellow-400 min-w-[200px]"
                autoFocus
                onBlur={() => {
                  // Close input after a short delay to allow form submission
                  setTimeout(() => setShowSearchInput(false), 200)
                }}
              />
            </form>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {isAuthenticated && trendingLoading ? (
          // Skeleton loading for trending templates
          Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative aspect-[16/9] w-full">
                <div className="h-full w-full bg-gray-700 animate-pulse"></div>
              </div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-5 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </article>
          ))
        ) : (
          displayCards.map((card, index) => (
            <article key={card.id || card.title} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div 
                className="relative aspect-[16/9] w-full cursor-pointer"
                onMouseEnter={() => card.videoUrl && handleVideoHover(card.id || card.title, true)}
                onMouseLeave={() => card.videoUrl && handleVideoHover(card.id || card.title, false)}
              >
                {card.videoUrl ? (
                  <>
                    {/* Video thumbnail - always show video, play on hover */}
                    <video
                      ref={(el) => {
                        videoRefs.current[card.id || card.title] = el
                      }}
                      src={card.videoUrl}
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      onLoadedData={() => setVideoLoaded(prev => ({ ...prev, [card.id || card.title]: true }))}
                    />
                    {/* Loading skeleton while video loads */}
                    {!videoLoaded[card.id || card.title] && (
                      <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
                    )}
                  </>
                ) : (
                  <Image 
                    src={card.img || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'} 
                    alt={card.title} 
                    fill 
                    sizes="(min-width: 768px) 33vw, 100vw" 
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" 
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold tracking-wide text-white">{card.title}</h3>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Hilight
