/**
 * CareerPulse AI - Reusable Badge Component
 * Categorical and eligibility indicator tags with friendly rounded design.
 */

import React from 'react';

export const Badge = ({
  children,
  variant = 'blue', // 'blue' | 'yellow' | 'green' | 'pink' | 'lavender' | 'slate'
  size = 'sm',
  className = '',
  title,
  ...props
}) => {
  const variants = {
    yellow: 'bg-[#ffcd64] text-[#4d3800] border border-[#e6b345]',
    green: 'bg-[#c3df96] text-[#1e3a12] border border-[#a8c973]',
    blue: 'bg-[#b1dfe4] text-[#123940] border border-[#91cad0]',
    pink: 'bg-[#fcdde3] text-[#5c1c28] border border-[#f5b8c3]',
    lavender: 'bg-[#dec7e0] text-[#361a3b] border border-[#c9accb]',
    slate: 'bg-[#ece8e3] text-[#2d2a32] border border-[#ded7cf]'
  };

  const sizes = {
    xs: 'text-[10px] font-bold px-2 py-0.5 rounded-full',
    sm: 'text-xs font-bold px-3 py-1 rounded-full',
    md: 'text-sm font-bold px-4 py-1.5 rounded-full'
  };

  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 leading-none ${variants[variant] || variants.blue} ${sizes[size] || sizes.sm} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
