/**
 * CareerPulse AI - Quiz History Component
 * Visualizes student past quiz attempts, category aptitude charts via Recharts, and modal reviews.
 */

import React, { useState } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Compass, Calendar, Award, Eye, Sparkles } from 'lucide-react';

const BAR_COLORS = ['#ffcd64', '#dec7e0', '#b1dfe4'];

export const QuizHistory = ({ attempts = [] }) => {
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  if (!attempts || attempts.length === 0) {
    return (
      <Card pastel="lavender" className="p-6 text-center space-y-2 border border-[#dec7e0]/40">
        <p className="text-sm font-bold text-[#2d2a32]">No quiz attempts on record yet.</p>
        <p className="text-xs text-[#6b6475]">
          Take the 20-question Career Guide quiz from the 10th Completed dashboard to evaluate your profile.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#eee8e2] pb-2">
        <Compass className="w-5 h-5 text-[#dec7e0]" />
        <h3 className="text-lg font-extrabold text-[#2d2a32]">
          Aptitude Quiz History ({attempts.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attempts.map((att) => {
          const rec = att.recommendation;
          const topGroup = rec?.results?.[0];
          const chartData = [
            { name: 'Aptitude', score: att.categoryScores?.Aptitude || 0 },
            { name: 'Interest', score: att.categoryScores?.Interest || 0 },
            { name: 'Strength', score: att.categoryScores?.['Subject Strength'] || 0 }
          ];

          return (
            <Card key={att._id} pastel="white" className="p-5 flex flex-col justify-between border border-[#eee8e2]">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#6b6475]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(att.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <AIBadge
                    generatedBy={rec?.generatedBy}
                    fallbackReason={rec?.fallbackReason}
                    size="xs"
                  />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#a49ca8] block">Top Match</span>
                  <h4 className="text-sm font-extrabold text-[#2d2a32] line-clamp-1">
                    {topGroup ? topGroup.name : 'Completed Assessment'}
                  </h4>
                </div>

                {/* Category Chart */}
                <div className="h-28 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b6475' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#6b6475' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#2d2a32',
                          borderRadius: '12px',
                          border: 'none',
                          color: '#fff',
                          fontSize: '11px'
                        }}
                      />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {rec && (
                <div className="pt-3 mt-3 border-t border-[#eee8e2] flex justify-end">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setSelectedAttempt(att)}
                    icon={Eye}
                  >
                    View Recommendation Details
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Recommendation Modal */}
      {selectedAttempt && selectedAttempt.recommendation && (
        <Modal
          isOpen={!!selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
          title="Career Assessment Recommendation"
          subtitle={`Attempted on ${new Date(selectedAttempt.createdAt).toLocaleDateString('en-IN')} • Engine: ${
            selectedAttempt.recommendation.generatedBy === 'groq'
              ? 'Groq'
              : selectedAttempt.recommendation.generatedBy === 'gemini'
              ? 'Gemini'
              : 'Rule-based Fallback'
          }`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-[#4d3800] bg-[#ffcd64]/20 p-3.5 rounded-2xl border border-[#ffcd64]/40 font-medium">
              {selectedAttempt.recommendation.summary}
            </p>

            <div className="space-y-3">
              {selectedAttempt.recommendation.results?.map((res, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#2d2a32]">{res.name}</span>
                    <Badge variant={res.category === 'best' ? 'green' : 'yellow'} size="xs">
                      {res.category.toUpperCase()} • {res.matchScore}%
                    </Badge>
                  </div>
                  <p className="text-xs text-[#6b6475] leading-relaxed">{res.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default QuizHistory;
