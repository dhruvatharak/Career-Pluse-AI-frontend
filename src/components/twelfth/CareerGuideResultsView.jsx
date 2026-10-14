/**
 * CareerPulse AI - 12th Career Guide Results View Component
 * Displays AI/Rule-based summary, roadmap strip, Best/Stretch/Safe cards, gov jobs, and disclaimer.
 */

import React, { useState } from 'react';
import { Sparkles, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import CareerGuideCandidateCard from './CareerGuideCandidateCard.jsx';
import CareerGuideRoadmapStrip from './CareerGuideRoadmapStrip.jsx';
import CareerGuideGovJobsTable from './CareerGuideGovJobsTable.jsx';
import CollegeDetailModal from './CollegeDetailModal.jsx';
import { OFFICIAL_DISCLAIMER } from '../../shared/constants.js';

export const CareerGuideResultsView = ({
  recommendation,
  govJobs = [],
  cutoffRecord
}) => {
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  if (!recommendation) return null;

  const results = recommendation.results || [];
  const localResults = results.filter((r) => !r.isOtherDistrict);
  const otherDistrictResults = results.filter((r) => r.isOtherDistrict);

  const bestMatches = localResults.filter((r) => r.category === 'best');
  const stretchMatches = localResults.filter((r) => r.category === 'stretch');
  const safeMatches = localResults.filter((r) => r.category === 'safe');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#ffcd64]/20 via-[#dec7e0]/20 to-[#b1dfe4]/20 border border-[#eee8e2] p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <AIBadge
            generatedBy={recommendation.generatedBy}
            fallbackReason={recommendation.fallbackReason}
            size="sm"
          />
          <span className="text-xs font-bold text-[#6b6475]">
            Target Track: {recommendation.input?.options?.join(' + ') || 'Higher Education'}
          </span>
        </div>

        <p className="text-sm font-semibold text-[#2d2a32] leading-relaxed">
          {recommendation.summary}
        </p>
      </div>

      {/* Pathway Progression Roadmap */}
      <CareerGuideRoadmapStrip
        cutoffRecord={cutoffRecord}
        recommendation={recommendation}
      />

      {/* Low-Cutoff Advisory Alert */}
      {recommendation.lowCutoffMessage && (
        <div className="p-4 rounded-2xl bg-[#ffcd64]/20 border border-[#ffcd64] flex items-start gap-3 text-xs text-[#4d3800] leading-relaxed shadow-xs">
          <AlertTriangle className="w-5 h-5 text-[#d99b26] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-[#2d2a32] mb-1">
              Cutoff Advisory & Recommended Alternatives
            </h4>
            <p>{recommendation.lowCutoffMessage}</p>
          </div>
        </div>
      )}

      {/* 1. Best Matches */}
      {bestMatches.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-black text-[#2d2a32] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#c3df96]" />
            <span>Best Match Colleges / சிறந்த பொருத்தமான கல்லூரிகள் ({bestMatches.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestMatches.map((item) => (
              <CareerGuideCandidateCard
                key={item.id}
                item={item}
                pastel="yellow"
                onOpenCollege={(colId) => setSelectedCollegeId(colId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. Stretch Matches */}
      {stretchMatches.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-black text-[#2d2a32] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#dec7e0]" />
            <span>Aspirational / Stretch Choices / உயர்விருப்ப கல்லூரிகள் ({stretchMatches.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stretchMatches.map((item) => (
              <CareerGuideCandidateCard
                key={item.id}
                item={item}
                pastel="lavender"
                onOpenCollege={(colId) => setSelectedCollegeId(colId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. Safe Matches */}
      {safeMatches.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-black text-[#2d2a32] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#b1dfe4]" />
            <span>Safe / Backup Options / பாதுகாப்பான கல்லூரிகள் ({safeMatches.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeMatches.map((item) => (
              <CareerGuideCandidateCard
                key={item.id}
                item={item}
                pastel="blue"
                onOpenCollege={(colId) => setSelectedCollegeId(colId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. More Options in Other Districts (District Fallback) */}
      {otherDistrictResults.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#eee8e2]">
          <div>
            <h3 className="text-lg font-black text-[#2d2a32] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#123940]" />
              <span>More options in other districts ({otherDistrictResults.length})</span>
            </h3>
            <p className="text-xs text-[#6b6475] mt-1 font-medium">
              {recommendation.districtNote ||
                `Not enough matches in ${recommendation.input?.district || 'selected district'}, so we also searched other districts.`}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherDistrictResults.map((item) => (
              <CareerGuideCandidateCard
                key={item.id}
                item={item}
                pastel="blue"
                onOpenCollege={(colId) => setSelectedCollegeId(colId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Government Jobs for this Qualification */}
      <CareerGuideGovJobsTable govJobs={govJobs} />

      {/* Statutory Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-[#ffcd64]/15 border border-[#ffcd64]/40 flex items-start gap-3 text-xs text-[#4d3800] leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-[#e6b345] shrink-0 mt-0.5" />
        <p>{OFFICIAL_DISCLAIMER}</p>
      </div>

      {/* College Detail Modal */}
      <CollegeDetailModal
        isOpen={Boolean(selectedCollegeId)}
        onClose={() => setSelectedCollegeId(null)}
        collegeId={selectedCollegeId}
      />
    </div>
  );
};

export default CareerGuideResultsView;
