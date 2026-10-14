/**
 * CareerPulse AI - Profile Cutoff Summary Card Component
 * Displays 12th board marks, TNEA cutoff, NEET band, JEE details, and eligible courses.
 */

import React, { useState } from 'react';
import { Award, Edit3, PlusCircle } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';
import MarksFormModal from '../twelfth/MarksFormModal.jsx';

export const ProfileCutoffCard = ({ cutoffRecord, onUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!cutoffRecord) {
    return (
      <Card pastel="yellow" className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ffcd64] flex items-center justify-center text-[#2d2a32]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#2d2a32]">My 12th Marks & Cutoffs</h3>
              <p className="text-xs text-[#6b6475]">No marks submitted yet.</p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} icon={PlusCircle}>
            Add 12th Marks / மதிப்பெண்கள் சேர்
          </Button>
        </div>
        <MarksFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={(newRec) => { onUpdated?.(newRec); setIsModalOpen(false); }}
        />
      </Card>
    );
  }

  const { stream, twelfthPercentage, twelfthMarks = {}, jee, neet, results = {} } = cutoffRecord;

  return (
    <Card pastel="yellow" className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#eee8e2] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffcd64] flex items-center justify-center text-[#2d2a32]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-[#2d2a32]">My 12th Marks & Cutoffs</h3>
              <Badge variant="yellow" size="xs">{stream}</Badge>
            </div>
            <p className="text-xs text-[#6b6475]">Calculated using standard official admission formulas</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)} icon={Edit3}>
          Edit Marks / திருத்து
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {results?.tneaCutoff != null && (
          <div className="p-3.5 rounded-2xl bg-white border border-[#eee8e2]">
            <div className="text-[11px] font-bold text-[#6b6475]">TNEA Cutoff</div>
            <div className="text-2xl font-black text-[#123940]">{results.tneaCutoff}<span className="text-xs text-[#a49ca8]"> / 200</span></div>
            <div className="text-[10px] text-[#123940]/80 font-bold">M/2 + P/4 + C/4</div>
          </div>
        )}
        <div className="p-3.5 rounded-2xl bg-white border border-[#eee8e2]">
          <div className="text-[11px] font-bold text-[#6b6475]">12th Percentage</div>
          <div className="text-2xl font-black text-[#2d2a32]">{twelfthPercentage ? `${twelfthPercentage}%` : 'N/A'}</div>
          <div className="text-[10px] text-[#a49ca8] font-bold">Total Aggregate</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-[#eee8e2]">
          <div className="text-[11px] font-bold text-[#6b6475]">Subject Average</div>
          <div className="text-2xl font-black text-[#2d2a32]">{results?.relevantSubjectAverage ? `${results.relevantSubjectAverage}%` : 'N/A'}</div>
          <div className="text-[10px] text-[#a49ca8] font-bold">{stream} Core</div>
        </div>
        {neet?.score ? (
          <div className="p-3.5 rounded-2xl bg-white border border-[#eee8e2]">
            <div className="text-[11px] font-bold text-[#6b6475]">NEET Score</div>
            <div className="text-2xl font-black text-[#5c1c28]">{neet.score}</div>
            <div className="text-[10px] text-[#5c1c28] font-bold capitalize">Band: {results?.neetBand?.status || 'Active'}</div>
          </div>
        ) : jee?.rank ? (
          <div className="p-3.5 rounded-2xl bg-white border border-[#eee8e2]">
            <div className="text-[11px] font-bold text-[#6b6475]">JEE Rank</div>
            <div className="text-2xl font-black text-[#123940]">#{jee.rank.toLocaleString()}</div>
            <div className="text-[10px] text-[#a49ca8] font-bold">Score: {jee.score || '-'}</div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-white border border-[#eee8e2]">
            <div className="text-[11px] font-bold text-[#6b6475]">Eligible Degrees</div>
            <div className="text-2xl font-black text-[#1e3a12]">{results?.eligibleCourseIds?.length || 0}</div>
            <div className="text-[10px] text-[#1e3a12] font-bold">Programs Verified</div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-[#4f4a56]">Subject Marks Recorded:</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(twelfthMarks)
            .filter(([_, val]) => val !== null && val !== undefined && val !== '')
            .map(([sub, val]) => (
              <span key={sub} className="px-3 py-1 rounded-xl bg-white border border-[#eee8e2] text-xs font-bold text-[#2d2a32]">
                <span className="capitalize">{sub}</span>: <span className="text-[#123940]">{val}/100</span>
              </span>
            ))}
        </div>
      </div>

      <MarksFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={cutoffRecord}
        onSaved={(newRec) => { onUpdated?.(newRec); setIsModalOpen(false); }}
      />
    </Card>
  );
};

export default ProfileCutoffCard;
