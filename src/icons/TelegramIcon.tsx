import React from 'react';

const TelegramIcon = ({ width = 20, height = 20, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="120" cy="120" r="120" fill="#37AEE2" />
    <path
      d="M179.5 74.5L157.5 170.5C155.5 178.5 150.5 180.5 143.5 176.5L110.5 151.5L94.5 166.5C92.5 168.5 91 170 87.5 170L89.5 136.5L157.5 82.5C160.5 80 157.5 78.5 153.5 81.5L75.5 132.5L42.5 122.5C35.5 120.5 35.5 115.5 44.5 112.5L170.5 69.5C176.5 67.5 181.5 71.5 179.5 74.5Z"
      fill="#fff"
    />
  </svg>
);

export default TelegramIcon; 