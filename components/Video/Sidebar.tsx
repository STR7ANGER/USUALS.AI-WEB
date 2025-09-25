import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-80 bg-black/50 border-r border-white/10 p-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-white/90 mb-3">Media Library</h2>
          <div className="space-y-2">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-full h-20 bg-white/10 rounded mb-2"></div>
              <p className="text-xs text-white/70">Video Clip 1</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-full h-20 bg-white/10 rounded mb-2"></div>
              <p className="text-xs text-white/70">Video Clip 2</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-white/90 mb-3">Timeline</h2>
          <div className="bg-white/5 rounded-lg border border-white/10 p-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Track 1</span>
                <div className="w-32 h-6 bg-[#F9D312]/20 rounded border border-[#F9D312]/30"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Track 2</span>
                <div className="w-24 h-6 bg-white/10 rounded border border-white/20"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white/90 mb-3">Tools</h2>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-xs text-white/80 transition-colors">
              Cut
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-xs text-white/80 transition-colors">
              Copy
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-xs text-white/80 transition-colors">
              Paste
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-xs text-white/80 transition-colors">
              Effects
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
