import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'
import Segement from '@/components/Video/Segement'

const VideoPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  // Ensure component is mounted on client side
  React.useEffect(() => {
    setMounted(true)
  }, [])

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
            <Preview />
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


