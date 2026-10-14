/**
 * CareerPulse AI - Degree Colleges Filter Bar Component
 * Exam chips (JEE, NEET, etc.), district selector, tier, type, course, and search.
 */

import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import DistrictFilter from '../common/DistrictFilter.jsx';

const EXAM_CHIPS = [
  { id: 'All', label: 'All Exams' },
  { id: 'jee', label: 'JEE' },
  { id: 'neet', label: 'NEET' },
  { id: 'withoutNeet', label: 'Without NEET' },
  { id: 'withoutJee', label: 'Without JEE' }
];

const TIERS = ['All', 'Tier 1', 'Tier 2', 'Tier 3'];
const TYPES = ['All', 'Government', 'Government-Aided', 'Private', 'University', 'Deemed'];

export const CollegeFilterBar = ({
  filters,
  onChange,
  courseOptions = []
}) => {
  return (
    <div className="space-y-4 rounded-3xl bg-[#faf7f5] border border-[#eee8e2] p-5 shadow-xs">
      {/* Exam Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-black uppercase text-[#6b6475] mr-1 whitespace-nowrap">
          Entrance Filter:
        </span>
        {EXAM_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange({ ...filters, exam: chip.id })}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              filters.exam === chip.id
                ? 'bg-[#123940] text-white shadow-xs'
                : 'bg-white border border-[#eee8e2] text-[#4f4a56] hover:bg-[#eee8e2]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Dropdown Filters & Search Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-[#a49ca8] absolute left-3 top-3" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search college name..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64]"
          />
        </div>

        {/* District Filter */}
        <DistrictFilter
          value={filters.district || 'All'}
          onChange={(dist) => onChange({ ...filters, district: dist })}
          className="w-full"
        />

        {/* Tier Filter */}
        <select
          value={filters.tier || 'All'}
          onChange={(e) => onChange({ ...filters, tier: e.target.value })}
          className="w-full px-3 py-2 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64] cursor-pointer"
        >
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Tiers' : t}
            </option>
          ))}
        </select>

        {/* Institution Type Filter */}
        <select
          value={filters.type || 'All'}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
          className="w-full px-3 py-2 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64] cursor-pointer"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Types' : t}
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          value={filters.sort || 'tier'}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-full px-3 py-2 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64] cursor-pointer"
        >
          <option value="tier">Sort: Tier First</option>
          <option value="admissions">Sort: Highest Admissions</option>
        </select>
      </div>
    </div>
  );
};

export default CollegeFilterBar;
