/**
 * CareerPulse AI - Subject Marks Bar Chart
 * Visualizes 12th subject marks using Recharts with pastel styling.
 */

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

const SUBJECT_LABELS = {
  maths: 'Maths',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  computerScience: 'CS / Comp',
  accountancy: 'Accounts',
  economics: 'Economics',
  commerce: 'Commerce',
  businessMaths: 'Bus. Maths',
  other: 'Other'
};

const PALETTE = ['#b1dfe4', '#c3df96', '#dec7e0', '#ffcd64', '#fcdde3', '#91cad0'];

export const SubjectMarksChart = ({ marks = {} }) => {
  const chartData = Object.entries(marks)
    .filter(([_, val]) => val !== null && val !== undefined && val !== '')
    .map(([key, val]) => ({
      subject: SUBJECT_LABELS[key] || key,
      mark: Number(val)
    }));

  if (chartData.length === 0) return null;

  return (
    <div className="w-full h-56 pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe6" vertical={false} />
          <XAxis
            dataKey="subject"
            tick={{ fill: '#6b6475', fontSize: 11, fontWeight: 700 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#a49ca8', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip
            cursor={{ fill: '#faf7f5' }}
            formatter={(value) => [`${value} / 100`, 'Mark']}
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #eee8e2',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          />
          <Bar dataKey="mark" radius={[8, 8, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectMarksChart;
