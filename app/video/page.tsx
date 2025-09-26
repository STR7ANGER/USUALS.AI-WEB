"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { TemplateService } from '@/services/template'
import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'
import Segement from '@/components/Video/Segement'

const VideoPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [templateData, setTemplateData] = React.useState<{
    description?: string;
    jsonPrompt?: string;
  }>({})
  const { isAuthenticated, loading, token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get template data from search parameters
  const videoUrl = searchParams.get('videoUrl')
  const templateDescription = searchParams.get('templateDescription')
  const templateId = searchParams.get('templateId')
  
  // Debug logging
  React.useEffect(() => {
    console.log('🎬 Video Page: Received search params:', {
      videoUrl,
      templateDescription,
      templateId
    })
  }, [videoUrl, templateDescription, templateId])

  // Ensure component is mounted on client side
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch template data when templateId is available
  React.useEffect(() => {
    const fetchTemplateData = async () => {
      if (templateId && token && isAuthenticated) {
        try {
          // Fetch all templates and find the one with matching ID
          const { templates } = await TemplateService.fetchTemplates({ token })
          const template = templates.find(t => t.id === templateId)
          
          if (template) {
            setTemplateData({
              description: template.description,
              jsonPrompt: template.jsonPrompt
            })
          }
        } catch (error) {
          console.error('Failed to fetch template data:', error)
        }
      } else if (templateDescription) {
        // If no templateId but we have description, use that
        setTemplateData({
          description: templateDescription
        })
      }
    }

    if (mounted && isAuthenticated) {
      fetchTemplateData()
    }
  }, [mounted, isAuthenticated, templateId, templateDescription, token])

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

  return (
    <div className="min-h-screen bg-[#111215] text-white">
      <Header />
      <div className={`flex h-[calc(100vh-64px)] transition-all duration-300 ${sidebarOpen ? 'ml-[29rem]' : 'ml-20'}`}>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 min-h-0">
            <Preview 
              videoUrl={videoUrl || undefined} 
              templateDescription={templateData.description}
              templateJsonPrompt={templateData.jsonPrompt}
            />
          </div>
          <Segement />
          <Chat />
        </div>
      </div>
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
    </div>
  )
}

export default VideoPage
