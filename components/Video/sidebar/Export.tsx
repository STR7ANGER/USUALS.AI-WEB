import React from 'react'

const Export = () => {
  return (
    <div className="space-y-6">
      
    
      {/* Export as One Clip */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-green-400">Export as One Clip</h3>
        
        {/* Video Thumbnail 1 - iPod/Retro Scene */}
        <div className="relative w-full h-32 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-white/90 rounded-lg p-2 text-black text-xs">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="font-medium">Now Playing</span>
              </div>
              <div className="text-xs">In The Rain - Addison Rae</div>
              <div className="text-xs text-gray-600">103 of 260</div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div className="bg-gray-600 h-1 rounded-full" style={{width: '75%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">1:55</div>
            </div>
          </div>
          {/* CD overlay */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
          </div>
        </div>
        
        <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
          Export
        </button>
      </div>

      {/* Export Clips Separately */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-green-400">Export Clips Separately</h3>
        
        {/* Video Thumbnail 2 - Concert Scene */}
        <div className="relative w-full h-32 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-white text-xs font-medium">Video 1</div>
          </div>
        </div>
        
        {/* Video Thumbnail 3 - Another concert scene */}
        <div className="relative w-full h-32 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-white text-xs font-medium">Video 2</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Export
