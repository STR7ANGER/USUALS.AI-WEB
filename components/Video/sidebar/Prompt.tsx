import React from "react";

type PromptProps = {
  onClose?: () => void;
};

const Prompt = ({ onClose }: PromptProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Prompts</h2>
        <button
          onClick={onClose}
          className="w-6 h-6  rounded flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 13.9926C6.38468 14 6.82431 14 7.33333 14H8.66667C10.5335 14 11.4669 14 12.18 13.6367C12.8072 13.3171 13.3171 12.8072 13.6367 12.18C14 11.4669 14 10.5335 14 8.66667V7.33333C14 5.46649 14 4.53307 13.6367 3.82003C13.3171 3.19282 12.8072 2.68289 12.18 2.36331C11.4669 2 10.5335 2 8.66667 2H7.33333C6.82431 2 6.38468 2 6 2.00736M6 13.9926C4.97385 13.973 4.33865 13.9009 3.82003 13.6367C3.19282 13.3171 2.68289 12.8072 2.36331 12.18C2 11.4669 2 10.5335 2 8.66667V7.33333C2 5.46649 2 4.53307 2.36331 3.82003C2.68289 3.19282 3.19282 2.68289 3.82003 2.36331C4.33865 2.09906 4.97385 2.02701 6 2.00736M6 13.9926L6 2.00736M11 6C10.2691 6.53103 9.61436 7.15354 9.0529 7.85106C8.98237 7.93869 8.98237 8.06132 9.0529 8.14894C9.61436 8.84646 10.2691 9.46897 11 10"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* History Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-cyan-400">History</h3>

        <div className="space-y-3">
          {/* Video 3 - Highlighted */}
          <div className="p-3 bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/15 transition-colors">
            <h4 className="text-sm font-medium text-cyan-400 mb-2">Video 3</h4>
            <p className="text-xs text-white leading-relaxed">
              This is my prompt. Follow my instructions...
            </p>
          </div>

          {/* Video 2 */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <h4 className="text-sm font-medium text-white/70 mb-2">Video 2</h4>
            <p className="text-xs text-white leading-relaxed">
              An astronaut saves earth from an asteroid...
            </p>
          </div>

          {/* Video 1 */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <h4 className="text-sm font-medium text-white/70 mb-2">Video 1</h4>
            <p className="text-xs text-white leading-relaxed">
              Sharp lunar landscape with a large crater...
            </p>
          </div>
        </div>
      </div>

      {/* Add New Video Button */}
      <div>
        <button className="w-full p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors">
          + Add New Video
        </button>
      </div>
    </div>
  );
};

export default Prompt;
