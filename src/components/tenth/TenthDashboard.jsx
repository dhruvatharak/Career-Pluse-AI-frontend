/**
 * CareerPulse AI - 10th Dashboard Component
 * Container with 5 sub-tabs: Groups, Top Schools, Career Guide, Diploma, and Govt Jobs.
 */

import React, { useState, useEffect } from 'react';
import { fetchGroups } from '../../api/group.api.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import GroupCard from './GroupCard.jsx';
import GroupModal from './GroupModal.jsx';
import SchoolList from './SchoolList.jsx';
import GovJobList from './GovJobList.jsx';
import CareerGuide from './CareerGuide.jsx';
import DiplomaTab from './DiplomaTab.jsx';
import SearchBar from '../common/SearchBar.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import {
  BookOpen,
  Building2,
  Compass,
  GraduationCap,
  Briefcase,
  Sparkles
} from 'lucide-react';

const SUB_TABS = [
  { id: 'groups', label: 'Groups / குழுக்கள்', icon: BookOpen },
  { id: 'schools', label: 'Top Schools / சிறந்த பள்ளிகள்', icon: Building2 },
  { id: 'guide', label: 'Career Guide / வழிகாட்டி', icon: Compass },
  { id: 'diploma', label: 'Diploma / டிப்ளமோ', icon: GraduationCap },
  { id: 'jobs', label: 'Govt Jobs / அரசுப் பணிகள்', icon: Briefcase }
];

export const TenthDashboard = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [groupSearch, setGroupSearch] = useState('');
  const debouncedGroupSearch = useDebounce(groupSearch, 350);

  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groupError, setGroupError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (activeTab === 'groups') {
      let isMounted = true;
      const load = async () => {
        setLoadingGroups(true);
        setGroupError(null);
        try {
          const res = await fetchGroups(debouncedGroupSearch);
          if (isMounted) setGroups(res?.data || []);
        } catch (err) {
          if (isMounted) setGroupError(err.message || 'Failed to load groups');
        } finally {
          if (isMounted) setLoadingGroups(false);
        }
      };
      load();
      return () => {
        isMounted = false;
      };
    }
  }, [activeTab, debouncedGroupSearch]);

  return (
    <div className="space-y-6">
      
      {/* 5 Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-2 overflow-x-auto no-scrollbar">
        {SUB_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-[#ffcd64] text-[#2d2a32] shadow-xs'
                  : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: GROUPS */}
      {activeTab === 'groups' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#2d2a32]">
                Higher Secondary Groups / 11-ஆம் வகுப்பு பாடப்பிரிவுகள்
              </h3>
              <p className="text-xs text-[#6b6475] mt-0.5">
                Click any group card to view full subjects, career outcomes, and progression roadmaps.
              </p>
            </div>
            <SearchBar
              value={groupSearch}
              onChange={setGroupSearch}
              placeholder="Search group name or subject..."
              className="max-w-xs"
            />
          </div>

          {loadingGroups && <Loader message="Loading Tamil Nadu higher secondary groups..." />}

          {groupError && !loadingGroups && (
            <EmptyState
              title="Error Loading Groups"
              description={groupError}
              onReset={() => setGroupSearch('')}
            />
          )}

          {!loadingGroups && !groupError && groups.length === 0 && (
            <EmptyState
              title="No groups found"
              description="No subject combination matched your search term."
              onReset={() => setGroupSearch('')}
            />
          )}

          {!loadingGroups && !groupError && groups.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {groups.map((grp, index) => (
                <GroupCard
                  key={grp.groupId}
                  group={grp}
                  index={index}
                  onSelect={(g) => setSelectedGroup(g)}
                />
              ))}
            </div>
          )}

          {/* Group Detail Modal */}
          <GroupModal
            group={selectedGroup}
            isOpen={!!selectedGroup}
            onClose={() => setSelectedGroup(null)}
          />
        </div>
      )}

      {/* SUB-TAB 2: TOP SCHOOLS */}
      {activeTab === 'schools' && (
        <div className="animate-fade-in">
          <SchoolList />
        </div>
      )}

      {/* SUB-TAB 3: CAREER GUIDE */}
      {activeTab === 'guide' && (
        <div className="animate-fade-in">
          <CareerGuide />
        </div>
      )}

      {/* SUB-TAB 4: DIPLOMA */}
      {activeTab === 'diploma' && (
        <div className="animate-fade-in">
          <DiplomaTab />
        </div>
      )}

      {/* SUB-TAB 5: GOVT JOBS */}
      {activeTab === 'jobs' && (
        <div className="animate-fade-in">
          <GovJobList />
        </div>
      )}
    </div>
  );
};

export default TenthDashboard;
