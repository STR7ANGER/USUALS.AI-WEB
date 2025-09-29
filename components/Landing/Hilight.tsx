"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { useTrending } from '../../hooks/useTrending'
import { ProjectService } from '@/services/project'

interface DisplayCard {
  id?: string
  title: string
  subtitle: string
  img?: string
  videoUrl?: string
}

// Hardcoded Solana templates (show images from public/solana)
const SOLANA_TEMPLATES: DisplayCard[] = [
  {
    id: "solana-1",
    title: "SOLANA MEME",
    subtitle: "{\n  \"shot\": {\n    \"composition\": \"medium close-up, eye-level framing with shallow depth of field for intimacy\",\n    \"camera_motion\": \"gentle dolly-in to emphasize connection and focus\",\n    \"frame_rate\": \"24fps for cinematic feel\",\n    \"film_grain\": \"subtle digital clean look with light cinematic LUT highlighting warm skin tones and brand colors\"\n  },\n  \"subject\": {\n    \"description\": \"charismatic entrepreneur with approachable facial features, confident and passionate demeanor\",\n    \"wardrobe\": \"smart-casual outfit aligned with brand theme (neutral base with accent color matching brand palette)\",\n    \"action\": \"steady eye contact with camera, natural hand gestures, slight forward lean to convey sincerity\"\n  },\n  \"scene\": {\n    \"location\": \"modern minimalist studio or branded office space with clean lines and subtle brand elements in the background\",\n    \"time_of_day\": \"neutral controlled lighting, soft key light with balanced fill for professional look\",\n    \"environment\": \"calm, focused atmosphere with subtle branded props (e.g., product placement, brand colors on set)\"\n  },\n  \"audio\": {\n    \"ambient\": \"clean studio background with minimal ambient noise\",\n    \"voice\": {\n      \"source\": \"external narration provided\",\n      \"tone\": \"confident, engaging, and authentic\",\n      \"style\": \"clear storytelling pace that matches visual delivery\"\n    }\n  },\n  \"visual_rules\": {\n    \"prohibited_elements\": [\"distracting background clutter\", \"overexposed lighting\", \"stock-like visuals\", \"animated text overlays\", \"unnatural camera shake\"]\n  },\n  \"brand_integration\": {\n    \"platform_name\": \"Your Brand\",\n    \"visual_theme\": \"professional, authentic, and trustworthy\",\n    \"color_palette\": [\"brand primary color\", \"secondary neutral tones\", \"accent highlight color\"],\n    \"logo_appearance\": \"naturally integrated (on wall signage, desk accessory, or subtle product placement), never as a floating overlay\"\n  }\n}",
    img: "https://ds0fghatf06yb.cloudfront.net/memetemplate/1.jpeg"
  },
  {
    id: "solana-2", 
    title: "SOLANA MEME-2",
    subtitle: "{\n  \"shot\": {\n    \"composition\": \"medium close-up, eye-level framing with shallow depth of field for intimacy\",\n    \"camera_motion\": \"gentle dolly-in to emphasize connection and focus\",\n    \"frame_rate\": \"24fps for cinematic feel\",\n    \"film_grain\": \"subtle digital clean look with light cinematic LUT highlighting warm skin tones and brand colors\"\n  },\n  \"subject\": {\n    \"description\": \"charismatic entrepreneur with approachable facial features, confident and passionate demeanor\",\n    \"wardrobe\": \"smart-casual outfit aligned with brand theme (neutral base with accent color matching brand palette)\",\n    \"action\": \"steady eye contact with camera, natural hand gestures, slight forward lean to convey sincerity\"\n  },\n  \"scene\": {\n    \"location\": \"modern minimalist studio or branded office space with clean lines and subtle brand elements in the background\",\n    \"time_of_day\": \"neutral controlled lighting, soft key light with balanced fill for professional look\",\n    \"environment\": \"calm, focused atmosphere with subtle branded props (e.g., product placement, brand colors on set)\"\n  },\n  \"audio\": {\n    \"ambient\": \"clean studio background with minimal ambient noise\",\n    \"voice\": {\n      \"source\": \"external narration provided\",\n      \"tone\": \"confident, engaging, and authentic\",\n      \"style\": \"clear storytelling pace that matches visual delivery\"\n    }\n  },\n  \"visual_rules\": {\n    \"prohibited_elements\": [\"distracting background clutter\", \"overexposed lighting\", \"stock-like visuals\", \"animated text overlays\", \"unnatural camera shake\"]\n  },\n  \"brand_integration\": {\n    \"platform_name\": \"Your Brand\",\n    \"visual_theme\": \"professional, authentic, and trustworthy\",\n    \"color_palette\": [\"brand primary color\", \"secondary neutral tones\", \"accent highlight color\"],\n    \"logo_appearance\": \"naturally integrated (on wall signage, desk accessory, or subtle product placement), never as a floating overlay\"\n  }\n}",
    img: "https://ds0fghatf06yb.cloudfront.net/memetemplate/2.jpeg"
  },
  {
    id: "solana-3",
    title: "SOLANA MEME-3",
    subtitle: "{\n  \"shot\": {\n    \"composition\": \"medium close-up, eye-level framing with shallow depth of field for intimacy\",\n    \"camera_motion\": \"gentle dolly-in to emphasize connection and focus\",\n    \"frame_rate\": \"24fps for cinematic feel\",\n    \"film_grain\": \"subtle digital clean look with light cinematic LUT highlighting warm skin tones and brand colors\"\n  },\n  \"subject\": {\n    \"description\": \"charismatic entrepreneur with approachable facial features, confident and passionate demeanor\",\n    \"wardrobe\": \"smart-casual outfit aligned with brand theme (neutral base with accent color matching brand palette)\",\n    \"action\": \"steady eye contact with camera, natural hand gestures, slight forward lean to convey sincerity\"\n  },\n  \"scene\": {\n    \"location\": \"modern minimalist studio or branded office space with clean lines and subtle brand elements in the background\",\n    \"time_of_day\": \"neutral controlled lighting, soft key light with balanced fill for professional look\",\n    \"environment\": \"calm, focused atmosphere with subtle branded props (e.g., product placement, brand colors on set)\"\n  },\n  \"audio\": {\n    \"ambient\": \"clean studio background with minimal ambient noise\",\n    \"voice\": {\n      \"source\": \"external narration provided\",\n      \"tone\": \"confident, engaging, and authentic\",\n      \"style\": \"clear storytelling pace that matches visual delivery\"\n    }\n  },\n  \"visual_rules\": {\n    \"prohibited_elements\": [\"distracting background clutter\", \"overexposed lighting\", \"stock-like visuals\", \"animated text overlays\", \"unnatural camera shake\"]\n  },\n  \"brand_integration\": {\n    \"platform_name\": \"Your Brand\",\n    \"visual_theme\": \"professional, authentic, and trustworthy\",\n    \"color_palette\": [\"brand primary color\", \"secondary neutral tones\", \"accent highlight color\"],\n    \"logo_appearance\": \"naturally integrated (on wall signage, desk accessory, or subtle product placement), never as a floating overlay\"\n  }\n}",
    img: "https://ds0fghatf06yb.cloudfront.net/memetemplate/3.jpeg"
  }
]

