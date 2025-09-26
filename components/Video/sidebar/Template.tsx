"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useTrending } from '../../../hooks/useTrending'
import { getVideoUrl } from '../../../lib/video-utils'

interface DisplayCard {
  id?: string
  title: string
  subtitle: string
  img?: string
  videoUrl?: string
}

interface TemplateProps {
  onTemplateSelect?: (template: {
    id: string;
    description: string;
    jsonPrompt: string;
    s3Key: string;
  }) => void;
}

const Template = ({ onTemplateSelect }: TemplateProps) => {
  const { trendingTemplates, loading: trendingLoading, fetchByDescription } = useTrending()
  const [activeTag, setActiveTag] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const initialFetchDone = useRef<boolean>(false)
  const [customTags, setCustomTags] = useState<string[]>([])
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const handleTagClick = async (tag: string) => {
    setActiveTag(tag)
    try {
      await fetchByDescription(tag)
    } catch (error) {
      console.error('Error fetching templates for tag:', tag, error)
    }
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
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
    }
  }

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

  const handleTemplateClick = (card: DisplayCard) => {
    if (onTemplateSelect && card.id) {
      // Find the full template data from trending templates
      const fullTemplate = trendingTemplates.find(t => t.id === card.id)
      if (fullTemplate) {
        onTemplateSelect({
          id: fullTemplate.id,
          description: fullTemplate.description,
          jsonPrompt: fullTemplate.jsonPrompt,
          s3Key: fullTemplate.s3Key
        })
      }
    }
  }


  // Initial load
  useEffect(() => {
    if (!initialFetchDone.current && !activeTag && trendingTemplates.length === 0 && !trendingLoading) {
      initialFetchDone.current = true
      setActiveTag("Trending")
      fetchByDescription("Trending")
    }
  }, [activeTag, trendingTemplates.length, trendingLoading])

  // Default static content
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
    },
    {
      title: 'BEAUTY PRODUCTS',
      subtitle: 'Elegant Beauty Product Showcase',
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop'
    }
  ]

  // Use trending templates if loaded, otherwise use default cards
  const displayCards: DisplayCard[] = trendingTemplates.length > 0 
    ? trendingTemplates.map(template => ({
        id: template.id,
        title: template.description.toUpperCase(),
        subtitle: template.description,
        videoUrl: getVideoUrl(template.s3Key)
      }))
    : defaultCards

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Templates..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </form>

      {/* Category Tags */}
      <div className="flex items-center gap-2 flex-wrap">
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
      </div>

      
      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {trendingLoading ? (
          // Skeleton loading
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative w-full h-24 bg-gray-700 rounded-lg animate-pulse"></div>
          ))
        ) : (
          displayCards.map((card, index) => (
            <div key={card.id || card.title} className="cursor-pointer" onClick={() => handleTemplateClick(card)}>
              <div 
                className="relative w-full h-24 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all"
                onMouseEnter={() => card.videoUrl && handleVideoHover(card.id || card.title, true)}
                onMouseLeave={() => card.videoUrl && handleVideoHover(card.id || card.title, false)}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                {card.videoUrl ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[card.id || card.title] = el
                    }}
                    src={card.videoUrl}
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Template
