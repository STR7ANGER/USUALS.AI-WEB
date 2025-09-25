import React from 'react'
import AuthButton from '../AuthButton'
import UserProfile from '../UserProfile'

const Header = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-black/75 backdrop-blur">
      {/* Announcement bar */}
      <div className="flex items-center justify-center gap-2 border-b border-white/10 bg-black px-3 py-1 text-xs text-yellow-300">
        <span className="rounded-sm bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-black">10% off</span>
        <a href="#" className="hover:underline">Download the App for More Videos</a>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Logo + Tabs */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-yellow-400" />
            <span className="hidden text-sm font-semibold tracking-wide text-white sm:block">Usuals AI</span>
          </div>
          <nav className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 text-sm md:flex">
            <a className="rounded-md bg-white/10 px-3 py-1.5 font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" href="#">Explore</a>
            <a className="rounded-md px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white" href="#">Video</a>
            <a className="rounded-md px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white" href="#">Community</a>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a href="#" className="hidden rounded-md px-3 py-1.5 text-sm text-white/70 hover:text-white md:block">Pricing</a>
          <a href="#" aria-label="Discord" className="hidden h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:text-white md:flex">𐄷</a>

          <button className="hidden rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 md:block">Login</button>
          <button className="rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black hover:bg-yellow-300">Sign Up</button>

          {/* Mobile menu placeholder */}
          <button className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white md:hidden">
            <span className="sr-only">Open menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/90"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>

          {/* Keep existing auth/profile if wired */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <AuthButton />
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
