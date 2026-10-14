/**
 * CareerPulse AI - Government Jobs List Component
 * Filterable table of public sector opportunities by qualification tier with verification alerts.
 */

import React, { useState, useEffect } from 'react';
import { fetchGovJobs } from '../../api/govJob.api.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import SearchBar from '../common/SearchBar.jsx';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { ExternalLink, AlertCircle } from 'lucide-react';

const QUALIFICATION_TIERS = ['10th', '12th', 'Diploma', 'Degree', 'All'];

export const GovJobList = () => {
  const [level, setLevel] = useState('10th');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 350);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchGovJobs({
          level,
          search: debouncedSearch
        });
        if (isMounted) {
          setJobs(res?.data || []);
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load government jobs');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [level, debouncedSearch]);

  return (
    <div className="space-y-6">
      
      {/* Mandatory Statutory Note from Specs */}
      <div className="p-4 rounded-2xl bg-[#ffcd64]/20 border border-[#ffcd64]/50 flex items-start gap-3 text-xs text-[#4d3800] leading-relaxed">
        <AlertCircle className="w-5 h-5 text-[#ffcd64] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold uppercase tracking-wide block mb-0.5">
            Recruitment Notice / வேலைவாய்ப்பு விதிமுறை
          </span>
          Verify eligibility on the official notification. School marks provide eligibility to apply only; final selection is decided strictly through the exam and recruitment process.
        </div>
      </div>

      {/* Controls: Qualification Chips & SearchBar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Chips */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#eee8e2] overflow-x-auto shadow-xs">
          {QUALIFICATION_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setLevel(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                level === tier
                  ? 'bg-[#ffcd64] text-[#2d2a32] shadow-xs'
                  : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#faf7f5]'
              }`}
            >
              {tier === '10th' ? '10th Standard / பத்தாம் வகுப்பு' : `${tier} Level`}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search post title, department, exam..."
          className="max-w-md"
        />
      </div>

      {/* Loading state */}
      {loading && <Loader message="Fetching government opportunities..." />}

      {/* Error state */}
      {error && !loading && (
        <EmptyState
          title="Error Loading Jobs"
          description={error}
          onReset={() => {
            setLevel('10th');
            setSearchTerm('');
          }}
        />
      )}

      {/* Empty state */}
      {!loading && !error && jobs.length === 0 && (
        <EmptyState
          title="No government jobs found"
          description="Try switching the qualification tab or clearing your search filter."
          onReset={() => {
            setLevel('10th');
            setSearchTerm('');
          }}
        />
      )}

      {/* Responsive Jobs Table */}
      {!loading && !error && jobs.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-[#eee8e2] bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#faf7f5] border-b border-[#eee8e2] text-[#6b6475] uppercase tracking-wider font-extrabold text-[11px]">
                <th className="py-4 px-4">Post & Department</th>
                <th className="py-4 px-4">Min. Qualification</th>
                <th className="py-4 px-4">Age Limit</th>
                <th className="py-4 px-4">Selection & Exam</th>
                <th className="py-4 px-4">Pay Scale</th>
                <th className="py-4 px-4 text-right">Official Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee8e2]">
              {jobs.map((job) => (
                <tr key={job.jobId} className="hover:bg-[#faf7f5]/70 transition-colors">
                  {/* Title & Dept */}
                  <td className="py-3.5 px-4 font-bold text-[#2d2a32]">
                    <div className="text-sm font-extrabold text-[#2d2a32]">{job.title}</div>
                    <div className="text-[11px] font-semibold text-[#6b6475] mt-0.5">
                      {job.department}
                    </div>
                  </td>

                  {/* Qualification Badge */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      {job.qualificationLevel === '10th' ? (
                        <Badge variant="green" size="xs">10th Sufficient</Badge>
                      ) : (
                        <Badge variant="blue" size="xs">{job.qualificationLevel} Required</Badge>
                      )}
                      <span className="text-[11px] text-[#4f4a56] font-medium">
                        {job.minQualification}
                      </span>
                    </div>
                  </td>

                  {/* Age */}
                  <td className="py-3.5 px-4 text-[#4f4a56] font-semibold">
                    {job.ageLimit}
                  </td>

                  {/* Exam & Process */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#2d2a32]">{job.examName}</div>
                    <div className="text-[11px] text-[#6b6475] mt-0.5">{job.selectionProcess}</div>
                  </td>

                  {/* Pay */}
                  <td className="py-3.5 px-4 font-bold text-[#1e3a12]">
                    {job.payLevel}
                  </td>

                  {/* Source Link */}
                  <td className="py-3.5 px-4 text-right">
                    {job.officialSource && job.officialSource.startsWith('http') ? (
                      <a
                        href={job.officialSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#123940] hover:text-[#ffcd64] underline transition-colors"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[#a49ca8] font-medium">Verify on Notice</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GovJobList;
