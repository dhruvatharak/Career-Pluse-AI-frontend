/**
 * CareerPulse AI - Reusable Card Component
 * Friendly rounded container with soft pastel borders and shadows.
 */

import React from 'react';

export const Card = ({
  children,
  className = '',
  pastel = 'white', // 'white' | 'pink' | 'yellow' | 'green' | 'blue' | 'lavender'
  hover = true,
  onClick,
  ...props
}) => {
  const pastels = {
    white: 'bg-white border-[#eee8e2]',
    pink: 'bg-[#fcdde3]/30 border-[#fcdde3]',
    yellow: 'bg-[#ffcd64]/20 border-[#ffcd64]/60',
    green: 'bg-[#c3df96]/20 border-[#c3df96]/60',
    blue: 'bg-[#b1dfe4]/25 border-[#b1dfe4]/70',
    lavender: 'bg-[#dec7e0]/25 border-[#dec7e0]/70'
  };

  const hoverStyle = hover
    ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border p-5 sm:p-6 shadow-xs ${pastels[pastel] || pastels.white} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
