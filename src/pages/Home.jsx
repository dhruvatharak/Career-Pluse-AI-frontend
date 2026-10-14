/**
 * CareerPulse AI - Main Home Page
 * Hub displaying the TWO core tracks: "10th Completed" (TenthDashboard) and "12th Completed".
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import TenthDashboard from '../components/tenth/TenthDashboard.jsx';
import TwelfthDashboard from '../components/twelfth/TwelfthDashboard.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';

export const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState('tenth'); // 'tenth' | 'twelfth'

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffcd64]/20 via-[#dec7e0]/20 to-[#b1dfe4]/20 border border-[#eee8e2] p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#eee8e2] text-xs font-bold text-[#2d2a32] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ffcd64]" />
            <span>Tamil Nadu Higher Secondary & College Admission Advisor</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2d2a32] leading-tight">
            {isAuthenticated ? (
              <>
                Vanakkam, <span className="underline decoration-[#ffcd64]">{user?.name}</span>! 👋
              </>
            ) : (
              <>
                Find Your Right Course & College in <span className="underline decoration-[#ffcd64]">Tamil Nadu</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base font-medium text-[#4f4a56] leading-relaxed">
            Personalized guidance for Tamil Nadu school students after 10th and 12th.
            Explore official government higher secondary groups, cutoff calculations, polytechnic diplomas, and AI recommendations.
          </p>

          {/* Student Profile Quick Bar */}
          {isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Badge variant="yellow" size="sm">
                <MapPin className="w-3 h-3" />
                <span>District: {user?.district}</span>
              </Badge>
              <Badge variant="lavender" size="sm">
                <Award className="w-3 h-3" />
                <span>Category: {user?.category}</span>
              </Badge>
              <Badge variant="green" size="sm">
                <CheckCircle2 className="w-3 h-3" />
                <span>Session Active</span>
              </Badge>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/register">
                <Button variant="primary" size="md" icon={Sparkles}>
                  Register Free / பதிவு செய்க
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="md">
                  Sign In / உள்நுழைக
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* TWO MAIN TABS SELECTOR */}
      <section className="space-y-6">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="inline-flex p-1.5 rounded-3xl bg-[#faf7f5] border border-[#eee8e2] shadow-xs max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveMainTab('tenth')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold transition-all cursor-pointer select-none ${
                activeMainTab === 'tenth'
                  ? 'bg-[#ffcd64] text-[#2d2a32] shadow-sm scale-[1.02]'
                  : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-5 h-5 text-[#2d2a32]" />
              <div className="text-left">
                <div>10th Completed</div>
                <div className="text-[10px] font-bold opacity-75">10-ஆம் வகுப்பு முடித்தவர்கள்</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('twelfth')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold transition-all cursor-pointer select-none ${
                activeMainTab === 'twelfth'
                  ? 'bg-[#b1dfe4] text-[#123940] shadow-sm scale-[1.02]'
                  : 'text-[#6b6475] hover:text-[#2d2a32] hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-5 h-5 text-[#123940]" />
              <div className="text-left">
                <div>12th Completed</div>
                <div className="text-[10px] font-bold opacity-75">12-ஆம் வகுப்பு முடித்தவர்கள்</div>
              </div>
            </button>
          </div>
        </div>

        {/* TAB 1: 10TH COMPLETED DASHBOARD */}
        {activeMainTab === 'tenth' && <TenthDashboard />}

        {/* TAB 2: 12TH COMPLETED DASHBOARD */}
        {activeMainTab === 'twelfth' && <TwelfthDashboard />}
      </section>
    </div>
  );
};

export default Home;
