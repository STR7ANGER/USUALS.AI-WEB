import React from 'react'

const Setting = () => {
  return (
    <div className="space-y-6">
      

      {/* Position Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70">Position</h3>
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="number"
              value="0"
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="text-xs text-white/70 mt-1 block">X</span>
          </div>
          <div className="flex-1">
            <input
              type="number"
              value="0"
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="text-xs text-white/70 mt-1 block">Y</span>
          </div>
        </div>
      </div>

      {/* Scale Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70">Scale</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="relative">
              <div className="w-full h-2 bg-white/10 rounded-full">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{width: '70%'}}></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" style={{left: 'calc(70% - 8px)'}}></div>
              </div>
            </div>
          </div>
          <div className="w-16">
            <input
              type="number"
              value="110"
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="text-xs text-white/70 mt-1 block text-center">%</span>
          </div>
        </div>
      </div>

      {/* Opacity Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70">Opacity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="relative">
              <div className="w-full h-2 bg-white/10 rounded-full">
                <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{width: '50%'}}></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" style={{left: 'calc(50% - 8px)'}}></div>
              </div>
            </div>
          </div>
          <div className="w-16">
            <input
              type="number"
              value="50"
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="text-xs text-white/70 mt-1 block text-center">%</span>
          </div>
        </div>
      </div>

      {/* Rotate Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70">Rotate</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="number"
              value="50"
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
