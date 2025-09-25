import React from "react";
import Link from "next/link";
import AuthButton from "../AuthButton";

const Header = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-black/75 backdrop-blur">
      {/* Announcement bar */}
      <div className="flex items-center justify-center gap-2 border-b border-white/10 bg-black px-3 py-1 text-xs text-yellow-300">
        <span className="rounded-sm bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-black">
          10% off
        </span>
        <a href="#" className="hover:underline">
          Download the App for More Videos
        </a>
      </div>

      {/* Main nav */}
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Logo + Tabs */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="35" height="35" rx="6" fill="#F9D312" />
              <path
                d="M15 20.1567C15 20.6179 15.1831 21.0602 15.5091 21.3865L15.5928 21.4703C15.9192 21.7969 16.362 21.9805 16.8237 21.9805H19.1826C19.6441 21.9805 20.0866 21.7971 20.413 21.4708L20.4904 21.3934C20.8167 21.0671 21 20.6245 21 20.1631V17.7205C21 16.7595 21.779 15.9805 22.74 15.9805H25.26C26.221 15.9805 27 16.7595 27 17.7205V20.2405C27 21.2014 26.221 21.9805 25.26 21.9805H22.8306C22.3694 21.9805 21.9271 22.1636 21.6008 22.4896L21.5102 22.5801C21.1835 22.9065 21 23.3493 21 23.811V26.2405C21 27.2014 20.221 27.9805 19.26 27.9805H16.74C15.779 27.9805 15 27.2014 15 26.2405V23.8042C15 23.3424 14.8165 22.8996 14.4898 22.5733L14.406 22.4896C14.0798 22.1636 13.6374 21.9805 13.1762 21.9805H10.74C9.77902 21.9805 9 21.2014 9 20.2405V17.7205C9 16.7595 9.77902 15.9805 10.74 15.9805H13.26C14.221 15.9805 15 16.7595 15 17.7205V20.1567ZM15 12.26C15 13.221 14.221 14 13.26 14H10.74C9.77902 14 9 13.221 9 12.26V9.74C9 8.77902 9.77902 8 10.74 8H13.26C14.221 8 15 8.77902 15 9.74V12.26ZM27 12.26C27 13.221 26.221 14 25.26 14H22.74C21.779 14 21 13.221 21 12.26V9.74C21 8.77902 21.779 8 22.74 8H25.26C26.221 8 27 8.77902 27 9.74V12.26Z"
                fill="#0D0E10"
              />
            </svg>

            <span className="hidden text-sm font-semibold tracking-wide text-white sm:block">
              Usuals AI
            </span>
          </div>
          <nav className="hidden items-center gap-1   p-1 text-sm md:flex">
            <a
              className=" px-3 py-1.5 font-medium text-[#F9D312]"
              href="#"
            >
              Explore
            </a>
            <Link
              className="rounded-md px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              href="/video"
            >
              Video
            </Link>
            <a
              className="rounded-md px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              href="https://x.com/usualsai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community
            </a>
            <a
              className="rounded-md px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              href="#"
            >
              History
            </a>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden rounded-md px-3 py-1.5 text-sm text-[#F9D312] hover:text-[#F9D312] md:block"
          >
            Pricing
          </a>
          <div className="hidden h-4 w-px bg-white/20 md:block"></div>
          <a
            href="https://discord.gg/9SRxHQ2Q"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md px-3 py-1.5 text-sm text-white/80 hover:text-white md:flex"
          >
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M13.6922 3.21328C12.7151 2.75614 11.6704 2.42389 10.5782 2.23473C10.444 2.47725 10.2873 2.80343 10.1793 3.06292C9.01817 2.88831 7.86777 2.88831 6.72805 3.06292C6.62001 2.80343 6.45974 2.47725 6.3244 2.23473C5.23098 2.42389 4.18506 2.75735 3.20799 3.2157C1.23722 6.19378 0.702982 9.09789 0.970104 11.9608C2.27722 12.9369 3.54397 13.5298 4.78934 13.9179C5.09683 13.4947 5.37107 13.0448 5.60733 12.5707C5.15738 12.3997 4.72642 12.1887 4.31921 11.9438C4.42725 11.8638 4.53291 11.7801 4.63501 11.694C7.11864 12.8557 9.81716 12.8557 12.2711 11.694C12.3744 11.7801 12.4801 11.8638 12.5869 11.9438C12.1785 12.19 11.7464 12.4009 11.2964 12.5719C11.5327 13.0448 11.8057 13.4959 12.1144 13.9191C13.361 13.5311 14.6289 12.9381 15.936 11.9608C16.2494 8.64196 15.4006 5.76453 13.6922 3.21328ZM5.94568 10.2001C5.20012 10.2001 4.58871 9.5041 4.58871 8.65652C4.58871 7.80893 5.18706 7.1117 5.94568 7.1117C6.70431 7.1117 7.31572 7.80772 7.30266 8.65652C7.30384 9.5041 6.70431 10.2001 5.94568 10.2001ZM10.9604 10.2001C10.2149 10.2001 9.60346 9.5041 9.60346 8.65652C9.60346 7.80893 10.2018 7.1117 10.9604 7.1117C11.7191 7.1117 12.3305 7.80772 12.3174 8.65652C12.3174 9.5041 11.7191 10.2001 10.9604 10.2001Z" fill="white"/>
            </svg>
            Discord
          </a>
          <div className="hidden h-4 w-px bg-white/20 md:block"></div>

          {/* Removed Login and Sign Up buttons */}

          {/* Mobile menu placeholder */}
          <button className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white md:hidden">
            <span className="sr-only">Open menu</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/90"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Auth entry: shows login when logged out, profile when logged in */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
