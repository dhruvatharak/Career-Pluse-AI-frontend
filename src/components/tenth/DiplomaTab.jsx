/**
 * CareerPulse AI - Diploma Tab Container Component
 * Unifies interest-based recommendations, full courses catalog, and polytechnic college directory.
 */

import React, { useState } from 'react';
import DiplomaRecommender from './DiplomaRecommender.jsx';
import DiplomaCourseList from './DiplomaCourseList.jsx';
import DiplomaCollegeList from './DiplomaCollegeList.jsx';
import { Sparkles, BookOpen, Building2 } from 'lucide-react';

const SECTIONS = [
  { id: 'recommend', label: 'Interest Advisor / பரிந்துரை', icon: Sparkles },
  { id: 'courses', label: 'All Diploma Courses / பாடப்பிரிவுகள்', icon: BookOpen },
  { id: 'colleges', label: 'Polytechnic Colleges / கல்லூரிகள்', icon: Building2 }
];

export const DiplomaTab = () => {
  const [activeSection, setActiveSection] = useState('recommend');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub-navigation for Diploma */}
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-3 overflow-x-auto no-scrollbar">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-[#c3df96] text-[#1e3a12] shadow-xs'
                  : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#faf7f5]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {activeSection === 'recommend' && <DiplomaRecommender />}
      {activeSection === 'courses' && <DiplomaCourseList />}
      {activeSection === 'colleges' && <DiplomaCollegeList />}
    </div>
  );
};

export default DiplomaTab;
