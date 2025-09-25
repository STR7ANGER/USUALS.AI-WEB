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
      
    </div>
  )
}

export default Preview
