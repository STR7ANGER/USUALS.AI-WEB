import React from 'react'
import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'
import Segement from '@/components/Video/Segement'

const VideoPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
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


