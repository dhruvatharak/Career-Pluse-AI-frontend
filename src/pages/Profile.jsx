/**
 * CareerPulse AI - Final Student Profile Page
 * 6 Modular Sub-tabs: Overview | My Marks & Cutoffs | Favourites | Quiz History | Recommendations | Settings.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchUserProfile } from '../api/user.api.js';
import {
  LayoutDashboard,
  Award,
  Bookmark,
  Compass,
  Sparkles,
  Settings
} from 'lucide-react';
import Loader from '../components/common/Loader.jsx';
import ProfileHeaderBanner from '../components/profile/ProfileHeaderBanner.jsx';
import ProfileOverviewTab from '../components/profile/ProfileOverviewTab.jsx';
import ProfileCutoffCard from '../components/profile/ProfileCutoffCard.jsx';
import FavoritesPanel from '../components/profile/FavoritesPanel.jsx';
import QuizHistory from '../components/profile/QuizHistory.jsx';
import ProfileRecommendationsTab from '../components/profile/ProfileRecommendationsTab.jsx';
import ProfileSettingsTab from '../components/profile/ProfileSettingsTab.jsx';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'marks', label: 'My Marks & Cutoffs', icon: Award },
  { id: 'favourites', label: 'Favourites', icon: Bookmark },
  { id: 'quiz', label: 'Quiz History', icon: Compass },
  { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    user: null,
    cutoffRecord: null,
    favorites: {},
    quizAttempts: [],
    recommendations: {},
    stats: {}
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchUserProfile();
      if (res?.data) {
        setProfileData(res.data);
      }
    } catch (err) {
      console.warn('Could not load profile data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentUser = profileData.user || user;
  const allRecommendations = [
    ...(profileData.recommendations?.['quiz-group'] || []),
    ...(profileData.recommendations?.diploma || []),
    ...(profileData.recommendations?.['career-12th'] || [])
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-fade-in">
      <ProfileHeaderBanner user={currentUser} onLogout={logout} />

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-2 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-[#123940] text-white shadow-xs'
                  : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#faf7f5]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      {loading ? (
        <Loader message="Loading student records, cutoffs, and saved history..." />
      ) : (
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <ProfileOverviewTab
              user={currentUser}
              stats={profileData.stats}
              latestRecommendation={allRecommendations[0] || null}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'marks' && (
            <ProfileCutoffCard
              cutoffRecord={profileData.cutoffRecord}
              onUpdated={(updatedRecord) =>
                setProfileData((prev) => ({ ...prev, cutoffRecord: updatedRecord }))
              }
            />
          )}

          {activeTab === 'favourites' && <FavoritesPanel />}

          {activeTab === 'quiz' && <QuizHistory attempts={profileData.quizAttempts} />}

          {activeTab === 'recommendations' && (
            <ProfileRecommendationsTab
              recommendations={profileData.recommendations}
              onDeleted={() => loadData()}
            />
          )}

          {activeTab === 'settings' && (
            <ProfileSettingsTab
              user={currentUser}
              onUserUpdated={(updatedUser) =>
                setProfileData((prev) => ({ ...prev, user: updatedUser }))
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