const Hilight = () => {
  const router = useRouter()
  const { isAuthenticated, token, login } = useAuth()
  const { trendingTemplates, loading: trendingLoading, fetchByDescription } = useTrending()
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({})
  const [activeTag, setActiveTag] = useState<string>("Solana")
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

  const handleCardClick = async (card: DisplayCard) => {
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
      if (card.videoUrl) {
        params.append('videoUrl', card.videoUrl)
      }
      
      // Include template description if available
      if (card.subtitle) {
        params.append('templateDescription', card.subtitle)
      }
      
      // Include template ID if available (for fetching jsonPrompt)
      if (card.id) {
        params.append('templateId', card.id)
      }
      
      // For Solana templates, include the image path
      if (card.id?.startsWith('solana-') && card.img) {
        params.append('imageS3Key', card.img)
      }
      
      const finalUrl = `/video?${params.toString()}`
      router.push(finalUrl)
    } catch (e) {
      console.error('Failed to create project from hilight click', e)
    }
  }

  const handleTagClick = async (tag: string) => {
    setActiveTag(tag)
    // Don't make backend request for Solana tag
    if (tag === "Solana") {
      return
    }
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
      setShowSearchInput(false)
    }
  }

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput)
    if (showSearchInput) {
      setSearchValue("")
    }
  }

  // Initial load regardless of auth - only for non-Solana tags
  useEffect(() => {
    if (!initialFetchDone.current && activeTag !== "Solana" && trendingTemplates.length === 0 && !trendingLoading) {
      initialFetchDone.current = true
      if (activeTag === "") {
        setActiveTag("Trending")
        fetchByDescription("Trending")
      }
    }
  }, [activeTag, trendingTemplates.length, trendingLoading, fetchByDescription])

  // Map templates for display - use Solana templates if Solana tag is active
  const displayCards: DisplayCard[] = activeTag === "Solana" 
    ? SOLANA_TEMPLATES 
    : trendingTemplates.map(template => ({
        id: template.id,
        title: template.description.toUpperCase(),
        subtitle: template.description,
        videoUrl: template.s3Key
      }))

  return (
    <section className="w-full px-4 pb-10 pt-6 md:px-6">
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        {/* Solana tag (default) */}
        <span 
          className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
            activeTag === "Solana"
              ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' 
              : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
          }`}
          onClick={() => handleTagClick("Solana")}
        >
          Solana
        </span>
        
        {/* Trending tag */}
        <span 
          className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
            activeTag === "Trending"
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
        
        {/* Big Search - aligned right; input inline pushes button left */}
        <div className="ml-auto flex items-center gap-2">
          {showSearchInput && (
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search templates..."
                className="bg-black border-0 border-b-2 border-yellow-400 px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:border-b-yellow-400 min-w-[200px]"
                autoFocus
                onBlur={() => {
                  setTimeout(() => setShowSearchInput(false), 200)
                }}
              />
            </form>
          )}
          <button 
            className="cursor-pointer p-2 text-white/80 hover:text-white transition-colors"
            onClick={handleSearchIconClick}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {trendingLoading && activeTag !== "Solana" ? (
          // Skeleton loading for trending templates (not for Solana)
          Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className="overflow-hidden rounded-xl bg-white/5">
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
          displayCards.slice(0, 3).map((card, index) => (
            <article key={card.id || card.title} className="group overflow-hidden rounded-xl bg-black cursor-pointer" onClick={() => handleCardClick(card)}>
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
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] rounded-b-xl"
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
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03] rounded-b-xl" 
                  />
                )}
              </div>
              <div className="p-4 bg-black">
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
