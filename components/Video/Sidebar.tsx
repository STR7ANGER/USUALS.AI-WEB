import React, { useState } from 'react'
import Export from './sidebar/Export'
import Template from './sidebar/Template'
import Prompt from './sidebar/Prompt'
import Audio from './sidebar/Audio'
import Setting from './sidebar/Setting'
import { Segment } from '@/hooks/useSegments'

type SidebarProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  onTemplateSelect?: (template: {
    id: string;
    description: string;
    jsonPrompt: string;
    s3Key: string;
  }) => void
  segments?: Segment[]
  projectName?: string
}

type ActiveTab = 'export' | 'template' | 'prompt' | 'audio' | 'setting'

const Sidebar = ({ isOpen, setOpen, onTemplateSelect, segments, projectName }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('template')
  return (
    <>
      {/* Collapsed rail (original look) */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 w-12 bg-[#32353E33] backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center py-3 space-y-3">
          {/* Export Icon */}
          <button 
            onClick={() => {
              setActiveTab('export')
              setOpen(true)
            }} 
            className={`p-3 transition-colors ${activeTab === 'export' ? 'text-cyan-400 hover:text-cyan-300' : 'text-white/60 hover:text-white/90'}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.42563 5.80826C6.24792 3.86413 8.17297 2.5 10.4166 2.5C12.4913 2.5 14.2935 3.66639 15.2034 5.37918C15.4007 5.75055 15.4993 5.93624 15.5527 6.00906C15.636 6.12273 15.609 6.09246 15.7125 6.18811C15.7788 6.24939 15.9664 6.3782 16.3415 6.63578C17.5444 7.46187 18.3333 8.84714 18.3333 10.4167C18.3333 11.5247 17.9401 12.5409 17.2857 13.3333M5.42563 5.80826C5.41271 5.8388 5.40006 5.86949 5.38769 5.90032M5.42563 5.80826C5.41295 5.83822 5.40054 5.86832 5.3884 5.89856L5.38769 5.90032M5.38769 5.90032C5.13758 6.52355 4.99996 7.20403 4.99996 7.91667M5.38769 5.90032C5.11899 6.56918 4.98458 6.90369 4.92 7.00392C4.79348 7.20029 4.8881 7.08779 4.71633 7.24609C4.62857 7.32696 4.23425 7.57103 3.44578 8.05905C2.37797 8.71997 1.66663 9.90191 1.66663 11.25C1.66663 12.0209 1.89924 12.7375 2.2981 13.3333M13.3333 13.0253C12.5031 12.0225 11.5387 11.1178 10.4628 10.3318C10.1868 10.1302 9.81311 10.1302 9.53716 10.3318C8.46125 11.1178 7.49686 12.0225 6.66663 13.0253M9.99996 17.5V10.1888" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Template Icon */}
          <button 
            onClick={() => {
              setActiveTab('template')
              setOpen(true)
            }} 
            className={`p-3 transition-colors ${activeTab === 'template' ? 'text-cyan-400 hover:text-cyan-300' : 'text-white/60 hover:text-white/90'}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 5.00033H15.8333M5.83333 1.66805L14.1667 1.66699M5.83333 18.3337H14.1667C15.3334 18.3337 15.9168 18.3337 16.3625 18.1066C16.7545 17.9069 17.0732 17.5881 17.2729 17.1961C17.5 16.7505 17.5 16.1671 17.5 15.0003V11.667C17.5 10.5002 17.5 9.91683 17.2729 9.47118C17.0732 9.07917 16.7545 8.76047 16.3625 8.56073C15.9168 8.33366 15.3334 8.33366 14.1667 8.33366H5.83333C4.66656 8.33366 4.08317 8.33366 3.63752 8.56073C3.24552 8.76047 2.92681 9.07917 2.72707 9.47118C2.5 9.91683 2.5 10.5002 2.5 11.667V15.0003C2.5 16.1671 2.5 16.7505 2.72707 17.1961C2.92681 17.5881 3.24552 17.9069 3.63752 18.1066C4.08317 18.3337 4.66656 18.3337 5.83333 18.3337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Prompt Icon */}
          <button 
            onClick={() => {
              setActiveTab('prompt')
              setOpen(true)
            }} 
            className={`p-3 transition-colors ${activeTab === 'prompt' ? 'text-cyan-400 hover:text-cyan-300' : 'text-white/60 hover:text-white/90'}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.441 8.4125L16.4786 5.37497C16.8691 4.98445 16.8691 4.35128 16.4786 3.96076L15.8304 3.31258C15.4399 2.92205 14.8067 2.92205 14.4162 3.31258L11.3787 6.35011M13.441 8.4125L5.16703 16.6865C4.7765 17.077 4.14334 17.077 3.75281 16.6865L3.10463 16.0383C2.71411 15.6478 2.71411 15.0147 3.10463 14.6241L11.3787 6.35011M13.441 8.4125L11.3787 6.35011" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M17.0834 10C17.349 10.6735 17.6413 10.9771 18.3334 11.25C17.6413 11.5229 17.349 11.8265 17.0834 12.5C16.8177 11.8265 16.5254 11.5229 15.8334 11.25C16.5254 10.9771 16.8177 10.6735 17.0834 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9166 15C13.1823 15.6735 13.4746 15.9771 14.1666 16.25C13.4746 16.5229 13.1823 16.8265 12.9166 17.5C12.651 16.8265 12.3587 16.5229 11.6666 16.25C12.3587 15.9771 12.651 15.6735 12.9166 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.22933 1.66699C6.67205 2.78954 7.15928 3.29544 8.31266 3.75033C7.15928 4.20522 6.67206 4.71112 6.22933 5.83366C5.7866 4.71112 5.29938 4.20521 4.146 3.75033C5.29938 3.29544 5.7866 2.78954 6.22933 1.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Audio Icon */}
          <button 
            onClick={() => {
              setActiveTab('audio')
              setOpen(true)
            }} 
            className={`p-3 transition-colors ${activeTab === 'audio' ? 'text-cyan-400 hover:text-cyan-300' : 'text-white/60 hover:text-white/90'}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_245_1624)">
                <path d="M6.6665 9.99981V6.55239C6.6665 5.86712 7.08594 5.2517 7.72375 5.00113L16.6261 1.50378C17.4461 1.18163 18.3332 1.78618 18.3332 2.66722V5.41648M6.6665 9.99981V15.8331M6.6665 9.99981L18.3332 5.41648M6.6665 15.8331C6.6665 17.2139 5.54722 18.3331 4.1665 18.3331C2.78579 18.3331 1.6665 17.2139 1.6665 15.8331C1.6665 14.4524 2.78579 13.3331 4.1665 13.3331C5.54722 13.3331 6.6665 14.4524 6.6665 15.8331ZM18.3332 5.41648V13.3331M18.3332 13.3331C18.3332 14.7139 17.2139 15.8331 15.8332 15.8331C14.4525 15.8331 13.3332 14.7139 13.3332 13.3331C13.3332 11.9524 14.4525 10.8331 15.8332 10.8331C17.2139 10.8331 18.3332 11.9524 18.3332 13.3331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_245_1624">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          
          {/* Settings Icon */}
          <button 
            onClick={() => {
              setActiveTab('setting')
              setOpen(true)
            }} 
            className={`p-3 transition-colors ${activeTab === 'setting' ? 'text-cyan-400 hover:text-cyan-300' : 'text-white/60 hover:text-white/90'}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16664 10C9.16664 9.53976 9.53973 9.16667 9.99997 9.16667C10.4602 9.16667 10.8333 9.53976 10.8333 10C10.8333 10.4602 10.4602 10.8333 9.99997 10.8333C9.53973 10.8333 9.16664 10.4602 9.16664 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.13455 3.59953C8.17842 2.99724 8.70035 2.69609 9.25524 2.57822C9.74621 2.47393 10.2536 2.47393 10.7446 2.57822C11.2995 2.69609 11.8214 2.99724 12.8653 3.59953L14.1137 4.31986C15.1576 4.92215 15.6795 5.2233 16.0591 5.64461C16.395 6.01738 16.6487 6.45654 16.8038 6.93361C16.9791 7.47279 16.9791 8.07509 16.9791 9.27967V10.7203C16.9791 11.9249 16.9791 12.5272 16.8038 13.0664C16.6487 13.5435 16.395 13.9826 16.0591 14.3554C15.6795 14.7767 15.1576 15.0778 14.1137 15.6801L12.8653 16.4005C11.8214 17.0028 11.2995 17.3039 10.7446 17.4218C10.2536 17.5261 9.74621 17.5261 9.25524 17.4218C8.70035 17.3039 8.17842 17.0028 7.13455 16.4005L5.88612 15.6801C4.84225 15.0778 4.32032 14.7767 3.94073 14.3554C3.60487 13.9826 3.35116 13.5435 3.19605 13.0664C3.02075 12.5272 3.02075 11.9249 3.02075 10.7203V9.27967C3.02075 8.07509 3.02075 7.47279 3.19605 6.93361C3.35116 6.45654 3.60487 6.01738 3.94073 5.64461C4.32032 5.2233 4.84225 4.92215 5.88612 4.31986L7.13455 3.59953Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
      </div>

      {/* Expanded drawer (appears to the right of the rail) */}
      {isOpen && (
        <div className="fixed left-[5rem] top-16 bottom-4 z-50 w-96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out p-6 overflow-y-auto scrollbar-hide" style={{background: 'linear-gradient(180.01deg, rgba(50, 53, 62, 0.17) 0.01%, rgba(17, 18, 21, 0.2) 109.75%)'}}>
          {activeTab === 'prompt' ? (
            <Prompt onClose={() => setOpen(false)} segments={segments} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-white/90 capitalize">{activeTab}</h2>
                <button 
                  onClick={() => setOpen(false)}
                  className="p-1 text-white/50 hover:text-white/90 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 13.9926C6.38468 14 6.82431 14 7.33333 14H8.66667C10.5335 14 11.4669 14 12.18 13.6367C12.8072 13.3171 13.3171 12.8072 13.6367 12.18C14 11.4669 14 10.5335 14 8.66667V7.33333C14 5.46649 14 4.53307 13.6367 3.82003C13.3171 3.19282 12.8072 2.68289 12.18 2.36331C11.4669 2 10.5335 2 8.66667 2H7.33333C6.82431 2 6.38468 2 6 2.00736M6 13.9926C4.97385 13.973 4.33865 13.9009 3.82003 13.6367C3.19282 13.3171 2.68289 12.8072 2.36331 12.18C2 11.4669 2 10.5335 2 8.66667V7.33333C2 5.46649 2 4.53307 2.36331 3.82003C2.68289 3.19282 3.19282 2.68289 3.82003 2.36331C4.33865 2.09906 4.97385 2.02701 6 2.00736M6 13.9926L6 2.00736M11 6C10.2691 6.53103 9.61436 7.15354 9.0529 7.85106C8.98237 7.93869 8.98237 8.06132 9.0529 8.14894C9.61436 8.84646 10.2691 9.46897 11 10" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {activeTab === 'export' && <Export segments={segments || []} projectName={projectName} />}
                {activeTab === 'template' && <Template onTemplateSelect={onTemplateSelect} />}
                {activeTab === 'audio' && <Audio />}
                {activeTab === 'setting' && <Setting />}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Sidebar
