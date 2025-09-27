import React from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/services/project'

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter()
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleProjectClick = () => {
    // Navigate to video page with project ID and name
    const params = new URLSearchParams({
      projectId: project.id,
      projectName: project.name || `Project ${formatDate(project.createdAt)}`,
      isExisting: 'true'
    });
    router.push(`/video?${params.toString()}`);
  };

  return (
    <div 
      onClick={handleProjectClick}
      className="bg-[#111215] border border-gray-800 rounded-xl overflow-hidden hover:border-[#F9D312]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#F9D312]/5 group cursor-pointer"
    >
      {/* Media Section */}
      <div className="aspect-video bg-[#000000] flex items-center justify-center relative">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <svg
              className="w-20 h-20 mb-3 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-600">No media</span>
          </div>
        )}
      </div>

      {/* Project Details Section */}
      <div className="p-6">
        {/* Project Name */}
        <h3 className="text-white font-semibold text-xl mb-3 leading-tight group-hover:text-[#F9D312] transition-colors duration-300">
          {project.name || `Project ${formatDate(project.createdAt)}`}
        </h3>

        {/* Edited Date */}
        <div className="text-gray-400 text-sm">
          Edited {formatDate(project.updatedAt)}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
