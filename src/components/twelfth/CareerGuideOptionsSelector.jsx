/**
 * CareerPulse AI - Career Guide Options Selector Component
 * Multi-select chips with inline contradiction disabling, district, and course filters.
 */

import React from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';
import DistrictFilter from '../common/DistrictFilter.jsx';
import Button from '../common/Button.jsx';
import { CAREER_GUIDE_OPTIONS } from '../../shared/constants.js';

export const CareerGuideOptionsSelector = ({
  selectedOptions = [],
  onOptionsChange,
  district,
  onDistrictChange,
  preferredCourse,
  onPreferredCourseChange,
  courses = [],
  onSubmit,
  loading = false
}) => {
  const isNeetSelected = selectedOptions.includes('NEET');
  const isWithoutNeetSelected = selectedOptions.includes('Without NEET');
  const isJeeSelected = selectedOptions.includes('JEE');
  const isWithoutJeeSelected = selectedOptions.includes('Without JEE');

  const isOptionDisabled = (opt) => {
    if (opt === 'Without NEET' && isNeetSelected) return true;
    if (opt === 'NEET' && isWithoutNeetSelected) return true;
    if (opt === 'Without JEE' && isJeeSelected) return true;
    if (opt === 'JEE' && isWithoutJeeSelected) return true;
    return false;
  };

  const selectedStreams = [];
  if (selectedOptions.includes('Engineering Stream')) selectedStreams.push('Engineering');
  if (selectedOptions.includes('Medical Stream')) selectedStreams.push('Medical');
  if (selectedOptions.includes('Commerce Stream')) selectedStreams.push('Commerce');
  if (selectedOptions.includes('Arts & Science Stream')) {
    selectedStreams.push('Arts', 'Science');
  }

  const filteredCourses =
    selectedStreams.length > 0
      ? courses.filter((c) => selectedStreams.includes(c.stream))
      : courses;

  const toggleOption = (opt) => {
    if (isOptionDisabled(opt)) return;
    if (selectedOptions.includes(opt)) {
      onOptionsChange(selectedOptions.filter((o) => o !== opt));
    } else {
      onOptionsChange([...selectedOptions, opt]);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-[#eee8e2] p-6 sm:p-8 space-y-6 shadow-xs">
      <div>
        <h3 className="text-xl font-extrabold text-[#2d2a32]">
          Choose Your Admission Interests & Constraints
        </h3>
        <p className="text-xs text-[#6b6475] mt-1">
          Combine target entrance exams and degree streams. Incompatible filters are disabled automatically.
        </p>
      </div>

      {/* Option Chips */}
      <div>
        <label className="block text-xs font-black uppercase text-[#6b6475] mb-2.5 tracking-wider">
          Career Track Options (Select at least 1)
        </label>
        <div className="flex flex-wrap gap-2.5">
          {CAREER_GUIDE_OPTIONS.map((opt) => {
            const selected = selectedOptions.includes(opt);
            const disabled = isOptionDisabled(opt);

            return (
              <button
                key={opt}
                type="button"
                disabled={disabled}
                onClick={() => toggleOption(opt)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  selected
                    ? 'bg-[#123940] text-white border-[#123940] shadow-xs scale-102'
                    : disabled
                    ? 'bg-[#faf7f5] text-[#a49ca8] border-[#eee8e2] opacity-40 cursor-not-allowed line-through'
                    : 'bg-[#faf7f5] text-[#2d2a32] border-[#eee8e2] hover:bg-white hover:border-[#dec7e0]'
                }`}
              >
                {selected && <Check className="w-3.5 h-3.5" />}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* District & Preferred Course Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#eee8e2]">
        <div>
          <label className="block text-xs font-bold text-[#4f4a56] mb-1.5">
            Preferred District (Optional)
          </label>
          <DistrictFilter
            value={district || 'All'}
            onChange={onDistrictChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4f4a56] mb-1.5">
            Target Course (Optional)
          </label>
          <select
            value={preferredCourse || ''}
            onChange={(e) => onPreferredCourseChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64] cursor-pointer"
          >
            <option value="">All Relevant Degree Courses</option>
            {filteredCourses.map((c) => (
              <option key={c.courseId} value={c.courseId}>
                {c.name} ({c.stream})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          variant="primary"
          size="md"
          loading={loading}
          disabled={selectedOptions.length === 0}
          onClick={onSubmit}
          icon={Sparkles}
        >
          {loading ? 'Finding the best matches…' : 'Get My Career Guide / வழிகாட்டியை பெறுக'}
        </Button>
      </div>
    </div>
  );
};

export default CareerGuideOptionsSelector;
