/**
 * CareerPulse AI - 12th Career Pathway Roadmap Strip
 * Displays student progression from 12th marks to degree and career destinations.
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';

export const CareerGuideRoadmapStrip = ({ cutoffRecord }) => {
  const tnea = cutoffRecord?.results?.tneaCutoff;
  const percentage = cutoffRecord?.twelfthPercentage;
  const stream = cutoffRecord?.stream || '12th';

  const steps = [
    {
      label: '12th Marks',
      value: percentage ? `${percentage}%` : 'Recorded',
      highlight: true
    },
    {
      label: 'Cutoff / Score',
      value: tnea ? `TNEA ${tnea}` : cutoffRecord?.neet?.score ? `NEET ${cutoffRecord.neet.score}` : 'Calculated',
      highlight: true
    },
    {
      label: 'Course',
      value: stream,
      highlight: true
    },
    {
      label: 'College',
      value: 'Allotment',
      highlight: false
    },
    {
      label: 'Admission Route',
      value: 'TNEA / Counselling',
      highlight: false
    },
    {
      label: 'Degree',
      value: 'Graduation',
      highlight: false
    },
    {
      label: 'Career / Studies',
      value: 'Govt & Private',
      highlight: false
    }
  ];

  return (
    <div className="rounded-3xl bg-[#faf7f5] border border-[#eee8e2] p-4 sm:p-5 shadow-xs">
      <div className="text-xs font-black uppercase text-[#6b6475] tracking-wider mb-3">
        Career Progression Pathway / கல்வி மற்றும் வேலைவாய்ப்பு படிநிலைகள்
      </div>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((st, i) => (
          <React.Fragment key={i}>
            <div
              className={`px-3 py-2 rounded-2xl border text-center shrink-0 min-w-[100px] transition-all ${
                st.highlight
                  ? 'bg-white border-[#e6b345] shadow-xs'
                  : 'bg-white/60 border-[#eee8e2]'
              }`}
            >
              <div className="text-[10px] font-bold text-[#6b6475]">{st.label}</div>
              <div className={`text-xs font-black truncate ${st.highlight ? 'text-[#123940]' : 'text-[#a49ca8]'}`}>
                {st.value}
              </div>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-[#a49ca8] shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CareerGuideRoadmapStrip;
