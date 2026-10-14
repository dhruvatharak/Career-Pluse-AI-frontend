/**
 * CareerPulse AI - Group Card Component
 * Pastel-themed card displaying group name, subject chips, min marks, and favorite toggle.
 */

import React from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import DemoDataBadge from '../common/DemoDataBadge.jsx';
import { BookOpen, ArrowRight, Award } from 'lucide-react';

const PASTEL_VARIANTS = ['yellow', 'blue', 'green', 'lavender', 'pink'];

export const GroupCard = ({ group, index = 0, onSelect }) => {
  const pastel = PASTEL_VARIANTS[index % PASTEL_VARIANTS.length];

  return (
    <Card
      pastel={pastel}
      onClick={() => onSelect(group)}
      className="cursor-pointer flex flex-col justify-between group transition-all duration-200"
    >
      <div className="space-y-4">
        {/* Header with Group Code & Favorite Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={pastel} size="xs">
              {group.groupId}
            </Badge>
            <DemoDataBadge isSample={group.isSample} />
          </div>
          <FavoriteButton itemType="group" itemId={group.groupId} itemObject={group} size="sm" />
        </div>

        {/* Group Name */}
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#2d2a32] group-hover:text-[#4d3800] transition-colors leading-snug">
            {group.name}
          </h3>
          <p className="text-xs text-[#6b6475] mt-1 line-clamp-2">
            {group.suitableProfile}
          </p>
        </div>

        {/* Subject Chips */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#a49ca8]">
            Key Subjects / பாடங்கள்
          </p>
          <div className="flex flex-wrap gap-1.5">
            {group.subjects.slice(0, 4).map((sub, i) => (
              <span
                key={i}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-white/80 text-[#2d2a32] border border-[#eee8e2]"
              >
                {sub}
              </span>
            ))}
            {group.subjects.length > 4 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-white/50 text-[#6b6475]">
                +{group.subjects.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-5 mt-4 border-t border-[#eee8e2]/70 flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-1 text-[#6b6475]">
          <Award className="w-3.5 h-3.5 text-[#ffcd64]" />
          <span>Typical ~{group.minMarks}/500</span>
        </div>
        <div className="flex items-center gap-1 text-[#2d2a32] group-hover:translate-x-1 transition-transform font-bold">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Card>
  );
};

export default GroupCard;
