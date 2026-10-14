/**
 * CareerPulse AI - Favorites Panel Component
 * Displays student saved groups, top schools, diploma courses, and polytechnic colleges.
 */

import React, { useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites.js';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import GroupModal from '../tenth/GroupModal.jsx';
import DiplomaCourseModal from '../tenth/DiplomaCourseModal.jsx';
import { Bookmark, BookOpen, Building2, Trash2, ArrowRight, GraduationCap, ExternalLink } from 'lucide-react';

export const FavoritesPanel = () => {
  const { favoritesData, loading, toggleFavorite } = useFavorites();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const groups = favoritesData?.groups || [];
  const schools = favoritesData?.schools || [];
  const diplomas = favoritesData?.diplomas || [];
  const colleges = favoritesData?.colleges || [];
  const degreeColleges = favoritesData?.degreeColleges || [];
  const totalCount = groups.length + schools.length + diplomas.length + colleges.length + degreeColleges.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#eee8e2] pb-3">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#ffcd64]" />
          <h2 className="text-xl font-extrabold text-[#2d2a32]">
            My Saved Bookmarks / விருப்பங்கள் ({totalCount})
          </h2>
        </div>
      </div>

      {totalCount === 0 && !loading && (
        <Card pastel="yellow" className="p-8 text-center space-y-2">
          <p className="text-sm font-bold text-[#2d2a32]">You have not saved any favorites yet.</p>
          <p className="text-xs text-[#6b6475]">
            Browse Groups, Schools, Diploma branches, or Colleges and click the heart icon to bookmark.
          </p>
        </Card>
      )}

      {/* 1. Saved Groups */}
      {groups.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
            <BookOpen className="w-4 h-4 text-[#dec7e0]" />
            <span>Saved Higher Secondary Groups ({groups.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groups.map((grp) => (
              <Card key={grp.groupId} pastel="white" className="p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="yellow" size="xs">{grp.groupId}</Badge>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('group', grp.groupId, grp)}
                      className="text-xs font-bold text-[#78192a] hover:bg-[#fcdde3] p-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-[#2d2a32] line-clamp-2">{grp.name}</h4>
                </div>
                <div className="pt-3 mt-3 border-t border-[#eee8e2] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#6b6475]">~{grp.minMarks}/500 marks</span>
                  <button
                    type="button"
                    onClick={() => setSelectedGroup(grp)}
                    className="text-xs font-bold text-[#2d2a32] hover:underline flex items-center gap-1"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 2. Saved Schools */}
      {schools.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
            <Building2 className="w-4 h-4 text-[#b1dfe4]" />
            <span>Saved Top Schools ({schools.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schools.map((sch) => (
              <Card key={sch.schoolId} pastel="white" className="p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="blue" size="xs">{sch.district}</Badge>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('school', sch.schoolId, sch)}
                      className="text-xs font-bold text-[#78192a] hover:bg-[#fcdde3] p-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-[#2d2a32] line-clamp-2">{sch.name}</h4>
                </div>
                <div className="pt-3 mt-3 border-t border-[#eee8e2] flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[#1e3a12] bg-[#c3df96]/30 px-2 py-0.5 rounded-lg">{sch.passPercentage12th}% Pass</span>
                  <span className="text-[#4d3800] bg-[#ffcd64]/30 px-2 py-0.5 rounded-lg">{sch.centumCount} Centums</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3. Saved Diploma Courses */}
      {diplomas.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
            <GraduationCap className="w-4 h-4 text-[#c3df96]" />
            <span>Saved Diploma Branches ({diplomas.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diplomas.map((dip) => (
              <Card key={dip.courseId} pastel="white" className="p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="green" size="xs">{dip.courseId}</Badge>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('diploma', dip.courseId, dip)}
                      className="text-xs font-bold text-[#78192a] hover:bg-[#fcdde3] p-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-[#2d2a32] line-clamp-2">{dip.name}</h4>
                </div>
                <div className="pt-3 mt-3 border-t border-[#eee8e2] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#6b6475]">{dip.duration}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(dip)}
                    className="text-xs font-bold text-[#1e3a12] hover:underline flex items-center gap-1"
                  >
                    <span>View Course Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 4. Saved Polytechnic Colleges */}
      {colleges.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
            <Building2 className="w-4 h-4 text-[#dec7e0]" />
            <span>Saved Polytechnic Colleges ({colleges.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colleges.map((col) => (
              <Card key={col.collegeId} pastel="white" className="p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="blue" size="xs">{col.district}</Badge>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('college', col.collegeId, col)}
                      className="text-xs font-bold text-[#78192a] hover:bg-[#fcdde3] p-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-[#2d2a32] line-clamp-2">{col.name}</h4>
                  <p className="text-[11px] text-[#6b6475]">{col.type}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#eee8e2] flex items-center justify-between">
                  <span className="text-[10px] text-[#a49ca8]">{col.collegeId}</span>
                  {col.website && (
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#123940] hover:underline"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 5. Saved Degree Colleges */}
      {degreeColleges.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
            <Building2 className="w-4 h-4 text-[#ffcd64]" />
            <span>Saved Degree Colleges ({degreeColleges.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {degreeColleges.map((col) => (
              <Card key={col.collegeId} pastel="white" className="p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={col.tier === 'Tier 1' ? 'yellow' : 'blue'} size="xs">{col.tier}</Badge>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('degreeCollege', col.collegeId, col)}
                      className="text-xs font-bold text-[#78192a] hover:bg-[#fcdde3] p-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-[#2d2a32] line-clamp-2">{col.name}</h4>
                  <p className="text-[11px] text-[#6b6475]">{col.district} District • {col.type}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#eee8e2] flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#123940] px-2 py-0.5 rounded-lg bg-[#b1dfe4]/20">
                    {col.admissionRoute}
                  </span>
                  {col.website && (
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#123940] hover:underline"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <GroupModal group={selectedGroup} isOpen={!!selectedGroup} onClose={() => setSelectedGroup(null)} />
      <DiplomaCourseModal course={selectedCourse} isOpen={!!selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};

export default FavoritesPanel;
