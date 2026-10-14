/**
 * CareerPulse AI - Profile Overview Tab Component
 * Displays user greeting, key statistics cards, latest recommendation preview, and quick dashboard buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Compass, Sparkles, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import Button from '../common/Button.jsx';

export const ProfileOverviewTab = ({
  user,
  stats = {},
  latestRecommendation = null,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome & Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card pastel="yellow" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffcd64] flex items-center justify-center text-[#2d2a32]">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#2d2a32]">
              {stats.favouritesCount ?? 0}
            </div>
            <div className="text-xs font-bold text-[#6b6475]">Saved Favorites</div>
          </div>
        </Card>

        <Card pastel="lavender" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#dec7e0] flex items-center justify-center text-[#361a3b]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#2d2a32]">
              {stats.quizzesTaken ?? 0}
            </div>
            <div className="text-xs font-bold text-[#6b6475]">Quizzes Taken</div>
          </div>
        </Card>

        <Card pastel="blue" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#b1dfe4] flex items-center justify-center text-[#123940]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#2d2a32]">
              {stats.recommendationsCount ?? 0}
            </div>
            <div className="text-xs font-bold text-[#6b6475]">AI Recommendations</div>
          </div>
        </Card>
      </div>

      {/* Latest Recommendation Preview */}
      {latestRecommendation ? (
        <Card pastel="white" className="p-6 space-y-4 border border-[#eee8e2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffcd64]" />
              <h3 className="text-sm font-extrabold text-[#2d2a32]">Latest Guidance Recommendation</h3>
              <AIBadge
                generatedBy={latestRecommendation.generatedBy}
                fallbackReason={latestRecommendation.fallbackReason}
                size="xs"
              />
            </div>
            <span className="text-[11px] font-semibold text-[#a49ca8]">
              {new Date(latestRecommendation.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-xs text-[#4f4a56] leading-relaxed bg-[#faf7f5] p-3.5 rounded-2xl border border-[#eee8e2]">
            {latestRecommendation.summary}
          </p>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="xs"
              onClick={() => onNavigateTab('recommendations')}
              icon={ArrowRight}
            >
              View All Recommendations
            </Button>
          </div>
        </Card>
      ) : null}

      {/* Quick Dashboard Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card pastel="yellow" className="p-6 space-y-3">
          <BookOpen className="w-8 h-8 text-[#ffcd64]" />
          <h4 className="text-base font-extrabold text-[#2d2a32]">10th Completed Pathway Hub</h4>
          <p className="text-xs text-[#4f4a56]">
            Explore higher secondary group options, school performances, and career aptitude assessments.
          </p>
          <Link to="/">
            <Button variant="outline" size="sm" className="mt-2">
              Go to 10th Hub / செல்லுக
            </Button>
          </Link>
        </Card>

        <Card pastel="blue" className="p-6 space-y-3">
          <GraduationCap className="w-8 h-8 text-[#123940]" />
          <h4 className="text-base font-extrabold text-[#2d2a32]">12th Completed Cutoff & College Hub</h4>
          <p className="text-xs text-[#4f4a56]">
            Calculate your TNEA cutoff (/200), explore top degree courses, and review college admission chances.
          </p>
          <Link to="/">
            <Button variant="outline" size="sm" className="mt-2">
              Go to 12th Hub / செல்லுக
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverviewTab;
