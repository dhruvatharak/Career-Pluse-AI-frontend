/**
 * CareerPulse AI - Career Guide Government Jobs Table Component
 */

import React from 'react';
import { Briefcase } from 'lucide-react';
import Badge from '../common/Badge.jsx';

export const CareerGuideGovJobsTable = ({ govJobs = [] }) => {
  if (!govJobs || govJobs.length === 0) return null;

  return (
    <div className="space-y-3 pt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-extrabold text-[#2d2a32] flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#123940]" />
          <span>Government Jobs for Your Qualification ({govJobs.length})</span>
        </h4>
        <span className="text-[11px] font-bold text-[#6b6475]">TNPSC / Staff Selection / Railway</span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#eee8e2] bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#faf7f5] border-b border-[#eee8e2] text-[#4f4a56] font-extrabold">
              <th className="p-3">Job Title & Department</th>
              <th className="p-3">Eligible Qualification</th>
              <th className="p-3">Selection Exam</th>
              <th className="p-3">Pay Scale</th>
              <th className="p-3">Notice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee8e2]">
            {govJobs.map((job) => (
              <tr key={job.jobId} className="hover:bg-[#faf7f5]">
                <td className="p-3 font-bold text-[#2d2a32]">
                  <div>{job.title}</div>
                  <div className="text-[10px] text-[#6b6475]">{job.department}</div>
                </td>
                <td className="p-3">
                  <Badge variant="blue" size="xs">{job.qualificationLevel}</Badge>
                </td>
                <td className="p-3 font-semibold text-[#4f4a56]">{job.examName || '-'}</td>
                <td className="p-3 font-bold text-[#1e3a12]">{job.payLevel || 'As per norms'}</td>
                <td className="p-3 text-[11px] text-[#a49ca8] italic">
                  Verify on official notification
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareerGuideGovJobsTable;
