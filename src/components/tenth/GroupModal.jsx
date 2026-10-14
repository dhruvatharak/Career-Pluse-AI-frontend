/**
 * CareerPulse AI - Group Detail Modal Component
 * Displays comprehensive details of Higher Secondary groups with full career roadmap.
 */

import React from 'react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  Compass,
  Award,
  Layers,
  Sparkles,
  Milestone
} from 'lucide-react';

export const GroupModal = ({ group, isOpen, onClose }) => {
  if (!group) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={group.name}
      subtitle={`Code: ${group.groupId} • Typical Guideline: ~${group.minMarks}/500 marks in 10th SSLC`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Top Action Bar with Roadmap Line */}
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#ffcd64]/20 border border-[#ffcd64]/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffcd64] shrink-0" />
            <span className="text-xs font-bold text-[#4d3800]">
              Eligibility: {group.eligibility}
            </span>
          </div>
          <FavoriteButton itemType="group" itemId={group.groupId} itemObject={group} size="sm" />
        </div>

        {/* Roadmap Line Requirement */}
        <div className="p-4 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2d2a32]">
            <Milestone className="w-4 h-4 text-[#dec7e0]" />
            <span>Educational Pathway Roadmap / கல்விப் பாதை</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#eee8e2] text-xs font-bold text-[#2d2a32] flex items-center justify-between flex-wrap gap-2 text-center">
            <span className="px-2 py-1 rounded-md bg-[#faf7f5]">10th Marks</span>
            <span className="text-[#a49ca8]">→</span>
            <span className="px-2 py-1 rounded-md bg-[#ffcd64]/30 text-[#4d3800]">{group.groupId}</span>
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

        {/* Suitable Profile */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#a49ca8]">
            Suitable Student Profile / யாருக்கு ஏற்றது?
          </h4>
          <p className="text-xs sm:text-sm font-medium text-[#2d2a32] bg-[#faf7f5] p-3.5 rounded-2xl border border-[#eee8e2] leading-relaxed">
            {group.suitableProfile}
          </p>
        </div>

        {/* Subjects & Entrance Exams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2d2a32] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#ffcd64]" />
              <span>Full Subject Combination</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.subjects.map((s, idx) => (
                <Badge key={idx} variant="slate" size="xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#eee8e2] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2d2a32] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#b1dfe4]" />
              <span>Key Entrance Exams</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.entranceExams.map((exam, idx) => (
                <Badge key={idx} variant="blue" size="xs">
                  {exam}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Courses After 12th */}
        <div className="p-4 rounded-2xl bg-[#b1dfe4]/15 border border-[#b1dfe4]/40 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#123940] flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#123940]" />
            <span>Eligible Degrees & Courses After 12th (+2)</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.coursesAfter12th.map((c, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white text-[#123940] border border-[#b1dfe4]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Careers: Government & Private */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#c3df96]/15 border border-[#c3df96]/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a12] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#1e3a12]" />
              <span>Government Opportunities</span>
            </h4>
            <ul className="text-xs text-[#2d2a32] space-y-1 list-disc list-inside">
              {group.govtCareers.map((g, idx) => (
                <li key={idx} className="font-medium">{g}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#dec7e0]/15 border border-[#dec7e0]/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#361a3b] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#361a3b]" />
              <span>Private Sector & Corporate</span>
            </h4>
            <ul className="text-xs text-[#2d2a32] space-y-1 list-disc list-inside">
              {group.privateCareers.map((p, idx) => (
                <li key={idx} className="font-medium">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Higher Studies */}
        <div className="p-4 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6b6475] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#6b6475]" />
            <span>Higher Studies & Research Horizons</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.higherStudies.map((h, idx) => (
              <Badge key={idx} variant="slate" size="xs">
                {h}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GroupModal;
