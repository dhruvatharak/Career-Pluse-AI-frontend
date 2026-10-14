/**
 * CareerPulse AI - Recommendation Detail Modal Component
 */

import React from 'react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';

export const RecommendationDetailModal = ({ isOpen, onClose, recommendation }) => {
  if (!recommendation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Recommendation Report"
      subtitle={`Engine: ${
        recommendation.generatedBy === 'groq'
          ? 'Groq'
          : recommendation.generatedBy === 'gemini'
          ? 'Gemini'
          : 'Rule-based Fallback'
      }`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <p className="text-xs text-[#4d3800] bg-[#ffcd64]/20 p-3.5 rounded-2xl border border-[#ffcd64]/40 font-medium">
          {recommendation.summary}
        </p>
        <div className="space-y-2.5">
          {recommendation.results?.map((res, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#2d2a32]">{res.name}</span>
                <Badge variant={res.category === 'best' ? 'green' : 'yellow'} size="xs">
                  {res.category?.toUpperCase()} • {res.matchScore}%
                </Badge>
              </div>
              <p className="text-xs text-[#6b6475] leading-relaxed">{res.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default RecommendationDetailModal;
