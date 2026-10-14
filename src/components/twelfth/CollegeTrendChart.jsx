/**
 * CareerPulse AI - College Course Cutoff Trend Chart
 * Renders historical cutoff trend lines for 2+ consecutive academic years.
 */

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const CollegeTrendChart = ({ trends = [] }) => {
  if (!trends || trends.length < 2) return null;

  return (
    <div className="w-full h-36 pt-2">
      <div className="text-[11px] font-bold text-[#6b6475] mb-1">
        Cutoff Multi-Year Trend / ஆண்டுவாரியான கட்-ஆஃப் போக்கு
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trends} margin={{ top: 5, right: 15, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe6" />
          <XAxis
            dataKey="academicYear"
            tick={{ fill: '#6b6475', fontSize: 10, fontWeight: 700 }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: '#a49ca8', fontSize: 10, fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #eee8e2',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          />
          <Line
            type="monotone"
            dataKey="prevCutoff"
            name="Cutoff"
            stroke="#123940"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#ffcd64' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CollegeTrendChart;
