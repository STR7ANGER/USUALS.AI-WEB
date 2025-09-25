import React, { useState } from 'react'

const Segement = () => {
  const [videoCards, setVideoCards] = useState([{ id: 1 }]) // Start with 1 default card
  const maxCards = 5

  const addVideoCard = () => {
    if (videoCards.length < maxCards) {
      setVideoCards([...videoCards, { id: videoCards.length + 1 }])
    }
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center justify-center flex-wrap">
        {/* Existing Video Cards */}
        {videoCards.map((card) => (
          <div key={card.id} className="bg-white/5 rounded-lg w-32 h-20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white" fillOpacity="0.7"/>
              </svg>
            </div>
          </div>
        ))}

        {/* Add New Segment Card - only show if under max limit */}
        {videoCards.length < maxCards && (
          <div 
            className="bg-white/5 rounded-lg w-32 h-20 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-colors"
            onClick={addVideoCard}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white/70 text-xs mt-1">New Segment</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Segement
