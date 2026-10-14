/**
 * CareerPulse AI - Reusable Button Component
 * School-student friendly rounded buttons with pastel accents and tactile feedback.
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-[#ffcd64] text-[#2d2a32] hover:bg-[#f5be4f] shadow-sm hover:shadow-md border border-[#ebb23e]',
    secondary:
      'bg-[#b1dfe4] text-[#123940] hover:bg-[#9fd1d7] border border-[#8ec7ce]',
    soft:
      'bg-[#dec7e0] text-[#361a3b] hover:bg-[#d0b5d3] border border-[#c19fc4]',
    outline:
      'bg-white text-[#2d2a32] border-2 border-[#ffcd64] hover:bg-[#fff9ec]',
    ghost:
      'bg-transparent text-[#2d2a32] hover:bg-[#fcdde3]/50',
    danger:
      'bg-[#fcdde3] text-[#78192a] hover:bg-[#f8bcc8] border border-[#f5a7b6]'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-xl',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-2xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
