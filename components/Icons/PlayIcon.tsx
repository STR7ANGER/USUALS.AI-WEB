import React from 'react';

interface PlayIconProps {
  className?: string;
  size?: number;
}

const PlayIcon: React.FC<PlayIconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.5 12.4917C5.5 8.6734 5.5 6.76426 6.29793 5.69844C6.9933 4.76962 8.05771 4.18851 9.21503 4.10585C10.5431 4.01099 12.149 5.04337 15.3608 7.10814L15.7923 7.38548C18.5794 9.17718 19.9729 10.073 20.4542 11.2121C20.8748 12.2075 20.8748 13.3306 20.4542 14.3259C19.9729 15.465 18.5794 16.3609 15.7923 18.1526L15.3608 18.4299C12.149 20.4947 10.5431 21.527 9.21503 21.4322C8.05771 21.3495 6.9933 20.7684 6.29793 19.8396C5.5 18.7738 5.5 16.8646 5.5 13.0464V12.4917Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayIcon;
