import React from 'react'

const Audio = () => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Audio..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      {/* Audio Tracks */}
      <div className="space-y-3">
        {/* Astronaut Discovers Crater - Currently Playing */}
        <div className="p-3 bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/15 transition-colors">
          <div className="flex items-start space-x-3">
            {/* Thumbnail */}
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-60"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-white">Astronaut Discovers Crater</h4>
                  <p className="text-xs text-white/70">Video 3</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M10 9v6M14 9v6" />
                    </svg>
                  </button>
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Playback Controls and Waveform */}
              <div className="flex items-center space-x-3">
                <button className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </button>
                
                {/* Waveform */}
                <div className="flex-1 flex items-center space-x-1">
                  <div className="w-1 h-2 bg-white/40 rounded"></div>
                  <div className="w-1 h-3 bg-white/60 rounded"></div>
                  <div className="w-1 h-4 bg-white rounded"></div>
                  <div className="w-1 h-3 bg-white/80 rounded"></div>
                  <div className="w-1 h-2 bg-white/60 rounded"></div>
                  <div className="w-1 h-3 bg-white/40 rounded"></div>
                  <div className="w-1 h-2 bg-white/60 rounded"></div>
                  <div className="w-1 h-4 bg-white rounded"></div>
                  <div className="w-1 h-3 bg-white/80 rounded"></div>
                  <div className="w-1 h-2 bg-white/40 rounded"></div>
                </div>
                
                <span className="text-xs text-white/70">0:15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Space Noise */}
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-3">
            {/* Thumbnail */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-bold text-lg">LA</div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-white">Space Noise</h4>
                  <p className="text-xs text-white/70">Video 1</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M10 9v6M14 9v6" />
                    </svg>
                  </button>
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interstellar */}
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-3">
            {/* Thumbnail */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-bold text-lg">LA</div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-white">Interstellar</h4>
                  <p className="text-xs text-white/70">Video 2</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M10 9v6M14 9v6" />
                    </svg>
                  </button>
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favourites Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <h3 className="text-sm font-medium text-green-400">Favourites</h3>
        </div>
        
        {/* Space Noise - Favourite */}
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-3">
            {/* Thumbnail */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-bold text-lg">LA</div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-white">Space Noise</h4>
                  <p className="text-xs text-white/70">Video 1</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-white/60 hover:text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M10 9v6M14 9v6" />
                    </svg>
                  </button>
                  <button className="p-1 text-yellow-400 hover:text-yellow-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audio
