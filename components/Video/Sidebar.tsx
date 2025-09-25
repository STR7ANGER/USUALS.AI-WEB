import React from 'react'

type SidebarProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const Sidebar = ({ isOpen, setOpen }: SidebarProps) => {
  return (
    <>
      {/* Collapsed rail (original look) */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 w-16 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center py-4 space-y-4">
          {/* Cloud Upload Icon */}
          <button onClick={() => setOpen(true)} className="p-3 text-white/60 hover:text-white/90 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              <path d="M12 16v-8"/>
              <path d="M8 12l4-4 4 4"/>
            </svg>
          </button>
          
          {/* Container/Jar Icon (highlighted) */}
          <button onClick={() => setOpen(true)} className="p-3 text-cyan-400 border border-cyan-400/30 rounded-lg bg-cyan-400/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4 6v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6l-8-4z"/>
              <path d="M8 10h8"/>
              <path d="M8 14h8"/>
              <path d="M8 18h8"/>
            </svg>
          </button>
          
          {/* Magic Wand Icon */}
          <button onClick={() => setOpen(true)} className="p-3 text-white/60 hover:text-white/90 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 4V2"/>
              <path d="M15 16v-2"/>
              <path d="M8 9h2"/>
              <path d="M20 9h2"/>
              <path d="M17.8 11.8L19 13"/>
              <path d="M15.9 14.9L17.1 16.1"/>
              <path d="M15 4l-4 4 4 4 4-4-4-4z"/>
              <path d="M12 8L8 12l4 4 4-4-4-4z"/>
            </svg>
          </button>
          
          {/* Music Note Icon */}
          <button onClick={() => setOpen(true)} className="p-3 text-white/60 hover:text-white/90 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </button>
          
          {/* Hexagon Icon */}
          <button onClick={() => setOpen(true)} className="p-3 text-white/60 hover:text-white/90 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
      </div>

      {/* Expanded drawer (appears to the right of the rail) */}
      {isOpen && (
        <div className="fixed left-[6.5rem] top-24 bottom-6 z-50 w-80 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-white/90">Media Library</h2>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 text-white/60 hover:text-white/90 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
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
      )}
    </>
  )
}

export default Sidebar
