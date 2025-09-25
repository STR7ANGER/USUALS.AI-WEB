import React from 'react'
import Header from '@/components/Video/Header'
import Sidebar from '@/components/Video/Sidebar'
import Preview from '@/components/Video/Preview'
import Chat from '@/components/Video/Chat'

const Page = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <Preview/>
      <Chat/>
    </div>
  )
}

export default Page
