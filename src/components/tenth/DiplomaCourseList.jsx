/**
 * CareerPulse AI - Diploma Courses List Component
 * Searchable catalog of 3-year polytechnic diploma branches with course modal and bookmarks.
 */

import React, { useState, useEffect } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import SearchBar from '../common/SearchBar.jsx';
import FavoriteButton from '../common/FavoriteButton.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import DiplomaCourseModal from './DiplomaCourseModal.jsx';
import { fetchDiplomaCourses } from '../../api/diploma.api.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { ArrowRight, Clock, Award } from 'lucide-react';

export const DiplomaCourseList = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchDiplomaCourses(debouncedSearch);
        if (isMounted && res?.data) setCourses(res.data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load diploma courses');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [debouncedSearch]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-extrabold text-[#2d2a32]">
            Explore All Polytechnic Diploma Branches ({courses.length})
          </h4>
          <p className="text-xs text-[#6b6475] mt-0.5">
            Full 3-year programs offering direct lateral entry to 2nd year B.E./B.Tech.
          </p>
        </div>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search diploma branch, tag, career..."
          className="max-w-xs"
        />
      </div>

      {loading && <Loader message="Fetching polytechnic courses..." />}
      {error && !loading && (
        <EmptyState title="Could not load courses" description={error} onReset={() => setSearch('')} />
      )}
      {!loading && !error && courses.length === 0 && (
        <EmptyState title="No courses found" description="Try a different keyword." onReset={() => setSearch('')} />
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card
              key={course.courseId}
              pastel="white"
              onClick={() => setSelectedCourse(course)}
              className="p-5 flex flex-col justify-between cursor-pointer group hover:border-[#c3df96] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="green" size="xs">
                    {course.courseId}
                  </Badge>
                  <FavoriteButton
                    itemType="diploma"
                    itemId={course.courseId}
                    itemObject={course}
                    size="sm"
                  />
                </div>

                <h5 className="text-sm font-extrabold text-[#2d2a32] group-hover:text-[#1e3a12] transition-colors line-clamp-2">
                  {course.name}
                </h5>

                <div className="flex flex-wrap gap-1">
                  {course.interestTags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-[#faf7f5] text-[#6b6475]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#eee8e2] flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-[#6b6475]">
                  {course.duration}
                </span>
                <span className="font-bold text-[#1e3a12] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <DiplomaCourseModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
};

export default DiplomaCourseList;
