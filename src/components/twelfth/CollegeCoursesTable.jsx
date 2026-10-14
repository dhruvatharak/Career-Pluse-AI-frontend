/**
 * CareerPulse AI - College Courses Table Component
 * Displays offered courses, cutoffs, student chance, intake, and fee details.
 */

import React from 'react';
import Badge from '../common/Badge.jsx';

export const CollegeCoursesTable = ({
  courses = [],
  selectedCourseForTrend,
  onSelectCourseForTrend
}) => {
  const getChanceBadge = (chanceLabel, variant) => {
    if (!chanceLabel || chanceLabel === 'Cutoff Pending') {
      return <Badge variant="slate" size="xs">Marks Pending</Badge>;
    }
    const variantMap = {
      green: 'green',
      blue: 'blue',
      lavender: 'lavender',
      yellow: 'yellow',
      pink: 'pink'
    };
    return <Badge variant={variantMap[variant] || 'slate'} size="xs">{chanceLabel}</Badge>;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#eee8e2] bg-white">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#faf7f5] border-b border-[#eee8e2] text-[#4f4a56] font-extrabold">
            <th className="p-3">Course</th>
            <th className="p-3">Cutoff Type</th>
            <th className="p-3">Prev. Cutoff</th>
            <th className="p-3">Your Value</th>
            <th className="p-3">Admission Chance</th>
            <th className="p-3">Seats (Intake / Admitted)</th>
            <th className="p-3">Annual Fees</th>
            <th className="p-3">Hostel</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eee8e2]">
          {courses.map((course) => (
            <tr
              key={course.courseId}
              onClick={() => course.trends?.length >= 2 && onSelectCourseForTrend(course)}
              className={`hover:bg-[#faf7f5] transition-colors cursor-pointer ${
                selectedCourseForTrend?.courseId === course.courseId ? 'bg-[#ffcd64]/10' : ''
              }`}
            >
              <td className="p-3 font-bold text-[#2d2a32]">
                <div>{course.name}</div>
                <div className="text-[10px] text-[#6b6475]">{course.duration}</div>
              </td>
              <td className="p-3 font-semibold text-[#6b6475]">{course.cutoffType}</td>
              <td className="p-3 font-extrabold text-[#123940]">
                {course.prevCutoff}
                <span className="text-[10px] text-[#a49ca8] block">({course.academicYear})</span>
              </td>
              <td className="p-3 font-bold text-[#2d2a32]">
                {course.studentValue !== null ? course.studentValue : '-'}
              </td>
              <td className="p-3">
                {getChanceBadge(course.chanceLabel, course.chanceVariant)}
              </td>
              <td className="p-3 text-[#4f4a56]">
                {course.intake ? course.intake : 'Data not available'} / {course.admitted ? course.admitted : '0'}
              </td>
              <td className="p-3 text-[#4f4a56]">
                {course.fees ? `₹${course.fees.toLocaleString()}` : <span className="text-[#a49ca8] italic">Data not available / verify with official source.</span>}
              </td>
              <td className="p-3 text-[#4f4a56]">
                {course.hostel ? `₹${course.hostel.toLocaleString()}` : <span className="text-[#a49ca8] italic">Data not available / verify with official source.</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeCoursesTable;
