import React from 'react'

const Template = () => {
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
          placeholder="Search Templates..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 className="text-sm font-medium text-white">Categories</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Advertisement Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-white/90 rounded p-1 text-black text-xs">
                  <div className="flex items-center space-x-1 mb-0.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="font-medium text-xs">Now Playing</span>
                  </div>
                  <div className="text-xs">In The Rain</div>
                </div>
              </div>
              <div className="absolute top-1 left-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
              <div className="absolute top-1 right-1 text-xs text-white/60">@sofiam47</div>
            </div>
            <p className="text-xs text-white/70 text-center">Advertisement</p>
          </div>

          {/* Cinematic Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
              </div>
            </div>
            <p className="text-xs text-white/70 text-center">Cinematic</p>
          </div>

          {/* Hip Hop Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-blue-600 via-green-500 to-yellow-400 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-white/90 rounded p-1 text-black text-xs">
                  <div className="text-xs font-medium">DJ TO HANDLE</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 text-center">Hip Hop</p>
          </div>

          {/* RnB Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-white/90 rounded p-1 text-black text-xs">
                  <div className="text-xs">✨</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 text-center">RnB</p>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <h3 className="text-sm font-medium text-white">Trending</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Advertisement Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-white/90 rounded p-1 text-black text-xs">
                  <div className="flex items-center space-x-1 mb-0.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="font-medium text-xs">Now Playing</span>
                  </div>
                  <div className="text-xs">In The Rain</div>
                </div>
              </div>
              <div className="absolute top-1 left-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
              <div className="absolute top-1 right-1 text-xs text-white/60">@sofiam47</div>
            </div>
            <p className="text-xs text-white/70 text-center">Advertisement</p>
          </div>

          {/* Cinematic Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
              </div>
            </div>
            <p className="text-xs text-white/70 text-center">Cinematic</p>
          </div>

          {/* Hip Hop Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-blue-600 via-green-500 to-yellow-400 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-white/90 rounded p-1 text-black text-xs">
                  <div className="text-xs font-medium">DJ TO HANDLE</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 text-center">Hip Hop</p>
          </div>

          {/* RnB Template */}
          <div className="cursor-pointer">
            <div className="relative w-full h-24 bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-white/90 rounded p-1 text-black text-xs">
                  <div className="text-xs">✨</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 text-center">RnB</p>
          </div>
        </div>
      </div>

      {/* Favourites Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <h3 className="text-sm font-medium text-white">Favourites</h3>
        </div>
      </div>
    </div>
  )
}

export default Template
