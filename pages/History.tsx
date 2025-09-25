import React from 'react'
import ProjectGrid from '@/components/Previous-Project/ProjectGrid'
import Header from '@/components/Landing/Header'

const History = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Main Content - Full Width */}
      <div className="w-full px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Previous Projects</h1>
          <p className="text-gray-400 text-xl">
            View and manage all your video projects created with Usuals AI
          </p>
        </div>

        {/* Project Grid */}
        <ProjectGrid />
      </div>
    </div>
  )
}

export default History
