import React from 'react'

const Header = () => {
  return (
    <div className="bg-black border-b border-white/10 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Brand and Document Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Logo mark */}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="currentColor"
            >
              <path d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10-10h6v6h-6V4zm0 10h6v6h-6v-6z" />
            </svg>
            <span className="text-white font-semibold">Usuals</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors">
            <span className="text-sm">Untitled</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Sparkle / magic button */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] text-white/80 transition-colors"
            aria-label="Magic"
            title="Magic"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M10 3l1.5 3L15 7.5 11.5 9 10 12l-1.5-3L5 7.5 8.5 6 10 3zm8 5l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM6 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
            </svg>
          </button>

          {/* Counter pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4 text-white/70"
              fill="currentColor"
            >
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm11-7a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM6 12a1 1 0 01-1 1H3a1 1 0 110-2h2a1 1 0 011 1zm13.657-7.657a1 1 0 010 1.414L18.9 6.515a1 1 0 11-1.414-1.415l.757-.757a1 1 0 011.414 0zM6.515 18.9a1 1 0 01-1.415 0l-.757-.757A1 1 0 115.757 16.7l.758.757a1 1 0 010 1.415zM5.1 5.1a1 1 0 011.414 0l.757.757A1 1 0 116.858 7.27l-.758-.757A1 1 0 015.1 5.1zm13.657 13.657a1 1 0 01-1.414 0l-.757-.757a1 1 0 111.414-1.414l.757.757a1 1 0 010 1.414z" />
            </svg>
            <span>2000</span>
          </div>

          {/* Download button */}
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#F9D312] px-4 py-2 text-sm font-medium text-black hover:bg-[#F9D312]/90 transition-colors">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M12 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4.007 4.007a1 1 0 01-1.414 0L7.279 11.707a1 1 0 111.414-1.414L11 12.586V4a1 1 0 011-1z" />
              <path d="M5 19a2 2 0 002 2h10a2 2 0 002-2v-2a1 1 0 10-2 0v2H7v-2a1 1 0 10-2 0v2z" />
            </svg>
            <span>Download</span>
          </button>

          {/* Avatar + caret */}
          <div className="flex items-center gap-1">
            <button
              className="h-9 w-9 rounded-full bg-white text-black font-medium flex items-center justify-center"
              aria-label="Account"
            >
              U
            </button>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4 text-white/70"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
