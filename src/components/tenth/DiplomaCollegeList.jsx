/**
 * CareerPulse AI - Diploma Colleges List Component
 * Directory of government and aided polytechnics filtered by district, branch, and management type.
 */

import React, { useState, useEffect } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import DistrictFilter from '../common/DistrictFilter.jsx';
import SearchBar from '../common/SearchBar.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { fetchDiplomaColleges } from '../../api/diploma.api.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { Building2, ExternalLink, Globe } from 'lucide-react';

const TYPES = ['All', 'Government', 'Government-Aided', 'Self-Financing'];

export const DiplomaCollegeList = () => {
  const [district, setDistrict] = useState('All');
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchDiplomaColleges({
          district,
          type,
          search: debouncedSearch
        });
        if (isMounted && res?.data) setColleges(res.data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load diploma colleges');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [district, type, debouncedSearch]);

  return (
    <div className="space-y-5">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search college name or district..."
          className="flex-1"
        />
        <DistrictFilter value={district} onChange={setDistrict} />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2.5 rounded-2xl border border-[#eee8e2] bg-white text-xs sm:text-sm font-bold text-[#2d2a32] focus:outline-none focus:border-[#b1dfe4] shadow-xs cursor-pointer"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              Type: {t}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader message="Fetching polytechnic institutions..." />}
      {error && !loading && (
        <EmptyState title="Could not load colleges" description={error} onReset={() => setDistrict('All')} />
      )}
      {!loading && !error && colleges.length === 0 && (
        <EmptyState title="No colleges match your filter" description="Try selecting 'All' for district or type." onReset={() => { setDistrict('All'); setType('All'); setSearch(''); }} />
      )}

      {!loading && !error && colleges.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((col) => (
            <Card key={col.collegeId} pastel="white" className="p-5 flex flex-col justify-between border border-[#eee8e2]">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="blue" size="xs">
                    {col.district}
                  </Badge>
                  <FavoriteButton
                    itemType="college"
                    itemId={col.collegeId}
                    itemObject={col}
                    size="sm"
                  />
                </div>

                <div>
                  <h5 className="text-sm font-extrabold text-[#2d2a32] line-clamp-2">{col.name}</h5>
                  <p className="text-xs font-semibold text-[#6b6475] mt-0.5">
                    {col.type} • {col.source}
                  </p>
                </div>

                {/* Courses Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#a49ca8]">
                    Courses Offered ({col.courses?.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {col.courses?.slice(0, 4).map((cid, i) => (
                      <span key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#faf7f5] text-[#2d2a32] border border-[#eee8e2]">
                        {cid}
                      </span>
                    ))}
                    {col.courses?.length > 4 && (
                      <span className="text-[10px] font-semibold text-[#a49ca8]">
                        +{col.courses.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#eee8e2] flex items-center justify-between text-xs font-bold">
                <span className="text-[#a49ca8]">{col.collegeId}</span>
                {col.website && col.website.startsWith('http') ? (
                  <a
                    href={col.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#123940] hover:text-[#ffcd64] underline transition-colors"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[#a49ca8]">DOTE Affiliated</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiplomaCollegeList;
