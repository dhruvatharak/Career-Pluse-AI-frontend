/**
 * CareerPulse AI - District Filter Component
 * Dropdown selector for filtering records across all 38 Tamil Nadu districts.
 */

import React from 'react';
import { MapPin } from 'lucide-react';
import { TN_DISTRICTS } from '../../shared/constants.js';

export const DistrictFilter = ({
  value = 'All',
  onChange,
  className = '',
  showAllOption = true
}) => {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a49ca8]">
        <MapPin className="w-4 h-4 text-[#ffcd64]" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-8 py-2.5 rounded-2xl border border-[#eee8e2] bg-white text-xs sm:text-sm font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64] cursor-pointer shadow-xs transition-colors"
      >
        {showAllOption && (
          <option value="All">All Districts / அனைத்து மாவட்டங்கள்</option>
        )}
        {TN_DISTRICTS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictFilter;
