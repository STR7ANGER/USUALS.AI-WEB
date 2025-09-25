import React from 'react'

const Header = () => {
  return (
    <div className="bg-black border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-white">Video Editor</h1>
          <div className="hidden md:flex items-center gap-2 text-sm text-white/60">
            <span>•</span>
            <span>Project: My Video</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors">
            Save
          </button>
          <button className="px-4 py-2 bg-[#F9D312] hover:bg-[#F9D312]/90 rounded-lg text-sm text-black font-medium transition-colors">
            Export
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
