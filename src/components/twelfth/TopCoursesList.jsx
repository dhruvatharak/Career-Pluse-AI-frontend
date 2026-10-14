/**
 * CareerPulse AI - Top Degree Courses List Component
 * Ranked courses based on historical admissions with stream filters and student eligibility badges.
 */

import React, { useState, useEffect } from 'react';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import CourseCard from './CourseCard.jsx';
import CourseModal from './CourseModal.jsx';
import { fetchTopCourses } from '../../api/course.api.js';

const STREAMS = ['All', 'Engineering', 'Medical', 'Commerce', 'Science', 'Arts'];

export const TopCoursesList = ({ cutoffRecord }) => {
  const [selectedStream, setSelectedStream] = useState('All');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchTopCourses({ stream: selectedStream, limit: 16 })
      .then((res) => {
        if (isMounted) setCourses(res?.data || []);
      })
      .catch(() => {
        if (isMounted) setCourses([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedStream]);

  return (
    <div className="space-y-6">
      {/* Stream Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {STREAMS.map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setSelectedStream(st)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedStream === st
                ? 'bg-[#2d2a32] text-white shadow-xs'
                : 'bg-white border border-[#eee8e2] text-[#6b6475] hover:bg-[#faf7f5]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader message="Loading high-demand degree courses..." />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Try selecting a different stream filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, idx) => (
            <CourseCard
              key={course.courseId}
              course={course}
              index={idx}
              cutoffRecord={cutoffRecord}
              onClick={() => setActiveCourse(course)}
            />
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseModal
        isOpen={Boolean(activeCourse)}
        onClose={() => setActiveCourse(null)}
        course={activeCourse}
      />
    </div>
  );
};

export default TopCoursesList;
