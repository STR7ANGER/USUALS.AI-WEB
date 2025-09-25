import React from 'react'

const Chat = () => {
  return (
    <div className="p-1 pb-2">
      <div className="mx-auto max-w-5xl">
        <div className="bg-[#18191C8C] rounded-2xl p-3">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder='how about "A bird flying on the moon with a red cape"...'
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
            />
            {/* Send Button */}
            <button className="p-3 transition-colors">
              <svg width="36" height="36" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="6" fill="#94E7ED" fillOpacity="0.15"/>
                <path d="M12.3594 15.6406L8.70896 13.6497C7.75627 13.1302 7.76571 11.7605 8.72538 11.2672C11.3719 9.90704 14.186 8.89704 17.0973 8.26249C17.9332 8.08029 18.8885 7.70889 19.5898 8.41018C20.2911 9.11147 19.9197 10.0668 19.7375 10.9027C19.103 13.814 18.093 16.6281 16.7328 19.2746C16.2395 20.2343 14.8698 20.2437 14.3503 19.291L12.3594 15.6406ZM12.3594 15.6406L14.5651 13.4349" stroke="#94E7ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
