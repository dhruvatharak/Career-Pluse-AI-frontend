/**
 * CareerPulse AI - Career Guide Candidate Card Component
 */

import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import DemoDataBadge from '../common/DemoDataBadge.jsx';

export const CareerGuideCandidateCard = ({ item, pastel = 'yellow', onOpenCollege }) => {
  const getChanceBadge = (label, variant) => {
    if (!label) return null;
    const variantMap = {
      green: 'green',
      blue: 'blue',
      lavender: 'lavender',
      yellow: 'yellow',
      pink: 'pink'
    };
    return <Badge variant={variantMap[variant] || 'slate'} size="xs">{label}</Badge>;
  };

  return (
    <Card
      pastel={pastel}
      hoverable
      onClick={() => item.collegeId && onOpenCollege(item.collegeId)}
      className="p-5 flex flex-col justify-between cursor-pointer space-y-4"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="slate" size="xs">
              {item.category?.toUpperCase() || 'BEST'}
            </Badge>
            {item.district && (
              <Badge variant="blue" size="xs">
                {item.district}
              </Badge>
            )}
            <DemoDataBadge isSample={item.isSample !== false} />
          </div>
          <FavoriteButton
            itemType="degreeCollege"
            itemId={item.collegeId}
            itemObject={{ collegeId: item.collegeId, name: item.name }}
            size="sm"
          />
        </div>

        <div>
          <h4 className="text-base font-extrabold text-[#2d2a32] line-clamp-2 leading-snug">
            {item.name}
          </h4>
          <p className="text-xs text-[#4f4a56] mt-2 leading-relaxed italic bg-white/70 p-2.5 rounded-xl border border-[#eee8e2]">
            "{item.reason}"
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-[#eee8e2] space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#6b6475]">
          <span>
            Prev. Cutoff: <strong className="text-[#123940]">{item.prevCutoff || '-'}</strong> ({item.cutoffType})
          </span>
          {getChanceBadge(item.chanceLabel, item.chanceVariant)}
        </div>

        {/* Match Score Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123940]">
            <span>Affinity Match</span>
            <span>{item.matchScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#eee8e2] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ffcd64] to-[#123940] transition-all"
              style={{ width: `${item.matchScore}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CareerGuideCandidateCard;
