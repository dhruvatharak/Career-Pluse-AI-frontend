/**
 * CareerPulse AI - Degree Colleges List Component
 * Renders cards with tier badges, admission routes, favorite heart, and pagination.
 */

import React, { useState } from 'react';
import { Building2, MapPin, ExternalLink, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import DemoDataBadge from '../common/DemoDataBadge.jsx';
import CollegeDetailModal from './CollegeDetailModal.jsx';

export const CollegeList = ({
  colleges = [],
  pagination = {},
  loading = false,
  onPageChange
}) => {
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  if (loading) {
    return <Loader message="Fetching degree colleges across Tamil Nadu..." />;
  }

  if (colleges.length === 0) {
    return (
      <EmptyState
        title="No colleges found"
        description="Try adjusting your entrance exam, district, or tier filters."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colleges.map((col, idx) => (
          <Card
            key={col.collegeId}
            pastel={idx % 3 === 0 ? 'yellow' : idx % 3 === 1 ? 'blue' : 'lavender'}
            hoverable
            onClick={() => setSelectedCollegeId(col.collegeId)}
            className="p-5 flex flex-col justify-between cursor-pointer space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant={col.tier === 'Tier 1' ? 'yellow' : col.tier === 'Tier 2' ? 'blue' : 'slate'} size="xs">
                    {col.tier}
                  </Badge>
                  <DemoDataBadge isSample={col.isSample} />
                </div>
                <FavoriteButton
                  itemType="degreeCollege"
                  itemId={col.collegeId}
                  itemObject={col}
                  size="sm"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#2d2a32] line-clamp-2 leading-snug">
                  {col.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6b6475] mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ffcd64]" />
                  <span>{col.district} District • {col.type}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eee8e2] flex items-center justify-between text-xs">
              <span className="font-bold text-[#123940] px-2.5 py-1 rounded-xl bg-white/80 border border-[#eee8e2]">
                {col.admissionRoute}
              </span>
              <span className="text-[11px] font-bold text-[#6b6475]">
                {col.totalAdmitted ? `${col.totalAdmitted.toLocaleString()} Admitted` : 'Admissions Open'}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination?.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
            className="p-2 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] hover:bg-[#faf7f5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-extrabold text-[#6b6475]">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
            className="p-2 rounded-2xl border border-[#eee8e2] bg-white text-xs font-bold text-[#2d2a32] hover:bg-[#faf7f5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* College Detail Modal */}
      <CollegeDetailModal
        isOpen={Boolean(selectedCollegeId)}
        onClose={() => setSelectedCollegeId(null)}
        collegeId={selectedCollegeId}
      />
    </div>
  );
};

export default CollegeList;
