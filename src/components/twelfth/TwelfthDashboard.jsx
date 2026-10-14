/**
 * CareerPulse AI - 12th Standard Dashboard
 * 3 Sub-tabs: "My Marks & Courses" | "Top Colleges" | "Career Guide" (Phase 5).
 * Auto-opens MarksFormModal when user has no saved marks.
 */

import React, { useState, useEffect } from 'react';
import { Award, Building2, Sparkles } from 'lucide-react';
import MarksSubTab from './MarksSubTab.jsx';
import CollegesSubTab from './CollegesSubTab.jsx';
import CareerGuideSubTab from './CareerGuideSubTab.jsx';
import MarksFormModal from './MarksFormModal.jsx';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import { fetchMyCutoff } from '../../api/cutoff.api.js';

export const TwelfthDashboard = () => {
  const [subTab, setSubTab] = useState('marks'); // 'marks' | 'colleges' | 'careerGuide'
  const [cutoffRecord, setCutoffRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasDismissedModal, setHasDismissedModal] = useState(false);

  useEffect(() => {
    fetchMyCutoff()
      .then((res) => {
        if (res?.data) {
          setCutoffRecord(res.data);
        } else {
          setCutoffRecord(null);
          const sessionDismissed = sessionStorage.getItem('marks_modal_dismissed');
          if (!sessionDismissed && !hasDismissedModal) {
            setIsModalOpen(true);
          }
        }
      })
      .catch(() => setCutoffRecord(null));
  }, [hasDismissedModal]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setHasDismissedModal(true);
    sessionStorage.setItem('marks_modal_dismissed', 'true');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setSubTab('marks')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer select-none ${
            subTab === 'marks'
              ? 'bg-[#123940] text-white shadow-xs'
              : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#faf7f5]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>My Marks & Courses / என் மதிப்பெண்கள்</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('colleges')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer select-none ${
            subTab === 'colleges'
              ? 'bg-[#123940] text-white shadow-xs'
              : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#faf7f5]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Top Colleges / கல்லூரிகள்</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('careerGuide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer select-none ${
            subTab === 'careerGuide'
              ? 'bg-[#123940] text-white shadow-xs'
              : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#faf7f5]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Career Guide / வழிகாட்டி</span>
        </button>
      </div>

      {/* Sub-Tab Content */}
      {subTab === 'marks' && (
        <MarksSubTab
          cutoffRecord={cutoffRecord}
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}

      {subTab === 'colleges' && <CollegesSubTab />}

      {subTab === 'careerGuide' && (
        <CareerGuideSubTab
          cutoffRecord={cutoffRecord}
          onOpenMarksModal={() => setIsModalOpen(true)}
        />
      )}

      {/* Marks Entry Modal */}
      <MarksFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={cutoffRecord}
        onSaved={(savedRecord) => {
          setCutoffRecord(savedRecord);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default TwelfthDashboard;
