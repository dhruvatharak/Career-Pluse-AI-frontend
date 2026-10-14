/**
 * CareerPulse AI - Career Guide History Collapsible List Component
 */

import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, Sparkles, Calendar } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';

export const CareerGuideHistoryList = ({ history = [], onSelectRecommendation }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!history || history.length === 0) return null;

  return (
    <div className="rounded-3xl bg-white border border-[#eee8e2] overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-[#faf7f5] hover:bg-[#eee8e2]/50 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
          <History className="w-4 h-4 text-[#ffcd64]" />
          <span>Previous 12th Career Guidance Sessions ({history.length})</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-[#6b6475]" /> : <ChevronDown className="w-4 h-4 text-[#6b6475]" />}
      </button>

      {isOpen && (
        <div className="p-4 divide-y divide-[#eee8e2] space-y-2 max-h-72 overflow-y-auto">
          {history.map((rec) => (
            <div
              key={rec._id}
              onClick={() => onSelectRecommendation(rec)}
              className="pt-3 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-[#faf7f5] p-2.5 rounded-2xl cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AIBadge
                    generatedBy={rec.generatedBy}
                    fallbackReason={rec.fallbackReason}
                    size="xs"
                  />
                  <span className="text-xs font-bold text-[#2d2a32]">
                    {rec.input?.options?.join(' + ') || 'General 12th'}
                  </span>
                </div>
                <p className="text-[11px] text-[#6b6475] line-clamp-1">{rec.summary}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#a49ca8]">
                <Calendar className="w-3 h-3" />
                <span>{new Date(rec.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerGuideHistoryList;
