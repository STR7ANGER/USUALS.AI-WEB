import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'

import React from 'react'

const VideoPage = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header/>
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar/>
        <div className="flex-1 flex">
          <Preview/>
          <Chat/>
        </div>
      </div>
    </div>
  )
}

export default VideoPage
