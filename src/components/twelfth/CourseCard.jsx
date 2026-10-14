/**
 * CareerPulse AI - Degree Course Card Component
 */

import React from 'react';
import { Users, ChevronRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import DemoDataBadge from '../common/DemoDataBadge.jsx';

export const CourseCard = ({ course, index, cutoffRecord, onClick }) => {
  const getEligibilityBadge = () => {
    if (!cutoffRecord) {
      return (
        <Badge variant="slate" size="xs">
          <HelpCircle className="w-3 h-3" />
          <span>Cutoff Pending</span>
        </Badge>
      );
    }

    const eligibleList = cutoffRecord.results?.eligibleCourseIds || [];
    if (eligibleList.includes(course.courseId)) {
      return (
        <Badge variant="green" size="xs">
          <CheckCircle2 className="w-3 h-3" />
          <span>Eligible</span>
        </Badge>
      );
    }

    if (course.stream === cutoffRecord.stream) {
      return (
        <Badge variant="yellow" size="xs">
          <AlertCircle className="w-3 h-3" />
          <span>Possible</span>
        </Badge>
      );
    }

    return (
      <Badge variant="pink" size="xs">
        <span>Not Eligible</span>
      </Badge>
    );
  };

  const pastelColors = ['yellow', 'blue', 'lavender', 'green'];

  return (
    <Card
      pastel={pastelColors[index % pastelColors.length]}
      hoverable
      onClick={onClick}
      className="p-5 flex flex-col justify-between cursor-pointer space-y-4"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-6 h-6 rounded-full bg-white/80 border border-[#eee8e2] flex items-center justify-center text-xs font-black text-[#2d2a32]">
              #{index + 1}
            </span>
            <Badge variant="slate" size="xs">
              {course.stream}
            </Badge>
            <DemoDataBadge isSample={course.isSample} />
          </div>
          {getEligibilityBadge()}
        </div>

        <h3 className="text-base font-extrabold text-[#2d2a32] line-clamp-1">
          {course.name}
        </h3>

        <p className="text-xs text-[#6b6475] line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#eee8e2] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#123940]">
          <Users className="w-3.5 h-3.5" />
          <span>
            {course.totalAdmitted ? `${course.totalAdmitted.toLocaleString()} Admitted` : 'Popular Choice'}
          </span>
          <span className="text-[10px] text-[#a49ca8]">({course.academicYear || '2024-2025'})</span>
        </div>
        <ChevronRight className="w-4 h-4 text-[#a49ca8]" />
      </div>
    </Card>
  );
};

export default CourseCard;
