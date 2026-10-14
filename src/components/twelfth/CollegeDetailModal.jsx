/**
 * CareerPulse AI - Degree College Detail Modal Component
 * Displays college info, courses table with cutoffs, student chance badges, fees, and multi-year trend.
 */

import React, { useState, useEffect } from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import CollegeTrendChart from './CollegeTrendChart.jsx';
import CollegeCoursesTable from './CollegeCoursesTable.jsx';
import { fetchCollegeById } from '../../api/college.api.js';
import { OFFICIAL_DISCLAIMER } from '../../shared/constants.js';

export const CollegeDetailModal = ({ isOpen, onClose, collegeId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourseForTrend, setSelectedCourseForTrend] = useState(null);

  useEffect(() => {
    if (isOpen && collegeId) {
      setLoading(true);
      fetchCollegeById(collegeId)
        .then((res) => {
          setData(res?.data || null);
          const firstWithTrends = res?.data?.courses?.find((c) => c.trends?.length >= 2);
          setSelectedCourseForTrend(firstWithTrends || null);
        })
        .catch(() => setData(null))
        .finally(() => setLoading(false));
    }
  }, [isOpen, collegeId]);

  if (!isOpen) return null;
  const col = data?.college;
  const courses = data?.courses || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={col?.name || 'College Details'}
      subtitle={`${col?.district} • ${col?.tier} • ${col?.type} Institution`}
      maxWidth="max-w-4xl"
    >
      {loading ? (
        <Loader message="Loading college cutoffs, courses, and fee structures..." />
      ) : (
        <div className="space-y-6">
          {/* Top Quick Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#faf7f5] border border-[#eee8e2]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="blue" size="sm">{col?.admissionRoute || 'TNEA'}</Badge>
              <Badge variant="yellow" size="sm">Tier: {col?.tier}</Badge>
              <span className="text-xs font-bold text-[#6b6475]">Official Source: {col?.officialSource || 'DOTE / TNEA'}</span>
            </div>
            {col?.website && (
              <a
                href={col.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123940] hover:underline"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Multi-Year Trend Chart if available */}
          {selectedCourseForTrend && selectedCourseForTrend.trends?.length >= 2 && (
            <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#2d2a32]">
                  {selectedCourseForTrend.name} ({selectedCourseForTrend.cutoffType})
                </span>
                <span className="text-[10px] font-bold text-[#a49ca8]">
                  Historical Cutoffs
                </span>
              </div>
              <CollegeTrendChart trends={selectedCourseForTrend.trends} />
            </div>
          )}

          {/* Courses & Cutoffs Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#6b6475]">
              Offered Courses, Seats & Cutoffs ({courses.length})
            </h4>
            <CollegeCoursesTable
              courses={courses}
              selectedCourseForTrend={selectedCourseForTrend}
              onSelectCourseForTrend={(c) => setSelectedCourseForTrend(c)}
            />
          </div>

          {/* Statutory Disclaimer Notice */}
          <div className="p-4 rounded-2xl bg-[#ffcd64]/15 border border-[#ffcd64]/40 flex items-start gap-3 text-xs text-[#4d3800] leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-[#e6b345] shrink-0 mt-0.5" />
            <p>{OFFICIAL_DISCLAIMER}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CollegeDetailModal;
