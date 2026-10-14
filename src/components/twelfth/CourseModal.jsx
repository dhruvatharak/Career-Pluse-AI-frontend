/**
 * CareerPulse AI - Course Detail Modal Component
 * Displays comprehensive degree syllabus, career options, higher education, and offering colleges.
 */

import React, { useEffect, useState } from 'react';
import { BookOpen, Briefcase, GraduationCap, Building2, ExternalLink } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import { fetchCourseById } from '../../api/course.api.js';

export const CourseModal = ({ isOpen, onClose, course }) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && course?.courseId) {
      setLoading(true);
      fetchCourseById(course.courseId)
        .then((res) => setCourseData(res?.data || null))
        .catch(() => setCourseData(null))
        .finally(() => setLoading(false));
    }
  }, [isOpen, course?.courseId]);

  if (!isOpen) return null;
  const c = courseData?.course || course;
  const colleges = courseData?.colleges || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={c?.name || 'Course Details'}
      subtitle={`${c?.stream || 'Degree'} • ${c?.duration || '4 Years'}`}
      maxWidth="max-w-3xl"
    >
      {loading ? (
        <Loader message="Loading course curriculum and colleges..." />
      ) : (
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#6b6475] mb-1">
              Course Overview
            </h4>
            <p className="text-sm text-[#4f4a56] leading-relaxed">
              {c?.description || 'No detailed description available.'}
            </p>
          </div>

          {/* What you study */}
          {c?.whatYouStudy?.length > 0 && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#6b6475] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#ffcd64]" />
                <span>What You Study / முக்கிய பாடங்கள்</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {c.whatYouStudy.map((item, idx) => (
                  <Badge key={idx} variant="yellow" size="sm">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Careers & Govt Opportunities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c?.careers?.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] space-y-2">
                <h4 className="text-xs font-bold text-[#2d2a32] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#123940]" />
                  <span>Private Careers / வேலைவாய்ப்புகள்</span>
                </h4>
                <ul className="text-xs text-[#4f4a56] space-y-1 list-disc list-inside">
                  {c.careers.map((career, idx) => (
                    <li key={idx}>{career}</li>
                  ))}
                </ul>
              </div>
            )}

            {c?.govtCareers?.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] space-y-2">
                <h4 className="text-xs font-bold text-[#2d2a32] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#1e3a12]" />
                  <span>Government Careers / அரசு பணிகள்</span>
                </h4>
                <ul className="text-xs text-[#4f4a56] space-y-1 list-disc list-inside">
                  {c.govtCareers.map((gCareer, idx) => (
                    <li key={idx}>{gCareer}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Top Colleges Offering This Degree */}
          {colleges.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#6b6475] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#ffcd64]" />
                <span>Top Colleges Offering This Course ({colleges.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                {colleges.slice(0, 8).map((col) => (
                  <div
                    key={col.collegeId}
                    className="p-3 rounded-2xl bg-white border border-[#eee8e2] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#2d2a32] line-clamp-1">{col.name}</div>
                      <div className="text-[10px] text-[#6b6475]">
                        {col.district} • {col.tier}
                      </div>
                    </div>
                    {col.website && (
                      <a
                        href={col.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl hover:bg-[#faf7f5] text-[#a49ca8] hover:text-[#2d2a32]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default CourseModal;
