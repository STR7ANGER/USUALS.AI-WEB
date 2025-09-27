import React from 'react';

interface PauseIconProps {
  className?: string;
  size?: number;
}

const PauseIcon: React.FC<PauseIconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="6" y="4" width="4" height="16" fill="white" />
      <rect x="14" y="4" width="4" height="16" fill="white" />
    </svg>
  );
};

export default PauseIcon;
