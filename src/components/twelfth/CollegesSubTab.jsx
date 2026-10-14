/**
 * CareerPulse AI - Top Colleges SubTab Component
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import CollegeFilterBar from './CollegeFilterBar.jsx';
import CollegeList from './CollegeList.jsx';
import { fetchColleges } from '../../api/college.api.js';
import { OFFICIAL_DISCLAIMER } from '../../shared/constants.js';

export const CollegesSubTab = () => {
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    exam: 'All',
    district: 'All',
    tier: 'All',
    type: 'All',
    search: '',
    sort: 'tier',
    page: 1
  });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchColleges(filters)
      .then((res) => {
        if (isMounted && res?.data) {
          setColleges(res.data.colleges || []);
          setPagination(res.data.pagination || { total: 0, page: 1, totalPages: 1 });
        }
      })
      .catch(() => {
        if (isMounted) setColleges([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Statutory Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-[#ffcd64]/15 border border-[#ffcd64]/40 flex items-start gap-3 text-xs text-[#4d3800] leading-relaxed">
        <AlertCircle className="w-4 h-4 text-[#e6b345] shrink-0 mt-0.5" />
        <p>{OFFICIAL_DISCLAIMER}</p>
      </div>

      <CollegeFilterBar
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
      />

      <CollegeList
        colleges={colleges}
        pagination={pagination}
        loading={loading}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />
    </div>
  );
};

export default CollegesSubTab;
