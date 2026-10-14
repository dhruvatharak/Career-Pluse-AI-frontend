/**
 * CareerPulse AI - Recommendations History Component
 * Lists student saved quiz and diploma recommendations with expandable result cards.
 */

import React from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import { Sparkles, Calendar, BookOpen, GraduationCap } from 'lucide-react';

export const RecommendationsHistory = ({ recommendations = [] }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card pastel="yellow" className="p-6 text-center space-y-2 border border-[#ffcd64]/40">
        <p className="text-sm font-bold text-[#2d2a32]">No saved career recommendations yet.</p>
        <p className="text-xs text-[#6b6475]">
          Try the Career Guide Quiz or Diploma Recommender to generate tailored suggestions.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-2">
        <Sparkles className="w-5 h-5 text-[#ffcd64]" />
        <h3 className="text-lg font-extrabold text-[#2d2a32]">
          My Recommendations / தொழில் வழிகாட்டல் ({recommendations.length})
        </h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isQuiz = rec.type === 'quiz-group';
          return (
            <Card key={rec._id} pastel="white" className="p-5 space-y-3 border border-[#eee8e2]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eee8e2] pb-3">
                <div className="flex items-center gap-2">
                  {isQuiz ? (
                    <BookOpen className="w-4 h-4 text-[#dec7e0]" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-[#c3df96]" />
                  )}
                  <span className="text-xs font-extrabold text-[#2d2a32] uppercase tracking-wide">
                    {isQuiz ? 'Higher Secondary Group Assessment' : 'Polytechnic Diploma Pathway'}
                  </span>
                  <AIBadge
                    generatedBy={rec.generatedBy}
                    fallbackReason={rec.fallbackReason}
                    size="xs"
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#6b6475] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(rec.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {rec.summary && (
                <p className="text-xs text-[#4f4a56] font-medium leading-relaxed bg-[#faf7f5] p-3 rounded-xl border border-[#eee8e2]">
                  {rec.summary}
                </p>
              )}

              {/* Results Chips / Summary List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {rec.results?.map((res, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-[#eee8e2] flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#2d2a32] truncate">{res.name}</span>
                    <Badge variant={res.category === 'best' ? 'green' : 'yellow'} size="xs">
                      {res.matchScore}%
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsHistory;
