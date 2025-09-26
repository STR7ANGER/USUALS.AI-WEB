import React from "react";
import { useSearchParams } from 'next/navigation'
import AuthButton from "../AuthButton";

const Header = () => {
  const searchParams = useSearchParams()
  const projectName = searchParams?.get('name') || 'Untitled'
  return (
    <div className="bg-[#111215]  px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Brand and Document Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Logo mark */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 14.1567C9 14.6179 9.18311 15.0602 9.50909 15.3865L9.59281 15.4703C9.91917 15.7969 10.362 15.9805 10.8237 15.9805H13.1826C13.6441 15.9805 14.0866 15.7971 14.413 15.4708L14.4904 15.3934C14.8167 15.0671 15 14.6245 15 14.1631V11.7205C15 10.7595 15.779 9.98047 16.74 9.98047H19.26C20.221 9.98047 21 10.7595 21 11.7205V14.2405C21 15.2014 20.221 15.9805 19.26 15.9805H16.8306C16.3694 15.9805 15.9271 16.1636 15.6008 16.4896L15.5102 16.5801C15.1835 16.9065 15 17.3493 15 17.811V20.2405C15 21.2014 14.221 21.9805 13.26 21.9805H10.74C9.77902 21.9805 9 21.2014 9 20.2405V17.8042C9 17.3424 8.81647 16.8996 8.48982 16.5733L8.40602 16.4896C8.07976 16.1636 7.63741 15.9805 7.1762 15.9805H4.74C3.77902 15.9805 3 15.2014 3 14.2405V11.7205C3 10.7595 3.77902 9.98047 4.74 9.98047H7.26C8.22098 9.98047 9 10.7595 9 11.7205V14.1567ZM9 6.26C9 7.22098 8.22098 8 7.26 8H4.74C3.77902 8 3 7.22098 3 6.26V3.74C3 2.77902 3.77902 2 4.74 2H7.26C8.22098 2 9 2.77902 9 3.74V6.26ZM21 6.26C21 7.22098 20.221 8 19.26 8H16.74C15.779 8 15 7.22098 15 6.26V3.74C15 2.77902 15.779 2 16.74 2H19.26C20.221 2 21 2.77902 21 3.74V6.26Z"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>

            <span className="text-white font-semibold text-lg">Usuals</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors">
            <span className="text-base">{projectName}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Counter pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.86848 6.46472C7.2645 6.0687 7.4625 5.87069 7.69083 5.7965C7.89168 5.73124 8.10802 5.73124 8.30887 5.7965C8.53719 5.87069 8.7352 6.0687 9.13122 6.46472L9.53515 6.86864C9.93116 7.26466 10.1292 7.46267 10.2034 7.69099C10.2686 7.89184 10.2686 8.10819 10.2034 8.30903C10.1292 8.53736 9.93116 8.73537 9.53515 9.13138L9.13122 9.53531C8.7352 9.93132 8.53719 10.1293 8.30887 10.2035C8.10802 10.2688 7.89168 10.2688 7.69083 10.2035C7.4625 10.1293 7.2645 9.93132 6.86848 9.53531L6.46455 9.13138C6.06854 8.73537 5.87053 8.53736 5.79634 8.30903C5.73108 8.10819 5.73108 7.89184 5.79634 7.69099C5.87053 7.46267 6.06854 7.26466 6.46455 6.86864L6.86848 6.46472Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>2000</span>
          </div>

          {/* Download button */}
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#F9D31226] px-4 py-2 text-sm font-medium text-black hover:bg-[#F9D312]/90 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 13.3337L3.33325 13.3337M3.99992 6.55393C5.03696 5.15166 6.24844 3.89221 7.60371 2.80667C7.71997 2.71355 7.85994 2.66699 7.99992 2.66699M11.9999 6.55393C10.9629 5.15166 9.7514 3.89221 8.39613 2.80667C8.27987 2.71355 8.13989 2.66699 7.99992 2.66699M7.99992 2.66699L7.99992 10.667" stroke="#F9D312" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            <span className="text-[#F9D312]">Download</span>
          </button>

          {/* Avatar + caret */}
          <div className="flex items-center gap-1">
            <AuthButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
