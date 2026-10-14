/**
 * CareerPulse AI - Favorite Heart Button Component
 * Toggle button with optimistic state feedback and stopPropagation.
 */

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites.js';

export const FavoriteButton = ({
  itemType,
  itemId,
  itemObject = null,
  size = 'md',
  className = ''
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(itemType, itemId);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(itemType, itemId, itemObject);
  };

  const sizeClasses = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-9 h-9 p-2',
    lg: 'w-11 h-11 p-2.5'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-90 ${
        favorited
          ? 'bg-[#fcdde3] text-[#e02444] shadow-xs'
          : 'bg-white/80 hover:bg-[#faf7f5] text-[#a49ca8] hover:text-[#e02444] border border-[#eee8e2]'
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <Heart
        className={`${iconSizes[size] || iconSizes.md} transition-transform ${
          favorited ? 'fill-[#e02444] scale-105' : ''
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
