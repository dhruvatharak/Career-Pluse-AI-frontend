/**
 * CareerPulse AI - Marks & Courses SubTab Component
 */

import React from 'react';
import { Award, PlusCircle } from 'lucide-react';
import CutoffResultCard from './CutoffResultCard.jsx';
import TopCoursesList from './TopCoursesList.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

export const MarksSubTab = ({ cutoffRecord, onOpenModal }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {cutoffRecord ? (
        <CutoffResultCard
          cutoffRecord={cutoffRecord}
          onEditMarks={onOpenModal}
        />
      ) : (
        <Card pastel="yellow" className="p-8 text-center max-w-2xl mx-auto space-y-4">
          <Award className="w-12 h-12 text-[#ffcd64] mx-auto" />
          <h3 className="text-xl font-extrabold text-[#2d2a32]">
            Calculate Your 12th Cutoffs & Program Eligibility
          </h3>
          <p className="text-xs sm:text-sm text-[#4f4a56] leading-relaxed">
            Enter your 12th board marks to calculate your TNEA Engineering cutoff (/200), NEET admission bands, and explore degree programs you qualify for.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={onOpenModal}
            icon={PlusCircle}
          >
            Enter 12th Marks / மதிப்பெண்களை உள்ளிடவும்
          </Button>
        </Card>
      )}

      {/* Top Courses Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-extrabold text-[#2d2a32]">
            Top Degree Courses (Based on Last Year's Admissions)
          </h3>
          <p className="text-xs text-[#6b6475]">
            Programs ranked by total verified admissions across Tamil Nadu institutions.
          </p>
        </div>
        <TopCoursesList cutoffRecord={cutoffRecord} />
      </div>
    </div>
  );
};

export default MarksSubTab;
