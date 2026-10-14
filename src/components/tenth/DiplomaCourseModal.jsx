/**
 * CareerPulse AI - Diploma Course Detail Modal
 * Displays complete course duration, eligibility, interest tags, careers, and lateral entry pathways.
 */

import React from 'react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import {
  Clock,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

export const DiplomaCourseModal = ({ course, isOpen, onClose }) => {
  if (!course) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={course.name}
      subtitle={`Code: ${course.courseId} • Duration: ${course.duration} • Eligibility: ${course.eligibility}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#c3df96]/20 border border-[#c3df96]/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1e3a12] shrink-0" />
            <span className="text-xs font-bold text-[#1e3a12]">
              Eligibility: {course.eligibility}
            </span>
          </div>
          <FavoriteButton itemType="diploma" itemId={course.courseId} itemObject={course} size="sm" />
        </div>

        {/* Interest Tags */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#a49ca8]">
            Key Interest Tags / விருப்பப் பிரிவுகள்
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {course.interestTags?.map((tag, idx) => (
              <Badge key={idx} variant="green" size="xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Private Careers & Job Roles */}
        <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2d2a32] flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#ffcd64]" />
            <span>Industrial Career Opportunities & Roles</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.careers?.map((car, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#faf7f5] text-[#2d2a32] border border-[#eee8e2]"
              >
                {car}
              </span>
            ))}
          </div>
        </div>

        {/* Higher Studies (Lateral Entry B.E./B.Tech) */}
        <div className="p-4 rounded-2xl bg-[#b1dfe4]/15 border border-[#b1dfe4]/40 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#123940] flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#123940]" />
            <span>Higher Studies (Direct 2nd Year Engineering Lateral Entry)</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.higherStudies?.map((study, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white text-[#123940] border border-[#b1dfe4]"
              >
                {study}
              </span>
            ))}
          </div>
        </div>

        {/* Government Career Opportunities */}
        <div className="p-4 rounded-2xl bg-[#c3df96]/15 border border-[#c3df96]/40 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a12] flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#1e3a12]" />
            <span>Government Recruitment Portals & Public Sector Posts</span>
          </h4>
          <ul className="text-xs text-[#2d2a32] space-y-1 list-disc list-inside">
            {course.govtCareers?.map((gov, idx) => (
              <li key={idx} className="font-medium">{gov}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default DiplomaCourseModal;
