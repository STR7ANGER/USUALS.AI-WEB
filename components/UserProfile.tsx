"use client"

import React from 'react'
import { useAuth } from '../hooks/useAuth'

const UserProfile = () => {
  const { user, logout } = useAuth()
  const avatarUrl = user?.avatar || user?.picture || user?.image
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', onClickOutside)
    }
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const initial = ((user?.name?.trim()?.charAt(0) || user?.email?.trim()?.charAt(0) || 'U') as string).toUpperCase()

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {avatarUrl && !imageError ? (
          <img
            src={avatarUrl as string}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-white ring-1 ring-white/10">
            {initial}
          </div>
        )}
        <svg className={`ml-1 h-4 w-4 text-white/70 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User menu"
          className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur shadow-xl shadow-black/40 overflow-hidden z-50"
        >
          <div className="p-4 flex items-center gap-3">
            {avatarUrl && !imageError ? (
              <img
                src={avatarUrl as string}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold text-white ring-1 ring-white/10">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-white font-medium leading-tight truncate">{user?.name || 'User'}</div>
              <div className="text-white/60 text-xs leading-tight truncate">{user?.email || ''}</div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="p-2">
            <button
              onClick={() => {
                setOpen(false)
                logout()
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
