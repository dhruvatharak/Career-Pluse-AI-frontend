/**
 * CareerPulse AI - Quiz Result Component
 * Displays AI / rule-based group recommendations, category scores, and career progression roadmap.
 */

import React, { useState } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import Button from '../common/Button.jsx';
import GroupModal from './GroupModal.jsx';
import { fetchGroupById } from '../../api/group.api.js';
import {
  Sparkles,
  Milestone,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const CATEGORY_COLORS = {
  best: { variant: 'green', label: 'Best Match' },
  stretch: { variant: 'yellow', label: 'High Growth / Stretch' },
  safe: { variant: 'blue', label: 'Safe Foundation' }
};

export const QuizResult = ({ recommendation, onRetake }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loadingGroup, setLoadingGroup] = useState(false);

  if (!recommendation) return null;

  const { results = [], summary = '', generatedBy = 'fallback' } = recommendation;
  const topGroup = results[0];

  const handleOpenGroup = async (groupId) => {
    try {
      setLoadingGroup(true);
      const res = await fetchGroupById(groupId);
      if (res?.data) setSelectedGroup(res.data);
    } catch (err) {
      console.warn('Could not load group details:', err.message);
    } finally {
      setLoadingGroup(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Top Banner with AI Badge & Retake Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-[#eee8e2] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ffcd64] flex items-center justify-center text-[#2d2a32]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#2d2a32]">
              Your Recommended Higher Secondary Pathways
            </h3>
            <p className="text-xs text-[#6b6475] mt-0.5">
              Personalized based on your Tamil Nadu aptitude and subject responses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AIBadge
            generatedBy={generatedBy}
            fallbackReason={recommendation.fallbackReason}
            size="sm"
          />

          <Button variant="outline" size="sm" onClick={onRetake} icon={RefreshCw}>
            Retake Quiz
          </Button>
        </div>
      </div>

      {/* Summary Box */}
      {summary && (
        <Card pastel="yellow" className="p-5 text-xs sm:text-sm text-[#4d3800] leading-relaxed font-medium">
          {summary}
        </Card>
      )}

      {/* Top Group Roadmap Line */}
      {topGroup && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#faf7f5] border border-[#eee8e2] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2d2a32]">
            <Milestone className="w-4 h-4 text-[#dec7e0]" />
            <span>Top Track Progression Roadmap: {topGroup.name}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#eee8e2] text-xs font-bold text-[#2d2a32] flex items-center justify-between flex-wrap gap-2 text-center">
            <span className="px-2 py-1 rounded-md bg-[#faf7f5]">10th Marks</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#ffcd64]/30 text-[#4d3800]">{topGroup.id}</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#faf7f5]">12th Subjects</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#b1dfe4]/30 text-[#123940]">Degree</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#faf7f5]">Entrance Exam</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#faf7f5]">College</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#c3df96]/40 text-[#1e3a12]">Career</span>
          </div>
        </div>
      )}

      {/* Recommendation Cards */}
      <div className="space-y-4">
        {results.map((item, index) => {
          const catInfo = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.safe;
          return (
            <Card
              key={item.id + index}
              pastel="white"
              className="p-5 sm:p-6 space-y-4 hover:border-[#ffcd64] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={catInfo.variant} size="xs">
                      {catInfo.label}
                    </Badge>
                    <span className="text-xs font-bold text-[#a49ca8]">{item.id}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-[#2d2a32]">
                    {item.name}
                  </h4>
                </div>

                {/* Score Bar */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-[#a49ca8] block">Match</span>
                    <span className="text-sm font-black text-[#2d2a32]">{item.matchScore}%</span>
                  </div>
                  <div className="w-20 h-2 bg-[#faf7f5] rounded-full overflow-hidden border border-[#eee8e2]">
                    <div
                      className="h-full bg-[#ffcd64] rounded-full"
                      style={{ width: `${item.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4f4a56] leading-relaxed bg-[#faf7f5] p-3.5 rounded-2xl border border-[#eee8e2]">
                {item.reason}
              </p>

              <div className="flex justify-end pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  loading={loadingGroup}
                  onClick={() => handleOpenGroup(item.id)}
                  icon={ArrowRight}
                >
                  View Group Roadmap & Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      <GroupModal
        group={selectedGroup}
        isOpen={!!selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />
    </div>
  );
};

export default QuizResult;
