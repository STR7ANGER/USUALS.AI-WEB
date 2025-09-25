import React from 'react'

const Chat = () => {
  return (
    <div className="w-80 bg-black/50 border-l border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-medium text-white/90">AI Assistant</h2>
        <p className="text-xs text-white/60 mt-1">Get help with your video editing</p>
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#F9D312] rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-black">AI</span>
          </div>
          <div className="flex-1">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-sm text-white/90">Hi! I can help you edit your video. What would you like to do?</p>
            </div>
            <span className="text-xs text-white/50 mt-1 block">Just now</span>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <div className="flex-1 max-w-xs">
            <div className="bg-[#F9D312]/20 rounded-lg p-3 border border-[#F9D312]/30">
              <p className="text-sm text-white/90">Can you help me add transitions?</p>
            </div>
            <span className="text-xs text-white/50 mt-1 block text-right">Just now</span>
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">U</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#F9D312] rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-black">AI</span>
          </div>
          <div className="flex-1">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-sm text-white/90">Absolutely! I can help you add smooth transitions between clips. Would you like fade, slide, or zoom transitions?</p>
            </div>
            <span className="text-xs text-white/50 mt-1 block">Just now</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask AI for help..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#F9D312]/50"
          />
          <button className="px-3 py-2 bg-[#F9D312] hover:bg-[#F9D312]/90 rounded-lg text-sm text-black font-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
