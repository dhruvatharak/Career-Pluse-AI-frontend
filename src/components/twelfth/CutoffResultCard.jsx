/**
 * CareerPulse AI - Cutoff Result Card Component
 * Summarizes 12th %, stream average, TNEA cutoff, NEET band, and subject marks chart.
 */

import React, { useState } from 'react';
import { Award, Info, Edit3 } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';
import SubjectMarksChart from './SubjectMarksChart.jsx';

export const CutoffResultCard = ({ cutoffRecord, onEditMarks }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!cutoffRecord) return null;

  const {
    stream,
    twelfthPercentage,
    twelfthMarks = {},
    jee,
    neet,
    results = {}
  } = cutoffRecord;

  return (
    <Card pastel="yellow" className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="yellow" size="sm">
              <Award className="w-3.5 h-3.5" />
              <span>{stream} Stream Pathway</span>
            </Badge>
            <span className="text-xs font-bold text-[#6b6475]">Academic Year 2024-2025</span>
          </div>
          <h2 className="text-2xl font-black text-[#2d2a32] mt-1">
            Your 12th Cutoffs & Performance
          </h2>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onEditMarks}
          icon={Edit3}
        >
          Edit Marks / மதிப்பெண் திருத்து
        </Button>
      </div>

      {/* Primary Cutoff Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* TNEA Engineering Cutoff */}
        {results?.tneaCutoff !== null && results?.tneaCutoff !== undefined && (
          <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs relative">
            <div className="flex items-center justify-between text-xs font-bold text-[#6b6475] mb-1">
              <span>TNEA Cutoff</span>
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-[#a49ca8] hover:text-[#2d2a32]"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-3xl font-black text-[#123940]">
              {results.tneaCutoff}
              <span className="text-xs text-[#a49ca8] font-bold"> / 200</span>
            </div>
            <div className="text-[10px] font-extrabold text-[#123940]/80 mt-1">
              Maths/2 + Physics/4 + Chemistry/4
            </div>
            {showTooltip && (
              <div className="absolute z-20 bottom-full left-0 mb-2 w-56 p-2.5 rounded-xl bg-[#2d2a32] text-white text-[11px] font-medium shadow-lg">
                Calculated using the standard TNEA formula: (Maths ÷ 2) + (Physics ÷ 4) + (Chemistry ÷ 4) out of 200.
              </div>
            )}
          </div>
        )}

        {/* 12th Overall Percentage */}
        <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs">
          <div className="text-xs font-bold text-[#6b6475] mb-1">12th Percentage</div>
          <div className="text-3xl font-black text-[#2d2a32]">
            {twelfthPercentage ? `${twelfthPercentage}%` : 'N/A'}
          </div>
          <div className="text-[10px] font-bold text-[#a49ca8] mt-1">Total Marks Average</div>
        </div>

        {/* Relevant Subject Average */}
        <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs">
          <div className="text-xs font-bold text-[#6b6475] mb-1">Subject Average</div>
          <div className="text-3xl font-black text-[#2d2a32]">
            {results?.relevantSubjectAverage ? `${results.relevantSubjectAverage}%` : 'N/A'}
          </div>
          <div className="text-[10px] font-bold text-[#a49ca8] mt-1">{stream} Core Subjects</div>
        </div>

        {/* Medical NEET Score & Band */}
        {neet?.score !== null && neet?.score !== undefined ? (
          <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs">
            <div className="text-xs font-bold text-[#6b6475] mb-1">NEET Score (720)</div>
            <div className="text-3xl font-black text-[#5c1c28]">
              {neet.score}
            </div>
            <div className="text-[10px] font-extrabold text-[#5c1c28] mt-1 capitalize">
              Band: {results?.neetBand?.status || 'Active'}
            </div>
          </div>
        ) : jee?.rank ? (
          <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs">
            <div className="text-xs font-bold text-[#6b6475] mb-1">JEE All India Rank</div>
            <div className="text-2xl font-black text-[#123940]">
              #{jee.rank.toLocaleString()}
            </div>
            <div className="text-[10px] font-bold text-[#a49ca8] mt-1">
              Score: {jee.score || 'N/A'}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs flex flex-col justify-center">
            <div className="text-xs font-bold text-[#6b6475]">Eligible Degrees</div>
            <div className="text-2xl font-black text-[#1e3a12]">
              {results?.eligibleCourseIds?.length || 0} Programs
            </div>
            <div className="text-[10px] font-bold text-[#a49ca8]">Based on current marks</div>
          </div>
        )}
      </div>

      {/* Marks Bar Chart */}
      <div className="rounded-2xl bg-white/70 p-4 border border-[#eee8e2]">
        <div className="flex items-center justify-between text-xs font-bold text-[#4f4a56] mb-2">
          <span>Subject Marks Breakdown (out of 100)</span>
          <span className="text-[10px] font-bold text-[#a49ca8]">TNEA / Board Standards</span>
        </div>
        <SubjectMarksChart marks={twelfthMarks} />
      </div>
    </Card>
  );
};

export default CutoffResultCard;
