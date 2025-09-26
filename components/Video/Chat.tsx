import React, { useState } from 'react'

interface ChatProps {
  isEnabled: boolean;
  onSendMessage: (message: string) => Promise<void>;
  loading?: boolean;
}

const Chat = ({ isEnabled, onSendMessage, loading = false }: ChatProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !isEnabled || loading) return

    try {
      await onSendMessage(message.trim())
      setMessage('') // Clear input after successful send
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="p-1 pb-2">
      <div className="mx-auto max-w-5xl">
        <form onSubmit={handleSubmit}>
          <div className={`bg-[#18191C8C] rounded-2xl p-3 transition-opacity ${isEnabled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isEnabled ? 'how about "A bird flying on the moon with a red cape"...' : 'Select a template to enable chat...'}
                disabled={!isEnabled || loading}
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base disabled:cursor-not-allowed"
              />
              {/* Send Button */}
              <button 
                type="submit"
                disabled={!isEnabled || !message.trim() || loading}
                className={`p-3 transition-colors ${
                  isEnabled && message.trim() && !loading 
                    ? 'hover:bg-white/10 cursor-pointer' 
                    : 'cursor-not-allowed opacity-50'
                }`}
              >
                {loading ? (
                  <div className="w-9 h-9 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#94E7ED]"></div>
                  </div>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="6" fill="#94E7ED" fillOpacity="0.15"/>
                    <path d="M12.3594 15.6406L8.70896 13.6497C7.75627 13.1302 7.76571 11.7605 8.72538 11.2672C11.3719 9.90704 14.186 8.89704 17.0973 8.26249C17.9332 8.08029 18.8885 7.70889 19.5898 8.41018C20.2911 9.11147 19.9197 10.0668 19.7375 10.9027C19.103 13.814 18.093 16.6281 16.7328 19.2746C16.2395 20.2343 14.8698 20.2437 14.3503 19.291L12.3594 15.6406ZM12.3594 15.6406L14.5651 13.4349" stroke="#94E7ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat
