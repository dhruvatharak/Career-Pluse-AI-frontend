/**
 * CareerPulse AI - Search Bar Component
 * Reusable search input with icon and instant clear button.
 */

import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search by name, subject, or keyword...',
  className = ''
}) => {
  return (
    <div className={`relative flex-1 ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a49ca8]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-[#eee8e2] bg-white text-sm focus:outline-none focus:border-[#ffcd64] focus:ring-1 focus:ring-[#ffcd64] transition-all placeholder-[#a49ca8]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#a49ca8] hover:text-[#2d2a32]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
