/**
 * CareerPulse AI - School List Component
 * Browse Tamil Nadu schools with district filtering, pass rate sorting, and pagination.
 */

import React, { useState, useEffect } from 'react';
import { fetchSchools } from '../../api/school.api.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import SearchBar from '../common/SearchBar.jsx';
import DistrictFilter from '../common/DistrictFilter.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Button from '../common/Button.jsx';
import { Building2, Award, Percent, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

export const SchoolList = () => {
  const [district, setDistrict] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('passPercentage');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 350);

  const [schools, setSchools] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [district, debouncedSearch, sort]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchSchools({
          district,
          search: debouncedSearch,
          sort,
          page,
          limit: 12
        });
        if (isMounted && res?.data) {
          setSchools(res.data.schools || []);
          setPagination(res.data.pagination || { total: 0, totalPages: 1 });
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load schools');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [district, debouncedSearch, sort, page]);

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search, DistrictFilter, Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search school name or district..."
        />
        <DistrictFilter value={district} onChange={setDistrict} />

        {/* Sort Select */}
        <div className="relative inline-flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a49ca8]">
            <ArrowUpDown className="w-4 h-4 text-[#dec7e0]" />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-2xl border border-[#eee8e2] bg-white text-xs sm:text-sm font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64] cursor-pointer shadow-xs"
          >
            <option value="passPercentage">Sort: 12th Pass % (High to Low)</option>
            <option value="centumCount">Sort: Centum Count (High to Low)</option>
            <option value="name">Sort: School Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && <Loader message="Fetching top performing schools..." />}

      {/* Error state */}
      {error && !loading && (
        <EmptyState
          title="Error Loading Schools"
          description={error}
          onReset={() => {
            setDistrict('All');
            setSearchTerm('');
          }}
        />
      )}

      {/* Empty state */}
      {!loading && !error && schools.length === 0 && (
        <EmptyState
          title="No schools found"
          description="Try selecting 'All Districts' or search with a different keyword."
          onReset={() => {
            setDistrict('All');
            setSearchTerm('');
          }}
        />
      )}

      {/* School Cards Grid */}
      {!loading && !error && schools.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schools.map((school) => (
              <Card
                key={school.schoolId}
                pastel="white"
                className="flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant="blue" size="xs">
                      {school.district}
                    </Badge>
                    <FavoriteButton
                      itemType="school"
                      itemId={school.schoolId}
                      itemObject={school}
                      size="sm"
                    />
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-[#2d2a32] line-clamp-2">
                      {school.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#6b6475] mt-0.5">
                      {school.type} • {school.academicYear}
                    </p>
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="pt-4 mt-4 border-t border-[#eee8e2] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#1e3a12] bg-[#c3df96]/30 px-2.5 py-1 rounded-xl border border-[#c3df96]/60">
                    <Percent className="w-3.5 h-3.5" />
                    <span>{school.passPercentage12th}% Pass</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-[#4d3800] bg-[#ffcd64]/30 px-2.5 py-1 rounded-xl border border-[#ffcd64]/60">
                    <Award className="w-3.5 h-3.5 text-[#ffcd64]" />
                    <span>{school.centumCount} Centums</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-[#eee8e2]">
              <span className="text-xs font-semibold text-[#6b6475]">
                Showing Page {page} of {pagination.totalPages} ({pagination.total} schools)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  icon={ChevronLeft}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  icon={ChevronRight}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SchoolList;
