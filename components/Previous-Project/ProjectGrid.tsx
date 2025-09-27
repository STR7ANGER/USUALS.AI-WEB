"use client"

import React from 'react'
import ProjectCard from './ProjectCard'
import { useProjects } from '@/hooks/useProjects'

const ProjectGrid = () => {
  const { projects, loading, error, refresh } = useProjects();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F9D312]"></div>
          <span className="text-gray-400">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Failed to load projects</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-[#F9D312] text-black rounded-md hover:bg-[#F9D312]/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
        <p className="text-gray-400">Create your first video project to see it here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectGrid
