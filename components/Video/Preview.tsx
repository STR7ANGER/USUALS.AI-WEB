import React from 'react'

const Preview = () => {
  return (
    <div className="flex-1 flex flex-col bg-black/30">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white" fillOpacity="0.7"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white/90 mb-2">Video Preview</h3>
            <p className="text-sm text-white/60">Your video content will appear here</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white"/>
              </svg>
            </button>
            <span className="text-sm text-white/70">00:00 / 00:00</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white/80">
              1x
            </button>
            <button className="px-3 py-1 bg-[#F9D312]/20 hover:bg-[#F9D312]/30 rounded text-xs text-[#F9D312]">
              Fullscreen
            </button>
          </div>
        </div>
        
        <div className="w-full h-1 bg-white/10 rounded-full">
          <div className="w-1/3 h-full bg-[#F9D312] rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Preview
