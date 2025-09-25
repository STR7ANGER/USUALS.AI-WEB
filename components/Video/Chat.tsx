import React from 'react'
import { Palette, Sparkles, Paperclip, Send } from 'lucide-react'

const Chat = () => {
  return (
    <div className="p-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
          <input
            type="text"
            placeholder={'how about “A bird flying on the moon with a red cape”...'}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
          />
          <div className="flex items-center gap-2 text-white/80">
            <button className="p-2 hover:text-white">
              <Palette size={18} />
            </button>
            <button className="p-2 hover:text-white">
              <Sparkles size={18} />
            </button>
            <button className="p-2 hover:text-white">
              <Paperclip size={18} />
            </button>
            <button className="ml-1 inline-flex items-center justify-center rounded-lg bg-white text-black p-2 hover:bg-white/90">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
