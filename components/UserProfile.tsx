"use client"

import React from 'react'
import { useAuth } from '../hooks/useAuth'

const UserProfile = () => {
  const { user, logout } = useAuth()
  const avatarUrl = (user as any)?.avatar || (user as any)?.picture || (user as any)?.image

  return (
    <div className="flex items-center gap-3">
      {avatarUrl ? (
        <img src={avatarUrl as string} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold text-white">
          {(user?.name?.charAt(0) || user?.email?.charAt(0) || 'U') as string}
        </div>
      )}
      <div className="text-sm">
        <div className="text-white font-medium">{user?.name || 'User'}</div>
        <div className="text-white/60 text-xs">{user?.email || ''}</div>
      </div>
      <button onClick={() => logout()} className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white">Logout</button>
    </div>
  )
}

export default UserProfile
